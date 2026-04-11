/**
 * Responsive breakpoints for CoreForge applications
 */

/**
 * Breakpoint values in pixels
 */
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Breakpoint media queries (min-width)
 */
export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,
} as const;

/**
 * Container max-widths
 */
export const containers = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%',
  prose: '65ch',
} as const;

/**
 * Layout widths
 */
export const layoutWidths = {
  sidebar: '256px',
  sidebarCollapsed: '64px',
  navbar: '64px',
  content: '1200px',
} as const;

export type BreakpointKey = keyof typeof breakpoints;
export type ContainerKey = keyof typeof containers;
