import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, BrainCircuit, LoaderCircle, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { CtaLink, Section } from "@/components/site/ui";
import { useRegion } from "@/components/site/region";
import {
  creativeAdvisorSchema,
  type CreativeAdvisorInput,
  type CreativeAdvisorResult,
} from "@/lib/creative-advisor-schema";
import { getCreativeAdvisorRecommendation } from "@/lib/creative-advisor.functions";

const CONTENT_OPTIONS = [
  "AI video and short-form content",
  "UGC or spokesperson ads",
  "Product and campaign visuals",
  "A broader content system",
  "AI business automation",
];

const BUDGET_TIERS = [
  { value: "starter", min: 500, max: 1500, label: "Starter project" },
  { value: "growth", min: 1500, max: 3500, label: "Growth project" },
  { value: "scale", min: 3500, max: 7500, label: "Scale project" },
  { value: "enterprise", min: 7500, max: null, label: "Larger or ongoing engagement" },
] as const;

type AdvisorForm = Omit<CreativeAdvisorInput, "countryCode">;
type AdvisorErrors = Partial<Record<keyof AdvisorForm | "form", string>>;

const initialForm: AdvisorForm = {
  business: "",
  audience: "",
  goal: "",
  placement: "",
  contentType: "",
  budget: "",
};

