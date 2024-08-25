import { blogSchema } from "@lib/schemas";
import { defineCollection } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: blogSchema,
});

export const collections = { blog };
