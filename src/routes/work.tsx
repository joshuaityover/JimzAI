import { createFileRoute } from "@tanstack/react-router";
import { CtaLink, PageHero, Section, SectionHeading } from "@/components/site/ui";
import { workItems } from "@/components/site/work-data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/work")({
  head: () => pageHead({
    title: "Selected AI Creative Work | JIMZ AI",
    description:
      "Studio concept pieces from JIMZ AI showing AI video, UGC ad systems, spokesperson videos and AI product content.",
    path: "/work",
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Selected work from the JIMZ AI studio."
        intro="Concept pieces and production explorations that show how we direct, build and finish AI-generated creative."
      />

      <Section tone="ivory">
        <div className="grid gap-8 lg:grid-cols-2">
          {workItems.map((item) => (
            <article
              key={item.title}
              className="surface-hover group overflow-hidden rounded-sm border border-border bg-card"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.14em] text-primary uppercase">
                  {item.category}
                </span>
              </div>
              <div className="p-7">
                <h2 className="text-xl font-bold text-primary">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-sm text-muted-foreground">
          These are studio-produced concept pieces created to demonstrate capability. Client work is
          shared on request, subject to confidentiality.
        </p>
      </Section>

      <Section tone="green">
        <SectionHeading tone="dark" align="center" title="Have a project in mind?" />
        <div className="mt-10 flex justify-center">
          <CtaLink to="/contact">Start a Project</CtaLink>
        </div>
      </Section>
    </>
  );
}