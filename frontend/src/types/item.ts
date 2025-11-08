export interface Item {
  id: number;
  name: string;
  nameBn?: string;
  categoryId: number;
  categoryName: string;
  code: string;
  description?: string;
  unitId?: number;
  unitName?: string;
  unitSymbol?: string;
  quantity: number;
  isActive: boolean;
  subItems?: Item[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ItemFormData {
  name: string;
  nameBn?: string;
  categoryId: number;
  code: string;
  description?: string;
  unitId?: number;
  quantity: number;
}

export interface ItemCategory {
  id: number;
  name: string;
  nameBn?: string;
  code: string;
  description?: string;
  isActive: boolean;
}

export interface CategoryFormData {
  name: string;
  nameBn?: string;
  code: string;
  description?: string;
}
