import axios from "axios";
import Cookies from 'js-cookie'; // For browser cookies

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const token = Cookies.get('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


interface LoginFormData {
  username: string;
  password: string;
}

export const loginUser = async (credentials: LoginFormData): Promise<{ user: any; token: string }> => {
  const { data } = await api.post("/auth/login", credentials);
  Cookies.set("authToken", data.token, { expires: 7, sameSite: "lax" });  
  return data;
};

export const logoutUser = async() => {
  Cookies.remove("authToken");
  window.location.href = "/login";
}


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