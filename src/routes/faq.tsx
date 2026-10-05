import { createFileRoute } from "@tanstack/react-router";
import { faqs } from "@/lib/site-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaLink, PageHero, Section, SectionHeading } from "@/components/site/ui";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () => ({
    ...pageHead({
      title: "AI Video & Content FAQ | JIMZ AI",
      description:
        "Answers about JIMZ AI video production, brand safety, timelines, worldwide delivery and pricing.",
      path: "/faq",
    }),
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