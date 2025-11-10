import axios from "axios";
import Cookies from 'js-cookie';

export const KEY = {
    auth_token : 'auth_token',
    user_info : 'user_info',
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get(KEY.auth_token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors globally
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Clear authentication data
//       Cookies.remove(KEY.auth_token);
//       Cookies.remove(KEY.user_info);
      
//       // Only redirect if not already on login page
//       if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
//         window.location.href = '/login';
//       }
//     }
    
//     // Log error details for debugging (only in development)
//     if (process.env.NODE_ENV === 'development' && error.response) {
//       console.log('API Error Response:', {
//         status: error.response.status,
//         data: error.response.data,
//         url: error.config?.url,
//       });
//     }
    
//     return Promise.reject(error);
//   }
// );

export default api;