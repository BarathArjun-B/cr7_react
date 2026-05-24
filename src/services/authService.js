import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import api from "./api";
import { firebaseAuth, googleProvider, isFirebaseConfigured } from "./firebase";
import { clearAuthSession, getStoredAuthSession, saveAuthSession } from "./sessionStorage";

const ensureFirebaseReady = () => {
  if (!isFirebaseConfigured || !firebaseAuth) {
    throw new Error("Firebase is not configured yet. Add your Vite Firebase environment variables.");
  }
};

const authErrorMessages = {
  "auth/email-already-in-use": "An academy account already exists for this email.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/invalid-credential": "Invalid email or password.",
  "auth/popup-closed-by-user": "Google sign-in was closed before completion.",
  "auth/too-many-requests": "Too many attempts. Give it a moment, then try again.",
  "auth/weak-password": "Password must be at least 6 characters."
};

const normalizeAuthError = (error) =>
  new Error(authErrorMessages[error.code] || error.message || "Authentication failed. Try again.");

const buildFirebaseUserProfile = (firebaseUser, fallbackName) => ({
  _id: firebaseUser.uid,
  firebaseUid: firebaseUser.uid,
  name: firebaseUser.displayName || fallbackName || firebaseUser.email?.split("@")[0] || "Academy Player",
  email: firebaseUser.email,
  profileImage: firebaseUser.photoURL || "",
  XP: 0,
  streak: 0,
  workoutsCompleted: 0,
  badges: [{ name: "Academy Prospect", icon: "spark" }],
  isVerified: firebaseUser.emailVerified
});

const persistResponseSession = (response, firebaseToken) => {
  const { accessToken, user } = response.data.data;
  saveAuthSession({ accessToken, firebaseToken, user });
  return user;
};

const syncFirebaseUserWithApi = async (firebaseUser, fallbackName) => {
  const firebaseToken = await firebaseUser.getIdToken(true);

  try {
    const response = await api.post("/auth/firebase", {
      idToken: firebaseToken,
      name: fallbackName || firebaseUser.displayName || ""
    });
    return persistResponseSession(response, firebaseToken);
  } catch {
    const user = buildFirebaseUserProfile(firebaseUser, fallbackName);
    saveAuthSession({ firebaseToken, user });
    return user;
  }
};

const getCurrentFirebaseUser = () =>
  new Promise((resolve) => {
    if (!firebaseAuth) {
      resolve(null);
      return;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      unsubscribe();
      resolve(firebaseUser);
    });
  });

export const authService = {
  getStoredSession: getStoredAuthSession,

  async restoreFirebaseSession() {
    const firebaseUser = await getCurrentFirebaseUser();
    if (!firebaseUser) return null;
    return syncFirebaseUserWithApi(firebaseUser);
  },

  async login({ email, password }) {
    ensureFirebaseReady();
    try {
      const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
      return syncFirebaseUserWithApi(result.user);
    } catch (error) {
      throw normalizeAuthError(error);
    }
  },

  async register({ name, email, password }) {
    ensureFirebaseReady();
    try {
      const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      if (name) {
        await updateProfile(result.user, { displayName: name });
      }
      return syncFirebaseUserWithApi(result.user, name);
    } catch (error) {
      throw normalizeAuthError(error);
    }
  },

  async loginWithGoogle() {
    ensureFirebaseReady();
    if (!googleProvider) {
      throw new Error("Google sign-in is not configured yet. Add your Firebase web app variables.");
    }

    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      return syncFirebaseUserWithApi(result.user);
    } catch (error) {
      throw normalizeAuthError(error);
    }
  },

  async logout() {
    try {
      await api.post("/auth/logout");
    } finally {
      if (firebaseAuth) {
        await signOut(firebaseAuth).catch(() => {});
      }
      clearAuthSession();
    }
  }
};
