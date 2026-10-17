import en from "./locales/en";

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
export type LocaleMessages = typeof en;

// A locale is exposed as supported only when its complete reviewed dictionary is registered here.
const dictionaries: Partial<Record<Locale, LocaleMessages>> = { en };
export const supportedLocales = Object.keys(dictionaries) as Locale[];
const fallbackLocale: Locale = "en";
const localeStorageKey = "jimz-language";

function findLocale(value: string | null | undefined): Locale | undefined {
  if (!value) return undefined;
  const normalized = value.replaceAll("_", "-").toLowerCase();
  const exact = localeCatalog.find((item) => item.code.toLowerCase() === normalized);
  const base = normalized.split("-")[0];
  const match = exact ?? localeCatalog.find((item) => item.code.toLowerCase() === base);
  return match && dictionaries[match.code] ? match.code : undefined;
}

export function resolveLocale(value: string | null | undefined): Locale {
  return findLocale(value) ?? fallbackLocale;
}

export function detectPreferredLocale(
  savedPreference: string | null | undefined,
  browserLanguages: readonly string[],
): Locale {
  const saved = findLocale(savedPreference);
  if (saved) return saved;

  for (const language of browserLanguages) {
    const browserMatch = findLocale(language);
    if (browserMatch) return browserMatch;
  }

  return fallbackLocale;
}

export function isLocaleSupported(locale: Locale): boolean {
  return Boolean(dictionaries[locale]);
}

export function localeDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function translate(key: keyof LocaleMessages, locale: Locale): string {
  return (dictionaries[locale] ?? en)[key] ?? en[key];
}

export function getLocaleStorageKey(): string {
  return localeStorageKey;
}