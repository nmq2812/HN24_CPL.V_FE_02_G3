"use server";

import { revalidateTag } from "next/cache";

export const handleLike = async (slug: string, token: string) => {
  try {
    const response = await fetch(
      `https://node-express-conduit.appspot.com/api/articles/${slug}/favorite`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const res = await response.json();
    revalidateTag("single-article");
    revalidateTag("list-articles");
  } catch (error) {
    throw error;
  }
};

export const handleUnlike = async (slug: string, token: string) => {
  try {
    const response = await fetch(
      `https://node-express-conduit.appspot.com/api/articles/${slug}/favorite`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const res = await response.json();
    revalidateTag("single-article");
    revalidateTag("list-articles");
  } catch (error) {
    throw error;
  }
};
