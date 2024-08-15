"use server";

import axios from "../libs/axios";

export const getProfile = async (
    username: string
): Promise<ProfileResponse> => {
    try {
        const response = await axios.get(
            `https://node-express-conduit.appspot.com/api/profiles/${username}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching the tags:", error);

        const errorProfile: Profile = {
            username: "error",
            bio: "error",
            image: "",
            following: true,
        };
        return result;
    }
};
