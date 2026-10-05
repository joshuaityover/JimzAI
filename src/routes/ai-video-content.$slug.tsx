import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { CtaLink, Section, SectionHeading } from "@/components/site/ui";
import { getProject } from "@/lib/portfolio-data";
import { breadcrumbLd, pageHead, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/ai-video-content/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project unavailable — JIMZ AI" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    const path = `/ai-video-content/${project.slug}`;
    const head = pageHead({
      title: `${project.title}: ${project.subtitle} | JIMZ AI Concept`,
      description: project.summary,
      path,
      type: "article",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            headline: `${project.title}: ${project.subtitle}`,
            description: project.summary,
            genre: project.primaryCategory,
            url: `${SITE_URL}${path}`,
            creator: { "@type": "Organization", name: "JIMZ AI", url: SITE_URL },
            keywords: project.categories.join(", "),
          }),
        },
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "AI Video & Content", path: "/ai-video-content" },
          { name: project.title, path },
        ]),
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectPage,
});

function ProjectNotFound() {
  return (
    <Section tone="ivory">
      <h1 className="text-3xl font-bold text-primary">Project not found</h1>
      <p className="mt-4 text-ink/70">This project may have moved or been renamed.</p>
      <div className="mt-8">
        <CtaLink to="/ai-video-content" variant="outline">
          Back to portfolio
        </CtaLink>
      </div>
    </Section>
  );
}

function ProjectPage() {
  const { project } = Route.useLoaderData();

  return (
    <>
      <section className="border-b border-border bg-card py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link
            to="/ai-video-content"
            className="text-sm font-semibold text-ink/60 transition-colors hover:text-accent"
          >
            ← All projects
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <p className="eyebrow text-accent">{project.primaryCategory}</p>
            <span className="rounded-sm border border-border px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink/60">
              Concept Project
            </span>
          </div>
          <h1 className="reveal mt-4 max-w-4xl text-4xl font-bold leading-[1.05] text-primary sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-ink/70">{project.subtitle}</p>
        </div>
      </section>

      <Section tone="ivory">
        <figure className="overflow-hidden rounded-sm border border-border bg-primary">
          <div className="relative aspect-video">
            <img
              src={project.image}
              alt={project.alt}
              fetchPriority="high"
              decoding="async"
              width={1280}
              height={720}
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-sm bg-background/85 px-4 py-2 text-xs font-semibold text-primary backdrop-blur">
              <Play className="h-3.5 w-3.5 fill-current text-accent" aria-hidden />
              Final video — full cut available on request
            </span>
          </div>
        </figure>
        <figcaption className="mt-4 text-sm text-ink/60">
          Key frame from the finished concept film. Full-resolution masters are shared during a project conversation.
        </figcaption>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-10">
            <Block title="Creative objective" body={project.objective} />
            <Block title="Creative concept" body={project.creativeConcept} />
            <Block title="Target audience" body={project.audience} />

            <div>
              <h2 className="text-xl font-bold text-primary">Production approach</h2>
              <ul className="mt-5 space-y-3">
                {project.production.map((step) => (
                  <li key={step} className="flex gap-3 text-sm leading-relaxed text-ink/75">
                    <span className="mt-2 h-1 w-4 shrink-0 bg-accent" aria-hidden />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="h-fit rounded-sm border border-border bg-card p-8">
            <h2 className="text-base font-bold text-primary">Tools used</h2>
            <ul className="mt-5 space-y-2">
              {project.tools.map((tool) => (
                <li key={tool} className="border-b border-border/60 pb-2 text-sm text-ink/75">
                  {tool}
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-base font-bold text-primary">Categories</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.categories.map((c) => (
                <span
                  key={c}
                  className="rounded-sm bg-secondary px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-primary"
                >
                  {c}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow="Behind the scenes" title="How the piece was made." />
        <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
          {project.behindTheScenes.map((note, i) => (
            <div key={note} className="bg-card p-8">
              <span className="font-display text-sm font-bold tracking-widest text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-sm leading-relaxed text-ink/75">{note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="green">
        <SectionHeading
          tone="dark"
          align="center"
          title="Want something like this for your brand?"
          intro="We can adapt this approach to your product, market and channel mix."
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <CtaLink to="/contact">Start a Project</CtaLink>
          <CtaLink to="/ai-video-content" variant="ghost">
            View more projects
          </CtaLink>
        </div>
      </Section>
    </>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-primary">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-ink/75">{body}</p>
    </div>
  );
}
