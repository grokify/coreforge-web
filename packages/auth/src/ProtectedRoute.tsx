import { type ReactNode } from 'react';
import { useAuth } from './AuthProvider';
import type { Role, ProtectedRouteProps } from './types';
import { ROLE_LEVELS } from './types';

/**
 * Default loading component
 */
function DefaultLoading() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
      }}
    >
      <div>Loading...</div>
    </div>
  );
}

/**
 * Default unauthorized component
 */
function DefaultUnauthorized() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <h1>Access Denied</h1>
      <p>You do not have permission to view this page.</p>
    </div>
  );
}

/**
 * Check if user has required role in any of their memberships
 */
function hasRequiredRole(
  userRoles: Array<{ role: Role }>,
  requiredRoles: Role[]
): boolean {
  // Get the minimum required level
  const minRequiredLevel = Math.min(...requiredRoles.map((r) => ROLE_LEVELS[r]));

  // Check if user has any role >= required level
  return userRoles.some((membership) => {
    const userLevel = ROLE_LEVELS[membership.role];
    return userLevel >= minRequiredLevel;
  });
}

/**
 * Check if user is platform admin
 */
function isPlatformAdmin(userRoles: Array<{ role: Role }>): boolean {
  return userRoles.some((m) => m.role === 'platform_admin');
}

/**
 * ProtectedRoute - Protects routes requiring authentication and optionally specific roles
 *
 * @example Basic authentication check
 * ```tsx
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 * ```
 *
 * @example With role requirement
 * ```tsx
 * <ProtectedRoute roles={['admin', 'owner']}>
 *   <AdminPanel />
 * </ProtectedRoute>
 * ```
 *
 * @example With custom fallback
 * ```tsx
 * <ProtectedRoute
 *   roles={['owner']}
 *   fallback={<UpgradePrompt />}
 * >
 *   <BillingPage />
 * </ProtectedRoute>
 * ```
 */
export function ProtectedRoute({
  children,
  roles,
  fallback,
  loadingComponent,
}: ProtectedRouteProps): ReactNode {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return loadingComponent ?? <DefaultLoading />;
  }

  // Not authenticated - redirect to login will be handled by app
  if (!isAuthenticated || !user) {
    return fallback ?? <DefaultUnauthorized />;
  }

  // No role requirement - just needs to be authenticated
  if (!roles || roles.length === 0) {
    return <>{children}</>;
  }

  // Check role requirement
  const userMemberships = user.memberships.map((m) => ({ role: m.role }));

  // Platform admins bypass role checks
  if (isPlatformAdmin(userMemberships)) {
    return <>{children}</>;
  }

  // Check if user has required role
  if (hasRequiredRole(userMemberships, roles)) {
    return <>{children}</>;
  }

  // User doesn't have required role
  return fallback ?? <DefaultUnauthorized />;
}

/**
 * Hook to check if current user has specific roles
 *
 * @example
 * ```tsx
 * function EditButton() {
 *   const { hasRole } = usePermissions();
 *
 *   if (!hasRole(['admin', 'owner'])) {
 *     return null;
 *   }
 *
 *   return <button>Edit</button>;
 * }
 * ```
 */
export function usePermissions() {
  const { user, isAuthenticated } = useAuth();

  /**
   * Check if user has any of the specified roles
   */
  const hasRole = (requiredRoles: Role[]): boolean => {
    if (!isAuthenticated || !user) {
      return false;
    }

    const userMemberships = user.memberships.map((m) => ({ role: m.role }));

    // Platform admins have all roles
    if (isPlatformAdmin(userMemberships)) {
      return true;
    }

    return hasRequiredRole(userMemberships, requiredRoles);
  };

  /**
   * Check if user has a specific role in a specific organization
   */
  const hasRoleInOrg = (orgId: string, requiredRoles: Role[]): boolean => {
    if (!isAuthenticated || !user) {
      return false;
    }

    const membership = user.memberships.find((m) => m.organization_id === orgId);
    if (!membership) {
      return false;
    }

    // Platform admins have all roles
    if (membership.role === 'platform_admin') {
      return true;
    }

    const minRequiredLevel = Math.min(...requiredRoles.map((r) => ROLE_LEVELS[r]));
    return ROLE_LEVELS[membership.role] >= minRequiredLevel;
  };

  /**
   * Check if user is platform admin
   */
  const checkIsPlatformAdmin = (): boolean => {
    if (!isAuthenticated || !user) {
      return false;
    }

    return user.memberships.some((m) => m.role === 'platform_admin');
  };

  return {
    hasRole,
    hasRoleInOrg,
    isPlatformAdmin: checkIsPlatformAdmin,
  };
}
