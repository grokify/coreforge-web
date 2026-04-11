/**
 * @coreforge/tenant
 *
 * Multi-tenant context for CoreForge applications.
 *
 * @example
 * ```tsx
 * import { AuthProvider } from '@coreforge/auth';
 * import { TenantProvider, useOrganization, RequireRole } from '@coreforge/tenant';
 *
 * function App() {
 *   return (
 *     <AuthProvider>
 *       <TenantProvider>
 *         <OrgAwareApp />
 *       </TenantProvider>
 *     </AuthProvider>
 *   );
 * }
 *
 * function OrgAwareApp() {
 *   const { organization } = useOrganization();
 *
 *   return (
 *     <div>
 *       <h1>{organization?.name}</h1>
 *       <RequireRole roles={['admin']}>
 *         <AdminPanel />
 *       </RequireRole>
 *     </div>
 *   );
 * }
 * ```
 *
 * @packageDocumentation
 */

// Provider and main hook
export {
  TenantProvider,
  useTenant,
  useTenantOptional,
  ORG_CHANGE_EVENT,
} from './TenantProvider';
export type { TenantProviderProps } from './TenantProvider';

// Convenience hooks
export {
  useOrganization,
  useOrganizations,
  useCurrentOrg,
  useMembership,
  useOrgType,
} from './hooks';

// Role gating
export { RequireRole, useRoleCheck } from './RequireRole';

// Types
export type {
  Organization,
  OrganizationType,
  OrganizationMembership,
  OrganizationSettings,
  Member,
  Invitation,
  TenantConfig,
  TenantContextValue,
  RequireRoleProps,
  CreateOrganizationInput,
  UpdateOrganizationInput,
  InviteMemberInput,
} from './types';
