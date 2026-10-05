import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-abstract.jpg";
import { CtaLink, Section, SectionHeading } from "@/components/site/ui";
import { differentiators, processSteps, services } from "@/lib/site-data";
import { workItems } from "@/components/site/work-data";
import { CreativeAdvisor } from "@/components/site/CreativeAdvisor";
import { pageHead, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead({
      title: "JIMZ AI | AI Creative & Digital Solutions",
      description:
        "JIMZ AI helps businesses create AI-powered video content, advertising, digital experiences and intelligent business solutions.",
      path: "/",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: "JIMZ AI",
              url: SITE_URL,
              logo: `${SITE_URL}/favicon.png`,
              slogan: "AI Creative & Digital Solutions",
              description:
                "International AI creative and digital solutions company providing AI video production, AI UGC, AI advertising, AI automation, consulting and training.",
              founder: { "@type": "Person", name: "Joshua Ityover Mishi" },
              email: "hello@jimzai.com",
              areaServed: "Worldwide",
              knowsAbout: [
                "AI Video Production",
                "AI UGC",
                "AI Advertising",
                "AI Spokesperson Videos",
                "AI Product Content",
                "AI Social Media Content",
                "AI Automation",
                "AI Consulting",
                "AI Training",
              ],
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: SITE_URL,
              name: "JIMZ AI",
              publisher: { "@id": `${SITE_URL}/#organization` },
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Intro />
      <ServiceCategories />
      <CreativeAdvisor />
      <SelectedWork />
      <WhyJimz />
      <ProcessTeaser />
      <PricingTeaser />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div className="reveal">
          <p className="eyebrow text-accent">AI Creative &amp; Digital Solutions</p>
          <h1 className="mt-6 text-[2.75rem] font-bold leading-[1.02] text-primary sm:text-6xl lg:text-[4.25rem]">
            Create Without <span className="text-accent">Limits.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/70">
            AI-powered content and digital solutions designed to help ambitious brands create
            faster, market smarter and grow.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CtaLink to="/contact">Start a Project</CtaLink>
            <CtaLink to="/work" variant="outline">
              Explore Our Work
            </CtaLink>
          </div>
        </div>

        <div className="relative">
          <img
            src={heroImage}
            alt="Abstract green and orange light forms representing AI-generated creative work"
            width={1600}
            height={1200}
            fetchPriority="high"
            className="aspect-[4/3] w-full rounded-sm object-cover"
          />
          <div className="absolute -bottom-6 left-4 hidden w-64 rounded-sm border border-border bg-background p-5 shadow-lift sm:block">
            <p className="eyebrow text-accent">Now producing</p>
            <p className="mt-2 text-sm font-semibold text-primary">
              AI video, UGC ads and product content
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <Section tone="ivory">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <h2 className="text-2xl font-bold uppercase leading-[1.15] tracking-tight text-primary sm:text-[2.1rem]">
          AI that creates. Technology that moves business.
        </h2>
        <div className="space-y-5 text-base leading-relaxed text-ink/70">
          <p>
            JIMZ AI is an AI creative and digital solutions company. We help businesses use
            artificial intelligence to produce content, sharpen digital experiences and automate the
            work that slows teams down.
          </p>
          <p>
            Our flagship discipline is AI-generated content and video production — and our
            capability continues to expand across the wider AI landscape.
          </p>
          <Link to="/about" className="inline-block text-sm font-semibold text-accent hover:underline">
            More about the company
          </Link>
        </div>
      </div>
    </Section>
  );
}

function ServiceCategories() {
  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="What we do"
        title="Creative and technical services, delivered as one studio."
      />
      <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article key={service.slug} className="group bg-card p-8 transition-colors hover:bg-background">
            <service.icon className="h-7 w-7 text-accent" aria-hidden />
            <h3 className="mt-6 text-lg font-bold text-primary">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{service.summary}</p>
          </article>
        ))}
      </div>
      <div className="mt-10">
        <CtaLink to="/services" variant="outline">
          All Services
        </CtaLink>
      </div>
    </Section>
  );
}

function SelectedWork() {
  return (
    <Section tone="ivory">
      <SectionHeading eyebrow="Selected work" title="Studio pieces from our production pipeline." />
      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        {workItems.map((item) => (
          <article key={item.title} className="group overflow-hidden rounded-sm border border-border bg-card">
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                width={1280}
                height={800}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-7">
              <p className="eyebrow text-muted-foreground">{item.category}</p>
              <h3 className="mt-3 text-xl font-bold text-primary">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{item.body}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10">
        <CtaLink to="/work" variant="outline">
          Explore Our Work
        </CtaLink>
      </div>
    </Section>
  );
}

function WhyJimz() {
  return (
    <Section tone="green">
      <SectionHeading tone="dark" eyebrow="Why JIMZ AI?" title="Craft, speed and commercial focus." />
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {differentiators.map((item) => (
          <article key={item.title} className="border-t border-primary-foreground/20 pt-6">
            <item.icon className="h-6 w-6 text-accent" aria-hidden />
            <h3 className="mt-5 text-lg font-bold text-primary-foreground">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">{item.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ProcessTeaser() {
  return (
    <Section tone="white">
      <SectionHeading eyebrow="Process" title="Five stages, from first brief to final delivery." />
      <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {processSteps.map((step) => (
          <li key={step.number} className="border-t border-border pt-6">
            <span className="text-sm font-bold text-accent">{step.number}</span>
            <h3 className="mt-3 text-base font-bold text-primary">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{step.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10">
        <CtaLink to="/process" variant="outline">
          See the full process
        </CtaLink>
      </div>
    </Section>
  );
}

function PricingTeaser() {
  return (
    <Section tone="ivory">
      <div className="flex flex-col gap-8 rounded-sm border border-border bg-card p-10 sm:p-14 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="eyebrow text-accent">Pricing</p>
          <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">
            Choose the creative support your brand needs.
          </h2>
          <p className="mt-4 text-base text-ink/70">
            Single projects, monthly content retainers or scoped enterprise engagements.
          </p>
        </div>
        <CtaLink to="/pricing">View Pricing</CtaLink>
      </div>
    </Section>
  );
}

function FinalCta() {
  return (
    <Section tone="green">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold leading-[1.1] text-primary-foreground sm:text-5xl">
          Your next idea could be created with AI.
        </h2>
        <p className="mt-4 text-3xl font-bold text-accent sm:text-5xl">Let&apos;s build it.</p>
        <div className="mt-10 flex justify-center">
          <CtaLink to="/contact">Start a Project</CtaLink>
        </div>
      </div>
    </Section>
  );
}
