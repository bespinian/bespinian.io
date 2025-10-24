import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    excerpt: z.string(),
    image: z.string().optional(),
  }),
});

const customers = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      company: z.string(),
      logo: image(),
      date: z.date(),
      results: z.array(z.string()),
      quote: z.string(),
      authorName: z.string(),
      authorTitle: z.string(),
      authorImage: image().optional(),
    }),
});

const services = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
  }),
});

const jobs = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    location: z.string().optional(),
    employment: z.string().optional(),
  }),
});

export const collections = {
  blog,
  customers,
  services,
  jobs,
};
