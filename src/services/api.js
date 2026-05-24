import axios from "axios";
import { AUTH_TOKEN_KEY, FIREBASE_TOKEN_KEY, clearAuthSession, saveAuthSession } from "./sessionStorage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem(FIREBASE_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRecoveryRequest = originalRequest.url?.includes("/auth/refresh");
    const isCredentialRequest =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/firebase") ||
      originalRequest.url?.includes("/auth/google");

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRecoveryRequest && !isCredentialRequest) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await api.post("/auth/refresh");
        const token = refreshResponse.data.data?.accessToken;
        if (token) {
          saveAuthSession({ accessToken: token, user: refreshResponse.data.data?.user });
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        if (localStorage.getItem(FIREBASE_TOKEN_KEY)) {
          localStorage.removeItem(AUTH_TOKEN_KEY);
        } else {
          clearAuthSession();
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
