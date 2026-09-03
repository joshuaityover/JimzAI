import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Clock3, Mail, MapPin, Send } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHero, Section } from "@/components/site/ui";
import { useRegion } from "@/components/site/region";
import {
  inquiryProjectTypes,
  inquirySchema,
  inquiryServices,
  type InquiryInput,
} from "@/lib/inquiry-schema";
import { submitProjectInquiry } from "@/lib/inquiry.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Start a Project — JIMZ AI" },
      {
        name: "description",
        content:
          "Tell JIMZ AI what you are trying to create and receive a clear production plan for your next AI creative or digital project.",
      },
      { property: "og:title", content: "Start a Project — JIMZ AI" },
      {
        property: "og:description",
        content: "Share your brief with JIMZ AI and start building something intelligent.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const budgetTiers = [
  { value: "starter", min: 500, max: 1500, label: "Starter project" },
  { value: "growth", min: 1500, max: 3500, label: "Growth project" },
  { value: "scale", min: 3500, max: 7500, label: "Scale project" },
  { value: "enterprise", min: 7500, max: null, label: "Larger or ongoing engagement" },
] as const;

function formatCurrency(amount: number, currencyCode: string, symbol: string) {
  const number = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${symbol}${number} ${currencyCode}`;
}

function budgetLabel(
  tier: (typeof budgetTiers)[number],
  rate: number,
  currencyCode: string,
  symbol: string,
) {
  const min = formatCurrency(tier.min * rate, currencyCode, symbol);
  return tier.max
    ? `${tier.label} · ${min} – ${formatCurrency(tier.max * rate, currencyCode, symbol)}`
    : `${tier.label} · ${min}+`;
}

function ContactPage() {
  const { data: pricing, regions } = useRegion();
  const submitInquiry = useServerFn(submitProjectInquiry);
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const region = pricing?.region;
  const currencyCode = region?.currencyCode ?? "USD";
  const currencySymbol = region?.currencySymbol ?? "$";
  const rate = region?.currencyCode === "USD" ? 1 : (pricing?.currencyRate ?? 1);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const result = inquirySchema.safeParse(raw);
    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = String(issue.path[0] ?? "form");
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      });
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setBusy(true);
    try {
      await submitInquiry({ data: result.data as InquiryInput });
      setSubmitted(true);
      form.reset();
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : "Please try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Start a project"
        title="Let's Build Something Intelligent."
        intro="Tell us what you're trying to create. We'll turn the idea into a clear production plan."
      />

      <Section tone="ivory" className="pt-12 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:gap-20">
          <div>
            {submitted ? (
              <div className="border border-primary/15 bg-card p-8 sm:p-12">
                <CheckCircle2 className="h-10 w-10 text-accent" aria-hidden />
                <p className="eyebrow mt-8 text-accent">Request received</p>
                <h1 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-primary sm:text-4xl">
                  Thank you. Your project request has been received.
                </h1>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/70">
                  We&apos;ll review the brief and come back with the right next step, scope and timing.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-8 border-primary/25 text-primary"
                  onClick={() => setSubmitted(false)}
                >
                  Submit another request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="border border-primary/10 bg-card p-6 sm:p-10">
                <div className="flex items-start justify-between gap-6 border-b border-border pb-7">
                  <div>
                    <p className="eyebrow text-accent">Project brief</p>
                    <h2 className="mt-3 text-2xl font-bold text-primary">A few useful details</h2>
                  </div>
                  <Send className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden />
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <Field label="Full name" name="full_name" required error={errors["full_name"]} />
                  <Field label="Business / company name" name="company_name" required error={errors["company_name"]} />
                  <Field label="Business email" name="business_email" type="email" required error={errors["business_email"]} />
                  <Field label="Website" name="website" type="url" placeholder="https://" error={errors["website"]} />
                  <label className="block text-sm">
                    <span className="font-semibold text-primary">Country <span className="text-accent">*</span></span>
                    <Input list="country-options" name="country" required defaultValue={region?.countryName ?? ""} className="mt-2 h-11" />
                    <datalist id="country-options">
                      {regions.map((item) => <option key={item.countryCode} value={item.countryName} />)}
                    </datalist>
                    {errors["country"] && <FieldError>{errors["country"]}</FieldError>}
                  </label>
                  <SelectField label="Service needed" name="service_needed" required error={errors["service_needed"]}>
                    <option value="">Select a service</option>
                    {inquiryServices.map((service) => <option key={service}>{service}</option>)}
                  </SelectField>
                  <SelectField label="Project type" name="project_type" required error={errors["project_type"]}>
                    <option value="">Select a project type</option>
                    {inquiryProjectTypes.map((type) => <option key={type}>{type}</option>)}
                  </SelectField>
                  <label className="block text-sm">
                    <span className="font-semibold text-primary">Desired delivery date</span>
                    <Input name="desired_delivery_date" type="date" min={new Date().toISOString().split("T")[0]} className="mt-2 h-11" />
                    {errors["desired_delivery_date"] && <FieldError>{errors["desired_delivery_date"]}</FieldError>}
                  </label>
                  <SelectField label={`Estimated budget · ${currencyCode}`} name="estimated_budget" required error={errors["estimated_budget"]}>
                    <option value="">Choose an approximate range</option>
                    {budgetTiers.map((tier) => (
                      <option key={tier.value} value={budgetLabel(tier, rate, currencyCode, currencySymbol)}>
                        {budgetLabel(tier, rate, currencyCode, currencySymbol)}
                      </option>
                    ))}
                  </SelectField>
                </div>

                <div className="mt-6 grid gap-6">
                  <TextField label="Project description" name="project_description" required rows={6} placeholder="What are you launching, who is it for, and what should the work achieve?" error={errors["project_description"]} />
                  <Field label="Target audience" name="target_audience" required placeholder="Who needs to see, use or act on this?" error={errors["target_audience"]} />
                  <SelectField label="How did you hear about JIMZ AI?" name="referral_source" required error={errors["referral_source"]}>
                    <option value="">Choose one</option>
                    <option>Search engine</option>
                    <option>Social media</option>
                    <option>Referral</option>
                    <option>Existing network</option>
                    <option>Other</option>
                  </SelectField>
                </div>

                {errors["form"] && <p className="mt-6 text-sm text-destructive" role="alert">{errors["form"]}</p>}
                <div className="mt-8 flex flex-col items-start gap-3 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">Your brief is private and is only used to scope your request.</p>
                  <Button type="submit" disabled={busy} className="h-12 bg-accent px-6 text-accent-foreground hover:bg-accent/90">
                    {busy ? "Sending request…" : "Submit Project Request"}
                    <Send className="h-4 w-4" aria-hidden />
                  </Button>
                </div>
              </form>
            )}
          </div>

          <aside className="lg:pt-4">
            <p className="eyebrow text-accent">Talk to JIMZ AI</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-primary">A sharper brief makes a stronger first move.</h2>
            <p className="mt-5 text-base leading-relaxed text-ink/70">Whether you have a defined campaign or just the beginning of an idea, we can help shape the right creative and digital path.</p>
            <div className="mt-10 space-y-7 border-t border-border pt-7">
              <ContactRow icon={Mail} title="Email">hello@jimzai.com</ContactRow>
              <ContactRow icon={MapPin} title="Delivery">Remote-first studio working with brands worldwide.</ContactRow>
              <ContactRow icon={Clock3} title="Response time">Within one business day, Monday to Friday.</ContactRow>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function Field({ label, name, type = "text", required, placeholder, error }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; error?: string | undefined }) {
  return (
    <label className="block text-sm">
      <span className="font-semibold text-primary">{label} {required && <span className="text-accent">*</span>}</span>
      <Input name={name} type={type} required={required} placeholder={placeholder} className="mt-2 h-11" />
      {error && <FieldError>{error}</FieldError>}
    </label>
  );
}

function SelectField({ label, name, required, error, children }: { label: string; name: string; required?: boolean; error?: string | undefined; children: ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="font-semibold text-primary">{label} {required && <span className="text-accent">*</span>}</span>
      <select name={name} required={required} defaultValue="" className="mt-2 h-11 w-full rounded-md border border-input bg-transparent px-3 text-sm text-ink outline-none focus-visible:ring-1 focus-visible:ring-ring">
        {children}
      </select>
      {error && <FieldError>{error}</FieldError>}
    </label>
  );
}

function TextField({ label, name, required, rows, placeholder, error }: { label: string; name: string; required?: boolean; rows?: number; placeholder?: string; error?: string | undefined }) {
  return (
    <label className="block text-sm">
      <span className="font-semibold text-primary">{label} {required && <span className="text-accent">*</span>}</span>
      <Textarea name={name} required={required} rows={rows} placeholder={placeholder} className="mt-2 min-h-36 resize-y" />
      {error && <FieldError>{error}</FieldError>}
    </label>
  );
}

function FieldError({ children }: { children: ReactNode }) {
  return <span className="mt-1 block text-xs text-destructive" role="alert">{children}</span>;
}

function ContactRow({ icon: Icon, title, children }: { icon: typeof Mail; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <Icon className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden />
      <div>
        <h3 className="text-sm font-bold text-primary">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink/70">{children}</p>
      </div>
    </div>
  );
}