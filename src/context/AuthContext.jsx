import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { AuthContext } from "./authContextValue";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const hydrateUser = useCallback(async () => {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data.data.user);
    } catch {
      setUser(null);
      localStorage.removeItem("accessToken");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    hydrateUser();
  }, [hydrateUser]);

  const login = async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    const { user: nextUser, accessToken } = response.data.data;
    localStorage.setItem("accessToken", accessToken);
    setUser(nextUser);
    return nextUser;
  };

  const register = async (payload) => {
    const response = await api.post("/auth/register", payload);
    const { user: nextUser, accessToken } = response.data.data;
    localStorage.setItem("accessToken", accessToken);
    setUser(nextUser);
    return nextUser;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({ user, loading, isAuthenticated: Boolean(user), login, register, logout, refreshUser: hydrateUser }),
    [user, loading, hydrateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
