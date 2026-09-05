import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { serviceCategories } from "@/lib/services-data";
import { CtaLink, PageHero, Section, SectionHeading } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import { CreativeAdvisor } from "@/components/site/CreativeAdvisor";

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
        <SectionHeading
          eyebrow="What we do"
          title="An AI creative and digital solutions partner."
          intro="Five connected practice areas — video, advertising, content, business systems and enablement — delivered by one studio team."
        />

        <div className="mt-14 space-y-8">
          {serviceCategories.map((service, i) => (
            <article
              key={service.slug}
              id={service.slug}
              className="group grid overflow-hidden rounded-sm border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_28px_60px_-40px_color-mix(in_oklab,var(--primary)_60%,transparent)] lg:grid-cols-2"
            >
              <div className={cn("relative overflow-hidden bg-primary", i % 2 === 1 && "lg:order-2")}>
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="h-full min-h-[240px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute left-6 top-6 font-display text-sm font-bold tracking-widest text-primary-foreground/80">
                  {service.index}
                </span>
              </div>

              <div className="p-8 sm:p-10 lg:p-12">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-secondary text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                  <service.icon className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="mt-6 text-2xl font-bold text-primary sm:text-[1.75rem]">{service.title}</h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/70">{service.description}</p>

                <ul className="mt-7 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink/75">
                      <span className="mt-2 h-1 w-4 shrink-0 bg-accent" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  to={service.to}
                  className="mt-9 inline-flex items-center gap-2 border-b border-accent/40 pb-1 text-sm font-semibold text-primary transition-colors hover:text-accent"
                >
                  Explore Service
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CreativeAdvisor compact />

      <Section tone="white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-accent">Start here</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-primary sm:text-4xl">
            Not sure what your business needs?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/70 sm:text-lg">
            Tell us the outcome you are after. We will map it to the right mix of video, advertising, content and AI
            systems.
          </p>
          <div className="mt-9 flex justify-center">
            <CtaLink to="/contact">Talk to JIMZ AI</CtaLink>
          </div>
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