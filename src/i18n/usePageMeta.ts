import { useEffect } from "react";
import { useLocale } from "./LocaleProvider";

/**
 * Pages are server-rendered with English metadata (the canonical language).
 * When a visitor browses in another locale, the visible document title and
 * description are localized on the client without touching the shared head.
 */
export function useLocalizedMeta(title: string, description: string) {
  const { locale } = useLocale();
  useEffect(() => {
    if (locale === "en") return;
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
  }, [locale, title, description]);
}
