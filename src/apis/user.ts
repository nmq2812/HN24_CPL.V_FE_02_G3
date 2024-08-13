import axios from "../libs/axios";
import { AxiosResponse } from "axios";

export const loginAPI = async (
  credentials: LoginCredentials
): Promise<AxiosResponse> => {
  return await axios.post("/users/login", { user: credentials });
};

export const getCurrentUser = async (token: string) => {
  return await axios.get("/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
