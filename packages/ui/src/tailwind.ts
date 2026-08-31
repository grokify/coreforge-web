/**
 * SystemForge UI Tailwind v4 Integration
 *
 * With Tailwind CSS v4, configuration is done via CSS instead of JavaScript.
 * To use SystemForge UI in your application:
 *
 * 1. Import the SystemForge UI globals.css in your main CSS file:
 *
 *    @import "@plexusone/ui/globals.css";
 *
 * 2. Or import it in your main entry point (e.g., main.tsx):
 *
 *    import '@plexusone/ui/globals.css';
 *
 * The globals.css file includes:
 * - Tailwind CSS base, components, and utilities
 * - SystemForge UI design tokens via @theme
 * - Dark mode support via .dark class
 * - Animation keyframes for accordion components
 *
 * To customize the design tokens, override CSS variables in your own CSS:
 *
 *    :root {
 *      --color-primary: hsl(222.2 47.4% 11.2%);
 *      --color-primary-foreground: hsl(210 40% 98%);
 *    }
 *
 * Note: The JavaScript preset export below is deprecated and will be
 * removed in a future version. Use the CSS import approach instead.
 */

/**
 * @deprecated Use CSS import instead: @import "@plexusone/ui/globals.css"
 *
 * This preset is provided for backward compatibility with Tailwind v3.
 * It will be removed in a future major version.
 */
export const systemforgePreset = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          foreground: 'var(--color-destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--color-popover)',
          foreground: 'var(--color-popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-card-foreground)',
        },
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
      },
    },
  },
};

export default systemforgePreset;
