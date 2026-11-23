import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const USERS = [
  { username: "student", password: "student123", role: "student", name: "Vedant Bansal" },
  { username: "admin", password: "admin123", role: "admin", name: "Placement Cell" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  });

  const login = (username, password) => {
    const found = USERS.find((u) => u.username === username && u.password === password);
    if (!found) return null;
    const safe = { username: found.username, role: found.role, name: found.name };
    setUser(safe);
    localStorage.setItem("user", JSON.stringify(safe));
    return safe;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
