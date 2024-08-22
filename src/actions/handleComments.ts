const BASE_URL = "https://node-express-conduit.appspot.com/api";

export const getComment = (slug: string) => {
    try {
        fetch(`${BASE_URL}/articles/${slug}/comments`, {
            method: "GET",
        });
    } catch (error) {
        throw error;
    }
};
