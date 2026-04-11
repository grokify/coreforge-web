/**
 * Spacing scale for CoreForge applications
 *
 * Based on a 4px base unit with a consistent scale.
 */

/**
 * Spacing values in pixels
 */
export const spacing = {
  0: '0px',
  px: '1px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  36: '144px',
  40: '160px',
  44: '176px',
  48: '192px',
  52: '208px',
  56: '224px',
  60: '240px',
  64: '256px',
  72: '288px',
  80: '320px',
  96: '384px',
} as const;

/**
 * Spacing as numbers (for calculations)
 */
export const spacingValues = {
  0: 0,
  px: 1,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
} as const;

/**
 * Common spacing presets
 */
export const spacingPresets = {
  /** Inline spacing between small elements */
  inlineXs: spacing[1],
  /** Inline spacing between elements */
  inlineSm: spacing[2],
  /** Standard inline spacing */
  inline: spacing[3],
  /** Large inline spacing */
  inlineLg: spacing[4],

  /** Stack spacing between small elements */
  stackXs: spacing[1],
  /** Stack spacing between elements */
  stackSm: spacing[2],
  /** Standard stack spacing */
  stack: spacing[4],
  /** Large stack spacing */
  stackLg: spacing[6],
  /** Extra large stack spacing */
  stackXl: spacing[8],

  /** Small padding */
  paddingSm: spacing[2],
  /** Standard padding */
  padding: spacing[4],
  /** Large padding */
  paddingLg: spacing[6],
  /** Extra large padding */
  paddingXl: spacing[8],

  /** Section gap */
  sectionGap: spacing[12],
  /** Page margin */
  pageMargin: spacing[6],
  /** Card padding */
  cardPadding: spacing[6],
} as const;

export type SpacingKey = keyof typeof spacing;
export type SpacingValue = (typeof spacing)[SpacingKey];
