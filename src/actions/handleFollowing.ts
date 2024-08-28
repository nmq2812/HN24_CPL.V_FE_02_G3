"use server";

export const handleFollow = async (username: string, token: string) => {
    try {
        fetch(
            `https://node-express-conduit.appspot.com/api/profiles/${username}/follow`,
            {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    } catch (error) {
        throw error;
    }
};

export const handleUnfollow = (username: string, token: string) => {
    try {
        fetch(
            `https://node-express-conduit.appspot.com/api/profiles/${username}/follow`,
            {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    } catch (error) {
        throw error;
    }
};
