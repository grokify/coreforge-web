# Installation

## Prerequisites

- Node.js 20+
- pnpm 9+ (recommended) or npm

## Install Packages

Install the packages you need:

```bash
# Core packages (recommended starting point)
pnpm add @coreforge/auth @coreforge/tenant @coreforge/shell

# Optional packages
pnpm add @coreforge/api-client    # HTTP client
pnpm add @coreforge/telemetry     # Event tracking
pnpm add @coreforge/pages         # Pre-built pages
pnpm add @coreforge/design-tokens # Design tokens
```

## Peer Dependencies

CoreForge Web packages have the following peer dependencies:

```json
{
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0"
}
```

Some packages have additional peer dependencies:

| Package | Additional Peers |
|---------|------------------|
| `@coreforge/api-client` | `@tanstack/react-query` |
| `@coreforge/shell` | `react-router-dom` |
| `@coreforge/pages` | `react-router-dom` |

## TypeScript

All packages include TypeScript declarations. No additional `@types/*` packages needed.

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "jsx": "react-jsx"
  }
}
```

## Framework Support

CoreForge Web works with any React framework:

- **Vite** - Recommended for new projects
- **Next.js** - Use with App Router (client components)
- **Remix** - Full support
- **Create React App** - Supported but not recommended for new projects
