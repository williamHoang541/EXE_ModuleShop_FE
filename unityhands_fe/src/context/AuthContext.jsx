import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    const storedUserId = localStorage.getItem("user_id");

    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (newToken, newUserId) => {
    localStorage.setItem("access_token", newToken);
    localStorage.setItem("user_id", newUserId);
    setToken(newToken);
    setUserId(newUserId);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    setToken(null);
    setUserId(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ token, userId, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
