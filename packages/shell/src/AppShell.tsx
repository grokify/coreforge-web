import { type ReactNode } from 'react';
import type { AppShellProps } from './types';
import { ShellProvider, useShell } from './ShellContext';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

/**
 * Inner shell component (uses context)
 */
function AppShellInner({
  children,
  appName,
  logo,
  logoCollapsed,
  navigation = [],
  userActions,
  sidebarCollapsible = true,
  showOrgSwitcher = true,
}: AppShellProps): ReactNode {
  const {
    sidebarCollapsed,
    toggleSidebar,
    sidebarVisible,
    toggleSidebarVisible,
    currentPath,
    navigate,
  } = useShell();

  // Default logo if not provided
  const defaultLogo = (
    <div
      style={{
        fontWeight: 600,
        fontSize: '18px',
        color: 'var(--cf-color-fg-primary, #18181b)',
      }}
    >
      {appName}
    </div>
  );

  const defaultLogoCollapsed = (
    <div
      style={{
        fontWeight: 700,
        fontSize: '18px',
        color: 'var(--cf-color-brand-primary, #2563eb)',
      }}
    >
      {appName.charAt(0)}
    </div>
  );

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'var(--cf-color-bg-secondary, #f4f4f5)',
      }}
    >
      {/* Sidebar */}
      <Sidebar
        navigation={navigation}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={sidebarCollapsible ? toggleSidebar : undefined}
        logo={logo || defaultLogo}
        logoCollapsed={logoCollapsed || defaultLogoCollapsed}
        onNavigate={navigate}
        currentPath={currentPath}
      />

      {/* Mobile sidebar overlay */}
      {sidebarVisible && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 'var(--cf-z-overlay, 1300)',
          }}
          onClick={toggleSidebarVisible}
        />
      )}

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        {/* Navbar */}
        <Navbar
          showOrgSwitcher={showOrgSwitcher}
          userActions={userActions}
          onToggleSidebar={toggleSidebarVisible}
          onNavigate={navigate}
        />

        {/* Main content */}
        <main
          style={{
            flex: 1,
            padding: '24px',
            overflowY: 'auto',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

/**
 * AppShell - Main application shell with sidebar, navbar, and content area
 *
 * @example
 * ```tsx
 * <AppShell
 *   appName="My App"
 *   navigation={[
 *     {
 *       items: [
 *         { id: 'home', label: 'Home', href: '/', icon: <HomeIcon /> },
 *         { id: 'settings', label: 'Settings', href: '/settings', icon: <SettingsIcon /> },
 *       ],
 *     },
 *   ]}
 * >
 *   <Dashboard />
 * </AppShell>
 * ```
 */
export function AppShell(props: AppShellProps): ReactNode {
  return (
    <ShellProvider
      defaultCollapsed={props.defaultCollapsed}
      onNavigate={props.onNavigate}
      onCollapseChange={props.onCollapseChange}
    >
      <AppShellInner {...props} />
    </ShellProvider>
  );
}
