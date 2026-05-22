import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  return (
    <AuthContext.Provider value={{
      isLoggedIn, setIsLoggedIn,
      isDarkMode, setIsDarkMode,
      userEmail, setUserEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);