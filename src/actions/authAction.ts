"use server";

const BASE_URL = "https://node-express-conduit.appspot.com/api";

export const loginAction = async (credentials: LoginCredentials) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify({ user: credentials }),
      headers: { "Content-Type": "application/json" },
    });

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
};

export const signupAction = async (credentials: SignupCredentials) => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      body: JSON.stringify({ user: credentials }),
      headers: { "Content-Type": "application/json" },
    });

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
};

export const getCurrentUser = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

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
};
