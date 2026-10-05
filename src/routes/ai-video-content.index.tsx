import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { CtaLink, PageHero, Section, SectionHeading } from "@/components/site/ui";
import { portfolioCategories, projects, type PortfolioCategory } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { pageHead, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/ai-video-content/")({
  head: () => ({
    ...pageHead({
      title: "AI Video & Content Portfolio | JIMZ AI",
      description:
        "Concept AI video projects by JIMZ AI: UGC ads, commercials, spokesperson videos, product ads, social content and faceless video for global brands.",
      path: "/ai-video-content",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "AI Video & Content Portfolio",
          url: `${SITE_URL}/ai-video-content`,
          hasPart: projects.map((p) => ({
            "@type": "CreativeWork",
            name: p.title,
            url: `${SITE_URL}/ai-video-content/${p.slug}`,
          })),
        }),
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [filter, setFilter] = useState<PortfolioCategory>("ALL");

  const visible = useMemo(
    () => (filter === "ALL" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  );

  return (
    <>
      <PageHero
        eyebrow="AI Video & Content"
        title="Commercial video, produced with generative AI."
        intro="A portfolio of concept films showing how JIMZ AI directs, generates and finishes advertising-grade video for international brands."
      />

      <Section tone="ivory">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected concept projects."
          intro="Every piece below is a self-initiated studio concept created to demonstrate craft and range — not commissioned client work."
        />

        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="mt-10 flex flex-wrap gap-2 border-b border-border pb-6"
        >
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={filter === cat}
              onClick={() => setFilter(cat)}
            className={cn(
                "min-h-11 rounded-sm border px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] transition-[background-color,border-color,color,transform] duration-300",
                filter === cat
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-ink/60 hover:border-primary/40 hover:text-primary",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {visible.map((project) => (
            <article
              key={project.slug}
                className="surface-hover group overflow-hidden rounded-sm border border-border bg-card"
            >
              <Link
                to="/ai-video-content/$slug"
                params={{ slug: project.slug }}
                className="relative block aspect-video overflow-hidden bg-primary"
              >
                <img
                  src={project.image}
                  alt={project.alt}
                  loading="lazy"
                  decoding="async"
                  width={1280}
                  height={720}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <span className="absolute left-4 top-4 rounded-sm bg-background/85 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-primary backdrop-blur">
                  Concept Project
                </span>
                <span className="absolute bottom-4 right-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Play className="h-4 w-4 fill-current" aria-hidden />
                </span>
              </Link>

              <div className="p-7 sm:p-8">
                <p className="eyebrow text-accent">{project.primaryCategory}</p>
                <h3 className="mt-3 text-xl font-bold text-primary sm:text-2xl">{project.title}</h3>
                <p className="mt-1 text-sm font-medium text-ink/60">{project.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">{project.summary}</p>
                <Link
                  to="/ai-video-content/$slug"
                  params={{ slug: project.slug }}
                  className="mt-6 inline-flex items-center gap-2 border-b border-accent/40 pb-1 text-sm font-semibold text-primary transition-colors hover:text-accent"
                >
                  View Project
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

      <Section tone="green">
        <SectionHeading
          tone="dark"
          align="center"
          title="Want something like this for your brand?"
          intro="Send the brief. We will come back with a creative direction and a production plan."
        />
        <div className="mt-10 flex justify-center">
          <CtaLink to="/contact">Start a Project</CtaLink>
        </div>
      </Section>
    </>
  );
}
