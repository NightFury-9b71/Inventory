import axios, { AxiosError } from "axios";
import Cookies from 'js-cookie';
import type { LoginCredentials, LoginResponse } from "@/types/auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear auth data
      Cookies.remove('authToken', { path: '/' });
      localStorage.removeItem('userInfo');
      
      // Redirect to login only if not already on login page
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    
    // Provide better error messages
    const errorMessage = error.response?.data 
      ? (typeof error.response.data === 'string' ? error.response.data : (error.response.data as any).message)
      : error.message;
    
    return Promise.reject(new Error(errorMessage || 'An unexpected error occurred'));
  }
);

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const { data } = await api.post<LoginResponse>("/auth/login", {
      username: credentials.username,
      password: credentials.password,
    });
    
    // Don't store token here - let the AuthContext handle it
    // This keeps authentication logic centralized
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Login failed. Please try again.');
  }
};

export const logoutUser = async () => {
  try {
    // Call backend logout endpoint if you have one
    // await api.post("/auth/logout");
    
    Cookies.remove("authToken", { path: '/' });
    localStorage.removeItem("userInfo");
    
    // Redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = "/login";
    }
  } catch (error) {
    console.error('Logout error:', error);
    // Still clear local auth data even if API call fails
    Cookies.remove("authToken", { path: '/' });
    localStorage.removeItem("userInfo");
    if (typeof window !== 'undefined') {
      window.location.href = "/login";
    }
  }
};


export const getOffices = async () => {
  const response = await api.get("/offices");
  return response.data;
};

export const getParentOffices = async () => {
  const response = await api.get("/offices/parent");
  return response.data;
};

export const getFacultyOffices = async () => {
  const response = await api.get("/offices/faculties");
  return response.data;
};

export const getDepartmentOffices = async () => {
  const response = await api.get("/offices/departments");
  return response.data;
};

export const getOfficeById = async (id: number) => {
  const response = await api.get(`/offices/${id}`);
  return response.data;
};

export const createOffice = async (office: any) => {
  const response = await api.post("/offices", office);
  return response.data;
};

export const updateOffice = async (id: number, office: any) => {
  const response = await api.put(`/offices/${id}`, office);
  return response.data;
};

export const deleteOffice = async (id: number) => {
  const response = await api.delete(`/offices/${id}`);
  return response.data;
}

export default api;