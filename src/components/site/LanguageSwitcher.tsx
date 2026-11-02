import { ChevronDown, Globe2 } from "lucide-react";
import { localeCatalog, supportedLocales } from "@/i18n";
import { useLocale } from "@/i18n/LocaleProvider";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, messages } = useLocale();

  return (
    <div className={`relative ${className}`}>
      <label className="sr-only" htmlFor="jimz-language-select">
        {messages.languageLabel}
      </label>
      <Globe2 aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-primary" />
      <select
        id="jimz-language-select"
        aria-label={messages.languageLabel}
        value={locale}
        onChange={(event) => setLocale(event.target.value as typeof locale)}
        className="min-h-11 w-full appearance-none rounded-sm border border-border bg-background py-2 pl-9 pr-9 text-sm font-semibold text-ink outline-none transition-colors hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
      >
        <optgroup label={messages.languageLabel}>
          {localeCatalog
            .filter((entry) => supportedLocales.includes(entry.code))
            .map((entry) => (
              <option key={entry.code} value={entry.code}>
                {entry.nativeName}
              </option>
            ))}
        </optgroup>
        <optgroup label={messages.additionalLanguagesComingSoon}>
          {localeCatalog
            .filter((entry) => !supportedLocales.includes(entry.code))
            .map((entry) => (
              <option key={entry.code} value={entry.code} disabled>
                {entry.nativeName} — {messages.notAvailableYet}
              </option>
            ))}
        </optgroup>
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}