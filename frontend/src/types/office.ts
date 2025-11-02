import { OfficeType } from './officeType';

export type Office = {
  id: number;
  name: string;
  nameBn: string;
  code: string;
  type: OfficeType;
  description?: string;
  orderIndex?: number;
  isActive: boolean;
  subOffices?: Office[];
};

export { OfficeType } from './officeType';
