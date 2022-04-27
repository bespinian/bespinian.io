import { createI18n } from "vue-i18n";
import { LocaleResolver, DETECTORS, TRANSFORMERS } from "locales-detector";
import store from "store";
import messagesEn from "./locales/en.json";
import messagesDe from "./locales/de.json";
import messagesBe from "./locales/be.json";

export const LOCALE_STORAGE_KEY = "locale:bespinian";

class StoredLocaleDetector {
  getLocales() {
    return store.get(LOCALE_STORAGE_KEY) ? [store.get(LOCALE_STORAGE_KEY)] : [];
  }
}

const resolveLocale = () => {
  const transformers = [
    new TRANSFORMERS.FallbacksTransformer(),
    new TRANSFORMERS.IETFTransformer(),
    new TRANSFORMERS.InvalidLocalesTransformer(),
    new TRANSFORMERS.LanguageOnlyTransformer(),
  ];
  const urlLocales = new LocaleResolver(
    [new DETECTORS.UrlDetector("lang")],
    transformers
  );
  const storedLocales = new LocaleResolver(
    [new StoredLocaleDetector()],
    transformers
  );
  const navigatorLocales = new LocaleResolver(
    [new DETECTORS.NavigatorDetector()],
    transformers
  );
  if (urlLocales.getLocales().length > 0) {
    return urlLocales.getLocales()[0];
  }
  if (storedLocales.getLocales().length > 0) {
    return storedLocales.getLocales()[0];
  }
  return navigatorLocales.getLocales()[0];
};

const i18n = createI18n({
  locale: resolveLocale(),
  fallbackLocale: "en",
  messages: {
    en: messagesEn,
    de: messagesDe,
    be: messagesBe,
  },
});

export default i18n;
