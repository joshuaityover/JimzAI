import { createFileRoute } from "@tanstack/react-router";
import { processSteps } from "@/lib/site-data";
import { CtaLink, PageHero, Section, SectionHeading } from "@/components/site/ui";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our Process — JIMZ AI" },
      {
        name: "description",
        content:
          "Discover, strategize, create, refine, deliver: the five-step JIMZ AI production process behind every AI content engagement.",
      },
      { property: "og:title", content: "Our Process — JIMZ AI" },
      {
        property: "og:description",
        content: "How JIMZ AI takes a brief from discovery to delivered AI-produced content.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/process" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/process" }],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="A studio process, accelerated by AI."
        intro="Clear stages, defined checkpoints and no ambiguity about what happens next."
      />

      <Section tone="ivory">
        <ol className="space-y-px overflow-hidden rounded-sm border border-border bg-border">
          {processSteps.map((step) => (
            <li key={step.number} className="grid gap-4 bg-card p-8 sm:grid-cols-[7rem_1fr] sm:p-10">
              <span
                className="text-3xl font-bold text-accent"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.number}
              </span>
              <div>
                <h2 className="text-xl font-bold text-primary">{step.title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="green">
        <SectionHeading
          tone="dark"
          align="center"
          eyebrow="Ready when you are"
          title="Bring us a brief. We'll bring the direction."
        />
        <div className="mt-10 flex justify-center">
          <CtaLink to="/contact">Start a Project</CtaLink>
        </div>
      </Section>
    </>
  );
}