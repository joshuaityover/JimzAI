import { createFileRoute } from "@tanstack/react-router";
import { faqs } from "@/lib/site-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaLink, PageHero, Section, SectionHeading } from "@/components/site/ui";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — JIMZ AI" },
      {
        name: "description",
        content:
          "Answers about AI video production, brand safety, timelines, international delivery and pricing at JIMZ AI.",
      },
      { property: "og:title", content: "Frequently Asked Questions — JIMZ AI" },
      {
        property: "og:description",
        content: "Common questions about working with JIMZ AI on AI creative and digital projects.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/faq" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered plainly."
        intro="If something isn't covered here, send us a note and we'll respond personally."
      />

      <Section tone="ivory">
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-ink/70">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <Section tone="green">
        <SectionHeading tone="dark" align="center" title="Still deciding? Let's talk it through." />
        <div className="mt-10 flex justify-center">
          <CtaLink to="/contact">Start a Project</CtaLink>
        </div>
      </Section>
    </>
  );
}