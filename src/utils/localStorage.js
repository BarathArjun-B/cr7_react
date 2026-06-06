// src/utils/localStorage.js

const USERS_KEY = "proballer_users";
const CURRENT_USER_KEY = "proballer_current_user";
const ACTIVITY_KEY = "proballer_activity";
const PROGRESS_KEY = "proballer_progress";
const SESSION_KEY = "proballer_session_meta";
const COMPLETED_PHASES_KEY = "proballer_completed_phases";

// --- User Registry ---
export const getUsers = () => {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
};

export const saveUser = (user) => {
  const users = getUsers();
  // Prevent duplicate entries by email
  const exists = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
  if (exists !== -1) {
    users[exists] = user; // Update if exists
  } else {
    users.push(user);
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const findUserByEmail = (email) => {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
};

export const findUserById = (id) => {
  return getUsers().find(u => u.id === id) || null;
};

// --- Session Management ---
export const getCurrentUser = () => {
  try {
    // Check localStorage first (remember me), then sessionStorage
    const localData = localStorage.getItem(CURRENT_USER_KEY);
    if (localData) return JSON.parse(localData);
    const sessionData = sessionStorage.getItem(CURRENT_USER_KEY);
    if (sessionData) return JSON.parse(sessionData);
    return null;
  } catch { return null; }
};

export const setCurrentUser = (user, remember = true) => {
  // Always clear both storages first to prevent duplicates
  localStorage.removeItem(CURRENT_USER_KEY);
  sessionStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(SESSION_KEY);

  if (!user) return; // Logout: both cleared above

  // Store the complete required fields
  const sessionData = {
    uid: user.id || user.uid,
    displayName: user.name || user.displayName,
    email: user.email,
    photoURL: user.photoURL || null,
    position: user.position || null,
    loginTimestamp: new Date().toISOString(),
    remember: remember
  };

  if (remember) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionData));
  } else {
    sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionData));
  }

  // Also store session metadata separately for analytics
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    lastLogin: new Date().toISOString(),
    loginCount: (getSessionMeta().loginCount || 0) + 1
  }));
};

export const getSessionMeta = () => {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : {};
  } catch { return {}; }
};

// --- Activity Tracking ---
export const getActivity = () => {
  try {
    const data = localStorage.getItem(ACTIVITY_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
};

export const addActivity = (activity) => {
  const activities = getActivity();
  const newActivity = {
    id: "act_" + Math.random().toString(36).substr(2, 9),
    ...activity,
    recordedAt: new Date().toISOString()
  };
  activities.unshift(newActivity);
  // Keep max 100 activities to prevent localStorage bloat
  const trimmed = activities.slice(0, 100);
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(trimmed));
};

// --- Progress Tracking ---
export const getProgress = () => {
  try {
    const data = localStorage.getItem(PROGRESS_KEY);
    return data ? JSON.parse(data) : {
      warmup: 0, technical: 0, shooting: 0, fitness: 0, recovery: 0
    };
  } catch {
    return { warmup: 0, technical: 0, shooting: 0, fitness: 0, recovery: 0 };
  }
};

export const updateProgress = (phase, percentage) => {
  const progress = getProgress();
  const key = phase.toLowerCase();
  if (key in progress) {
    // Only increase, never decrease
    if (percentage > (progress[key] || 0)) {
      progress[key] = percentage;
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    }
  }
};

// --- Completed Phases ---
export const getCompletedPhases = () => {
  try {
    const data = localStorage.getItem(COMPLETED_PHASES_KEY);
    return data ? JSON.parse(data) : {};
  } catch { return {}; }
};

export const markPhaseComplete = (position, phase) => {
  const completed = getCompletedPhases();
  if (!completed[position]) completed[position] = [];
  if (!completed[position].includes(phase)) {
    completed[position].push(phase);
    localStorage.setItem(COMPLETED_PHASES_KEY, JSON.stringify(completed));
  }
};

// --- Full Clear (Logout) ---
export const clearUserSession = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
  sessionStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(SESSION_KEY);
  // Keep USERS_KEY and ACTIVITY_KEY — user's history should persist
};

// --- Sanitization ---
export const sanitizeString = (str) => {
  if (typeof str !== "string") return "";
  return str.trim().replace(/[<>'"]/g, "").substring(0, 500);
};
