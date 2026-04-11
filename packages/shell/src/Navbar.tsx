import { type ReactNode } from 'react';
import type { NavbarProps } from './types';
import { OrgSwitcher } from './OrgSwitcher';
import { UserMenu } from './UserMenu';
import { Breadcrumbs } from './Breadcrumbs';

/**
 * Menu icon
 */
function MenuIcon(): ReactNode {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

/**
 * Navbar - Top navigation bar
 *
 * @example
 * ```tsx
 * <Navbar
 *   showOrgSwitcher
 *   breadcrumbs={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Dashboard' },
 *   ]}
 * />
 * ```
 */
export function Navbar({
  showOrgSwitcher = true,
  userActions,
  breadcrumbs,
  onToggleSidebar,
  onNavigate,
}: NavbarProps): ReactNode {
  return (
    <header
      style={{
        height: '64px',
        backgroundColor: 'var(--cf-color-bg-primary, #ffffff)',
        borderBottom: '1px solid var(--cf-color-border-default, #e4e4e7)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '16px',
      }}
    >
      {/* Mobile menu toggle */}
      {onToggleSidebar && (
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            color: 'var(--cf-color-fg-secondary, #52525b)',
          }}
        >
          <MenuIcon />
        </button>
      )}

      {/* Org switcher */}
      {showOrgSwitcher && <OrgSwitcher onNavigate={onNavigate} />}

      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div style={{ flex: 1 }}>
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />
        </div>
      )}

      {/* Spacer if no breadcrumbs */}
      {(!breadcrumbs || breadcrumbs.length === 0) && <div style={{ flex: 1 }} />}

      {/* User menu */}
      <UserMenu actions={userActions} onNavigate={onNavigate} />
    </header>
  );
}
