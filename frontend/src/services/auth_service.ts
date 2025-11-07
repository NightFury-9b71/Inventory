import api from "@/lib/api";
import { KEY } from "@/lib/api";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";


export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  FACULTY_ADMIN = 'FACULTY_ADMIN',
  DEPARTMENT_ADMIN = 'DEPARTMENT_ADMIN',
  OFFICE_MANAGER = 'OFFICE_MANAGER',
  VIEWER = 'VIEWER',
  USER = 'USER',
  GUEST = 'GUEST',
}

export interface User {
  id: string;
  email?: string;
  username: string;
  name?: string;
  role: UserRole;
  officeId?: string;
  officeName?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
}


export const ENDPOINTS = {
    login: "/auth/login",
}


export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const { data } = await api.post<LoginResponse>(ENDPOINTS.login, {
      username: credentials.username,
      password: credentials.password,
    });

    // Store token and user info
    Cookies.set(KEY.auth_token, data.token);
    Cookies.set(KEY.user_info, JSON.stringify(data.user));
    
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Login failed. Server Issue!');
  }
};

export const logout = () => {
    Cookies.remove(KEY.auth_token);
    Cookies.remove(KEY.user_info);
    
    // Redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = "/login";
    }
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
  });
};