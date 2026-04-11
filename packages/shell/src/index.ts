/**
 * @coreforge/shell
 *
 * Application shell components for CoreForge applications.
 *
 * @example
 * ```tsx
 * import { AppShell } from '@coreforge/shell';
 *
 * function App() {
 *   return (
 *     <AuthProvider>
 *       <TenantProvider>
 *         <AppShell
 *           appName="My App"
 *           navigation={[
 *             {
 *               items: [
 *                 { id: 'home', label: 'Home', href: '/', icon: <HomeIcon /> },
 *                 { id: 'settings', label: 'Settings', href: '/settings' },
 *               ],
 *             },
 *           ]}
 *         >
 *           <Routes />
 *         </AppShell>
 *       </TenantProvider>
 *     </AuthProvider>
 *   );
 * }
 * ```
 *
 * @packageDocumentation
 */

// Main shell
export { AppShell } from './AppShell';

// Context
export { ShellProvider, useShell, useShellOptional } from './ShellContext';

// Components
export { Sidebar } from './Sidebar';
export { Navbar } from './Navbar';
export { OrgSwitcher } from './OrgSwitcher';
export { UserMenu } from './UserMenu';
export { Breadcrumbs } from './Breadcrumbs';

// Types
export type {
  NavItem,
  NavSection,
  BreadcrumbItem,
  UserAction,
  AppShellConfig,
  AppShellProps,
  SidebarProps,
  NavbarProps,
  OrgSwitcherProps,
  UserMenuProps,
  BreadcrumbsProps,
  ShellContextValue,
} from './types';
