import api from "@/lib/api";
import { ItemCategory, CategoryFormData } from "@/types/item";

export const ENDPOINTS = {
  get_categories: "/categories",
  category_by_id: (id: number) => `/categories/${id}`,
  create_category: "/categories",
  update_category: (id: number) => `/categories/${id}`,
  delete_category: (id: number) => `/categories/${id}`,
};

export const getCategories = async (): Promise<ItemCategory[]> => {
  const response = await api.get(ENDPOINTS.get_categories);
  return response.data;
};

export const getCategoryById = async (id: number): Promise<ItemCategory> => {
  const response = await api.get(ENDPOINTS.category_by_id(id));
  return response.data;
};

export const createCategory = async (category: CategoryFormData): Promise<ItemCategory> => {
  const response = await api.post(ENDPOINTS.create_category, category);
  return response.data;
};

export const updateCategory = async (id: number, category: Partial<CategoryFormData>): Promise<ItemCategory> => {
  const response = await api.put(ENDPOINTS.update_category(id), category);
  return response.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(ENDPOINTS.delete_category(id));
};