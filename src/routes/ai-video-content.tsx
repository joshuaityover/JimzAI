import { createFileRoute } from "@tanstack/react-router";
import { CtaLink, PageHero, Section, SectionHeading } from "@/components/site/ui";
import { workItems } from "@/components/site/work-data";

export const Route = createFileRoute("/ai-video-content")({
  head: () => ({
    meta: [
      { title: "AI Video & Content Production — JIMZ AI" },
      {
        name: "description",
        content:
          "Our flagship discipline: AI video production and content systems covering ads, spokesperson videos, product films and social content.",
      },
      { property: "og:title", content: "AI Video & Content Production — JIMZ AI" },
      {
        property: "og:description",
        content: "How JIMZ AI produces cinematic AI video and always-on content for brands.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/ai-video-content" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/ai-video-content" }],
  }),
  component: AiVideoPage,
});

const formats = [
  { title: "Brand & campaign films", body: "Cinematic 30–90 second pieces for launches and brand positioning." },
  { title: "Paid social ad sets", body: "Multiple hooks, edits and aspect ratios engineered for testing." },
  { title: "Spokesperson explainers", body: "Consistent presenters for product, onboarding and support content." },
  { title: "Product films & loops", body: "Studio-grade product visuals without a physical shoot." },
  { title: "Short-form social", body: "Vertical content built for reach, retention and repetition." },
  { title: "Localised versions", body: "Multilingual variants for international market rollouts." },
];

function AiVideoPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Video & Content"
        title="Cinematic AI production, at commercial speed."
        intro="Our flagship service. We direct, generate, edit and finish video and content assets that hold up next to traditional production."
      />

      <Section tone="ivory">
        <SectionHeading
          eyebrow="Formats"
          title="One creative direction, every format you need."
          intro="We build a single strong idea, then version it across the channels where your audience actually spends time."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {formats.map((f) => (
            <article key={f.title} className="bg-card p-8">
              <h3 className="text-base font-bold text-primary">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{f.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow="In production" title="Frames from recent studio pieces." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {workItems.slice(0, 4).map((item) => (
            <figure key={item.title} className="overflow-hidden rounded-sm border border-border">
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                width={1280}
                height={800}
                className="aspect-[16/10] w-full object-cover"
              />
              <figcaption className="bg-card px-6 py-4 text-sm font-semibold text-primary">
                {item.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section tone="green">
        <SectionHeading
          tone="dark"
          align="center"
          title="Ready to put AI video to work?"
          intro="Send us the brief and we'll show you what's possible."
        />
        <div className="mt-10 flex justify-center gap-3">
          <CtaLink to="/contact">Start a Project</CtaLink>
          <CtaLink to="/pricing" variant="ghost">
            View Pricing
          </CtaLink>
        </div>
      </Section>
    </>
  );
}