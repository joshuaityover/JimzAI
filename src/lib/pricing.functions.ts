import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { RegionalPricingResponse, SupportedRegion } from "./pricing-types";

export const getRegionalPricing = createServerFn({ method: "GET" })
  .inputValidator((input: { country?: string | null } | undefined) => ({
    country:
      typeof input?.country === "string" && /^[A-Za-z]{2}$/.test(input.country)
        ? input.country.toUpperCase()
        : null,
  }))
  .handler(async ({ data }): Promise<RegionalPricingResponse> => {
    const { buildRegionalPricing, detectCountry } = await import("./pricing.server");
    let detected: Awaited<ReturnType<typeof detectCountry>> = {
      country: null,
      method: "fallback",
    };
    if (!data.country) {
      try {
        detected = await detectCountry(getRequest().headers);
      } catch (error) {
        console.error("country detection failed", error);
      }
    }
    return buildRegionalPricing({
      detectedCountry: detected.country,
      requestedCountry: data.country,
      detectionMethod: detected.method,
    });
  });

export const getSupportedRegions = createServerFn({ method: "GET" }).handler(
  async (): Promise<SupportedRegion[]> => {
    const { listSupportedRegions } = await import("./pricing.server");
    return listSupportedRegions();
  },
);

type AdminService = {
  id: string;
  service_id: string;
  service_name: string;
  category: string;
  base_price_usd: number;
  promo_price_usd: number | null;
  pricing_type: string;
  description: string;
  sort_order: number;
  active: boolean;
};

type AdminRegion = {
  id: string;
  country_code: string;
  country_name: string;
  region: string | null;
  currency_code: string;
  currency_symbol: string;
  pricing_multiplier: number;
  display_rule: string;
  active: boolean;
};

export const getAdminPricingConfig = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ services: AdminService[]; regions: AdminRegion[] }> => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");

    const [services, regions] = await Promise.all([
      context.supabase.from("services").select("*").order("sort_order", { ascending: true }),
      context.supabase.from("regional_pricing").select("*").order("country_name", { ascending: true }),
    ]);
    return {
      services: (services.data ?? []) as AdminService[],
      regions: (regions.data ?? []) as AdminRegion[],
    };
  });

export const updateServicePricing = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      id: string;
      base_price_usd: number;
      promo_price_usd: number | null;
      pricing_type: string;
      active: boolean;
    }) => input,
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("services")
      .update({
        base_price_usd: data.base_price_usd,
        promo_price_usd: data.promo_price_usd,
        pricing_type: data.pricing_type,
        active: data.active,
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const updateRegionPricing = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      id: string;
      currency_code: string;
      currency_symbol: string;
      pricing_multiplier: number;
      display_rule: string;
      active: boolean;
    }) => input,
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("regional_pricing")
      .update({
        currency_code: data.currency_code.toUpperCase(),
        currency_symbol: data.currency_symbol,
        pricing_multiplier: data.pricing_multiplier,
        display_rule: data.display_rule,
        active: data.active,
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: Boolean(data) };
  });

/**
 * One-time bootstrap: the first signed-in user can claim the admin role while
 * no admin exists yet. Afterwards this always refuses.
 */
export const claimFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count, error: countError } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if (countError) throw new Error(countError.message);
    if ((count ?? 0) > 0) throw new Error("An admin already exists for this workspace.");

    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
