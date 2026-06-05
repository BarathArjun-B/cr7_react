// src/utils/localStorage.js

const USERS_KEY = "proballer_users";
const CURRENT_USER_KEY = "proballer_current_user";
const ACTIVITY_KEY = "proballer_activity";
const PROGRESS_KEY = "proballer_progress";

// --- Users ---
export const getUsers = () => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const findUserByEmail = (email) => {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
};

// --- Current Session ---
export const getCurrentUser = () => {
  const localData = localStorage.getItem(CURRENT_USER_KEY);
  const sessionData = sessionStorage.getItem(CURRENT_USER_KEY);
  return localData ? JSON.parse(localData) : sessionData ? JSON.parse(sessionData) : null;
};

export const setCurrentUser = (user, remember = true) => {
  if (user) {
    if (remember) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      sessionStorage.removeItem(CURRENT_USER_KEY);
    } else {
      sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem(CURRENT_USER_KEY);
  }
};

// --- Activity ---
export const getActivity = () => {
  const data = localStorage.getItem(ACTIVITY_KEY);
  return data ? JSON.parse(data) : [];
};

export const addActivity = (activity) => {
  const activities = getActivity();
  activities.unshift(activity); // Add to beginning
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activities));
};

// --- Progress ---
export const getProgress = () => {
  const data = localStorage.getItem(PROGRESS_KEY);
  return data ? JSON.parse(data) : { warmup: 0, technical: 0, shooting: 0, fitness: 0, recovery: 0 };
};

export const updateProgress = (phase, percentage) => {
  const progress = getProgress();
  const phaseKey = phase.toLowerCase();
  
  if (progress[phaseKey] !== undefined) {
    // Only update if new percentage is higher
    if (percentage > progress[phaseKey]) {
      progress[phaseKey] = percentage;
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    }
  }
};
