import { type ReactNode } from 'react';
import type { MaintenancePageProps } from './types';

/**
 * Maintenance icon
 */
function MaintenanceIcon(): ReactNode {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: 'var(--cf-color-warning-500, #f59e0b)' }}
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

/**
 * MaintenancePage - Scheduled maintenance page
 *
 * @example
 * ```tsx
 * <MaintenancePage
 *   appName="My App"
 *   returnTime="2 hours"
 * />
 * ```
 */
export function MaintenancePage({
  appName = 'CoreForge',
  logo,
  title = 'Under Maintenance',
  message = "We're performing scheduled maintenance. We'll be back shortly.",
  returnTime,
}: MaintenancePageProps): ReactNode {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: 'var(--cf-color-bg-secondary, #f4f4f5)',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          maxWidth: '480px',
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: '32px' }}>
          {logo || (
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: 'var(--cf-color-fg-primary, #18181b)',
                margin: 0,
              }}
            >
              {appName}
            </h1>
          )}
        </div>

        {/* Icon */}
        <div style={{ marginBottom: '24px' }}>
          <MaintenanceIcon />
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 600,
            color: 'var(--cf-color-fg-primary, #18181b)',
            margin: '0 0 12px 0',
          }}
        >
          {title}
        </h2>

        {/* Message */}
        <p
          style={{
            fontSize: '16px',
            color: 'var(--cf-color-fg-secondary, #52525b)',
            margin: '0 0 24px 0',
            lineHeight: 1.6,
          }}
        >
          {message}
        </p>

        {/* Return time */}
        {returnTime && (
          <div
            style={{
              padding: '16px 24px',
              backgroundColor: 'var(--cf-color-warning-50, #fffbeb)',
              border: '1px solid var(--cf-color-warning-200, #fde68a)',
              borderRadius: '8px',
              display: 'inline-block',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '14px',
                color: 'var(--cf-color-warning-700, #b45309)',
              }}
            >
              Expected back in: <strong>{returnTime}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
