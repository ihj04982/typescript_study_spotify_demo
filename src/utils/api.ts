import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";

const api = axios.create({
  baseURL: SPOTIFY_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 && error.config?.url !== "/me" && error.config?.url !== "/me/playlists") {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
