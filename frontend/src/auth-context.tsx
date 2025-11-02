'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import Cookies from 'js-cookie';
import type { User, AuthContextType } from '@/types/auth';
import { Permission, UserRole } from '@/types/auth';
import { getPermissionsForRole } from '@/lib/permissions';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth on mount
    const initAuth = () => {
      try {
        // Ensure we're running in the browser
        if (typeof window === 'undefined') {
          setIsLoading(false);
          return;
        }

        const token = Cookies.get('authToken');
        const storedUser = localStorage.getItem('userInfo');

        if (token && storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Failed to initialize auth:", err);
        // Clear corrupted data only in browser
        if (typeof window !== 'undefined') {
          Cookies.remove('authToken', { path: '/' });
          localStorage.removeItem('userInfo');
        }
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (token: string, user: User) => {
    // Store token in cookie with secure settings
    Cookies.set('authToken', token, {
      expires: 7, // 7 days
      sameSite: 'lax',
      path: '/',
      // secure: process.env.NODE_ENV === 'production', // Enable in production with HTTPS
    });

    // Store user info in localStorage
    localStorage.setItem('userInfo', JSON.stringify(user));
    
    // Update state
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Clear all auth data
    Cookies.remove('authToken', { path: '/' });
    localStorage.removeItem('userInfo');
    
    // Update state
    setUser(null);
    setIsAuthenticated(false);
    
    // Redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  /**
   * Check if user has a specific permission
   */
  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    
    // Check custom permissions first (if user has specific permissions assigned)
    if (user.permissions && user.permissions.includes(permission)) {
      return true;
    }
    
    // Otherwise check role-based permissions
    const rolePermissions = getPermissionsForRole(user.role);
    return rolePermissions.includes(permission);
  };

  /**
   * Check if user has a specific role or any of the specified roles
   */
  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    
    return user.role === role;
  };

  /**
   * Check if user has any of the specified permissions
   */
  const hasAnyPermission = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return permissions.some(permission => hasPermission(permission));
  };

  /**
   * Check if user has all of the specified permissions
   */
  const hasAllPermissions = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return permissions.every(permission => hasPermission(permission));
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        isLoading, 
        login, 
        logout,
        hasPermission,
        hasRole,
        hasAnyPermission,
        hasAllPermissions,
      }}
    >
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
