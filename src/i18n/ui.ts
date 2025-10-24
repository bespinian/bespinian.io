import en from "./en.ts";
import de from "./de.ts";
import ch from "./ch.ts";

export const languages = {
  en: "English",
  de: "Deutsch",
  ch: "Bärndütsch",
};

export const defaultLang = "en";

export const ui = {
  en,
  de,
  ch,
} as const;
