import { Globe2 } from "lucide-react";
import { localeCatalog, supportedLocales } from "@/i18n";
import { useLocale } from "@/i18n/LocaleProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, messages } = useLocale();

  return (
    <div className={className}>
      <Select value={locale} onValueChange={(value) => setLocale(value as typeof locale)}>
        <SelectTrigger
          aria-label={messages.languageLabel}
          className="min-h-11 w-full gap-2 rounded-sm border-border bg-background px-3 text-sm font-semibold text-ink shadow-none sm:w-auto"
        >
          <Globe2 aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
          <span className="sr-only">{messages.languageLabel}</span>
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          {localeCatalog
            .filter((entry) => supportedLocales.includes(entry.code))
            .map((entry) => (
              <SelectItem key={entry.code} value={entry.code}>
                {entry.nativeName}
              </SelectItem>
            ))}
          {localeCatalog.length > supportedLocales.length && (
            <>
              <SelectLabel className="mt-1 border-t border-border pt-2 text-xs font-normal leading-5 text-muted-foreground">
                {messages.additionalLanguagesComingSoon}
              </SelectLabel>
              {localeCatalog
                .filter((entry) => !supportedLocales.includes(entry.code))
                .map((entry) => (
                  <SelectItem
                    key={entry.code}
                    value={entry.code}
                    disabled
                    textValue={`${entry.nativeName} — ${messages.notAvailableYet}`}
                  >
                    <span>{entry.nativeName}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {messages.notAvailableYet}
                    </span>
                  </SelectItem>
                ))}
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}