import { type ReactNode } from 'react';
import { Button, MenuIcon } from '@plexusone/ui';
import type { NavbarProps } from './types';
import { OrgSwitcher } from './OrgSwitcher';
import { UserMenu } from './UserMenu';
import { Breadcrumbs } from './Breadcrumbs';

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
    <header className="h-16 bg-background border-b border-border flex items-center px-4 gap-4">
      {/* Mobile menu toggle */}
      {onToggleSidebar && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="md:hidden"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
      )}

      {/* Org switcher */}
      {showOrgSwitcher && <OrgSwitcher onNavigate={onNavigate} />}

      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="flex-1">
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />
        </div>
      )}

      {/* Spacer if no breadcrumbs */}
      {(!breadcrumbs || breadcrumbs.length === 0) && <div className="flex-1" />}

      {/* User menu */}
      <UserMenu actions={userActions} onNavigate={onNavigate} />
    </header>
  );
}
