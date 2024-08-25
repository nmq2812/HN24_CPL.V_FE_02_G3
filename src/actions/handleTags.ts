"use server";

export const getTags = async (): Promise<string[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/tags`
    );
    const res = await response.json();
    return res.tags;
  } catch (error) {
    console.error("Error fetching the tags:", error);
    return [];
  }
};
