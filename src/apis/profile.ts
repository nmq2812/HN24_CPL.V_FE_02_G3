"use server";

import axios from "../libs/axios";

export const getProfile = async (username: string): Promise<Profile> => {
    try {
        const response = await axios.get(
            `https://node-express-conduit.appspot.com/api/profiles/${username}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching the tags:", error);
        const result: Profile = {
            userName: "error",
            bio: "error",
            image: "",
            following: true,
        };
        return result;
    }
};
