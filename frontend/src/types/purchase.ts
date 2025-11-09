export interface PurchaseItem {
  id?: number;
  itemId: number;
  itemName?: string;
  itemCode?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ItemInstance {
  id: number;
  itemId: number;
  itemName: string;
  purchaseId: number;
  barcode: string;
  unitPrice: number;
  status: 'IN_STOCK' | 'DISTRIBUTED' | 'DAMAGED' | 'LOST' | 'RETIRED';
  distributedToOfficeId?: number;
  distributedToOfficeName?: string;
  distributedAt?: string;
  remarks?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Purchase {
  id: number;
  items: PurchaseItem[];
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
  items: PurchaseItem[];
  vendorName: string;
  vendorContact?: string;
  purchaseDate: string; // ISO date string
  invoiceNumber?: string;
  remarks?: string;
  purchasedById: number;
}
