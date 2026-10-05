import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import founder from "@/assets/joshua-mishi.jpg";
import aboutHero from "@/assets/about-hero.jpg";
import { CtaLink, Section, SectionHeading } from "@/components/site/ui";
import {
  Cpu,
  Brain,
  RefreshCw,
  LayoutGrid,
  PenTool,
  TrendingUp,
  Users,
  Lightbulb,
  Quote,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    ...pageHead({
      title: "About JIMZ AI | Founder & Company Story",
      description:
        "Meet JIMZ AI, an international AI creative and digital solutions company founded by Joshua Ityover Mishi to turn AI into practical business results.",
      path: "/about",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About JIMZ AI",
          description:
            "JIMZ AI is an AI creative and digital solutions company founded by Joshua Ityover Mishi.",
          url: "https://jimzai.lovable.app/about",
          mainEntity: {
            "@type": "Organization",
            name: "JIMZ AI",
            founder: {
              "@type": "Person",
              name: "Joshua Ityover Mishi",
              jobTitle: "Founder & CEO",
            },
          },
        }),
      },
    ],
  }),
  component: AboutPage,
});

const expertise = [
  { title: "Technology", icon: Cpu },
  { title: "Artificial Intelligence", icon: Brain },
  { title: "Digital Transformation", icon: RefreshCw },
  { title: "Product Management", icon: LayoutGrid },
  { title: "Content Creation", icon: PenTool },
  { title: "Digital Marketing", icon: TrendingUp },
  { title: "Training & Capacity Building", icon: Users },
  { title: "Business Innovation", icon: Lightbulb },
];

const timeline = [
  {
    year: "2024",
    title: "JIMZ AI Founded",
    body:
      "Joshua Ityover Mishi established JIMZ AI to help businesses turn AI potential into practical creative and digital solutions.",
  },
  {
    year: "Milestone",
    title: "Next professional milestone",
    body: "A key career or company milestone will be added here as the journey unfolds.",
  },
  {
    year: "Milestone",
    title: "Future milestone",
    body: "This timeline is reserved for upcoming achievements, partnerships and product launches.",
  },
  {
    year: "Next chapter",
    title: "The story continues",
    body: "The next chapter of JIMZ AI is being written with every project we create.",
  },
];

