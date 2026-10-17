import { describe, expect, test } from "bun:test";
import { detectPreferredLocale, isLocaleSupported, localeDirection, resolveLocale } from ".";

describe("language availability and preference", () => {
  test("only languages with registered translations are supported", () => {
    expect(isLocaleSupported("en")).toBe(true);
    expect(isLocaleSupported("fr")).toBe(false);
    expect(resolveLocale("fr-FR")).toBe("en");
  });

  test("saved supported preference outranks browser preference", () => {
    expect(detectPreferredLocale("en", ["fr-FR"])).toBe("en");
  });

  test("unsupported browser preferences fall back to English", () => {
    expect(detectPreferredLocale(null, ["de-DE", "ar"])).toBe("en");
  });

  test("Arabic direction is right-to-left and English is left-to-right", () => {
    expect(localeDirection("ar")).toBe("rtl");
    expect(localeDirection("en")).toBe("ltr");
  });
});