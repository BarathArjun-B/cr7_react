import { useState, createContext, useContext, useEffect } from 'react';
import { getCurrentUser, setCurrentUser, findUserByEmail, saveUser } from '../utils/localStorage';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On mount, check if there's a stored user
    const user = getCurrentUser();
    if (user) {
      setCurrentUserState(user);
    }
    setLoading(false);
  }, []);

  const login = async (email, password, remember = true) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = findUserByEmail(email);
    if (!user || user.password !== password) {
      throw new Error("Invalid email or password");
    }

    // Don't save password in the current user session
    const { password: _, ...safeUser } = user;
    setCurrentUser(safeUser, remember);
    setCurrentUserState(safeUser);
    return safeUser;
  };

  const register = async (userData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (findUserByEmail(userData.email)) {
      throw new Error("Email already registered");
    }

    const newUser = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      ...userData
    };

    saveUser(newUser);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentUserState(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, register, logout, isAuthenticated: !!currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
