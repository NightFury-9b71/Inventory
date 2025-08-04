export type Office = {
  id: number;
  name: string;
  nameBn: string;
  code: string;
  type: string;
  description?: string;
  orderIndex?: number;
  isActive: boolean;
  subOffices?: Office[];
};
