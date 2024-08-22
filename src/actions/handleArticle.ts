const BASE_URL = "https://node-express-conduit.appspot.com/api";

export const getArticles = async ({
  limit,
  page,
  tag,
  author,
  favorited,
}: GlobalArticleParams) => {
  try {
    const queryParams = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
      ...(author && { author }),
      ...(favorited && { favorited }),
      ...(tag && { tag }),
    });
    const response = await fetch(`${BASE_URL}/articles?${queryParams}`);
    const res = await response.json();
    if (response.status === 200) {
      return { success: true, data: res.articles };
    } else {
      if (response.status === 401 || response.status === 422) {
        return { success: false, message: res };
      } else {
        return {
          success: false,
          message: { errors: { message: "Unexpected error" } },
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      message: { errors: { message: "An error occurred" } },
    };
  }
};

export const getClickedArticle = async (slug: string, token?: string) => {
  try {
    const response = await fetch(`${BASE_URL}/articles/${slug}`, {
      method: "GET",
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });

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
        email: "error",
        bio: "error",
        image: "error",
        following: false,
      },
    };
    return result;
  }
};
