import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
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
      originalRequest.url?.includes("/auth/login") || originalRequest.url?.includes("/auth/register");

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRecoveryRequest && !isCredentialRequest) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await api.post("/auth/refresh");
        const token = refreshResponse.data.data?.accessToken;
        if (token) {
          localStorage.setItem("accessToken", token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
