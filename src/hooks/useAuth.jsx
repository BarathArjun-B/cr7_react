import { useState, createContext, useContext, useEffect, useCallback } from "react";
import {
  getCurrentUser,
  setCurrentUser,
  findUserByEmail,
  saveUser,
  clearUserSession,
  getSessionMeta
} from "../utils/localStorage";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Restore session from localStorage/sessionStorage on page refresh
    try {
      const stored = getCurrentUser();
      if (stored) {
        setCurrentUserState(stored);
      }
    } catch (err) {
      console.error("Session restore failed:", err);
      clearUserSession();
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password, remember = true) => {
    setAuthError(null);
    // Simulate network delay for realism
    await new Promise(r => setTimeout(r, 700));

    if (!email?.trim() || !password) {
      throw new Error("Email and password are required.");
    }

    const user = findUserByEmail(email.trim());
    if (!user || user.password !== password) {
      const err = new Error("Invalid email or password.");
      setAuthError(err.message);
      throw err;
    }

    // Strip password before storing in session
    const { password: _pw, ...safeUser } = user;

    // Store in localStorage with all required fields
    setCurrentUser({
      ...safeUser,
      uid: safeUser.id,
      displayName: safeUser.name,
      photoURL: safeUser.photoURL || null
    }, remember);

    setCurrentUserState(safeUser);
    return safeUser;
  }, []);

  const register = useCallback(async (userData) => {
    setAuthError(null);
    await new Promise(r => setTimeout(r, 700));

    if (!userData.email?.trim()) throw new Error("Email is required.");
    if (findUserByEmail(userData.email.trim())) {
      throw new Error("An account with this email already exists.");
    }

    const newUser = {
      id: "usr_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6),
      uid: null, // Reserved for future Firebase integration
      displayName: userData.name,
      name: userData.name,
      email: userData.email.trim().toLowerCase(),
      password: userData.password,
      position: userData.position,
      photoURL: null,
      createdAt: new Date().toISOString(),
      xp: 0,
      level: 1,
      badges: []
    };

    saveUser(newUser);
    return newUser;
  }, []);

  const logout = useCallback(() => {
    clearUserSession();
    setCurrentUserState(null);
    setAuthError(null);
  }, []);

  const updateProfile = useCallback((updates) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUserState(updated);
    const stored = getCurrentUser();
    setCurrentUser({ ...stored, ...updates }, stored?.remember !== false);
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      authError,
      login,
      register,
      logout,
      updateProfile,
      isAuthenticated: !!currentUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
