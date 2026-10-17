import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  detectPreferredLocale,
  getLocaleStorageKey,
  isLocaleSupported,
  localeDirection,
  type Locale,
} from ".";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    let savedPreference: string | null = null;
    try {
      savedPreference = window.localStorage.getItem(getLocaleStorageKey());
    } catch {
      // Language detection remains available if storage is disabled.
    }
    const browserLanguages = navigator.languages.length ? navigator.languages : [navigator.language];
    setLocaleState(detectPreferredLocale(savedPreference, browserLanguages));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = localeDirection(locale);
  }, [locale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    if (!isLocaleSupported(nextLocale)) return;
    setLocaleState(nextLocale);
    try {
      window.localStorage.setItem(getLocaleStorageKey(), nextLocale);
    } catch {
      // Keep the current-session selection even if persistence is unavailable.
    }
  }, []);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}