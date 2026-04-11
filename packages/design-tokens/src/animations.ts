/**
 * Animation tokens for CoreForge applications
 */

/**
 * Duration values
 */
export const durations = {
  instant: '0ms',
  fast: '100ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
  slowest: '1000ms',
} as const;

/**
 * Easing functions
 */
export const easings = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

/**
 * Common transitions
 */
export const transitions = {
  none: 'none',
  all: `all ${durations.normal} ${easings.easeInOut}`,
  colors: `color ${durations.normal} ${easings.easeInOut}, background-color ${durations.normal} ${easings.easeInOut}, border-color ${durations.normal} ${easings.easeInOut}`,
  opacity: `opacity ${durations.normal} ${easings.easeInOut}`,
  transform: `transform ${durations.normal} ${easings.easeInOut}`,
  shadow: `box-shadow ${durations.normal} ${easings.easeInOut}`,
} as const;

/**
 * Keyframe animations (as strings for CSS)
 */
export const keyframes = {
  fadeIn: `
    from { opacity: 0; }
    to { opacity: 1; }
  `,
  fadeOut: `
    from { opacity: 1; }
    to { opacity: 0; }
  `,
  slideInUp: `
    from { transform: translateY(10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  `,
  slideInDown: `
    from { transform: translateY(-10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  `,
  slideInLeft: `
    from { transform: translateX(-10px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  `,
  slideInRight: `
    from { transform: translateX(10px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  `,
  scaleIn: `
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  `,
  spin: `
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `,
  pulse: `
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  `,
  bounce: `
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  `,
} as const;

/**
 * Animation presets
 */
export const animations = {
  fadeIn: `fadeIn ${durations.normal} ${easings.easeOut}`,
  fadeOut: `fadeOut ${durations.normal} ${easings.easeIn}`,
  slideInUp: `slideInUp ${durations.normal} ${easings.easeOut}`,
  slideInDown: `slideInDown ${durations.normal} ${easings.easeOut}`,
  slideInLeft: `slideInLeft ${durations.normal} ${easings.easeOut}`,
  slideInRight: `slideInRight ${durations.normal} ${easings.easeOut}`,
  scaleIn: `scaleIn ${durations.normal} ${easings.easeOut}`,
  spin: `spin ${durations.slowest} ${easings.linear} infinite`,
  pulse: `pulse 2s ${easings.easeInOut} infinite`,
  bounce: `bounce 1s ${easings.easeInOut} infinite`,
} as const;

export type DurationKey = keyof typeof durations;
export type EasingKey = keyof typeof easings;
export type TransitionKey = keyof typeof transitions;
