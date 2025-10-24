import { ui, defaultLang } from "./ui";

function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
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

export function useI18n(url: URL) {
  const lang = getLangFromUrl(url);
  return {
    lang,
    t: useTranslations(lang),
    translatePath: useTranslatedPath(lang),
  };
}
