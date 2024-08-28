"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

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
    const res = await response.json();
    const nextPage =
      res.articlesCount > Number(process.env.NEXT_PUBLIC_LIMIT_ARTICLE) * page;

    return { success: true, data: res, nextPage: nextPage };
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
    if (response.status === 200) {
      return { success: true, data: res.article };
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

export const postArticle = async (
  article: ArticleCredentials,
  token: string
) => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BASE_BACKEND_URL}/articles`, {
      method: "POST",
      body: JSON.stringify({ article }),
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    if (response.status === 200) {
      return { success: true, data: res.article };
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

export const deleteArticle = async (slug: string, token: string) => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BASE_BACKEND_URL}/articles/${slug}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    const res = await response.json();
    if (response.status === 200) {
      redirect("/");
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

export const putArticle = async (
  article: ArticleCredentials,
  slug: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BASE_BACKEND_URL}/articles/${slug}`,
      {
        method: "PUT",
        body: JSON.stringify({ article: { ...article } }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const res = await response.json();
    if (response.status === 200) {
      return { success: true, data: res.article };
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
