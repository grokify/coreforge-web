/**
 * @plexusone/pages
 *
 * Standard page components for SystemForge applications.
 *
 * @example
 * ```tsx
 * import { LoginPage, NotFoundPage, LoadingPage } from '@plexusone/pages';
 *
 * // Login page
 * <LoginPage
 *   appName="My App"
 *   oauthProviders={['github', 'google']}
 *   showEmailForm
 * />
 *
 * // 404 page
 * <NotFoundPage />
 *
 * // Loading page
 * <LoadingPage message="Loading your workspace..." />
 * ```
 *
 * @packageDocumentation
 */

// Auth pages
export { LoginPage } from './LoginPage';

// Error pages
export { ErrorPage, NotFoundPage, ServerErrorPage } from './ErrorPage';

// Utility pages
export { MaintenancePage } from './MaintenancePage';
export { LoadingPage } from './LoadingPage';

// Settings pages
export { UserSettingsPage } from './UserSettingsPage';

// Organization management pages
export { OrganizationMembersPage } from './OrganizationMembersPage';
export { OrganizationInvitationsPage } from './OrganizationInvitationsPage';
export { OrganizationSettingsPage } from './OrganizationSettingsPage';

// Types
export type {
  LoginPageProps,
  RegisterPageProps,
  ForgotPasswordPageProps,
  ResetPasswordPageProps,
  ErrorPageProps,
  NotFoundPageProps,
  ServerErrorPageProps,
  MaintenancePageProps,
  LoadingPageProps,
  UserSettingsPageProps,
  SettingsTab,
  // Organization management types
  OrgSettingsTab,
  MemberRole,
  OrgMember,
  OrgInvitation,
  OrganizationMembersPageProps,
  OrganizationInvitationsPageProps,
  OrganizationSettingsPageProps,
} from './types';
