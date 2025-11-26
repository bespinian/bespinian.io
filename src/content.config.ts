import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: z.string(),
      pubDate: z.coerce.date(),
      tags: z.array(z.string()),
      description: z.string(),
      image: image(),
    }),
});

const customers = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/customers" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      company: z.string(),
      logo: image(),
      pubDate: z.coerce.date(),
      results: z.array(z.string()),
      quote: z.string(),
      authorName: z.string(),
      authorTitle: z.string(),
      authorImage: image().optional(),
    }),
});

const jobs = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/jobs" }),
  schema: z.object({
    title: z.string(),
    location: z.string(),
    employment: z.string(),
  }),
});

const members = defineCollection({
  loader: file("./src/content/members/members.json"),
  schema: ({ image }) =>
    z.array(
      z.object({
        name: z.string(),
        title: z.string(),
        description: z.string(),
        image: image(),
        linkedIn: z.string().optional(),
        gitHub: z.string().optional(),
      }),
    ),
});

const services = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/content/services" }),
  schema: ({ image }) =>
    z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        icon: image(),
        challenges: z.object({
          description: z.string(),
          list: z.array(
            z.object({
              title: z.string(),
              description: z.string(),
            }),
          ),
        }),
        approach: z.object({
          description: z.string(),
          list: z.array(
            z.object({
              title: z.string(),
              description: z.string(),
            }),
          ),
        }),
        results: z.object({
          list: z.array(
            z.object({
              title: z.string(),
              description: z.string(),
            }),
          ),
        }),
      }),
    ),
});

const values = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/content/values" }),
  schema: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    }),
  ),
});

export const collections = {
  blog,
  customers,
  jobs,
  members,
  services,
  values,
};
