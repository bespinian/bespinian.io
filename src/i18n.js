import Vue from "vue";
import VueI18n from "vue-i18n";
import { LocaleResolver, DETECTORS, TRANSFORMERS } from "locales-detector";
import store from "store";

Vue.use(VueI18n);

function loadLocaleMessages() {
  const locales = require.context(
    "./locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

export const localeStorageKey = "locale:teambespin";

class StoredLocaleDetector {
  getLocales() {
    return store.get(localeStorageKey) ? [store.get(localeStorageKey)] : [];
  }
}

function resolveLocale() {
  const transformers = [
    new TRANSFORMERS.FallbacksTransformer(),
    new TRANSFORMERS.IETFTransformer(),
    new TRANSFORMERS.InvalidLocalesTransformer(),
    new TRANSFORMERS.LanguageOnlyTransformer()
  ];
  var urlLocales = new LocaleResolver(
    [new DETECTORS.UrlDetector("lang")],
    transformers
  );
  var storedLocales = new LocaleResolver(
    [new StoredLocaleDetector()],
    transformers
  );
  var navigatorLocales = new LocaleResolver(
    [new DETECTORS.NavigatorDetector()],
    transformers
  );
  if (urlLocales.getLocales().length > 0) {
    return urlLocales.getLocales()[0];
  } else if (storedLocales.getLocales().length > 0) {
    return storedLocales.getLocales()[0];
  } else {
    return navigatorLocales.getLocales()[0];
  }
}

export default new VueI18n({
  locale: resolveLocale(),
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: loadLocaleMessages()
});
