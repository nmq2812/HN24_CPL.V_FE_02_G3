"use server";

import { revalidateTag } from "next/cache";

const NEXT_PUBLIC_BASE_BACKEND_URL =
  "https://node-express-conduit.appspot.com/api";

export const getComment = async (slug: string) => {
  try {
    const response = fetch(
      `${NEXT_PUBLIC_BASE_BACKEND_URL}/articles/${slug}/comments`,
      {
        method: "GET",
        next: { tags: ["comment"] },
      }
    );

    if (!(await response).ok) {
      throw new Error("Failed to fetch comments");
    }

    const data = await (await response).json();
    return data.comments;
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (
  slug: string,
  id: string,
  token: string
) => {
  try {
    const response = fetch(
      `${NEXT_PUBLIC_BASE_BACKEND_URL}/articles/${slug}/comments/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidateTag("comment");
    if (!(await response).ok) {
      throw new Error("Failed to fetch comments");
    }
  } catch (error) {
    throw error;
  }
};

export const postComment = async (
  slug: string,
  token: string,
  body: string
) => {
  try {
    const response = fetch(
      `${NEXT_PUBLIC_BASE_BACKEND_URL}/articles/${slug}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment: {
            body: body,
          },
        }),
      }
    );

    if (!(await response).ok) {
      throw new Error("Failed to fetch comments");
    }

    revalidateTag("comment");
    const data = await (await response).json();
    return data.comment;
  } catch (error) {
    throw error;
  }
};
