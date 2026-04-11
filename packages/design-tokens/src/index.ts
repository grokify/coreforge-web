/**
 * @coreforge/design-tokens
 *
 * Design tokens and CSS custom properties for CoreForge applications.
 *
 * @example Using tokens in JavaScript/TypeScript
 * ```ts
 * import { colors, spacing, typography } from '@coreforge/design-tokens';
 *
 * const styles = {
 *   color: colors.primary[500],
 *   padding: spacing[4],
 *   fontSize: typography.fontSizes.base,
 * };
 * ```
 *
 * @example Using CSS custom properties
 * ```css
 * @import '@coreforge/design-tokens/css';
 *
 * .my-component {
 *   color: var(--cf-color-fg-primary);
 *   padding: var(--cf-spacing-4);
 *   font-size: var(--cf-font-size-base);
 * }
 * ```
 *
 * @packageDocumentation
 */

// Colors
export {
  colors,
  gray,
  primary,
  success,
  warning,
  error,
  info,
  lightMode,
  darkMode,
} from './colors';
export type { ColorScale, SemanticColors } from './colors';

// Spacing
export { spacing, spacingValues, spacingPresets } from './spacing';
export type { SpacingKey, SpacingValue } from './spacing';

// Typography
export {
  typography,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  textStyles,
} from './typography';

// Shadows
export { shadows, shadowsDark, focusRings } from './shadows';
export type { ShadowKey, ShadowValue } from './shadows';

// Border radii
export { radii, radiusPresets } from './radii';
export type { RadiusKey, RadiusValue } from './radii';

// Breakpoints
export {
  breakpoints,
  mediaQueries,
  containers,
  layoutWidths,
} from './breakpoints';
export type { BreakpointKey, ContainerKey } from './breakpoints';

// Animations
export {
  durations,
  easings,
  transitions,
  keyframes,
  animations,
} from './animations';
export type { DurationKey, EasingKey, TransitionKey } from './animations';

// Z-index
export { zIndices } from './z-index';
export type { ZIndexKey, ZIndexValue } from './z-index';
