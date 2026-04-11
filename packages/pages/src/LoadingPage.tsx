import { type ReactNode } from 'react';
import type { LoadingPageProps } from './types';

/**
 * Spinner component
 */
function Spinner(): ReactNode {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      style={{
        animation: 'spin 1s linear infinite',
      }}
    >
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="var(--cf-color-border-default, #e4e4e7)"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="var(--cf-color-brand-primary, #2563eb)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * LoadingPage - Full page loading state
 *
 * @example
 * ```tsx
 * <LoadingPage message="Loading your workspace..." />
 * ```
 */
export function LoadingPage({ message = 'Loading...' }: LoadingPageProps): ReactNode {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: 'var(--cf-color-bg-secondary, #f4f4f5)',
      }}
    >
      <Spinner />

      <p
        style={{
          marginTop: '16px',
          fontSize: '14px',
          color: 'var(--cf-color-fg-secondary, #52525b)',
        }}
      >
        {message}
      </p>
    </div>
  );
}
