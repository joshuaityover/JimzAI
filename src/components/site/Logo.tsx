import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/jimz-ai-logo.png.asset.json";

export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  return (
    <Link to="/" className="inline-flex items-center" aria-label="JIMZ AI — home">
      <img
        src={logoAsset.url}
        alt="JIMZ AI — AI Creative & Digital Solutions"
        width={1920}
        height={628}
        className={
          variant === "dark"
            ? "h-11 w-auto rounded-sm bg-card p-1.5 sm:h-12"
            : "h-10 w-auto sm:h-11"
        }
      />
    </Link>
  );
}