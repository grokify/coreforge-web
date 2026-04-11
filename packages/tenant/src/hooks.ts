import { useTenant } from './TenantProvider';
import type { Organization, OrganizationMembership } from './types';

/**
 * Hook to get current organization
 *
 * @example
 * ```tsx
 * function OrgBadge() {
 *   const { organization, isLoading } = useOrganization();
 *
 *   if (isLoading) return <Skeleton />;
 *
 *   return <Badge>{organization?.name}</Badge>;
 * }
 * ```
 */
export function useOrganization(): {
  organization: Organization | null;
  isLoading: boolean;
} {
  const { currentOrg, isLoading } = useTenant();

  return {
    organization: currentOrg,
    isLoading,
  };
}

/**
 * Hook to get all user's organizations
 *
 * @example
 * ```tsx
 * function OrgList() {
 *   const { organizations, isLoading } = useOrganizations();
 *
 *   return (
 *     <ul>
 *       {organizations.map(org => (
 *         <li key={org.id}>{org.name}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export function useOrganizations(): {
  organizations: Organization[];
  isLoading: boolean;
} {
  const { organizations, isLoading } = useTenant();

  return {
    organizations,
    isLoading,
  };
}

/**
 * Hook to get and set current organization
 *
 * @example
 * ```tsx
 * function OrgSwitcher() {
 *   const { currentOrg, setCurrentOrg } = useCurrentOrg();
 *   const { organizations } = useOrganizations();
 *
 *   return (
 *     <select
 *       value={currentOrg?.id}
 *       onChange={(e) => setCurrentOrg(e.target.value)}
 *     >
 *       {organizations.map(org => (
 *         <option key={org.id} value={org.id}>{org.name}</option>
 *       ))}
 *     </select>
 *   );
 * }
 * ```
 */
export function useCurrentOrg(): {
  currentOrg: Organization | null;
  setCurrentOrg: (orgId: string) => void;
} {
  const { currentOrg, setCurrentOrg } = useTenant();

  return {
    currentOrg,
    setCurrentOrg,
  };
}

/**
 * Hook to get current user's membership in current org
 *
 * @example
 * ```tsx
 * function RoleBadge() {
 *   const { membership, isPlatformAdmin } = useMembership();
 *
 *   if (isPlatformAdmin) {
 *     return <Badge color="red">Platform Admin</Badge>;
 *   }
 *
 *   return <Badge>{membership?.role}</Badge>;
 * }
 * ```
 */
export function useMembership(): {
  membership: OrganizationMembership | null;
  isPlatformAdmin: boolean;
} {
  const { membership, isPlatformAdmin } = useTenant();

  return {
    membership,
    isPlatformAdmin,
  };
}

/**
 * Hook to check if current org is of a specific type
 *
 * @example
 * ```tsx
 * function EnterpriseFeature() {
 *   const { isEnterprise } = useOrgType();
 *
 *   if (!isEnterprise) {
 *     return <UpgradePrompt />;
 *   }
 *
 *   return <EnterpriseContent />;
 * }
 * ```
 */
export function useOrgType(): {
  isPersonal: boolean;
  isTeam: boolean;
  isEnterprise: boolean;
} {
  const { currentOrg } = useTenant();

  return {
    isPersonal: currentOrg?.type === 'personal',
    isTeam: currentOrg?.type === 'team',
    isEnterprise: currentOrg?.type === 'enterprise',
  };
}
