import { useState, useRef, useEffect, type ReactNode } from 'react';
import { useTenant } from '@coreforge/tenant';
import type { OrgSwitcherProps } from './types';

/**
 * Default org icon
 */
function DefaultOrgIcon(): ReactNode {
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
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

/**
 * Chevron down icon
 */
function ChevronIcon(): ReactNode {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/**
 * Check icon
 */
function CheckIcon(): ReactNode {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/**
 * OrgSwitcher - Dropdown for switching between organizations
 *
 * @example
 * ```tsx
 * <OrgSwitcher />
 * ```
 */
export function OrgSwitcher({ compact = false }: OrgSwitcherProps): ReactNode {
  const { currentOrg, organizations, setCurrentOrg, isLoading } = useTenant();
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

  if (isLoading) {
    return (
      <div
        style={{
          padding: '8px 12px',
          backgroundColor: 'var(--cf-color-bg-secondary, #f4f4f5)',
          borderRadius: '6px',
          opacity: 0.5,
        }}
      >
        Loading...
      </div>
    );
  }

  if (!currentOrg) {
    return null;
  }

  const handleSelect = (orgId: string) => {
    setCurrentOrg(orgId);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: compact ? '8px' : '8px 12px',
          backgroundColor: 'var(--cf-color-bg-secondary, #f4f4f5)',
          border: '1px solid var(--cf-color-border-default, #e4e4e7)',
          borderRadius: '6px',
          cursor: 'pointer',
          minWidth: compact ? 'auto' : '180px',
          textAlign: 'left',
        }}
      >
        {currentOrg.logo_url ? (
          <img
            src={currentOrg.logo_url}
            alt=""
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '4px',
              objectFit: 'cover',
            }}
          />
        ) : (
          <span style={{ color: 'var(--cf-color-fg-secondary, #52525b)' }}>
            <DefaultOrgIcon />
          </span>
        )}

        {!compact && (
          <>
            <span
              style={{
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                color: 'var(--cf-color-fg-primary, #18181b)',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              {currentOrg.name}
            </span>
            <span style={{ color: 'var(--cf-color-fg-tertiary, #a1a1aa)' }}>
              <ChevronIcon />
            </span>
          </>
        )}
      </button>

      {isOpen && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: compact ? 'auto' : 0,
            marginTop: '4px',
            minWidth: '200px',
            backgroundColor: 'var(--cf-color-bg-primary, #ffffff)',
            border: '1px solid var(--cf-color-border-default, #e4e4e7)',
            borderRadius: '8px',
            boxShadow: 'var(--cf-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1))',
            zIndex: 'var(--cf-z-dropdown, 1000)',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '4px' }}>
            {organizations.map((org) => (
              <button
                key={org.id}
                type="button"
                role="option"
                aria-selected={org.id === currentOrg.id}
                onClick={() => handleSelect(org.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '8px 12px',
                  backgroundColor:
                    org.id === currentOrg.id
                      ? 'var(--cf-color-selected-bg, #eff6ff)'
                      : 'transparent',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {org.logo_url ? (
                  <img
                    src={org.logo_url}
                    alt=""
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '4px',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <span style={{ color: 'var(--cf-color-fg-secondary, #52525b)' }}>
                    <DefaultOrgIcon />
                  </span>
                )}

                <span
                  style={{
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    color: 'var(--cf-color-fg-primary, #18181b)',
                    fontSize: '14px',
                  }}
                >
                  {org.name}
                </span>

                {org.id === currentOrg.id && (
                  <span style={{ color: 'var(--cf-color-brand-primary, #2563eb)' }}>
                    <CheckIcon />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
