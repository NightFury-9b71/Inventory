import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getOffices = async () => {
  const response = await api.get("/offices");
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