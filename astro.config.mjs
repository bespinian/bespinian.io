// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://bespinian.io",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
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
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Lato",
        cssVariable: "--font-lato",
      },
    ],
  },
});
