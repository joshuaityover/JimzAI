import { createFileRoute } from "@tanstack/react-router";
import { processSteps } from "@/lib/site-data";
import { CtaLink, PageHero, Section, SectionHeading } from "@/components/site/ui";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/process")({
  head: () => pageHead({
    title: "Our AI Production Process | JIMZ AI",
    description:
      "How JIMZ AI moves from brief to delivery: discover, strategize, create, refine and deliver AI video and content with clear checkpoints.",
    path: "/process",
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