import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { pricingPlans } from "@/lib/site-data";
import { useCurrency } from "@/components/site/currency";
import { CtaLink, PageHero, Section, SectionHeading } from "@/components/site/ui";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — JIMZ AI" },
      {
        name: "description",
        content:
          "Transparent pricing for AI video and content production, from single-project starters to monthly creative retainers and enterprise engagements.",
      },
      { property: "og:title", content: "Pricing — JIMZ AI" },
      {
        property: "og:description",
        content: "Choose the creative support your brand needs, priced in USD or NGN.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/pricing" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

function PricingPage() {
  const { currency, setCurrency } = useCurrency();

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Choose the creative support your brand needs."
        intro="Clear packages, no hidden production fees. Every engagement starts with a short discovery call to confirm scope."
      />

      <Section tone="ivory">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Showing prices in</span>
          <div className="inline-flex rounded-full border border-border p-1">
            {(["USD", "NGN"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                aria-pressed={currency === c}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  currency === c ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
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
              <p
                className="mt-7 text-4xl font-bold text-primary"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {currency === "USD" ? plan.usd : plan.ngn}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {plan.cadence}
              </p>
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
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Prices are indicative starting points. Final quotes depend on scope, volume and delivery
          timeline.
        </p>
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