export function CreativeAdvisor({ compact = false }: { compact?: boolean }) {
  const { data: pricing } = useRegion();
  const getRecommendation = useServerFn(getCreativeAdvisorRecommendation);
  const [form, setForm] = useState<AdvisorForm>(initialForm);
  const [result, setResult] = useState<CreativeAdvisorResult | null>(null);
  const [errors, setErrors] = useState<AdvisorErrors>({});
  const [busy, setBusy] = useState(false);
  const currencyCode = pricing?.region.currencyCode ?? "USD";
  const currencySymbol = pricing?.region.currencySymbol ?? "$";
  const rate = currencyCode === "USD" ? 1 : (pricing?.currencyRate ?? 1);
  const budgetOptions = BUDGET_TIERS.map((tier) => ({
    value: tier.value,
    label: budgetLabel(tier, rate, currencyCode, currencySymbol),
  }));

  function update(field: keyof AdvisorForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      delete next.form;
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = creativeAdvisorSchema.safeParse({
      ...form,
      countryCode: pricing?.region.countryCode ?? null,
    });
    if (!parsed.success) {
      const nextErrors: AdvisorErrors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (typeof key === "string" && !nextErrors[key as keyof AdvisorErrors]) {
          nextErrors[key as keyof AdvisorErrors] = issue.message;
        }
      });
      setErrors(nextErrors);
      return;
    }

    setBusy(true);
    setErrors({});
    try {
      const recommendation = await getRecommendation({ data: parsed.data });
      setResult(recommendation);
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : "Please try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <Section tone={compact ? "white" : "green"} className={compact ? "py-16 sm:py-20" : ""}>
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-16">
        <div className={compact ? "max-w-xl" : "max-w-2xl"}>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-accent text-accent-foreground">
              <BrainCircuit className="h-5 w-5" aria-hidden />
            </span>
            <p className="eyebrow text-accent">JIMZ Creative Advisor</p>
          </div>
          <h2 className={`mt-6 text-3xl font-bold leading-[1.08] sm:text-5xl ${compact ? "text-primary" : "text-primary-foreground"}`}>
            Not Sure What Your Brand Needs?
          </h2>
          <p className={`mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${compact ? "text-ink/70" : "text-primary-foreground/75"}`}>
            Tell JIMZ AI what you&apos;re trying to achieve and get a creative recommendation.
          </p>
          <div className={`mt-8 flex items-center gap-3 text-sm ${compact ? "text-ink/60" : "text-primary-foreground/60"}`}>
            <Sparkles className="h-4 w-4 text-accent" aria-hidden />
            <span>Recommendations are directional. Prices come from our live rate card.</span>
          </div>
        </div>

        <div className={`rounded-sm border p-6 sm:p-8 ${compact ? "border-border bg-background" : "border-primary-foreground/15 bg-primary-foreground/[0.06]"}`}>
          {result ? (
            <Recommendation result={result} onReset={() => setResult(null)} />
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <AdvisorField label="What does your business sell?" value={form.business} error={errors.business} onChange={(value) => update("business", value)} placeholder="Products, services or experiences" />
                <AdvisorField label="Who is your target customer?" value={form.audience} error={errors.audience} onChange={(value) => update("audience", value)} placeholder="The people you want to reach" />
                <AdvisorField label="What are you trying to achieve?" value={form.goal} error={errors.goal} onChange={(value) => update("goal", value)} placeholder="Launch, awareness, leads or education" />
                <AdvisorField label="Where will the content be used?" value={form.placement} error={errors.placement} onChange={(value) => update("placement", value)} placeholder="Social, paid ads, website or internal" />
                <AdvisorSelect label="What type of content interests you?" value={form.contentType} error={errors.contentType} onChange={(value) => update("contentType", value)} options={CONTENT_OPTIONS} placeholder="Choose a direction" />
                <AdvisorSelect label="What is your approximate budget?" value={form.budget} error={errors.budget} onChange={(value) => update("budget", value)} options={budgetOptions} placeholder="Choose a range" />
              </div>
              {errors.form && <p className="mt-5 text-sm text-destructive" role="alert">{errors.form}</p>}
              <div className="mt-7 flex flex-col gap-4 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className={`text-xs leading-relaxed ${compact ? "text-muted-foreground" : "text-primary-foreground/60"}`}>
                  No guaranteed results. Just a sharper starting point.
                </p>
                <Button type="submit" disabled={busy} className="h-11 shrink-0 bg-accent px-5 text-accent-foreground hover:bg-accent/90">
                  {busy ? <><LoaderCircle className="animate-spin" aria-hidden /> Thinking…</> : <>Get My Recommendation <ArrowRight aria-hidden /></>}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

function Recommendation({ result, onReset }: { result: CreativeAdvisorResult; onReset: () => void }) {
  const items = [
    ["Suggested format", result.suggestedContentFormat],
    ["Suggested volume", result.suggestedNumberOfVideos],
    ["Campaign approach", result.recommendedCampaignApproach],
    ["Next step", result.suggestedNextStep],
  ];

  return (
    <div>
      <p className="eyebrow text-accent">Your creative direction</p>
      <h3 className="mt-3 text-2xl font-bold text-primary">{result.suitableService}</h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {items.map(([label, value]) => (
          <div key={label} className="border-t border-border pt-4">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-7 border border-accent/30 bg-accent/10 p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-accent">Estimated starting price</p>
        <p className="mt-2 text-2xl font-bold text-primary">{result.estimatedStartingPrice}</p>
        <p className="mt-2 text-xs leading-relaxed text-ink/60">{result.pricingNotice}</p>
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-4">
        <CtaLink to="/contact">Start Your Project</CtaLink>
        <Button type="button" variant="ghost" onClick={onReset} className="text-primary">Start over</Button>
      </div>
    </div>
  );
}

function AdvisorField({ label, value, error, placeholder, onChange }: { label: string; value: string; error: string | undefined; placeholder: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm">
      <span className="font-semibold text-primary">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-ink outline-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring" />
      {error && <span className="mt-1 block text-xs text-destructive" role="alert">{error}</span>}
    </label>
  );
}

function AdvisorSelect({ label, value, error, options, placeholder, onChange }: { label: string; value: string; error: string | undefined; options: Array<string | { value: string; label: string }>; placeholder: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm">
      <span className="font-semibold text-primary">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-ink outline-none focus-visible:ring-1 focus-visible:ring-ring">
        <option value="">{placeholder}</option>
        {options.map((option) => {
          const item = typeof option === "string" ? { value: option, label: option } : option;
          return <option key={item.value} value={item.value}>{item.label}</option>;
        })}
      </select>
      {error && <span className="mt-1 block text-xs text-destructive" role="alert">{error}</span>}
    </label>
  );
}

function budgetLabel(
  tier: (typeof BUDGET_TIERS)[number],
  rate: number,
  currencyCode: string,
  symbol: string,
) {
  const format = (amount: number) => `${symbol}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount)} ${currencyCode}`;
  const min = format(tier.min * rate);
  return tier.max ? `${tier.label} · ${min} – ${format(tier.max * rate)}` : `${tier.label} · ${min}+`;
}