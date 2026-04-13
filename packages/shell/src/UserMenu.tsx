import { useState, useRef, useEffect, type ReactNode } from 'react';
import { useAuth } from '@coreforge/auth';
import type { UserMenuProps, UserAction } from './types';

/**
 * Default user icon
 */
function DefaultUserIcon(): ReactNode {
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
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/**
 * Default user actions
 */
const defaultActions: UserAction[] = [
  { id: 'profile', label: 'Profile', href: '/settings/profile' },
  { id: 'settings', label: 'Settings', href: '/settings' },
];

/**
 * UserMenu - Dropdown menu for user actions
 *
 * @example
 * ```tsx
 * <UserMenu
 *   actions={[
 *     { id: 'profile', label: 'Profile', href: '/profile' },
 *     { id: 'logout', label: 'Logout', onClick: handleLogout, destructive: true },
 *   ]}
 * />
 * ```
 */
export function UserMenu({ actions = defaultActions, onNavigate }: UserMenuProps): ReactNode {
  const { user, logout, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Close dropdown when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  /**
   * Close on escape key
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (isLoading || !user) {
    return null;
  }

  const handleAction = (action: UserAction) => {
    if (action.onClick) {
      action.onClick();
    } else if (action.href) {
      if (onNavigate) {
        onNavigate(action.href);
      } else {
        window.location.assign(action.href);
      }
    }
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  // Combine custom actions with logout
  const allActions: UserAction[] = [
    ...actions,
    { id: 'logout', label: 'Sign out', onClick: handleLogout, destructive: true },
  ];

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '9999px',
          cursor: 'pointer',
        }}
      >
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={user.name}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '9999px',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '9999px',
              backgroundColor: 'var(--cf-color-primary-100, #dbeafe)',
              color: 'var(--cf-color-primary-700, #1d4ed8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <DefaultUserIcon />
          </div>
        )}
      </button>

      {isOpen && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            minWidth: '200px',
            backgroundColor: 'var(--cf-color-bg-primary, #ffffff)',
            border: '1px solid var(--cf-color-border-default, #e4e4e7)',
            borderRadius: '8px',
            boxShadow: 'var(--cf-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1))',
            zIndex: 'var(--cf-z-dropdown, 1000)',
            overflow: 'hidden',
          }}
        >
          {/* User info header */}
          <div
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--cf-color-border-default, #e4e4e7)',
            }}
          >
            <div
              style={{
                fontWeight: 500,
                color: 'var(--cf-color-fg-primary, #18181b)',
                fontSize: '14px',
              }}
            >
              {user.name}
            </div>
            <div
              style={{
                color: 'var(--cf-color-fg-secondary, #52525b)',
                fontSize: '12px',
                marginTop: '2px',
              }}
            >
              {user.email}
            </div>
          </div>

          {/* Actions */}
          <div style={{ padding: '4px' }}>
            {allActions.map((action, index) => {
              // Add separator before logout
              const showSeparator = action.id === 'logout' && index > 0;

              return (
                <div key={action.id}>
                  {showSeparator && (
                    <div
                      style={{
                        height: '1px',
                        backgroundColor: 'var(--cf-color-border-default, #e4e4e7)',
                        margin: '4px 0',
                      }}
                    />
                  )}
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => handleAction(action)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '8px 12px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: action.destructive
                        ? 'var(--cf-color-status-error, #dc2626)'
                        : 'var(--cf-color-fg-primary, #18181b)',
                      fontSize: '14px',
                    }}
                  >
                    {action.icon && (
                      <span
                        style={{
                          color: action.destructive
                            ? 'var(--cf-color-status-error, #dc2626)'
                            : 'var(--cf-color-fg-secondary, #52525b)',
                        }}
                      >
                        {action.icon}
                      </span>
                    )}
                    {action.label}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
