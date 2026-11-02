import assert from "node:assert/strict";
import {
  detectPreferredLocale,
  isLocaleSupported,
  localeDirection,
  matchSupportedLocale,
} from "../src/i18n/index.ts";

assert.equal(isLocaleSupported("en"), true);
assert.equal(isLocaleSupported("fr"), false);
assert.equal(matchSupportedLocale("fr-FR"), undefined);
assert.equal(detectPreferredLocale("en", ["fr-FR"]), "en");
assert.equal(detectPreferredLocale(null, ["fr-FR", "de-DE"]), "en");
assert.equal(detectPreferredLocale(null, ["en-GB"]), "en");
assert.equal(localeDirection("ar"), "rtl");
assert.equal(localeDirection("en"), "ltr");