"use server";

export const getProfile = async (username: string, token?: string) => {
    try {
        const response = await fetch(
            `https://node-express-conduit.appspot.com/api/profiles/${username}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : "",
                },
            }
        );
        return response.json();
    } catch (error) {
        throw error;
    }
};
