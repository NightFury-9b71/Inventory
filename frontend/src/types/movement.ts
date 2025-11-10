export interface Movement {
  id: number;
  itemId: number;
  itemName: string;
  fromOfficeId: number;
  fromOfficeName: string;
  toOfficeId: number;
  toOfficeName: string;
  employeeId: number;
  employeeName: string;
  quantity: number;
  dateMoved: string;
  remarks?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MovementFormData {
  itemId: number;
  fromOfficeId: number;
  toOfficeId: number;
  employeeId: number;
  quantity: number;
  dateMoved: string;
  remarks?: string;
}