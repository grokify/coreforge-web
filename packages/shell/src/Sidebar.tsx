import { type ReactNode } from 'react';
import { useRoleCheck } from '@coreforge/tenant';
import type { SidebarProps, NavItem, NavSection } from './types';

/**
 * Collapse icon
 */
function CollapseIcon({ collapsed }: { collapsed: boolean }): ReactNode {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: collapsed ? 'rotate(180deg)' : 'none',
        transition: 'transform 0.2s ease',
      }}
    >
      <polyline points="11 17 6 12 11 7" />
      <polyline points="18 17 13 12 18 7" />
    </svg>
  );
}

/**
 * External link icon
 */
function ExternalIcon(): ReactNode {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/**
 * NavItem component
 */
function NavItemComponent({
  item,
  isCollapsed,
  onNavigate,
  currentPath,
}: {
  item: NavItem;
  isCollapsed: boolean;
  onNavigate?: (href: string) => void;
  currentPath?: string;
}): ReactNode {
  const { hasRole } = useRoleCheck();

  // Check role access
  if (item.roles && !hasRole(item.roles as ('member' | 'admin' | 'owner')[])) {
    return null;
  }

  const isActive = item.isActive ?? currentPath === item.href;

  const handleClick = (event: React.MouseEvent) => {
    if (item.external) return; // Let browser handle external links

    event.preventDefault();
    if (onNavigate) {
      onNavigate(item.href);
    } else {
      window.location.assign(item.href);
    }
  };

  return (
    <a
      href={item.href}
      onClick={handleClick}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      title={isCollapsed ? item.label : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: isCollapsed ? '10px' : '10px 12px',
        marginBottom: '2px',
        backgroundColor: isActive ? 'var(--cf-color-selected-bg, #eff6ff)' : 'transparent',
        color: isActive
          ? 'var(--cf-color-brand-primary, #2563eb)'
          : 'var(--cf-color-fg-secondary, #52525b)',
        textDecoration: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: isActive ? 500 : 400,
        justifyContent: isCollapsed ? 'center' : 'flex-start',
        position: 'relative',
        transition: 'background-color 0.15s ease, color 0.15s ease',
      }}
    >
      {item.icon && (
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '20px',
            height: '20px',
            flexShrink: 0,
          }}
        >
          {item.icon}
        </span>
      )}

      {!isCollapsed && (
        <>
          <span style={{ flex: 1 }}>{item.label}</span>

          {item.badge !== undefined && (
            <span
              style={{
                padding: '2px 6px',
                backgroundColor: 'var(--cf-color-primary-100, #dbeafe)',
                color: 'var(--cf-color-primary-700, #1d4ed8)',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 500,
              }}
            >
              {item.badge}
            </span>
          )}

          {item.external && (
            <span style={{ color: 'var(--cf-color-fg-tertiary, #a1a1aa)' }}>
              <ExternalIcon />
            </span>
          )}
        </>
      )}
    </a>
  );
}

/**
 * NavSection component
 */
function NavSectionComponent({
  section,
  isCollapsed,
  onNavigate,
  currentPath,
}: {
  section: NavSection;
  isCollapsed: boolean;
  onNavigate?: (href: string) => void;
  currentPath?: string;
}): ReactNode {
  return (
    <div style={{ marginBottom: '16px' }}>
      {section.title && !isCollapsed && (
        <div
          style={{
            padding: '8px 12px',
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--cf-color-fg-tertiary, #a1a1aa)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {section.title}
        </div>
      )}

      {section.items.map((item) => (
        <NavItemComponent
          key={item.id}
          item={item}
          isCollapsed={isCollapsed}
          onNavigate={onNavigate}
          currentPath={currentPath}
        />
      ))}
    </div>
  );
}

/**
 * Sidebar - Main navigation sidebar
 *
 * @example
 * ```tsx
 * <Sidebar
 *   navigation={[
 *     {
 *       items: [
 *         { id: 'home', label: 'Home', href: '/', icon: <HomeIcon /> },
 *         { id: 'settings', label: 'Settings', href: '/settings', icon: <SettingsIcon /> },
 *       ],
 *     },
 *   ]}
 *   isCollapsed={false}
 * />
 * ```
 */
export function Sidebar({
  navigation,
  isCollapsed,
  onToggleCollapse,
  logo,
  logoCollapsed,
  onNavigate,
  currentPath,
}: SidebarProps): ReactNode {
  return (
    <aside
      style={{
        width: isCollapsed ? '64px' : '256px',
        height: '100vh',
        backgroundColor: 'var(--cf-color-bg-primary, #ffffff)',
        borderRight: '1px solid var(--cf-color-border-default, #e4e4e7)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s ease',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '16px',
          borderBottom: '1px solid var(--cf-color-border-default, #e4e4e7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'flex-start',
          height: '64px',
        }}
      >
        {isCollapsed ? logoCollapsed || logo : logo}
      </div>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          padding: '12px 8px',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {navigation.map((section, index) => (
          <NavSectionComponent
            key={section.title || index}
            section={section}
            isCollapsed={isCollapsed}
            onNavigate={onNavigate}
            currentPath={currentPath}
          />
        ))}
      </nav>

      {/* Collapse toggle */}
      {onToggleCollapse && (
        <div
          style={{
            padding: '12px 8px',
            borderTop: '1px solid var(--cf-color-border-default, #e4e4e7)',
          }}
        >
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              gap: '12px',
              width: '100%',
              padding: '10px 12px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              color: 'var(--cf-color-fg-secondary, #52525b)',
              fontSize: '14px',
            }}
          >
            <CollapseIcon collapsed={isCollapsed} />
            {!isCollapsed && <span>Collapse</span>}
          </button>
        </div>
      )}
    </aside>
  );
}
