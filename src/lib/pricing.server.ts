import { supabaseAdmin } from "@/integrations/supabase/client.server";
import {
  type PublicService,
  type RegionInfo,
  type RegionalPricingResponse,
  type SupportedRegion,
  PRICING_DISCLAIMER,
} from "./pricing-types";

const RATE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours
const RATE_PROVIDER = "https://open.er-api.com/v6/latest/USD";

const FALLBACK_REGION: RegionInfo = {
  countryCode: "US",
  countryName: "United States",
  region: "North America",
  currencyCode: "USD",
  currencySymbol: "$",
  detected: false,
  detectionMethod: "fallback",
};

type RegionRow = {
  country_code: string;
  country_name: string;
  region: string | null;
  currency_code: string;
  currency_symbol: string;
  pricing_multiplier: number | string;
  display_rule: string;
};

/** Retrieve USD-based exchange rates, cached in the database. */
export async function getExchangeRates(): Promise<{
  rates: Record<string, number>;
  fetchedAt: string | null;
}> {
  const { data: cached } = await supabaseAdmin
    .from("exchange_rates")
    .select("rates, fetched_at")
    .eq("base_currency", "USD")
    .maybeSingle();

  const fresh =
    cached && Date.now() - new Date(cached.fetched_at).getTime() < RATE_TTL_MS;

  if (fresh) {
    return { rates: cached.rates as Record<string, number>, fetchedAt: cached.fetched_at };
  }

  try {
    const res = await fetch(RATE_PROVIDER);
    if (!res.ok) throw new Error(`rate provider ${res.status}`);
    const payload = (await res.json()) as { result?: string; rates?: Record<string, number> };
    if (payload.result !== "success" || !payload.rates) throw new Error("bad rate payload");

    const fetchedAt = new Date().toISOString();
    await supabaseAdmin
      .from("exchange_rates")
      .upsert(
        { base_currency: "USD", rates: payload.rates, fetched_at: fetchedAt },
        { onConflict: "base_currency" },
      );
    return { rates: payload.rates, fetchedAt };
  } catch (error) {
    console.error("exchange rate fetch failed", error);
    if (cached) {
      // Stale cache beats a broken page.
      return { rates: cached.rates as Record<string, number>, fetchedAt: cached.fetched_at };
    }
    return { rates: { USD: 1 }, fetchedAt: null };
  }
}

function applyDisplayRule(value: number, rule: string): number {
  switch (rule) {
    case "round_1000":
      return Math.round(value / 1000) * 1000;
    case "round_100":
      return Math.round(value / 100) * 100;
    case "exact":
      return Math.round(value * 100) / 100;
    case "round_10":
    default:
      return Math.round(value / 10) * 10;
  }
}

export function formatAmount(amount: number, currencyCode: string, symbol: string): string {
  const decimals = amount % 1 === 0 ? 0 : 2;
  const num = amount.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  const trimmed = symbol.trim();
  const needsSpace = symbol.endsWith(" ") || trimmed.length > 2;
  return `${trimmed}${needsSpace ? " " : ""}${num} ${currencyCode}`;
}

async function loadRegion(countryCode: string | null): Promise<{
  row: RegionRow | null;
}> {
  if (!countryCode) return { row: null };
  const { data } = await supabaseAdmin
    .from("regional_pricing")
    .select("country_code, country_name, region, currency_code, currency_symbol, pricing_multiplier, display_rule")
    .eq("country_code", countryCode.toUpperCase())
    .eq("active", true)
    .maybeSingle();
  return { row: (data as RegionRow | null) ?? null };
}

/**
 * Deterministic pricing: base USD -> approved regional multiplier -> currency conversion -> display rounding.
 */
