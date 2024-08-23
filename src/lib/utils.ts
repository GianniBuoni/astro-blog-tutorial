export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
  });
};

interface Posts {
  frontmatter: {
    date: string;
    draft: boolean;
  };
}

export const formatBlogPosts = (
  posts: Posts[],
  {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = true,
    limit = undefined,
  } = {},
) => {
  const filteredPosts = posts.reduce((acc: Posts[], post) => {
    // grab the necessary data
    const { date, draft } = post.frontmatter;

    // filter out Drafts if true
    if (filterOutDrafts && draft) return acc;

    // filter out future posts if true
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

    // add remaining posts to acc
    acc.push(post);
    return acc;
  }, []);

  if (sortByDate) {
    filteredPosts.sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
  } else {
    // randomize posts if sortByDate is false
    filteredPosts.sort(() => Math.random() - 0.5);
  }

  // limit the amount of visible posts
  if (typeof limit == "number") {
    return filteredPosts.slice(0, limit);
  }

  return filteredPosts;
};
