"use server";

export const getProfile = async (username: string) => {
    try {
        const response = await fetch(
            `https://node-express-conduit.appspot.com/api/profiles/${username}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );
        return response.json();
    } catch (error) {
        throw error;
    }
};
