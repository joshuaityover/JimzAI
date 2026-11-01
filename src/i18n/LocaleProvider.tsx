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
  getMessages,
  isLocaleSupported,
  localeDirection,
  localeStorageKey,
  type Locale,
  type LocaleMessages,
} from ".";

type LocaleContextValue = {
  locale: Locale;
  messages: LocaleMessages;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  messages: getMessages("en"),
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    let savedPreference: string | null = null;
    try {
      savedPreference = window.localStorage.getItem(localeStorageKey);
    } catch {
      // Keep the site usable when browser storage is disabled.
    }
    const browserLanguages = navigator.languages.length
      ? navigator.languages
      : [navigator.language];
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
      window.localStorage.setItem(localeStorageKey, nextLocale);
    } catch {
      // Preserve the selected locale for the current session.
    }
  }, []);

  const value = useMemo(
    () => ({ locale, messages: getMessages(locale), setLocale }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}