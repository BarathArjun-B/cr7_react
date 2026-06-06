import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" }
});

// Request interceptor: attach auth token if present
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("proballer_current_user");
  if (raw) {
    try {
      const user = JSON.parse(raw);
      if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
    } catch {}
  }
  return config;
});

// Response interceptor: handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("proballer_current_user");
      sessionStorage.removeItem("proballer_current_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