function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20 sm:py-28 lg:py-32">
        <img
          src={aboutHero}
          alt="Abstract deep green technology texture behind the About JIMZ AI introduction"
          loading="eager"
          width={1536}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <p className="eyebrow text-accent">About</p>
          <h1 className="reveal mt-5 max-w-4xl text-4xl font-bold leading-[1.05] text-primary-foreground sm:text-5xl lg:text-6xl">
            Built by a Creator. Driven by Technology.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
            JIMZ AI is an AI-powered creative and digital solutions company. We help ambitious
            brands create faster, market smarter and grow by combining human creativity with
            advanced artificial intelligence.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CtaLink to="/contact">Work With JIMZ AI</CtaLink>
            <CtaLink to="/services" variant="ghost">
              Explore Services
            </CtaLink>
          </div>
        </div>
      </section>

      {/* Company introduction */}
      <Section tone="ivory">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="An independent technology company, not a solo freelancer."
              intro="JIMZ AI was built to operate like the modern creative and technology companies it serves: structured, scalable and focused on measurable outcomes."
            />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-ink/70">
              <p>
                Our flagship work is AI video and content production, but our ambition extends
                across the wider AI landscape — advertising, business automation, consulting and
                training.
              </p>
              <p>
                We believe AI is most valuable when it is directed by clear strategy, strong
                creative judgement and a deep understanding of business goals. That is the standard
                we bring to every engagement.
              </p>
            </div>
          </div>
          <div className="rounded-sm border border-border bg-card p-8 sm:p-10">
            <p className="eyebrow text-accent">Our promise</p>
            <blockquote className="mt-4 text-2xl font-semibold leading-snug text-primary sm:text-3xl">
              “Technology becomes truly valuable when it can be turned into something people and
              businesses can actually use.”
            </blockquote>
            <p className="mt-5 text-sm font-semibold text-ink">— Joshua Ityover Mishi</p>
            <p className="text-xs text-muted-foreground">Founder & CEO, JIMZ AI</p>
          </div>
        </div>
      </Section>

      {/* Founder profile */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <figure className="overflow-hidden rounded-sm border border-border bg-card">
            <img
              src={founder}
              alt="Joshua Ityover Mishi, Founder & CEO of JIMZ AI"
              loading="lazy"
              width={1352}
              height={1920}
              className="aspect-[4/5] w-full object-cover sm:aspect-auto sm:h-full"
            />
            <figcaption className="border-t border-border px-6 py-5">
              <p className="text-sm font-semibold text-primary">Joshua Ityover Mishi</p>
              <p className="text-xs text-muted-foreground">Founder & CEO, JIMZ AI</p>
            </figcaption>
          </figure>

          <div>
            <SectionHeading
              eyebrow="Founder"
              title="Joshua Ityover Mishi"
              intro="Technology professional, digital creator, entrepreneur and trainer."
            />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-ink/70">
              <p>
                Joshua Ityover Mishi is a technology professional, digital creator, entrepreneur
                and trainer passionate about using technology and artificial intelligence to create
                opportunities and solve real-world business problems.
              </p>
              <p>
                With a background in Computer Science and experience across technology, digital
                transformation, product management, training and content creation, Joshua founded JIMZ
                AI to help businesses take advantage of the rapidly evolving possibilities of
                artificial intelligence.
              </p>
              <p>
                His work sits at the intersection of technology, creativity, business and human
                impact.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Experience & Expertise */}
      <Section tone="ivory">
        <SectionHeading
          eyebrow="Experience & Expertise"
          title="A multidisciplinary foundation for AI-driven work."
          align="center"
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {expertise.map((item) => (
            <article
              key={item.title}
              className="group bg-card p-8 transition-colors hover:bg-background"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <item.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-5 text-base font-bold text-primary">{item.title}</h3>
            </article>
          ))}
        </div>
      </Section>

      {/* Why I built JIMZ AI */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Why I built JIMZ AI"
              title="From conversation to action."
              intro="AI is changing how businesses create, communicate and operate. JIMZ AI was created to help businesses move from simply talking about AI to actually using it."
            />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-ink/70">
              <p>
                Too many organisations see AI as a future possibility rather than a present tool. We
                exist to close that gap — translating complex technology into practical creative
                and business outcomes.
              </p>
              <p>
                Every project is an opportunity to prove that AI, when guided by strategy and
                craft, can deliver work that is faster, sharper and more scalable — without losing
                the human touch.
              </p>
            </div>
          </div>

          <div className="relative rounded-sm border border-border bg-card p-8 sm:p-10">
            <Quote
              className="absolute right-6 top-6 h-10 w-10 text-accent/20"
              aria-hidden
            />
            <p className="relative text-xl font-medium leading-relaxed text-primary sm:text-2xl">
              “Technology becomes truly valuable when it can be turned into something people and
              businesses can actually use.”
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-full border border-border">
                <img
                  src={founder}
                  alt=""
                  loading="lazy"
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">Joshua Ityover Mishi</p>
                <p className="text-xs text-muted-foreground">Founder & CEO, JIMZ AI</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section tone="ivory">
        <SectionHeading
          eyebrow="Journey"
          title="A timeline of milestones."
          intro="The path behind and ahead of JIMZ AI — built to be expanded as the company grows."
        />
        <ol className="relative mt-12 space-y-0 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border md:before:left-1/2 md:before:-translate-x-1/2">
          {timeline.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <li key={item.title + index} className="relative md:flex md:items-center md:odd:flex-row-reverse">
                <div className="md:w-1/2 md:px-12" />
                <span
                  className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-accent md:left-1/2 md:-translate-x-1/2"
                  aria-hidden
                />
                <div
                  className={`pl-10 md:w-1/2 md:px-12 ${
                    isLeft ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <p className="eyebrow text-accent">{item.year}</p>
                  <h3 className="mt-2 text-lg font-bold text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* CTA */}
      <Section tone="green">
        <SectionHeading
          tone="dark"
          align="center"
          title="Work With JIMZ AI"
          intro="Bring your next creative or technology challenge to a team built to solve it with AI."
        />
        <div className="mt-10 flex justify-center gap-3">
          <CtaLink to="/contact">Start a Project</CtaLink>
          <CtaLink to="/work" variant="ghost">
            View Our Work
          </CtaLink>
        </div>
      </Section>
    </>
  );
}
