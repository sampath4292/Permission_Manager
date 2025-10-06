import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const u = localStorage.getItem("pm_user");
      return u ? JSON.parse(u) : null;
    } catch (e) {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("pm_token"));

  useEffect(() => {
    if (token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    else delete axios.defaults.headers.common["Authorization"];
  }, [token]);

  const login = async (email, password) => {
    const res = await axios.post(`${API}/auth/login`, { email, password });
    localStorage.setItem("pm_token", res.data.token);
    localStorage.setItem("pm_user", JSON.stringify(res.data.user));
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const register = async (payload) => {
    const res = await axios.post(`${API}/auth/register`, payload);
    localStorage.setItem("pm_token", res.data.token);
    localStorage.setItem("pm_user", JSON.stringify(res.data.user));
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("pm_token");
    localStorage.removeItem("pm_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
