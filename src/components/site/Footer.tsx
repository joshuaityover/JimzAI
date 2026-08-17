import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Process", to: "/process" },
      { label: "Work", to: "/work" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "All Services", to: "/services" },
      { label: "AI Video & Content", to: "/ai-video-content" },
      { label: "Pricing", to: "/pricing" },
      { label: "Contact", to: "/contact" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo variant="dark" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              An AI creative and digital solutions company helping ambitious brands create faster,
              market smarter and grow.
            </p>
            <a
              href="mailto:hello@jimzai.com"
              className="mt-6 inline-block text-sm font-semibold text-accent underline-offset-4 hover:underline"
            >
              hello@jimzai.com
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="eyebrow text-primary-foreground/50">{col.title}</h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-primary-foreground/80 transition-colors hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-primary-foreground/15 pt-8 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} JIMZ AI. All rights reserved.</p>
          <ul className="flex gap-6">
            <li>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer noopener" className="hover:text-accent">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer noopener" className="hover:text-accent">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer noopener" className="hover:text-accent">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}