import { createFileRoute } from "@tanstack/react-router";
import { CtaLink, PageHero, Section, SectionHeading } from "@/components/site/ui";
import { workItems } from "@/components/site/work-data";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Selected Work — JIMZ AI" },
      {
        name: "description",
        content:
          "A look at the AI video, advertising, product and automation work produced by the JIMZ AI studio.",
      },
      { property: "og:title", content: "Selected Work — JIMZ AI" },
      {
        property: "og:description",
        content: "Concept films, UGC ad systems, spokesperson videos and product content by JIMZ AI.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/work" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
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
              className="group overflow-hidden rounded-sm border border-border bg-card"
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