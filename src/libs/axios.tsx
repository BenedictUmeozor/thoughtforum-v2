import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
