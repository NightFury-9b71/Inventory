/**
 * Authentication and Authorization Helper Functions
 * Utility functions for token handling and access control
 */

import type { UserRole } from './auth-config';
import { ROLE_HIERARCHY, ROLE_PERMISSIONS, PUBLIC_PATHS, STATIC_PATHS } from './auth-config';

/**
 * Decode JWT token to extract user information
 * Note: This is just for routing decisions. Full validation happens on the backend.
 */
export function decodeToken(token: string): { role?: UserRole; sub?: string } | null {
  try {
    // JWT format: header.payload.signature
    const payload = token.split('.')[1];
    if (!payload) return null;

    const decoded = JSON.parse(Buffer.from(payload, 'base64').toString());
    return decoded;
  } catch (error) {
    console.error('Token decode error:', error);
    return null;
  }
}

/**
 * Check if a path is public (doesn't require authentication)
 */
export function isPublicPath(pathname: string): boolean {
  return (
    PUBLIC_PATHS.some(path => pathname.startsWith(path)) ||
    STATIC_PATHS.some(path => pathname.startsWith(path))
  );
}

/**
 * Get the role level in hierarchy (higher = more privileged)
 */
export function getRoleLevel(role?: UserRole): number {
  if (!role) return -1;
  return ROLE_HIERARCHY.indexOf(role);
}

/**
 * Check if user role meets minimum required role
 */
export function hasMinimumRole(userRole: UserRole | undefined, minRole: UserRole): boolean {
  const userLevel = getRoleLevel(userRole);
  const minLevel = getRoleLevel(minRole);
  return userLevel >= minLevel;
}

/**
 * Check if user has a specific permission
 */
export function hasPermission(userRole: UserRole | undefined, permission: string): boolean {
  if (!userRole) return false;
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(permission);
}

/**
 * Check if user has any of the given permissions
 */
export function hasAnyPermission(
  userRole: UserRole | undefined,
  permissions: string[]
): boolean {
  if (!userRole) return false;
  const userPermissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.some(permission => userPermissions.includes(permission));
}

/**
 * Check if user has all given permissions
 */
export function hasAllPermissions(
  userRole: UserRole | undefined,
  permissions: string[]
): boolean {
  if (!userRole) return false;
  const userPermissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.every(permission => userPermissions.includes(permission));
}
