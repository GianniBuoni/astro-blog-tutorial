import { z } from "astro/zod";

export const blogSchema = z.object({
  title: z.string().max(60),
  pubDate: z.date(),
  author: z.string(),
  image: z.object({
    src: z.string(),
    alt: z.string(),
  }),
  description: z.string().max(300),
  draft: z.boolean(),
  category: z.string(),
});
