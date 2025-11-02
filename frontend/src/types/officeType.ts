export enum OfficeType {
  OFFICE = 'OFFICE',
  FACULTY = 'FACULTY',
  DEPARTMENT = 'DEPARTMENT',
  FACILITY = 'FACILITY',
  HALL = 'HALL',
  INSTITUTE = 'INSTITUTE',
  CENTER = 'CENTER',
}

export const OfficeTypeLabels: Record<OfficeType, string> = {
  [OfficeType.OFFICE]: 'Office',
  [OfficeType.FACULTY]: 'Faculty',
  [OfficeType.DEPARTMENT]: 'Department',
  [OfficeType.FACILITY]: 'Facility',
  [OfficeType.HALL]: 'Hall',
  [OfficeType.INSTITUTE]: 'Institute',
  [OfficeType.CENTER]: 'Center',
};
