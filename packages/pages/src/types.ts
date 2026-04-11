import type { ReactNode } from 'react';
import type { OAuthProvider } from '@coreforge/auth';

/**
 * Login page props
 */
export interface LoginPageProps {
  /**
   * Application name
   */
  appName?: string;

  /**
   * Application logo
   */
  logo?: ReactNode;

  /**
   * Available OAuth providers
   */
  oauthProviders?: OAuthProvider[];

  /**
   * Show email/password form
   */
  showEmailForm?: boolean;

  /**
   * Show registration link
   */
  showRegisterLink?: boolean;

  /**
   * URL to redirect after login
   */
  redirectUrl?: string;

  /**
   * Custom navigation handler
   */
  onNavigate?: (href: string) => void;

  /**
   * Registration page URL
   */
  registerUrl?: string;

  /**
   * Forgot password page URL
   */
  forgotPasswordUrl?: string;
}

/**
 * Register page props
 */
export interface RegisterPageProps {
  /**
   * Application name
   */
  appName?: string;

  /**
   * Application logo
   */
  logo?: ReactNode;

  /**
   * Available OAuth providers
   */
  oauthProviders?: OAuthProvider[];

  /**
   * URL to redirect after registration
   */
  redirectUrl?: string;

  /**
   * Custom navigation handler
   */
  onNavigate?: (href: string) => void;

  /**
   * Login page URL
   */
  loginUrl?: string;
}

/**
 * Forgot password page props
 */
export interface ForgotPasswordPageProps {
  /**
   * Application name
   */
  appName?: string;

  /**
   * Application logo
   */
  logo?: ReactNode;

  /**
   * Custom navigation handler
   */
  onNavigate?: (href: string) => void;

  /**
   * Login page URL
   */
  loginUrl?: string;
}

/**
 * Reset password page props
 */
export interface ResetPasswordPageProps {
  /**
   * Reset token from URL
   */
  token: string;

  /**
   * Application name
   */
  appName?: string;

  /**
   * Application logo
   */
  logo?: ReactNode;

  /**
   * Custom navigation handler
   */
  onNavigate?: (href: string) => void;

  /**
   * Login page URL
   */
  loginUrl?: string;
}

/**
 * Error page props
 */
export interface ErrorPageProps {
  /**
   * Error code (404, 500, etc.)
   */
  code?: number | string;

  /**
   * Error title
   */
  title?: string;

  /**
   * Error message
   */
  message?: string;

  /**
   * Show "Go home" button
   */
  showHomeButton?: boolean;

  /**
   * Show "Go back" button
   */
  showBackButton?: boolean;

  /**
   * Custom action buttons
   */
  actions?: ReactNode;

  /**
   * Custom navigation handler
   */
  onNavigate?: (href: string) => void;

  /**
   * Home page URL
   */
  homeUrl?: string;
}

/**
 * Not found (404) page props
 */
export interface NotFoundPageProps extends Omit<ErrorPageProps, 'code' | 'title' | 'message'> {
  title?: string;
  message?: string;
}

/**
 * Server error (500) page props
 */
export interface ServerErrorPageProps extends Omit<ErrorPageProps, 'code' | 'title' | 'message'> {
  title?: string;
  message?: string;
}

/**
 * Maintenance page props
 */
export interface MaintenancePageProps {
  /**
   * Application name
   */
  appName?: string;

  /**
   * Application logo
   */
  logo?: ReactNode;

  /**
   * Custom title
   */
  title?: string;

  /**
   * Custom message
   */
  message?: string;

  /**
   * Expected return time
   */
  returnTime?: string;
}

/**
 * Loading page props
 */
export interface LoadingPageProps {
  /**
   * Loading message
   */
  message?: string;
}

/**
 * Settings tab
 */
export type SettingsTab = 'profile' | 'security' | 'accounts';

/**
 * User settings page props
 */
export interface UserSettingsPageProps {
  /**
   * Currently active tab
   */
  activeTab?: SettingsTab;

  /**
   * Available tabs (default: all)
   */
  tabs?: SettingsTab[];

  /**
   * Custom navigation handler
   */
  onNavigate?: (href: string) => void;

  /**
   * Callback when tab changes
   */
  onTabChange?: (tab: SettingsTab) => void;

  /**
   * BFF base URL
   */
  bffBaseUrl?: string;

  /**
   * Available OAuth providers for linking
   */
  oauthProviders?: OAuthProvider[];
}
