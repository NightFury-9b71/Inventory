export interface Unit {
  id: number;
  name: string;
  nameBn?: string;
  symbol: string;
  description?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UnitFormData {
  name: string;
  nameBn?: string;
  symbol: string;
  description?: string;
}
