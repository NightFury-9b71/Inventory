export interface Distribution {
  id: number;
  itemId: number;
  itemName: string;
  officeId: number;
  officeName: string;
  userId: number;
  userName: string;
  quantity: number;
  dateDistributed: string;
  remarks?: string;
  status: DistributionStatus;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface DistributionFormData {
  itemId: number;
  officeId: number;
  userId: number;
  quantity: number;
  dateDistributed: string;
  remarks?: string;
}

export enum DistributionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}