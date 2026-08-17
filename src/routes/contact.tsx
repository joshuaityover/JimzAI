import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, MapPin, Clock } from "lucide-react";
import { PageHero, Section } from "@/components/site/ui";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Start a Project — Contact JIMZ AI" },
      {
        name: "description",
        content:
          "Tell JIMZ AI about your brand and the content you need. We reply to every serious enquiry within one business day.",
      },
      { property: "og:title", content: "Start a Project — Contact JIMZ AI" },
      {
        property: "og:description",
        content: "Start an AI video, content or automation project with JIMZ AI.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`New project enquiry — ${String(data.get("company") ?? "")}`);
    const body = encodeURIComponent(
      [
        `Name: ${data.get("name")}`,
        `Email: ${data.get("email")}`,
        `Company: ${data.get("company")}`,
        `Service: ${data.get("service")}`,
        "",
        `${data.get("message")}`,
      ].join("\n"),
    );
    window.location.href = `mailto:hello@jimzai.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a project with JIMZ AI."
        intro="Share a few details about your brand and what you need created. We'll come back with direction, timeline and pricing."
      />

      <Section tone="ivory">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <form onSubmit={handleSubmit} className="rounded-sm border border-border bg-card p-8 sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Full name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Company / brand" name="company" />
              <label className="block text-sm">
                <span className="font-semibold text-primary">Service of interest</span>
                <select
                  name="service"
                  className="mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-ink outline-none focus:border-primary"
                >
                  {services.map((s) => (
                    <option key={s.slug}>{s.title}</option>
                  ))}
                  <option>Something else</option>
                </select>
              </label>
            </div>

            <label className="mt-6 block text-sm">
              <span className="font-semibold text-primary">Project details</span>
              <textarea
                name="message"
                rows={6}
                required
                placeholder="What are you launching, who is it for, and when do you need it?"
                className="mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-ink outline-none focus:border-primary"
              />
            </label>

            <button
              type="submit"
              className="mt-8 inline-flex rounded-sm bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Send enquiry
            </button>
            <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
              {sent
                ? "Your email client should now be open with the enquiry ready to send."
                : "We reply to every serious enquiry within one business day."}
            </p>
          </form>

          <aside className="space-y-8">
            <ContactRow icon={Mail} title="Email">
              <a href="mailto:hello@jimzai.com" className="text-accent hover:underline">
                hello@jimzai.com
              </a>
            </ContactRow>
            <ContactRow icon={MapPin} title="Delivery">
              Remote-first studio working with brands worldwide.
            </ContactRow>
            <ContactRow icon={Clock} title="Response time">
              Within one business day, Monday to Friday.
            </ContactRow>
          </aside>
        </div>
      </Section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="font-semibold text-primary">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-ink outline-none focus:border-primary"
      />
    </label>
  );
}

function ContactRow({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Mail;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 border-b border-border pb-6">
      <Icon className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden />
      <div>
        <h2 className="text-sm font-bold text-primary">{title}</h2>
        <p className="mt-1 text-sm text-ink/70">{children}</p>
      </div>
    </div>
  );
}