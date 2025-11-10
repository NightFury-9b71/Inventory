import api from "@/lib/api";
import { Movement, MovementFormData } from "@/types/movement";

export const ENDPOINTS = {
  get_movements: "/movements",
  movement_by_id: (id: number) => `/movements/${id}`,
  create_movement: "/movements",
  update_movement: (id: number) => `/movements/${id}`,
  recent_movements: "/movements/recent",
  movements_by_date_range: "/movements/date-range",
};

export const getMovements = async (): Promise<Movement[]> => {
  const response = await api.get(ENDPOINTS.get_movements);
  return response.data;
};

export const getMovementById = async (id: number): Promise<Movement> => {
  const response = await api.get(ENDPOINTS.movement_by_id(id));
  return response.data;
};

export const createMovement = async (movement: MovementFormData): Promise<Movement> => {
  const response = await api.post(ENDPOINTS.create_movement, {
    ...movement,
    employeeId: parseInt(movement.employeeId.toString())
  });
  return response.data;
};

export const updateMovement = async (id: number, movement: Partial<MovementFormData>): Promise<Movement> => {
  const response = await api.put(ENDPOINTS.update_movement(id), movement);
  return response.data;
};

export const getRecentMovements = async (): Promise<Movement[]> => {
  const response = await api.get(ENDPOINTS.recent_movements);
  return response.data;
};

export const getMovementsByDateRange = async (startDate: string, endDate: string): Promise<Movement[]> => {
  const response = await api.get(ENDPOINTS.movements_by_date_range, {
    params: { startDate, endDate }
  });
  return response.data;
};