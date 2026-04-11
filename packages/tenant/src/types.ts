import type { Role } from '@coreforge/auth';

/**
 * Organization type
 */
export type OrganizationType = 'personal' | 'team' | 'enterprise';

/**
 * Organization representation
 */
export interface Organization {
  id: string;
  name: string;
  slug: string;
  type: OrganizationType;
  owner_id: string;
  logo_url?: string;
  settings?: OrganizationSettings;
  created_at: string;
  updated_at?: string;
}

/**
 * Organization settings
 */
export interface OrganizationSettings {
  theme?: {
    primaryColor?: string;
    logoUrl?: string;
  };
  features?: Record<string, boolean>;
}

/**
 * Organization membership with organization details
 */
export interface OrganizationMembership {
  id: string;
  organization: Organization;
  role: Role;
  joined_at: string;
}

/**
 * Member of an organization
 */
export interface Member {
  id: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatar_url?: string;
  };
  role: Role;
  joined_at: string;
}

/**
 * Invitation to join an organization
 */
export interface Invitation {
  id: string;
  organization_id: string;
  email: string;
  role: Role;
  inviter_id: string;
  inviter_name?: string;
  expires_at: string;
  created_at: string;
}

/**
 * TenantProvider configuration
 */
export interface TenantConfig {
  /**
   * localStorage key for persisting current org (default: "coreforge:current_org")
   */
  storageKey?: string;

  /**
   * Default organization ID (e.g., from URL)
   */
  defaultOrgId?: string;

  /**
   * Callback when organization changes
   */
  onOrgChange?: (org: Organization) => void;
}

/**
 * Tenant context value
 */
export interface TenantContextValue {
  /**
   * Current organization (may be null if user has no orgs)
   */
  currentOrg: Organization | null;

  /**
   * Set the current organization by ID
   */
  setCurrentOrg: (orgId: string) => void;

  /**
   * All organizations the user belongs to
   */
  organizations: Organization[];

  /**
   * Current user's membership in the current org
   */
  membership: OrganizationMembership | null;

  /**
   * Whether the current user is a platform admin
   */
  isPlatformAdmin: boolean;

  /**
   * Loading state
   */
  isLoading: boolean;
}

/**
 * RequireRole props
 */
export interface RequireRoleProps {
  children: React.ReactNode;
  roles: Role[];
  fallback?: React.ReactNode;
  orgId?: string;
}

/**
 * Create organization input
 */
export interface CreateOrganizationInput {
  name: string;
  type?: OrganizationType;
}

/**
 * Update organization input
 */
export interface UpdateOrganizationInput {
  name?: string;
  logo_url?: string;
  settings?: OrganizationSettings;
}

/**
 * Invite member input
 */
export interface InviteMemberInput {
  email: string;
  role: Role;
}
