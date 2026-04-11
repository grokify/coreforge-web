/**
 * Color palette for CoreForge applications
 *
 * Based on a neutral gray scale with customizable brand colors.
 * All colors support light and dark mode variants.
 */

/**
 * Gray scale (neutral)
 */
export const gray = {
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d4d4d8',
  400: '#a1a1aa',
  500: '#71717a',
  600: '#52525b',
  700: '#3f3f46',
  800: '#27272a',
  900: '#18181b',
  950: '#09090b',
} as const;

/**
 * Primary brand color (blue by default)
 */
export const primary = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
  950: '#172554',
} as const;

/**
 * Success color (green)
 */
export const success = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
  950: '#052e16',
} as const;

/**
 * Warning color (amber)
 */
export const warning = {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
  950: '#451a03',
} as const;

/**
 * Error/danger color (red)
 */
export const error = {
  50: '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
  950: '#450a0a',
} as const;

/**
 * Info color (cyan)
 */
export const info = {
  50: '#ecfeff',
  100: '#cffafe',
  200: '#a5f3fc',
  300: '#67e8f9',
  400: '#22d3ee',
  500: '#06b6d4',
  600: '#0891b2',
  700: '#0e7490',
  800: '#155e75',
  900: '#164e63',
  950: '#083344',
} as const;

/**
 * Semantic color mappings for light mode
 */
export const lightMode = {
  // Backgrounds
  bgPrimary: '#ffffff',
  bgSecondary: gray[50],
  bgTertiary: gray[100],
  bgInverse: gray[900],
  bgOverlay: 'rgba(0, 0, 0, 0.5)',

  // Foregrounds (text)
  fgPrimary: gray[900],
  fgSecondary: gray[600],
  fgTertiary: gray[400],
  fgInverse: '#ffffff',
  fgMuted: gray[500],

  // Borders
  borderDefault: gray[200],
  borderStrong: gray[300],
  borderFocus: primary[500],

  // Interactive states
  hoverBg: gray[100],
  activeBg: gray[200],
  selectedBg: primary[50],

  // Brand
  brandPrimary: primary[600],
  brandPrimaryHover: primary[700],
  brandPrimaryActive: primary[800],

  // Status
  statusSuccess: success[600],
  statusSuccessBg: success[50],
  statusWarning: warning[600],
  statusWarningBg: warning[50],
  statusError: error[600],
  statusErrorBg: error[50],
  statusInfo: info[600],
  statusInfoBg: info[50],
} as const;

/**
 * Semantic color mappings for dark mode
 */
export const darkMode = {
  // Backgrounds
  bgPrimary: gray[900],
  bgSecondary: gray[800],
  bgTertiary: gray[700],
  bgInverse: gray[50],
  bgOverlay: 'rgba(0, 0, 0, 0.7)',

  // Foregrounds (text)
  fgPrimary: gray[50],
  fgSecondary: gray[300],
  fgTertiary: gray[500],
  fgInverse: gray[900],
  fgMuted: gray[400],

  // Borders
  borderDefault: gray[700],
  borderStrong: gray[600],
  borderFocus: primary[400],

  // Interactive states
  hoverBg: gray[800],
  activeBg: gray[700],
  selectedBg: primary[900],

  // Brand
  brandPrimary: primary[500],
  brandPrimaryHover: primary[400],
  brandPrimaryActive: primary[300],

  // Status
  statusSuccess: success[500],
  statusSuccessBg: success[950],
  statusWarning: warning[500],
  statusWarningBg: warning[950],
  statusError: error[500],
  statusErrorBg: error[950],
  statusInfo: info[500],
  statusInfoBg: info[950],
} as const;

/**
 * All color tokens
 */
export const colors = {
  gray,
  primary,
  success,
  warning,
  error,
  info,
  light: lightMode,
  dark: darkMode,
} as const;

export type ColorScale = typeof gray;
export type SemanticColors = typeof lightMode;
