/**
 * Border radius tokens for CoreForge applications
 */

/**
 * Border radii
 */
export const radii = {
  none: '0px',
  sm: '2px',
  default: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px',
} as const;

/**
 * Common radius presets
 */
export const radiusPresets = {
  button: radii.md,
  input: radii.md,
  card: radii.lg,
  modal: radii.xl,
  badge: radii.full,
  avatar: radii.full,
  tooltip: radii.md,
} as const;

export type RadiusKey = keyof typeof radii;
export type RadiusValue = (typeof radii)[RadiusKey];
