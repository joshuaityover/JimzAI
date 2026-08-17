import { createFileRoute } from "@tanstack/react-router";
import founder from "@/assets/joshua-mishi.jpg";
import { CtaLink, PageHero, Section, SectionHeading } from "@/components/site/ui";
import { differentiators } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About JIMZ AI — An AI Creative Company" },
      {
        name: "description",
        content:
          "JIMZ AI is an international AI creative and digital solutions company founded by Joshua Ityover Mishi, helping brands create faster with artificial intelligence.",
      },
      { property: "og:title", content: "About JIMZ AI — An AI Creative Company" },
      {
        property: "og:description",
        content: "The story, philosophy and standards behind JIMZ AI.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="An independent AI creative company, built for a global market."
        intro="JIMZ AI exists to give ambitious brands access to world-class creative output at the speed artificial intelligence now makes possible."
      />

      <Section tone="ivory">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="Named for its founder. Built as a company."
              intro="JIMZ is derived from the name of our founder, Joshua Ityover Mishi. What began as a personal pursuit of AI-assisted craft is now a structured studio with a repeatable production process, clear service lines and a roadmap that extends across the wider AI landscape."
            />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/70">
              We work the way modern technology companies work: strategy first, tooling second,
              measurable outcomes always. Our flagship discipline is AI video and content
              production, and our long-term ambition is to help organisations apply AI across
              their creative, marketing and operational workflows.
            </p>
          </div>

          <figure className="overflow-hidden rounded-sm border border-border bg-card">
            <img
              src={founder}
              alt="Joshua Ityover Mishi, founder of JIMZ AI"
              loading="lazy"
              width={1352}
              height={1920}
              className="h-full w-full object-cover"
            />
            <figcaption className="border-t border-border px-6 py-5">
              <p className="text-sm font-semibold text-primary">Joshua Ityover Mishi</p>
              <p className="text-xs text-muted-foreground">Founder & Creative Director</p>
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow="How we work" title="Standards we hold on every engagement." />
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item) => (
            <article key={item.title} className="bg-card p-8">
              <item.icon className="h-6 w-6 text-accent" aria-hidden />
              <h3 className="mt-5 text-lg font-bold text-primary">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="green">
        <SectionHeading
          tone="dark"
          align="center"
          title="Let's build something worth watching."
        />
        <div className="mt-10 flex justify-center gap-3">
          <CtaLink to="/contact">Start a Project</CtaLink>
          <CtaLink to="/work" variant="ghost">
            Explore Our Work
          </CtaLink>
        </div>
      </Section>
    </>
  );
}