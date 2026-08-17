import { createFileRoute } from "@tanstack/react-router";
import { services } from "@/lib/site-data";
import { CtaLink, PageHero, Section, SectionHeading } from "@/components/site/ui";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "AI Services for Brands — JIMZ AI" },
      {
        name: "description",
        content:
          "AI video production, UGC advertising, spokesperson videos, product content, social content and business automation from JIMZ AI.",
      },
      { property: "og:title", content: "AI Services for Brands — JIMZ AI" },
      {
        property: "og:description",
        content: "Explore the AI creative and digital services JIMZ AI delivers for ambitious brands.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="AI creative services built for commercial outcomes."
        intro="From flagship AI video production to automation that removes manual work, every service is designed around what moves your business forward."
      />

      <Section tone="ivory">
        <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
          {services.map((service) => (
            <article key={service.slug} className="bg-card p-8 sm:p-10">
              <service.icon className="h-7 w-7 text-accent" aria-hidden />
              <h2 className="mt-6 text-xl font-bold text-primary">{service.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{service.summary}</p>
              <ul className="mt-6 space-y-2">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-ink/75">
                    <span className="mt-2 h-1 w-4 shrink-0 bg-accent" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="green">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <SectionHeading
            tone="dark"
            eyebrow="Built to expand"
            title="A creative partner that grows with your AI roadmap."
            intro="Start with content and video, then extend into digital experience work, automation and custom AI solutions as your needs mature."
          />
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <CtaLink to="/contact">Start a Project</CtaLink>
            <CtaLink to="/pricing" variant="ghost">
              View Pricing
            </CtaLink>
          </div>
        </div>
      </Section>
    </>
  );
}