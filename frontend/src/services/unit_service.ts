import api from "@/lib/api";
import { Unit, UnitFormData } from "@/types/unit";

export const ENDPOINTS = {
  get_units: "/units",
  unit_by_id: (id: number) => `/units/${id}`,
  create_unit: "/units",
  update_unit: (id: number) => `/units/${id}`,
  delete_unit: (id: number) => `/units/${id}`,
};

export const getUnits = async (): Promise<Unit[]> => {
  const response = await api.get(ENDPOINTS.get_units);
  return response.data;
};

export const getUnitById = async (id: number): Promise<Unit> => {
  const response = await api.get(ENDPOINTS.unit_by_id(id));
  return response.data;
};

export const createUnit = async (unit: UnitFormData): Promise<Unit> => {
  const response = await api.post(ENDPOINTS.create_unit, unit);
  return response.data;
};

export const updateUnit = async (id: number, unit: Partial<UnitFormData>): Promise<Unit> => {
  const response = await api.put(ENDPOINTS.update_unit(id), unit);
  return response.data;
};

export const deleteUnit = async (id: number): Promise<void> => {
  const response = await api.delete(ENDPOINTS.delete_unit(id));
  return response.data;
};
