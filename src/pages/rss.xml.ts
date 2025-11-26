import rss, { type RSSFeedItem } from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getCollectionByLanguage } from "../lib/paths.ts";
import en from "../i18n/en.ts";

export async function GET(context: { site: string }) {
  const blog = await getCollection("blog");
  const customers = await getCollectionByLanguage("customers", "en");

  const items: RSSFeedItem[] = [];

  items.push(
    ...blog.map((post) => ({
      title: post.data.title,
      link: `/en/blog/${post.id}`,
      pubDate: post.data.pubDate,
      description: post.data.description,
    })),
  );

  items.push(
    ...customers.map((story) => ({
      title: story.data.title,
      link: `/en/customers/${story.id}`,
      pubDate: story.data.pubDate,
      description: story.data.description,
    })),
  );

  items.sort((a, b) => {
    const aTime = a.pubDate?.getTime() ?? 0;
    const bTime = b.pubDate?.getTime() ?? 0;
    return bTime - aTime;
  });

  return rss({
    title: `bespinian ${en["blog.title"]}`,
    description: en["blog.subtitle"],
    site: context.site,
    items,
  });
}
