/**
 * Authentication and Authorization Configuration
 * Central place to define roles, permissions, and route access
 */

// Role hierarchy - higher index = higher privilege
export const ROLE_HIERARCHY = [
  'VIEWER',
  'USER',
  'OFFICE_MANAGER',
  'DEPARTMENT_ADMIN',
  'FACULTY_ADMIN',
  'ADMIN',
  'SUPER_ADMIN',
] as const;

export type UserRole = (typeof ROLE_HIERARCHY)[number];

/**
 * Define which roles can access which routes
 * Format: { path: string, minRole: UserRole }
 * minRole = minimum required role (uses hierarchy)
 */
export const ROUTE_ACCESS_CONFIG: Array<{
  path: string;
  minRole: UserRole;
}> = [
  // Admin routes
  { path: '/settings', minRole: 'ADMIN' },
  { path: '/users', minRole: 'ADMIN' },
  { path: '/logs', minRole: 'ADMIN' },
  
  // Super Admin routes
  { path: '/system', minRole: 'SUPER_ADMIN' },
  
  // Office Manager routes
  { path: '/distributions', minRole: 'OFFICE_MANAGER' },
  
  // All authenticated users can access these (USER role minimum)
  { path: '/dashboard', minRole: 'VIEWER' },
];

/**
 * Define permissions for each role
 * This can be used for feature-level access control
 */
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  VIEWER: [
    'view_inventory',
    'view_reports',
  ],
  USER: [
    'view_inventory',
    'view_reports',
    'create_movement',
  ],
  OFFICE_MANAGER: [
    'view_inventory',
    'view_reports',
    'create_movement',
    'manage_office_inventory',
    'create_distribution',
  ],
  DEPARTMENT_ADMIN: [
    'view_inventory',
    'view_reports',
    'create_movement',
    'manage_office_inventory',
    'create_distribution',
    'manage_department',
  ],
  FACULTY_ADMIN: [
    'view_inventory',
    'view_reports',
    'create_movement',
    'manage_office_inventory',
    'create_distribution',
    'manage_department',
    'manage_faculty',
  ],
  ADMIN: [
    'view_inventory',
    'view_reports',
    'create_movement',
    'manage_office_inventory',
    'create_distribution',
    'manage_department',
    'manage_faculty',
    'manage_users',
    'view_logs',
    'manage_settings',
  ],
  SUPER_ADMIN: [
    'view_inventory',
    'view_reports',
    'create_movement',
    'manage_office_inventory',
    'create_distribution',
    'manage_department',
    'manage_faculty',
    'manage_users',
    'view_logs',
    'manage_settings',
    'manage_system',
    'manage_roles',
  ],
};

/**
 * Public paths that don't require authentication
 */
export const PUBLIC_PATHS = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
];

/**
 * Static paths and Next.js internals to skip middleware
 */
export const STATIC_PATHS = [
  '/_next',
  '/favicon.ico',
  '/api',
];
