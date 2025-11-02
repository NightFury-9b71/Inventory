'use client';

import { useAuth } from '@/auth-context';
import { Permission, UserRole } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

/**
 * Hook to check if user has a specific permission
 * Returns object with permission status and loading state
 */
export function usePermission(permission: Permission) {
  const { hasPermission, isLoading } = useAuth();
  
  return {
    hasPermission: hasPermission(permission),
    isLoading,
  };
}

/**
 * Hook to check if user has any of the specified permissions
 */
export function useAnyPermission(permissions: Permission[]) {
  const { hasAnyPermission, isLoading } = useAuth();
  
  return {
    hasPermission: hasAnyPermission(permissions),
    isLoading,
  };
}

/**
 * Hook to check if user has all of the specified permissions
 */
export function useAllPermissions(permissions: Permission[]) {
  const { hasAllPermissions, isLoading } = useAuth();
  
  return {
    hasPermission: hasAllPermissions(permissions),
    isLoading,
  };
}

/**
 * Hook to check if user has a specific role
 */
export function useRole(role: UserRole | UserRole[]) {
  const { hasRole, isLoading } = useAuth();
  
  return {
    hasRole: hasRole(role),
    isLoading,
  };
}

/**
 * Hook that redirects user if they don't have required permission
 * Use this in page components to protect entire pages
 * 
 * @example
 * function AdminPage() {
 *   useRequirePermission(Permission.MANAGE_SETTINGS);
 *   return <div>Admin Content</div>;
 * }
 */
export function useRequirePermission(
  permission: Permission,
  redirectTo: string = '/dashboard',
  showToast: boolean = true
) {
  const router = useRouter();
  const { hasPermission, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

      if (!hasPermission(permission)) {
        if (showToast) {
          toast.error('Access Denied', {
            description: 'You do not have permission to access this page.',
          });
        }
        router.push(redirectTo);
      }
    }
  }, [isLoading, isAuthenticated, hasPermission, permission, redirectTo, showToast, router]);

  return { isLoading, hasPermission: hasPermission(permission) };
}

/**
 * Hook that redirects user if they don't have required role
 * 
 * @example
 * function SuperAdminPage() {
 *   useRequireRole(UserRole.SUPER_ADMIN);
 *   return <div>Super Admin Content</div>;
 * }
 */
export function useRequireRole(
  role: UserRole | UserRole[],
  redirectTo: string = '/dashboard',
  showToast: boolean = true
) {
  const router = useRouter();
  const { hasRole, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

      if (!hasRole(role)) {
        if (showToast) {
          toast.error('Access Denied', {
            description: 'You do not have the required role to access this page.',
          });
        }
        router.push(redirectTo);
      }
    }
  }, [isLoading, isAuthenticated, hasRole, role, redirectTo, showToast, router]);

  return { isLoading, hasRole: hasRole(role) };
}

/**
 * Hook that redirects user if they don't have ANY of the required permissions
 */
export function useRequireAnyPermission(
  permissions: Permission[],
  redirectTo: string = '/dashboard',
  showToast: boolean = true
) {
  const router = useRouter();
  const { hasAnyPermission, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

      if (!hasAnyPermission(permissions)) {
        if (showToast) {
          toast.error('Access Denied', {
            description: 'You do not have permission to access this page.',
          });
        }
        router.push(redirectTo);
      }
    }
  }, [isLoading, isAuthenticated, hasAnyPermission, permissions, redirectTo, showToast, router]);

  return { isLoading, hasPermission: hasAnyPermission(permissions) };
}

/**
 * Hook that redirects user if they don't have ALL of the required permissions
 */
export function useRequireAllPermissions(
  permissions: Permission[],
  redirectTo: string = '/dashboard',
  showToast: boolean = true
) {
  const router = useRouter();
  const { hasAllPermissions, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

      if (!hasAllPermissions(permissions)) {
        if (showToast) {
          toast.error('Access Denied', {
            description: 'You do not have all required permissions to access this page.',
          });
        }
        router.push(redirectTo);
      }
    }
  }, [isLoading, isAuthenticated, hasAllPermissions, permissions, redirectTo, showToast, router]);

  return { isLoading, hasPermission: hasAllPermissions(permissions) };
}
