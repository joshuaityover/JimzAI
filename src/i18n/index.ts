export const localeCatalog = [
  { code: "en", nativeName: "English" },
  { code: "fr", nativeName: "Français" },
  { code: "es", nativeName: "Español" },
  { code: "pt", nativeName: "Português" },
  { code: "de", nativeName: "Deutsch" },
  { code: "ar", nativeName: "العربية" },
  { code: "zh-CN", nativeName: "中文" },
  { code: "hi", nativeName: "हिन्दी" },
  { code: "sw", nativeName: "Kiswahili" },
  { code: "ha", nativeName: "Hausa" },
  { code: "yo", nativeName: "Yorùbá" },
  { code: "ig", nativeName: "Igbo" },
] as const;

export type Locale = (typeof localeCatalog)[number]["code"];
export const localeStorageKey = "jimz-language";
export const fallbackLocale: Locale = "en";

// Only add a locale here after all public-facing content has complete, reviewed translations.
const completeLocaleDictionaries: Partial<Record<Locale, true>> = { en: true };

export function isLocaleSupported(locale: Locale): boolean {
  return completeLocaleDictionaries[locale] === true;
}

export function matchSupportedLocale(value: string | null | undefined): Locale | undefined {
  if (!value) return undefined;
  const normalized = value.replaceAll("_", "-").toLowerCase();
  const exact = localeCatalog.find((item) => item.code.toLowerCase() === normalized);
  const language = normalized.split("-")[0];
  const match = exact ?? localeCatalog.find((item) => item.code.toLowerCase() === language);
  return match && isLocaleSupported(match.code) ? match.code : undefined;
}

export function detectPreferredLocale(
  savedPreference: string | null | undefined,
  browserLanguages: readonly string[],
): Locale {
  const saved = matchSupportedLocale(savedPreference);
  if (saved) return saved;

  for (const browserLanguage of browserLanguages) {
    const match = matchSupportedLocale(browserLanguage);
    if (match) return match;
  }

  return fallbackLocale;
}

export function localeDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}