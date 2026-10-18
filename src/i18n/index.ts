import enMessages from "./locales/en";

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
export type LocaleMessages = typeof enMessages;
export const localeStorageKey = "jimz-language";
export const fallbackLocale: Locale = "en";

// Add a locale here only when every public-facing page has complete, reviewed translations.
const completeDictionaries: Partial<Record<Locale, LocaleMessages>> = { en: enMessages };
export const supportedLocales = Object.keys(completeDictionaries) as Locale[];

export function isLocaleSupported(locale: Locale): boolean {
  return completeDictionaries[locale] !== undefined;
}

export function matchSupportedLocale(value: string | null | undefined): Locale | undefined {
  if (!value) return undefined;
  const normalized = value.replaceAll("_", "-").toLowerCase();
  const exact = localeCatalog.find((item) => item.code.toLowerCase() === normalized);
  const baseLanguage = normalized.split("-")[0];
  const match = exact ?? localeCatalog.find((item) => item.code.toLowerCase() === baseLanguage);
  return match && isLocaleSupported(match.code) ? match.code : undefined;
}

export function detectPreferredLocale(
  savedPreference: string | null | undefined,
  browserLanguages: readonly string[],
): Locale {
  const saved = matchSupportedLocale(savedPreference);
  if (saved) return saved;

  for (const browserLanguage of browserLanguages) {
    const browserMatch = matchSupportedLocale(browserLanguage);
    if (browserMatch) return browserMatch;
  }

  return fallbackLocale;
}

export function localeDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getMessages(locale: Locale): LocaleMessages {
  return completeDictionaries[locale] ?? enMessages;
}