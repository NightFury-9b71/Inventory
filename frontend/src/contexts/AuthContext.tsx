"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { User, logout } from "@/services/auth_service";
import { KEY } from "@/lib/api";
import Cookies from "js-cookie";

interface AuthData {
  user: User | null;
  role: string;
  isAuthenticated: boolean;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthData>({
  user: null,
  role: "guest",
  isAuthenticated: false,
  logout: () => {},
  refreshUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = Cookies.get(KEY.user_info);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        Cookies.remove(KEY.user_info);
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const refreshUser = () => {
    const storedUser = Cookies.get(KEY.user_info);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  const role = user?.role || "guest";
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, logout: handleLogout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
