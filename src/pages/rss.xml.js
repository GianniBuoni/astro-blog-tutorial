import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function GET(context) {
  return rss({
    stylesheet: "/rss/styles.xsl",
    title: "My Astro Blog",
    description: "A humble Astronaut’s guide to the stars",
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob("./blog/*.md")),
  });
}
