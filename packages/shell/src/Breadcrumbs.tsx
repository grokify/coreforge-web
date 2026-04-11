import { type ReactNode } from 'react';
import type { BreadcrumbsProps } from './types';

/**
 * Home icon
 */
function HomeIcon(): ReactNode {
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
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

/**
 * Default separator
 */
function DefaultSeparator(): ReactNode {
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
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/**
 * Breadcrumbs - Navigation breadcrumb trail
 *
 * @example
 * ```tsx
 * <Breadcrumbs
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Settings', href: '/settings' },
 *     { label: 'Profile' },
 *   ]}
 * />
 * ```
 */
export function Breadcrumbs({
  items,
  onNavigate,
  separator = <DefaultSeparator />,
  maxItems,
}: BreadcrumbsProps): ReactNode {
  if (items.length === 0) {
    return null;
  }

  const handleClick = (href: string | undefined, event: React.MouseEvent) => {
    if (!href) return;

    event.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    } else {
      window.location.assign(href);
    }
  };

  // Collapse items if maxItems specified
  let displayItems = items;
  let collapsed = false;

  if (maxItems && items.length > maxItems) {
    collapsed = true;
    displayItems = [
      items[0],
      { label: '...', href: undefined },
      ...items.slice(-(maxItems - 2)),
    ];
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          fontSize: '14px',
        }}
      >
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isFirst = index === 0;
          const isCollapsed = collapsed && index === 1;

          return (
            <li
              key={`${item.label}-${index}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {index > 0 && (
                <span
                  style={{
                    color: 'var(--cf-color-fg-tertiary, #a1a1aa)',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  aria-hidden="true"
                >
                  {separator}
                </span>
              )}

              {isCollapsed ? (
                <span
                  style={{
                    color: 'var(--cf-color-fg-tertiary, #a1a1aa)',
                    padding: '2px 4px',
                  }}
                >
                  {item.label}
                </span>
              ) : item.href && !isLast ? (
                <a
                  href={item.href}
                  onClick={(e) => handleClick(item.href, e)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--cf-color-fg-secondary, #52525b)',
                    textDecoration: 'none',
                    padding: '2px 4px',
                    borderRadius: '4px',
                  }}
                >
                  {isFirst && !item.icon && <HomeIcon />}
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ) : (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: isLast
                      ? 'var(--cf-color-fg-primary, #18181b)'
                      : 'var(--cf-color-fg-secondary, #52525b)',
                    fontWeight: isLast ? 500 : 400,
                    padding: '2px 4px',
                  }}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {isFirst && !item.icon && <HomeIcon />}
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
