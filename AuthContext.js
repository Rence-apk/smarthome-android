import React, { createContext, useContext, useState, useEffect } from "react";
import { MMKV } from "react-native-mmkv-storage";

// Initialize MMKV storage
const storage = new MMKV();

// Create a context for isLoggedIn
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in on app startup
  useEffect(() => {
    const loggedInStatus = storage.getBoolean("isLoggedIn");
    if (loggedInStatus !== undefined) {
      setIsLoggedIn(loggedInStatus);
    }
  }, []);

  // Login function
  const login = () => {
    storage.set("isLoggedIn", true);
    setIsLoggedIn(true);
  };

  // Logout function
  const logout = () => {
    storage.delete("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);