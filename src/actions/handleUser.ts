"use server";
interface UserData {
  email?: string;
  username?: string;
  bio?: string;
  image?: string;
}

export async function putUser(userData: UserData, token: string) {
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

    const res = await response.json();
    if (response.status === 200) {
      return { success: true, data: res.user };
    } else {
      if (response.status === 401 || response.status === 422) {
        return { success: false, message: res };
      } else {
        return {
          success: false,
          message: { errors: { message: "Unexpected error" } },
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      message: { errors: { message: "An error occurred" } },
    };
  }
}
