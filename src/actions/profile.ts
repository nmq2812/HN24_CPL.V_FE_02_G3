"use server";

import axios from "../libs/axios";

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
        console.error("Error fetching the tags:", error);
        const errorProfile: Profile = {
            username: "error",
            bio: "error",
            image: "",
            following: true,
        };
        return errorProfile;
    }
};
