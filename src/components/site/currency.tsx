import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Currency = "USD" | "NGN";

const CurrencyContext = createContext<{
  currency: Currency;
  setCurrency: (c: Currency) => void;
}>({ currency: "USD", setCurrency: () => {} });

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    const saved = window.localStorage.getItem("jimz-currency");
    if (saved === "USD" || saved === "NGN") {
      setCurrency(saved);
      return;
    }
    try {
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
      if (zone === "Africa/Lagos") setCurrency("NGN");
    } catch {
      /* region detection unavailable */
    }
  }, []);

  const value = useMemo(
    () => ({
      currency,
      setCurrency: (c: Currency) => {
        setCurrency(c);
        window.localStorage.setItem("jimz-currency", c);
      },
    }),
    [currency],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  return useContext(CurrencyContext);
}