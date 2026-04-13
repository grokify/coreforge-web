import { type ReactNode } from 'react';
import { ROLE_LEVELS, type Role } from '@coreforge/auth';
import { useTenant } from './TenantProvider';
import type { RequireRoleProps } from './types';

/**
 * Default fallback for RequireRole
 */
function DefaultFallback() {
  return null;
}

/**
 * RequireRole - Conditionally renders children based on role
 *
 * Unlike ProtectedRoute, this component doesn't redirect - it simply
 * hides/shows content based on role.
 *
 * @example Basic usage
 * ```tsx
 * <RequireRole roles={['admin', 'owner']}>
 *   <DeleteButton />
 * </RequireRole>
 * ```
 *
 * @example With fallback
 * ```tsx
 * <RequireRole
 *   roles={['owner']}
 *   fallback={<p>Only owners can access this feature.</p>}
 * >
 *   <BillingSettings />
 * </RequireRole>
 * ```
 *
 * @example With specific org
 * ```tsx
 * <RequireRole roles={['admin']} orgId="org_123">
 *   <OrgSettings />
 * </RequireRole>
 * ```
 */
export function RequireRole({
  children,
  roles,
  fallback = <DefaultFallback />,
  orgId,
}: RequireRoleProps): ReactNode {
  const { membership, isPlatformAdmin, currentOrg } = useTenant();

  // Platform admins always have access
  if (isPlatformAdmin) {
    return <>{children}</>;
  }

  // Check if we're checking a specific org or current org
  const targetOrgId = orgId || currentOrg?.id;

  // No org context
  if (!targetOrgId) {
    return fallback;
  }

  // No membership in current org
  if (!membership || membership.organization.id !== targetOrgId) {
    return fallback;
  }

  // Get minimum required level
  const minRequiredLevel = Math.min(...roles.map((r) => ROLE_LEVELS[r]));
  const userLevel = ROLE_LEVELS[membership.role as Role];

  // Check if user has required role
  if (userLevel >= minRequiredLevel) {
    return <>{children}</>;
  }

  return fallback;
}

/**
 * Hook to check role requirements
 *
 * @example
 * ```tsx
 * function ActionButtons() {
 *   const { hasRole } = useRoleCheck();
 *
 *   return (
 *     <div>
 *       {hasRole(['member']) && <EditButton />}
 *       {hasRole(['admin']) && <SettingsButton />}
 *       {hasRole(['owner']) && <DeleteButton />}
 *     </div>
 *   );
 * }
 * ```
 */
export function useRoleCheck() {
  const { membership, isPlatformAdmin, currentOrg } = useTenant();

  /**
   * Check if user has any of the specified roles in the current org
   */
  const hasRole = (requiredRoles: Role[]): boolean => {
    // Platform admins always pass
    if (isPlatformAdmin) {
      return true;
    }

    // No membership
    if (!membership) {
      return false;
    }

    const minRequiredLevel = Math.min(...requiredRoles.map((r) => ROLE_LEVELS[r]));
    const userLevel = ROLE_LEVELS[membership.role as Role];

    return userLevel >= minRequiredLevel;
  };

  /**
   * Check if user has role in a specific org
   */
  const hasRoleInOrg = (orgId: string, requiredRoles: Role[]): boolean => {
    // Platform admins always pass
    if (isPlatformAdmin) {
      return true;
    }

    // Check if membership matches the org
    if (!membership || membership.organization.id !== orgId) {
      return false;
    }

    const minRequiredLevel = Math.min(...requiredRoles.map((r) => ROLE_LEVELS[r]));
    const userLevel = ROLE_LEVELS[membership.role as Role];

    return userLevel >= minRequiredLevel;
  };

  /**
   * Check if user is owner of current org
   */
  const isOwner = (): boolean => {
    return hasRole(['owner']);
  };

  /**
   * Check if user is admin of current org
   */
  const isAdmin = (): boolean => {
    return hasRole(['admin']);
  };

  /**
   * Check if user is member of current org
   */
  const isMember = (): boolean => {
    return hasRole(['member']);
  };

  return {
    hasRole,
    hasRoleInOrg,
    isOwner,
    isAdmin,
    isMember,
    isPlatformAdmin,
    currentOrg,
  };
}
