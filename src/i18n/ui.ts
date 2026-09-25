import en from "./en.ts";
import de from "./de.ts";
import ch from "./ch.ts";

export const languages = {
  en: "English",
  de: "Deutsch",
  ch: "Bärndütsch",
};

export const defaultLang = "en";

// Languages to serve content in, most preferred first, when an entry has no
// version in the requested one. Swiss German readers are better served by
// standard German than by English.
const contentFallbacks: Record<string, string[]> = {
  en: ["en"],
  de: ["de", "en"],
  ch: ["ch", "de", "en"],
};

/**
 * Picks the language an entry is shown in for `lang`, given the languages the
 * entry is written in. Undefined when none of the fallbacks exist.
 */
export function resolveContentLang(
  lang: string,
  available: Iterable<string>,
): string | undefined {
  const availableLangs = new Set(available);
  return (contentFallbacks[lang] ?? [lang, defaultLang]).find((l) =>
    availableLangs.has(l),
  );
}

export const ui = {
  en,
  de,
  ch,
} as const;
