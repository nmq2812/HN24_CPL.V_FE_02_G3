import axios, { AxiosInstance } from "axios";

const DEFAULT_TIMEOUT: number = 10000;

const instance: AxiosInstance = axios.create({
  baseURL: "https://node-express-conduit.appspot.com/api",
  timeout: DEFAULT_TIMEOUT,
});

export default instance;
