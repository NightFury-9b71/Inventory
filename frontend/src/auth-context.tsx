'use client'; // Only if using Next.js App Router

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import Cookies from 'js-cookie';

type User = {
  id: string;
  // name: string;
  email: string;
  // add more fields as needed
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('authToken');
    const storedUser = localStorage.getItem('userInfo');

    if (token && storedUser) {
      setIsAuthenticated(true);
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user info from localStorage");
        localStorage.removeItem("userInfo");
      }
    }
  }, []);

  const login = (token: string, user: User) => {
    Cookies.set('authToken', token, {
      expires: 7,
      sameSite: 'lax',
      path: '/',
    });

    localStorage.setItem('userInfo', JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove('authToken', { path: '/' });
    localStorage.removeItem('userInfo');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
