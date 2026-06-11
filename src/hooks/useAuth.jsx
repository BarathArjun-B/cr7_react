import { useState, createContext, useContext, useEffect, useCallback } from "react";
import {
  getCurrentUser,
  setCurrentUser,
  findUserByEmail,
  saveUser,
  clearUserSession,
  getSessionMeta
} from "../utils/localStorage";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";
import { setGoogleUser, clearGoogleSession } from "../utils/localStorage";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState(null);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Step 1: Restore any existing localStorage/sessionStorage session immediately
    const storedUser = getCurrentUser();
    if (storedUser) {
      setCurrentUserState(storedUser);
      setLoading(false);
      return; // Session found — no need to wait for Firebase
    }

    // Step 2: No stored session — listen for Firebase auth state
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Firebase has a session — rebuild localStorage entry
        setGoogleUser(firebaseUser);
        setCurrentUserState({
          uid:         firebaseUser.uid,
          displayName: firebaseUser.displayName || "Elite Player",
          email:       firebaseUser.email,
          photoURL:    firebaseUser.photoURL || null,
          loginTime:   new Date().toISOString(),
          provider:    "google",
          name:        firebaseUser.displayName || "Elite Player",
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
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

  const googleLogin = async () => {
    setGoogleLoading(true);
    setGoogleError(null);
    const errorMap = {
      "auth/popup-closed-by-user":      "Sign-in was cancelled. Please try again.",
      "auth/popup-blocked":             "Popup was blocked. Allow popups for this site and retry.",
      "auth/cancelled-popup-request":   "Sign-in request was cancelled.",
      "auth/network-request-failed":    "Network error. Check your connection and try again.",
      "auth/user-disabled":             "This account has been disabled.",
      "auth/account-exists-with-different-credential":
        "An account already exists with this email using a different sign-in method."
    };

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      const session = {
        uid:         firebaseUser.uid,
        displayName: firebaseUser.displayName || "Elite Player",
        email:       firebaseUser.email,
        photoURL:    firebaseUser.photoURL || null,
        loginTime:   new Date().toISOString(),
        provider:    "google",
        name:        firebaseUser.displayName || "Elite Player",
      };

      // Persist to localStorage — same key as email sessions
      setGoogleUser(firebaseUser);
      setCurrentUserState(session);
      return session;
    } catch (err) {
      const message = errorMap[err.code] || "Google sign-in failed. Please try again.";
      setGoogleError(message);
      throw new Error(message);
    } finally {
      setGoogleLoading(false);
    }
  };

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

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch {
      // Non-critical
    }
    clearGoogleSession();
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
      googleLoading,
      googleError,
      authError,
      login,
      register,
      logout,
      googleLogin,
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
