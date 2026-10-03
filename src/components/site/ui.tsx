import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  tone = "ivory",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "ivory" | "white" | "green";
  id?: string;
}) {
  const tones = {
    ivory: "bg-background text-foreground",
    white: "bg-card text-foreground",
    green: "bg-primary text-primary-foreground",
  } as const;

  return (
    <section id={id} className={cn("py-16 sm:py-24 lg:py-28", tones[tone], className)}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className={cn("eyebrow", tone === "dark" ? "text-accent" : "text-accent")}>{eyebrow}</p>
      )}
      <h2
        className={cn(
          "mt-4 text-[2rem] font-bold leading-[1.08] sm:text-4xl lg:text-[2.85rem]",
          tone === "dark" ? "text-primary-foreground" : "text-primary",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-7 sm:text-lg",
            tone === "dark" ? "text-primary-foreground/75" : "text-ink/70",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

export function CtaLink({
  to,
  children,
  variant = "primary",
}: {
  to: "/" | "/services" | "/work" | "/about" | "/pricing" | "/contact" | "/process" | "/faq" | "/ai-video-content";
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
}) {
  const styles = {
    primary:
      "bg-accent text-accent-foreground hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-12px_color-mix(in_oklab,var(--accent)_70%,transparent)]",
    outline: "border border-primary/25 text-primary hover:border-primary/60",
    ghost: "border border-primary-foreground/25 text-primary-foreground hover:border-accent hover:text-accent",
  } as const;

  return (
    <Link
      to={to}
      className={cn(
        "inline-flex min-h-12 items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold transition-[background-color,border-color,color,box-shadow,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px",
        styles[variant],
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="signal-rule relative overflow-hidden border-b border-border bg-card py-14 sm:py-20 lg:py-24">
      <div className="signal-grid pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-70" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <p className="eyebrow text-accent">{eyebrow}</p>
        <h1 className="reveal mt-5 max-w-4xl text-[2.5rem] font-bold leading-[1.04] text-primary sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-ink/70 sm:text-lg">{intro}</p>
      </div>
    </section>
  );
}