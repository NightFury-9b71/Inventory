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
        // Try decode first; if that fails, try raw parse.
        let parsed: any;
        try {
          parsed = JSON.parse(decodeURIComponent(storedUser));
        } catch (e) {
          parsed = JSON.parse(storedUser);
        }
  // Normalize role to remove 'ROLE_' prefix if present (backend might sometimes
  // send ROLE_ADMIN vs ADMIN). This keeps the client-side role consistent with
  // `UserRole` enum used across the UI.
  if (parsed?.role) parsed.role = parsed.role.replace(/^ROLE_/, '');
  setUser(parsed);
        if (process.env.NODE_ENV === 'development') {
          console.debug('[AuthProvider] storedUser', { storedUser, parsed });
        }
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
        let parsed: any;
        try {
          parsed = JSON.parse(decodeURIComponent(storedUser));
        } catch (e) {
          parsed = JSON.parse(storedUser);
        }
  if (parsed?.role) parsed.role = parsed.role.replace(/^ROLE_/, '');
  setUser(parsed);
        if (process.env.NODE_ENV === 'development') {
          console.debug('[AuthProvider] refreshUser', { storedUser, parsed });
        }
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
