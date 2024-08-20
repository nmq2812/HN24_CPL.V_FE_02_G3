const BASE_URL = "https://node-express-conduit.appspot.com/api";

export const getClickedArticle = async (slug: string) => {
    try {
        const response = await fetch(`${BASE_URL}/articles/${slug}`);

        return response.json();
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
                following: false,
            },
        };
        return result;
    }
};
