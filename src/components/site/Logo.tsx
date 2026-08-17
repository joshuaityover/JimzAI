import { Link } from "@tanstack/react-router";

export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const wordmark = variant === "dark" ? "text-primary-foreground" : "text-primary";
  const sub = variant === "dark" ? "text-primary-foreground/60" : "text-muted-foreground";

  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="JIMZ AI — home">
      <span
        aria-hidden
        className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-[0.95rem] font-bold text-accent-foreground"
        style={{ fontFamily: "var(--font-display)" }}
      >
        J
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rotate-45 bg-primary" />
      </span>
      <span className="leading-none">
        <span
          className={`block text-lg font-extrabold tracking-tight ${wordmark}`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          JIMZ <span className="text-accent">AI</span>
        </span>
        <span className={`mt-1 block text-[0.55rem] font-semibold tracking-[0.22em] ${sub}`}>
          AI CREATIVE &amp; DIGITAL SOLUTIONS
        </span>
      </span>
    </Link>
  );
}