import type { CollectionEntry } from "astro:content";

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
  });
};

interface SortOpts {
  sortByDate: boolean;
  limit?: number;
}

export const sortBlogPosts = (
  posts: CollectionEntry<"blog">[],
  opts: SortOpts,
) => {
  if (opts.sortByDate) {
    posts.sort(
      (a, b) =>
        new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
    );
  } else {
    // randomize posts if sortByDate is false
    posts.sort(() => Math.random() - 0.5);
  }

  // limit the amount of visible posts
  if (typeof opts.limit) {
    return posts.slice(0, opts.limit);
  }

  return posts;
};
