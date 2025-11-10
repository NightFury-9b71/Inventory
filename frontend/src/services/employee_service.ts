import api from "@/lib/api";

export interface Employee {
  id: number;
  name: string;
  nameBn?: string;
  designation: string;
  employeeCode: string;
  officeId: number;
  officeName?: string;
  email?: string;
  phone?: string;
  isActive: boolean;
}

export const ENDPOINTS = {
  get_employees: "/employees",
  employee_by_id: (id: number) => `/employees/${id}`,
};

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await api.get(ENDPOINTS.get_employees);
  return response.data;
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
  const response = await api.get(ENDPOINTS.employee_by_id(id));
  return response.data;
};