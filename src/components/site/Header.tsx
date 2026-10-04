import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { RegionSwitcher } from "./region";

const nav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex xl:gap-8">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-ink/70 hover:text-primary" }}
              className="relative py-3 text-sm font-semibold transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <RegionSwitcher className="hidden sm:block" />

          <Link
            to="/contact"
            className="hidden min-h-11 items-center rounded-sm bg-accent px-5 text-sm font-bold text-accent-foreground shadow-sm transition-[transform,box-shadow,background-color] hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-md sm:inline-flex"
          >
            Start a Project
          </Link>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm text-primary transition-colors hover:bg-secondary lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-primary-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav id="mobile-primary-navigation" aria-label="Mobile" className="mx-auto flex max-w-7xl flex-col px-5 py-3 sm:px-8">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "border-b border-border/60 py-3.5 text-base font-bold text-primary" }}
                inactiveProps={{ className: "border-b border-border/60 py-3.5 text-base font-semibold text-ink/80 transition-colors hover:text-primary" }}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 grid gap-3 sm:flex sm:items-center sm:justify-between">
              <RegionSwitcher />
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 items-center justify-center rounded-sm bg-accent px-5 text-sm font-bold text-accent-foreground transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-md"
              >
                Start a Project
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}