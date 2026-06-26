import { ui, defaultLang } from "./ui";

function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang && lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    // Always add language prefix
    return `/${l}${path}`;
  };
}

// The "ch" route key represents Swiss German content, but "ch" itself is not
// a valid BCP47 language tag (it resolves to Chamorro) and would make screen
// readers mispronounce the page. Map it to a valid tag for the `lang` attribute.
function getHtmlLang(lang: keyof typeof ui): string {
  return lang === "ch" ? "de-CH" : lang;
}

export function useI18n(url: URL) {
  const lang = getLangFromUrl(url);
  return {
    lang,
    htmlLang: getHtmlLang(lang),
    t: useTranslations(lang),
    translatePath: useTranslatedPath(lang),
  };
}
