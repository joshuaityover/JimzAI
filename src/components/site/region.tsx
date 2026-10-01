import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getRegionalPricing, getSupportedRegions } from "@/lib/pricing.functions";
import type { RegionalPricingResponse, SupportedRegion } from "@/lib/pricing-types";

const STORAGE_KEY = "jimz-region";

type RegionContextValue = {
  data: RegionalPricingResponse | undefined;
  regions: SupportedRegion[];
  isLoading: boolean;
  isError: boolean;
  manualCountry: string | null;
  setCountry: (code: string | null) => void;
};

const RegionContext = createContext<RegionContextValue>({
  data: undefined,
  regions: [],
  isLoading: true,
  isError: false,
  manualCountry: null,
  setCountry: () => {},
});

export function countryFlag(code: string): string {
  if (!/^[A-Za-z]{2}$/.test(code)) return "";
  return String.fromCodePoint(
    ...code
      .toUpperCase()
      .split("")
      .map((c) => 0x1f1e6 + c.charCodeAt(0) - 65),
  );
}

export function RegionProvider({ children }: { children: ReactNode }) {
  const [manualCountry, setManualCountry] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && /^[A-Z]{2}$/.test(saved)) setManualCountry(saved);
    setHydrated(true);
  }, []);

  const fetchPricing = useServerFn(getRegionalPricing);
  const fetchRegions = useServerFn(getSupportedRegions);

  const pricingQuery = useQuery({
    queryKey: ["regional-pricing", manualCountry],
    queryFn: () => fetchPricing({ data: { country: manualCountry } }),
    enabled: hydrated,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const regionsQuery = useQuery({
    queryKey: ["supported-regions"],
    queryFn: () => fetchRegions(),
    staleTime: 60 * 60 * 1000,
  });

  const setCountry = useCallback((code: string | null) => {
    setManualCountry(code);
    if (code) window.localStorage.setItem(STORAGE_KEY, code);
    else window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo<RegionContextValue>(
    () => ({
      data: pricingQuery.data,
      regions: regionsQuery.data ?? [],
      isLoading: pricingQuery.isPending,
      isError: pricingQuery.isError,
      manualCountry,
      setCountry,
    }),
    [pricingQuery.data, pricingQuery.isPending, pricingQuery.isError, regionsQuery.data, manualCountry, setCountry],
  );

  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>;
}

export function useRegion() {
  return useContext(RegionContext);
}

/** Compact region + currency indicator with an inline region switcher. */
export function RegionSwitcher({ className = "" }: { className?: string }) {
  const { data, regions, isLoading, manualCountry, setCountry } = useRegion();
  const [open, setOpen] = useState(false);
  const region = data?.region;

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-11 items-center gap-1.5 rounded-sm border border-border bg-background px-3 text-[0.7rem] font-bold tracking-wide text-muted-foreground transition-[border-color,color,background-color,transform] hover:-translate-y-0.5 hover:border-primary/40 hover:bg-secondary hover:text-primary"
      >
        {isLoading || !region ? (
          <span className="animate-pulse">Detecting region…</span>
        ) : (
          <>
            <span aria-hidden>{countryFlag(region.countryCode)}</span>
            Prices in {region.currencyCode}
          </>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-[min(18rem,calc(100vw-2.5rem))] rounded-sm border border-border bg-card p-4 shadow-lift">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Change region
          </p>
          <p className="mt-2 text-xs text-ink/70">
            {region?.detected
              ? `Prices detected for: ${region.countryName} ${countryFlag(region.countryCode)}`
              : "Select the country you are buying from."}
          </p>
          <label className="sr-only" htmlFor="region-select">
            Country
          </label>
          <select
            id="region-select"
            value={manualCountry ?? ""}
            onChange={(e) => {
              setCountry(e.target.value || null);
              setOpen(false);
            }}
            className="mt-3 min-h-11 w-full rounded-sm border border-border bg-background px-3 text-sm text-ink outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring"
          >
            <option value="">Detect automatically</option>
            {regions.map((r) => (
              <option key={r.countryCode} value={r.countryCode}>
                {r.countryName} — {r.currencyCode}
              </option>
            ))}
          </select>
          <p className="mt-3 text-[0.7rem] leading-relaxed text-muted-foreground">
            Region detection is approximate and based on your network location only.
          </p>
        </div>
      )}
    </div>
  );
}
