const NEXT_PUBLIC_BASE_BACKEND_URL =
  "https://node-express-conduit.appspot.com/api";

export const getArticles = async (
  fetchUrl: string,
  { limit, page, tag, author, favorited }: OptionalArticleParams,
  token?: string
) => {
  try {
    //Query
    const queryParams = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
      ...(author && { author }),
      ...(favorited && { favorited }),
      ...(tag && { tag }),
    });
    const url = NEXT_PUBLIC_BASE_BACKEND_URL + fetchUrl + "?" + queryParams;

    //Fetch data
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
    const res = await response.json();
    const nextPage =
      res.articlesCount > Number(process.env.NEXT_PUBLIC_LIMIT_ARTICLE) * page;

    return { success: true, data: res.articles, nextPage: nextPage };
    // }
  } catch (error) {
    throw error;
  }
};

export const getClickedArticle = async (slug: string, token?: string) => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BASE_BACKEND_URL}/articles/${slug}`,
      {
        method: "GET",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      }
    );

    const res = await response.json();
    return res;
  } catch {
    const result: Article = {
      slug: "error",
      title: "error",
      description: "error",
      body: "error",
      tagList: [],
      createdAt: "",
      updatedAt: "",
      favorited: false,
      favoritesCount: 0,
      author: {
        username: "error",
        bio: "error",
        image: "error",
        admin: false,
        following: false,
      },
    };
    return result;
  }
};
