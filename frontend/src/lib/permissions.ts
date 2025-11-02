import { UserRole, Permission } from '@/types/auth';

/**
 * Role-based permission mapping
 * Defines what permissions each role has
 */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.SUPER_ADMIN]: [
    // Full access to everything
    Permission.VIEW_OFFICES,
    Permission.CREATE_OFFICE,
    Permission.EDIT_OFFICE,
    Permission.DELETE_OFFICE,
    Permission.VIEW_INVENTORY,
    Permission.CREATE_INVENTORY,
    Permission.EDIT_INVENTORY,
    Permission.DELETE_INVENTORY,
    Permission.TRANSFER_INVENTORY,
    Permission.VIEW_USERS,
    Permission.CREATE_USER,
    Permission.EDIT_USER,
    Permission.DELETE_USER,
    Permission.VIEW_REPORTS,
    Permission.EXPORT_REPORTS,
    Permission.MANAGE_SETTINGS,
  ],
  
  [UserRole.ADMIN]: [
    // Almost full access, except system settings
    Permission.VIEW_OFFICES,
    Permission.CREATE_OFFICE,
    Permission.EDIT_OFFICE,
    Permission.DELETE_OFFICE,
    Permission.VIEW_INVENTORY,
    Permission.CREATE_INVENTORY,
    Permission.EDIT_INVENTORY,
    Permission.DELETE_INVENTORY,
    Permission.TRANSFER_INVENTORY,
    Permission.VIEW_USERS,
    Permission.CREATE_USER,
    Permission.EDIT_USER,
    Permission.VIEW_REPORTS,
    Permission.EXPORT_REPORTS,
  ],
  
  [UserRole.FACULTY_ADMIN]: [
    // Can manage their faculty and departments
    Permission.VIEW_OFFICES,
    Permission.CREATE_OFFICE,
    Permission.EDIT_OFFICE,
    Permission.VIEW_INVENTORY,
    Permission.CREATE_INVENTORY,
    Permission.EDIT_INVENTORY,
    Permission.TRANSFER_INVENTORY,
    Permission.VIEW_USERS,
    Permission.VIEW_REPORTS,
    Permission.EXPORT_REPORTS,
  ],
  
  [UserRole.DEPARTMENT_ADMIN]: [
    // Can manage their department
    Permission.VIEW_OFFICES,
    Permission.VIEW_INVENTORY,
    Permission.CREATE_INVENTORY,
    Permission.EDIT_INVENTORY,
    Permission.TRANSFER_INVENTORY,
    Permission.VIEW_USERS,
    Permission.VIEW_REPORTS,
  ],
  
  [UserRole.OFFICE_MANAGER]: [
    // Can manage their office inventory
    Permission.VIEW_OFFICES,
    Permission.VIEW_INVENTORY,
    Permission.CREATE_INVENTORY,
    Permission.EDIT_INVENTORY,
    Permission.VIEW_REPORTS,
  ],
  
  [UserRole.VIEWER]: [
    // Read-only access
    Permission.VIEW_OFFICES,
    Permission.VIEW_INVENTORY,
    Permission.VIEW_REPORTS,
  ],
  
  [UserRole.USER]: [
    // Basic view access
    Permission.VIEW_OFFICES,
    Permission.VIEW_INVENTORY,
  ],
};

/**
 * Get all permissions for a given role
 */
export function getPermissionsForRole(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

/**
 * Check if a role has a specific permission
 */
export function roleHasPermission(role: UserRole, permission: Permission): boolean {
  return getPermissionsForRole(role).includes(permission);
}

/**
 * Check if a role has any of the specified permissions
 */
export function roleHasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  const rolePermissions = getPermissionsForRole(role);
  return permissions.some(permission => rolePermissions.includes(permission));
}

/**
 * Check if a role has all of the specified permissions
 */
export function roleHasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  const rolePermissions = getPermissionsForRole(role);
  return permissions.every(permission => rolePermissions.includes(permission));
}
