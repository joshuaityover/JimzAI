import { createFileRoute } from "@tanstack/react-router";
import { Check, Globe, RefreshCw } from "lucide-react";
import { pricingPlans } from "@/lib/site-data";
import { countryFlag, useRegion } from "@/components/site/region";
import { PRICING_DISCLAIMER, pricingTypeLabel } from "@/lib/pricing-types";
import { CtaLink, PageHero, Section, SectionHeading } from "@/components/site/ui";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — JIMZ AI" },
      {
        name: "description",
        content:
          "Estimated regional pricing for AI video and content production, shown in your local currency, from single-project starters to monthly retainers.",
      },
      { property: "og:title", content: "Pricing — JIMZ AI" },
      {
        property: "og:description",
        content: "Estimated pricing for your region, shown in your local currency.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/pricing" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

const PLAN_SERVICE: Record<string, string> = {
  Starter: "plan-starter",
  Growth: "plan-growth",
  Enterprise: "plan-enterprise",
};

function RegionBanner() {
  const { data, regions, isLoading, isError, manualCountry, setCountry } = useRegion();
  const region = data?.region;

  return (
    <div className="mb-10 flex flex-col gap-4 rounded-sm border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <Globe className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
        <div>
          <p className="text-sm font-semibold text-primary">Estimated pricing for your region</p>
          <p className="mt-1 text-sm text-ink/70">
            {isLoading && "Detecting your region…"}
            {!isLoading && isError && "We couldn't detect your region, so prices are shown in USD."}
            {!isLoading && !isError && region && (
              <>
                {region.detected
                  ? `Prices detected for: ${region.countryName} ${countryFlag(region.countryCode)}`
                  : `Showing prices for: ${region.countryName} ${countryFlag(region.countryCode)}`}{" "}
                <span className="text-muted-foreground">({region.currencyCode})</span>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label className="sr-only" htmlFor="pricing-region">
          Change region
        </label>
        <select
          id="pricing-region"
          value={manualCountry ?? ""}
          onChange={(e) => setCountry(e.target.value || null)}
          className="rounded-sm border border-border bg-background px-3 py-2 text-sm text-ink"
        >
          <option value="">Change region (auto-detect)</option>
          {regions.map((r) => (
            <option key={r.countryCode} value={r.countryCode}>
              {r.countryName} — {r.currencyCode}
            </option>
          ))}
        </select>
        {manualCountry && (
          <button
            type="button"
            onClick={() => setCountry(null)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary"
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

function PricingPage() {
  const { data, isLoading } = useRegion();
  const byId = new Map((data?.services ?? []).map((s) => [s.serviceId, s]));
  const catalogue = (data?.services ?? []).filter((s) => s.category !== "Packages");

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Choose the creative support your brand needs."
        intro="Clear packages, no hidden production fees. Every engagement starts with a short discovery call to confirm scope."
      />

      <Section tone="ivory">
        <RegionBanner />

        <div className="grid gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            const priced = byId.get(PLAN_SERVICE[plan.name] ?? "");
            const isCustom = priced?.pricingType === "custom";
            return (
              <article
                key={plan.name}
                className={`flex flex-col rounded-sm border p-8 ${
                  plan.featured
                    ? "border-accent bg-card shadow-[0_24px_60px_-40px_rgba(7,91,58,0.6)]"
                    : "border-border bg-card"
                }`}
              >
                {plan.featured && (
                  <span className="eyebrow mb-4 inline-block text-accent">Most popular</span>
                )}
                <h2 className="text-lg font-bold text-primary">{plan.name}</h2>
                <p className="mt-2 text-sm text-ink/70">{plan.tagline}</p>

                <p className="mt-7 text-xs uppercase tracking-widest text-muted-foreground">
                  {isCustom ? "Scoped per engagement" : "Starting from"}
                </p>
                <p
                  className="mt-1 text-4xl font-bold text-primary"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {isLoading ? (
                    <span className="inline-block h-9 w-40 animate-pulse rounded bg-muted align-middle" />
                  ) : isCustom || !priced ? (
                    "Custom"
                  ) : (
                    priced.formatted
                  )}
                </p>
                {!isCustom && priced && (
                  <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {pricingTypeLabel(priced.pricingType)}
                  </p>
                )}

                <ul className="mt-7 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm text-ink/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <CtaLink to="/contact" variant={plan.featured ? "primary" : "outline"}>
                    Start a Project
                  </CtaLink>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">{PRICING_DISCLAIMER}</p>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Service estimates"
          title="Estimated pricing for your region"
          intro="Individual services, priced from our USD rate card and shown in your local currency."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-40 animate-pulse rounded-sm border border-border bg-muted/40" />
            ))}

          {!isLoading &&
            catalogue.map((s) => (
              <article
                key={s.serviceId}
                className="flex flex-col rounded-sm border border-border bg-card p-6 transition-transform hover:-translate-y-1"
              >
                <span className="eyebrow text-accent">{s.category}</span>
                <h3 className="mt-2 text-base font-bold text-primary">{s.serviceName}</h3>
                <p className="mt-2 flex-1 text-sm text-ink/70">{s.description}</p>
                <p className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">
                  {pricingTypeLabel(s.pricingType)}
                </p>
                <p
                  className="text-2xl font-bold text-primary"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.formatted}
                </p>
                {s.isPromo && (
                  <span className="mt-2 inline-block w-fit rounded-full bg-accent/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-accent">
                    Promotional rate
                  </span>
                )}
              </article>
            ))}

          {!isLoading && catalogue.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Service pricing is being updated. Please contact us for a current quote.
            </p>
          )}
        </div>

        <p className="mt-8 text-sm text-muted-foreground">{PRICING_DISCLAIMER}</p>
      </Section>

      <Section tone="green">
        <SectionHeading
          tone="dark"
          align="center"
          title="Not sure which package fits?"
          intro="Tell us what you're launching and we'll recommend the right level of support."
        />
        <div className="mt-10 flex justify-center">
          <CtaLink to="/contact">Talk to us</CtaLink>
        </div>
      </Section>
    </>
  );
}
