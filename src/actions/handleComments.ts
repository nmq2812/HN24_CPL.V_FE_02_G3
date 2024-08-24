const NEXT_PUBLIC_BASE_BACKEND_URL =
  "https://node-express-conduit.appspot.com/api";

export const getComment = (slug: string) => {
  try {
    fetch(`${NEXT_PUBLIC_BASE_BACKEND_URL}/articles/${slug}/comments`, {
      method: "GET",
    });
  } catch (error) {
    throw error;
  }
};
