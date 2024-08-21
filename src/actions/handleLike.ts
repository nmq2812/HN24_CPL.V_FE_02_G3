"use server";
export const handleLike = async (slug: string, token: string) => {
    try {
        console.log(slug);
        const response = await fetch(
            `https://node-express-conduit.appspot.com/api/articles/${slug}/favorite`,
            {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const res = await response.json();
        console.log(res);
    } catch (error) {
        throw error;
    }
};

export const handleUnlike = (slug: string, token: string) => {
    try {
        fetch(
            `https://node-express-conduit.appspot.com/api/articles/${slug}/favorite`,
            {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    } catch (error) {
        throw error;
    }
};