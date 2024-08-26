"use server";
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
      next: { tags: ["list-articles"] },
    });
    console.log("get Data");
    const res = await response.json();
    const nextPage =
      res.articlesCount > Number(process.env.NEXT_PUBLIC_LIMIT_ARTICLE) * page;

    return { success: true, data: res.articles, nextPage: nextPage };
    // }
  } catch (error) {
    throw error;
  }
};

export const getSingleArticle = async (slug: string, token?: string) => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BASE_BACKEND_URL}/articles/${slug}`,
      {
        method: "GET",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
        next: { tags: ["single-article"] },
      }
    );

    const res = await response.json();
    return res;
  } catch (err) {
    throw err;
  }
};
