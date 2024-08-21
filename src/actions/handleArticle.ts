const BASE_URL = "https://node-express-conduit.appspot.com/api";

export const getArticles = async () => {
    try {
        const response = await fetch(`${BASE_URL}/articles`);
        return response.json();
    } catch (error) {
        throw error;
    }
};

export const getClickedArticle = async (slug: string, token: string) => {
    try {
        const response = await fetch(`${BASE_URL}/articles/${slug}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const res = await response.json();
        console.log(res);
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
                bio: "error",
                image: "error",
                following: false,
            },
        };
        return result;
    }
};
