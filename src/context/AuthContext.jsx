import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { authService } from "../services/authService";
import { clearAuthSession, getStoredAuthSession, saveAuthSession } from "../services/sessionStorage";
import { AuthContext } from "./authContextValue";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredAuthSession().user);
  const [loading, setLoading] = useState(true);

  const hydrateUser = useCallback(async () => {
    const { accessToken } = getStoredAuthSession();

    if (accessToken) {
      try {
        const response = await api.get("/auth/me");
        const nextUser = response.data.data.user;
        saveAuthSession({ accessToken, user: nextUser });
        setUser(nextUser);
        return;
      } catch {
        clearAuthSession();
      }
    }

    try {
      const firebaseUser = await authService.restoreFirebaseSession();
      setUser(firebaseUser);
      if (!firebaseUser) {
        clearAuthSession();
      }
    } catch {
      clearAuthSession();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    hydrateUser();
  }, [hydrateUser]);

  const login = useCallback(async (credentials) => {
    const nextUser = await authService.login(credentials);
    setUser(nextUser);
    return nextUser;
  }, []);

  const register = useCallback(async (payload) => {
    const nextUser = await authService.register(payload);
    setUser(nextUser);
    return nextUser;
  }, []);

  const googleLogin = useCallback(async () => {
    const nextUser = await authService.loginWithGoogle();
    setUser(nextUser);
    return nextUser;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      googleLogin,
      logout,
      refreshUser: hydrateUser
    }),
    [user, loading, login, register, googleLogin, logout, hydrateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
