interface UserData {
    email?: string;
    username?: string;
    bio?: string;
    image?: string;
}

export async function putUser(
    userData: UserData,
    token: string
): Promise<void> {
    try {
        if (!token) {
            throw new Error("User is not authenticated");
        }

        const response = await fetch(
            "https://node-express-conduit.appspot.com/api/user",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    user: userData,
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || "Failed to update user settings"
            );
        }

    } catch (error) {
        console.error("Error updating user settings:", error);
        throw error;
    }
}
