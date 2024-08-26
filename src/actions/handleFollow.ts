"use server";

import { revalidateTag } from "next/cache";

export const followUser = async (username: string, token?: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/profiles/${username}/follow`,
      {
        method: "POST",
        body: JSON.stringify({ username }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log("follow");
    revalidateTag("list-articles");
    const res = await response.json();
    if (response.status === 200) {
      return { success: true, data: res.profile };
    }
  } catch (error) {
    return {
      success: false,
      message: { errors: { message: "An error occurred" } },
    };
  }
};

export const unfollowUser = async (username: string, token?: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/profiles/${username}/follow`,
      {
        method: "DELETE",
        body: JSON.stringify({ username }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log("UNfollow");
    revalidateTag("list-articles");
    const res = await response.json();
    if (response.status === 200) {
      return { success: true, data: res.profile };
    }
  } catch (error) {
    return {
      success: false,
      message: { errors: { message: "An error occurred" } },
    };
  }
};
