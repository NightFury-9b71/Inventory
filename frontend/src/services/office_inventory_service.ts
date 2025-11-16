import api from "@/lib/api";
import { OfficeInventory } from "@/types/distribution";

export const ENDPOINTS = {
  add_or_update_inventory: "/office-inventory/add",
  get_inventory_by_office_and_item: (officeId: number, itemId: number) =>
    `/office-inventory/office/${officeId}/item/${itemId}`,
  get_inventory_by_office: (officeId: number) => `/office-inventory/office/${officeId}`,
  get_inventory_by_item: (itemId: number) => `/office-inventory/item/${itemId}`,
  get_available_items_by_office: (officeId: number) => `/office-inventory/office/${officeId}/available`,
  get_total_quantity_by_item: (itemId: number) => `/office-inventory/item/${itemId}/total-quantity`,
  get_all_inventory_with_stock: "/office-inventory/all-with-stock",
  transfer_items: "/office-inventory/transfer",
  adjust_inventory: "/office-inventory/adjust",
  check_stock: "/office-inventory/check-stock",
};

export const addOrUpdateInventory = async (
  officeId: number,
  itemId: number,
  quantity: number
): Promise<OfficeInventory> => {
  const response = await api.post(ENDPOINTS.add_or_update_inventory, null, {
    params: { officeId, itemId, quantity }
  });
  return response.data;
};

export const getInventoryByOfficeAndItem = async (
  officeId: number,
  itemId: number
): Promise<OfficeInventory | null> => {
  try {
    const response = await api.get(ENDPOINTS.get_inventory_by_office_and_item(officeId, itemId));
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { status?: number } };
    if (axiosError.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const getInventoryByOffice = async (officeId: number): Promise<OfficeInventory[]> => {
  const response = await api.get(ENDPOINTS.get_inventory_by_office(officeId));
  return response.data;
};

export const getInventoryByItem = async (itemId: number): Promise<OfficeInventory[]> => {
  const response = await api.get(ENDPOINTS.get_inventory_by_item(itemId));
  return response.data;
};

export const getAvailableItemsByOffice = async (officeId: number): Promise<OfficeInventory[]> => {
  const response = await api.get(ENDPOINTS.get_available_items_by_office(officeId));
  return response.data;
};

export const getTotalQuantityByItem = async (itemId: number): Promise<number> => {
  const response = await api.get(ENDPOINTS.get_total_quantity_by_item(itemId));
  return response.data;
};

export const getAllInventoryWithStock = async (): Promise<OfficeInventory[]> => {
  const response = await api.get(ENDPOINTS.get_all_inventory_with_stock);
  return response.data;
};

export const transferItems = async (
  fromOfficeId: number,
  toOfficeId: number,
  itemId: number,
  quantity: number
): Promise<void> => {
  await api.post(ENDPOINTS.transfer_items, null, {
    params: { fromOfficeId, toOfficeId, itemId, quantity }
  });
};

export const adjustInventory = async (
  officeId: number,
  itemId: number,
  quantityChange: number
): Promise<void> => {
  await api.post(ENDPOINTS.adjust_inventory, null, {
    params: { officeId, itemId, quantityChange }
  });
};

export const checkStock = async (
  officeId: number,
  itemId: number,
  requiredQuantity: number
): Promise<boolean> => {
  const response = await api.get(ENDPOINTS.check_stock, {
    params: { officeId, itemId, requiredQuantity }
  });
  return response.data;
};