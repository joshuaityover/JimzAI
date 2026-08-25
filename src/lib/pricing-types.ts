export type PricingType = "starting_from" | "per_month" | "per_session" | "custom";

export type PublicService = {
  serviceId: string;
  serviceName: string;
  category: string;
  description: string;
  pricingType: PricingType | string;
  /** Final display amount already converted to the region currency. */
  amount: number;
  formatted: string;
  isPromo: boolean;
};

export type RegionInfo = {
  countryCode: string;
  countryName: string;
  region: string | null;
  currencyCode: string;
  currencySymbol: string;
  detected: boolean;
  detectionMethod: "header" | "ip-lookup" | "manual" | "fallback";
};

export type RegionalPricingResponse = {
  region: RegionInfo;
  services: PublicService[];
  rateAsOf: string | null;
  notice: string;
};

export type SupportedRegion = {
  countryCode: string;
  countryName: string;
  currencyCode: string;
  currencySymbol: string;
};

export const PRICING_DISCLAIMER =
  "Prices are estimates. Final project pricing depends on scope and production requirements.";

export function pricingTypeLabel(type: string): string {
  switch (type) {
    case "per_month":
      return "per month";
    case "per_session":
      return "per session";
    case "custom":
      return "scoped per engagement";
    default:
      return "starting from";
  }
}
