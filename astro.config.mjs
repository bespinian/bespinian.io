// @ts-check
import { readdirSync } from "node:fs";
import { defineConfig, fontProviders } from "astro/config";
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";

const SITE = "https://bespinian.io";
const DEFAULT_LANG = "en";

/**
 * Collections whose entries are not translated into every language. Content
 * lives either in a language subdirectory (`en/xovis.md`) or flat in the
 * collection root, in which case it is English only — the same rule
 * `src/lib/paths.ts` uses to build the routes.
 *
 * Astro still renders those entries under every language prefix, but the copies
 * canonicalize to the English URL. Listing a URL in the sitemap while telling
 * crawlers to prefer a different one is a contradiction, and Search Console
 * reports every instance of it, so they are filtered out here.
 */
const LOCALIZED_COLLECTIONS = [
  { dir: "blog", urlSegment: "blog" },
  { dir: "customers", urlSegment: "customers" },
  { dir: "jobs", urlSegment: "about/jobs" },
];

/** @type {Map<string, Set<string>>} `${urlSegment}/${slug}` -> languages */
const translations = new Map();

for (const { dir, urlSegment } of LOCALIZED_COLLECTIONS) {
  for (const entry of readdirSync(`./src/content/${dir}`, {
    withFileTypes: true,
  })) {
    /** @type {(lang: string, file: string) => void} */
    const record = (lang, file) => {
      const key = `${urlSegment}/${file.replace(/\.md$/, "")}`;
      if (!translations.has(key)) translations.set(key, new Set());
      translations.get(key)?.add(lang);
    };

    if (entry.isDirectory()) {
      for (const file of readdirSync(`./src/content/${dir}/${entry.name}`)) {
        if (file.endsWith(".md")) record(entry.name, file);
      }
    } else if (entry.name.endsWith(".md")) {
      record(DEFAULT_LANG, entry.name);
    }
  }
}

/**
 * True when the URL is a language copy of content that only exists in another.
 * @type {(page: string) => boolean}
 */
const isUntranslatedCopy = (page) => {
  const match = new URL(page).pathname.match(/^\/([a-z]{2})\/(.+?)\/?$/);
  if (!match) return false;

  const [, lang, path] = match;
  if (!lang || !path || lang === DEFAULT_LANG) return false;

  const langs = translations.get(path);
  return langs !== undefined && !langs.has(lang);
};

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({
      // A sitemap should only list canonical, indexable pages. Tag pages are
      // noindexed and `/` canonicalizes to `/en/`, so listing either just
      // sends crawlers somewhere we've told them not to keep.
      filter: (page) =>
        !page.includes("/404") &&
        !page.includes("/blog/tags") &&
        page !== `${SITE}/` &&
        !isUntranslatedCopy(page),
      customPages: [],
      serialize(item) {
        // Set priority and changefreq based on URL patterns
        if (item.url.match(/\/(en|de|ch)\/?$/)) {
          // Homepage for each language
          item.priority = 1.0;
          item.changefreq = ChangeFreqEnum.WEEKLY;
        } else if (item.url.includes("/blog/")) {
          // Blog posts
          item.priority = 0.7;
          item.changefreq = ChangeFreqEnum.MONTHLY;
        } else if (item.url.includes("/customers/")) {
          // Customer case studies
          item.priority = 0.8;
          item.changefreq = ChangeFreqEnum.MONTHLY;
        } else if (item.url.includes("/services/")) {
          // Service pages
          item.priority = 0.9;
          item.changefreq = ChangeFreqEnum.MONTHLY;
        } else if (item.url.includes("/about/jobs/")) {
          // Job listings
          item.priority = 0.6;
          item.changefreq = ChangeFreqEnum.WEEKLY;
        } else {
          // Other pages (about, contact, etc.)
          item.priority = 0.5;
          item.changefreq = ChangeFreqEnum.MONTHLY;
        }
        return item;
      },
    }),
  ],
  i18n: {
    locales: ["en", "de", "ch"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Lato",
      cssVariable: "--font-lato",
    },
  ],
});
