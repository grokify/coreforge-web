#!/usr/bin/env node

/**
 * Generates CSS custom properties from design tokens
 */

const fs = require('fs');
const path = require('path');

// Import tokens from bundled output
const tokens = require('../dist/index.js');

const {
  gray,
  primary,
  success,
  warning,
  error,
  info,
  lightMode,
  darkMode,
  spacing,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  shadows,
  shadowsDark,
  focusRings,
  radii,
  containers,
  layoutWidths,
  durations,
  easings,
  transitions,
  zIndices,
} = tokens;

/**
 * Convert camelCase to kebab-case
 */
function toKebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Generate CSS variables from an object
 */
function generateVars(obj, prefix) {
  return Object.entries(obj)
    .map(([key, value]) => `  --cf-${prefix}-${toKebabCase(key)}: ${value};`)
    .join('\n');
}

/**
 * Generate color scale variables
 */
function generateColorScale(scale, name) {
  return Object.entries(scale)
    .map(([key, value]) => `  --cf-color-${name}-${key}: ${value};`)
    .join('\n');
}

// Build CSS content
const css = `/**
 * CoreForge Design Tokens
 * Generated CSS custom properties
 *
 * Usage:
 * @import '@coreforge/design-tokens/css';
 *
 * .my-component {
 *   color: var(--cf-color-fg-primary);
 *   padding: var(--cf-spacing-4);
 * }
 */

:root {
  /* ===================== */
  /* Color Scales          */
  /* ===================== */

  /* Gray */
${generateColorScale(gray, 'gray')}

  /* Primary */
${generateColorScale(primary, 'primary')}

  /* Success */
${generateColorScale(success, 'success')}

  /* Warning */
${generateColorScale(warning, 'warning')}

  /* Error */
${generateColorScale(error, 'error')}

  /* Info */
${generateColorScale(info, 'info')}

  /* ===================== */
  /* Semantic Colors       */
  /* ===================== */

${generateVars(lightMode, 'color')}

  /* ===================== */
  /* Spacing               */
  /* ===================== */

${generateVars(spacing, 'spacing')}

  /* ===================== */
  /* Typography            */
  /* ===================== */

  /* Font Families */
${generateVars(fontFamilies, 'font-family')}

  /* Font Sizes */
${generateVars(fontSizes, 'font-size')}

  /* Font Weights */
${generateVars(fontWeights, 'font-weight')}

  /* Line Heights */
${generateVars(lineHeights, 'line-height')}

  /* Letter Spacing */
${generateVars(letterSpacings, 'letter-spacing')}

  /* ===================== */
  /* Shadows               */
  /* ===================== */

${generateVars(shadows, 'shadow')}

  /* Focus Rings */
${generateVars(focusRings, 'focus-ring')}

  /* ===================== */
  /* Border Radii          */
  /* ===================== */

${generateVars(radii, 'radius')}

  /* ===================== */
  /* Layout                */
  /* ===================== */

  /* Containers */
${generateVars(containers, 'container')}

  /* Layout Widths */
${generateVars(layoutWidths, 'layout')}

  /* ===================== */
  /* Animation             */
  /* ===================== */

  /* Durations */
${generateVars(durations, 'duration')}

  /* Easings */
${generateVars(easings, 'easing')}

  /* Transitions */
${generateVars(transitions, 'transition')}

  /* ===================== */
  /* Z-Index               */
  /* ===================== */

${generateVars(zIndices, 'z')}
}

/* ===================== */
/* Dark Mode             */
/* ===================== */

@media (prefers-color-scheme: dark) {
  :root {
${generateVars(darkMode, 'color')}

    /* Dark mode shadows */
${generateVars(shadowsDark, 'shadow')}
  }
}

/* Manual dark mode class */
.dark {
${generateVars(darkMode, 'color')}

  /* Dark mode shadows */
${generateVars(shadowsDark, 'shadow')}
}

/* ===================== */
/* Utility Classes       */
/* ===================== */

/* Focus visible ring */
.focus-ring:focus-visible {
  outline: none;
  box-shadow: var(--cf-focus-ring-default);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// Write CSS file
const outputPath = path.join(__dirname, '..', 'dist', 'tokens.css');
fs.writeFileSync(outputPath, css);

console.log('Generated CSS tokens at:', outputPath);
