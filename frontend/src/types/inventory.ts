// Item related types
export interface Item {
  id: number;
  name: string;
  nameBn?: string;
  categoryId: number;
  categoryName: string;
  code: string;
  description?: string;
  units?: string;
  unitPrice?: number;
  quantity: number;
  isActive: boolean;
}

export interface ItemFormData {
  name: string;
  nameBn?: string;
  categoryId: number;
  code: string;
  description?: string;
  units?: string;
  unitPrice?: number;
  quantity: number;
}

// Category related types
export interface ItemCategory {
  id: number;
  name: string;
  nameBn?: string;
  code: string;
  description?: string;
  isActive: boolean;
  itemCount?: number;
}

export interface CategoryFormData {
  name: string;
  nameBn?: string;
  code: string;
  description?: string;
}

// Purchase related types
export interface Purchase {
  id: number;
  itemId: number;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  vendorName: string;
  vendorContact?: string;
  purchaseDate: string;
  invoiceNumber?: string;
  remarks?: string;
  purchasedById: number;
  purchasedByName: string;
  isActive: boolean;
}

export interface PurchaseFormData {
  itemId: number;
  quantity: number;
  unitPrice: number;
  vendorName: string;
  vendorContact?: string;
  purchaseDate: string;
  invoiceNumber?: string;
  remarks?: string;
  purchasedById: number;
}

// Dashboard related types
export interface DashboardStats {
  totalItems: number;
  totalCategories: number;
  totalStock: number;
  lowStockItems: number;
  totalDistributions: number;
  pendingDistributions: number;
  totalPurchaseValue: number;
  categoryDistribution: Record<string, number>;
  monthlyPurchases: Record<string, number>;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
