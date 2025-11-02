// Role definitions
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  FACULTY_ADMIN = 'FACULTY_ADMIN',
  DEPARTMENT_ADMIN = 'DEPARTMENT_ADMIN',
  OFFICE_MANAGER = 'OFFICE_MANAGER',
  VIEWER = 'VIEWER',
  USER = 'USER',
}

// Permission definitions
export enum Permission {
  // Office permissions
  VIEW_OFFICES = 'VIEW_OFFICES',
  CREATE_OFFICE = 'CREATE_OFFICE',
  EDIT_OFFICE = 'EDIT_OFFICE',
  DELETE_OFFICE = 'DELETE_OFFICE',
  
  // Inventory permissions
  VIEW_INVENTORY = 'VIEW_INVENTORY',
  CREATE_INVENTORY = 'CREATE_INVENTORY',
  EDIT_INVENTORY = 'EDIT_INVENTORY',
  DELETE_INVENTORY = 'DELETE_INVENTORY',
  TRANSFER_INVENTORY = 'TRANSFER_INVENTORY',
  
  // User management
  VIEW_USERS = 'VIEW_USERS',
  CREATE_USER = 'CREATE_USER',
  EDIT_USER = 'EDIT_USER',
  DELETE_USER = 'DELETE_USER',
  
  // Reports
  VIEW_REPORTS = 'VIEW_REPORTS',
  EXPORT_REPORTS = 'EXPORT_REPORTS',
  
  // System settings
  MANAGE_SETTINGS = 'MANAGE_SETTINGS',
}

export interface User {
  id: string;
  email?: string;
  username: string;
  name?: string;
  role: UserRole;
  permissions?: Permission[];
  officeId?: string;
  officeName?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
}
