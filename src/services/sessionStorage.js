export const AUTH_TOKEN_KEY = "accessToken";
export const FIREBASE_TOKEN_KEY = "firebaseToken";
export const AUTH_USER_KEY = "academyUser";
export const AUTH_STATE_KEY = "academyAuthState";

export const saveAuthSession = ({ accessToken, firebaseToken, user }) => {
  if (accessToken) {
    localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
  }

  if (firebaseToken) {
    localStorage.setItem(FIREBASE_TOKEN_KEY, firebaseToken);
  }

  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }

  if (accessToken || firebaseToken || user) {
    localStorage.setItem(AUTH_STATE_KEY, "authenticated");
  }
};

export const getStoredAuthSession = () => {
  const accessToken = localStorage.getItem(AUTH_TOKEN_KEY);
  const firebaseToken = localStorage.getItem(FIREBASE_TOKEN_KEY);
  const rawUser = localStorage.getItem(AUTH_USER_KEY);
  const authState = localStorage.getItem(AUTH_STATE_KEY);

  try {
    return {
      accessToken,
      firebaseToken,
      isAuthenticated: authState === "authenticated",
      user: rawUser ? JSON.parse(rawUser) : null
    };
  } catch {
    localStorage.removeItem(AUTH_USER_KEY);
    return { accessToken, firebaseToken, isAuthenticated: Boolean(accessToken || firebaseToken), user: null };
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(FIREBASE_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(AUTH_STATE_KEY);
};
