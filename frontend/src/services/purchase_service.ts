import api from "@/lib/api";
import { Purchase, PurchaseFormData } from "@/types/purchase";

export const ENDPOINTS = {
  get_purchases: "/purchases",
  purchase_by_id: (id: number) => `/purchases/${id}`,
  create_purchase: "/purchases",
  recent_purchases: "/purchases/recent",
  purchases_by_date_range: "/purchases/date-range",
};

export const getPurchases = async (): Promise<Purchase[]> => {
  const response = await api.get(ENDPOINTS.get_purchases);
  return response.data;
};

export const getPurchaseById = async (id: number): Promise<Purchase> => {
  const response = await api.get(ENDPOINTS.purchase_by_id(id));
  return response.data;
};

export const createPurchase = async (purchase: PurchaseFormData): Promise<Purchase> => {
  const response = await api.post(ENDPOINTS.create_purchase, purchase);
  return response.data;
};

export const updatePurchase = async (id: number, purchase: Partial<PurchaseFormData>): Promise<Purchase> => {
  const response = await api.put(ENDPOINTS.purchase_by_id(id), purchase);
  return response.data;
};

export const getRecentPurchases = async (): Promise<Purchase[]> => {
  const response = await api.get(ENDPOINTS.recent_purchases);
  return response.data;
};

export const getPurchasesByDateRange = async (startDate: string, endDate: string): Promise<Purchase[]> => {
  const response = await api.get(ENDPOINTS.purchases_by_date_range, {
    params: { startDate, endDate }
  });
  return response.data;
};