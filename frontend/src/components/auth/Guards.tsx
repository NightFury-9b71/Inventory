'use client';

import { useAuth } from '@/auth-context';
import { Permission, UserRole } from '@/types/auth';
import { ReactNode } from 'react';

interface ProtectedProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface PermissionGuardProps extends ProtectedProps {
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean; // If true, requires ALL permissions. If false, requires ANY
}

interface RoleGuardProps extends ProtectedProps {
  role?: UserRole;
  roles?: UserRole[];
}

/**
 * Component that only renders children if user has the required permission(s)
 * 
 * @example
 * // Single permission
 * <PermissionGuard permission={Permission.CREATE_OFFICE}>
 *   <CreateButton />
 * </PermissionGuard>
 * 
 * // Multiple permissions (any)
 * <PermissionGuard permissions={[Permission.EDIT_OFFICE, Permission.DELETE_OFFICE]}>
 *   <EditButton />
 * </PermissionGuard>
 * 
 * // Multiple permissions (all required)
 * <PermissionGuard permissions={[Permission.EDIT_OFFICE, Permission.DELETE_OFFICE]} requireAll>
 *   <AdminButton />
 * </PermissionGuard>
 */
export function PermissionGuard({ 
  children, 
  permission, 
  permissions, 
  requireAll = false,
  fallback = null 
}: PermissionGuardProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = useAuth();

  let hasAccess = false;

  if (permission) {
    hasAccess = hasPermission(permission);
  } else if (permissions) {
    hasAccess = requireAll 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}

/**
 * Component that only renders children if user has the required role(s)
 * 
 * @example
 * // Single role
 * <RoleGuard role={UserRole.ADMIN}>
 *   <AdminPanel />
 * </RoleGuard>
 * 
 * // Multiple roles
 * <RoleGuard roles={[UserRole.ADMIN, UserRole.SUPER_ADMIN]}>
 *   <AdminPanel />
 * </RoleGuard>
 */
export function RoleGuard({ 
  children, 
  role, 
  roles,
  fallback = null 
}: RoleGuardProps) {
  const { hasRole } = useAuth();

  const hasAccess = role ? hasRole(role) : (roles ? hasRole(roles) : false);

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}

/**
 * Component that only renders children if user is authenticated
 * 
 * @example
 * <AuthGuard fallback={<LoginPrompt />}>
 *   <UserDashboard />
 * </AuthGuard>
 */
export function AuthGuard({ children, fallback = null }: ProtectedProps) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <>{children}</> : <>{fallback}</>;
}

/**
 * Component that shows different content based on permission
 * 
 * @example
 * <Can 
 *   permission={Permission.EDIT_OFFICE}
 *   yes={<EditButton />}
 *   no={<ViewButton />}
 * />
 */
export function Can({ 
  permission, 
  permissions,
  requireAll = false,
  yes, 
  no = null 
}: {
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean;
  yes: ReactNode;
  no?: ReactNode;
}) {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = useAuth();

  let hasAccess = false;

  if (permission) {
    hasAccess = hasPermission(permission);
  } else if (permissions) {
    hasAccess = requireAll 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
  }

  return hasAccess ? <>{yes}</> : <>{no}</>;
}