export async function buildRegionalPricing(input: {
  detectedCountry: string | null;
  requestedCountry: string | null;
  detectionMethod: RegionInfo["detectionMethod"];
}): Promise<RegionalPricingResponse> {
  const manual = input.requestedCountry ? await loadRegion(input.requestedCountry) : { row: null };
  const auto = manual.row ? { row: null } : await loadRegion(input.detectedCountry);
  const row = manual.row ?? auto.row;

  const region: RegionInfo = row
    ? {
        countryCode: row.country_code,
        countryName: row.country_name,
        region: row.region,
        currencyCode: row.currency_code,
        currencySymbol: row.currency_symbol,
        detected: !manual.row,
        detectionMethod: manual.row ? "manual" : input.detectionMethod,
      }
    : FALLBACK_REGION;

  const multiplier = row ? Number(row.pricing_multiplier) : 1;
  const displayRule = row ? row.display_rule : "round_10";

  const { data: serviceRows } = await supabaseAdmin
    .from("services")
    .select("service_id, service_name, category, description, pricing_type, base_price_usd, promo_price_usd")
    .eq("active", true)
    .order("sort_order", { ascending: true });

  let rates: Record<string, number> = { USD: 1 };
  let rateAsOf: string | null = null;
  if (region.currencyCode !== "USD") {
    const result = await getExchangeRates();
    rates = result.rates;
    rateAsOf = result.fetchedAt;
  }
  const rate = region.currencyCode === "USD" ? 1 : (rates[region.currencyCode] ?? null);
  const effective = rate === null ? FALLBACK_REGION : region;
  const effectiveRate = rate ?? 1;

  const services: PublicService[] = (serviceRows ?? []).map((s) => {
    const usd = Number(s.promo_price_usd ?? s.base_price_usd);
    const regionalUsd = usd * multiplier;
    const converted = regionalUsd * effectiveRate;
    const amount = applyDisplayRule(converted, effective.currencyCode === "USD" ? "round_10" : displayRule);
    return {
      serviceId: s.service_id,
      serviceName: s.service_name,
      category: s.category,
      description: s.description,
      pricingType: s.pricing_type,
      amount,
      formatted: formatAmount(amount, effective.currencyCode, effective.currencySymbol),
      isPromo: s.promo_price_usd != null,
    };
  });

  return { region: effective, services, rateAsOf, notice: PRICING_DISCLAIMER };
}

export async function listSupportedRegions(): Promise<SupportedRegion[]> {
  const { data } = await supabaseAdmin
    .from("regional_pricing")
    .select("country_code, country_name, currency_code, currency_symbol")
    .eq("active", true)
    .order("country_name", { ascending: true });

  return (data ?? []).map((r) => ({
    countryCode: r.country_code,
    countryName: r.country_name,
    currencyCode: r.currency_code,
    currencySymbol: r.currency_symbol,
  }));
}

/** Approximate country from request headers, then an IP lookup as a fallback. */
export async function detectCountry(headers: Headers): Promise<{
  country: string | null;
  method: RegionInfo["detectionMethod"];
}> {
  const headerCountry =
    headers.get("cf-ipcountry") ??
    headers.get("x-vercel-ip-country") ??
    headers.get("x-country-code");
  if (headerCountry && headerCountry.length === 2 && headerCountry !== "XX") {
    return { country: headerCountry.toUpperCase(), method: "header" };
  }

  const ip = (headers.get("cf-connecting-ip") ?? headers.get("x-forwarded-for") ?? "")
    .split(",")[0]
    ?.trim();
  if (!ip || ip.startsWith("127.") || ip.startsWith("192.168.") || ip === "::1") {
    return { country: null, method: "fallback" };
  }

  try {
    const res = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`, {
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) throw new Error(`ip lookup ${res.status}`);
    const payload = (await res.json()) as { country_code?: string };
    if (payload.country_code) {
      return { country: payload.country_code.toUpperCase(), method: "ip-lookup" };
    }
  } catch (error) {
    console.error("ip geolocation failed", error);
  }
  return { country: null, method: "fallback" };
}
