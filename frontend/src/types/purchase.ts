export interface Purchase {
  id: number;
  itemId: number;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  vendorName: string;
  vendorContact?: string;
  purchaseDate: string; // ISO date string
  invoiceNumber?: string;
  remarks?: string;
  purchasedById: number;
  purchasedByName: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PurchaseFormData {
  itemId: number;
  quantity: number;
  unitPrice: number;
  vendorName: string;
  vendorContact?: string;
  purchaseDate: string; // ISO date string
  invoiceNumber?: string;
  remarks?: string;
  purchasedById: number;
}