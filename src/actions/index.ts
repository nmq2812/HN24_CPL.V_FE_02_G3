"use server";


const BASE_URL = "https://node-express-conduit.appspot.com/api";

export const loginAPI = async (credentials: LoginCredentials) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify({ user: credentials }),
      headers: { "Content-Type": "application/json" },
    });
    const responseData = await response.json();

    return {
      status: response.status,
      response: responseData,
    };
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
