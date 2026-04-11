# CoreForge Web

React framework for building multi-tenant SaaS applications with CoreForge.

## Packages

| Package | Description | npm |
|---------|-------------|-----|
| `@coreforge/auth` | Authentication primitives | [![npm](https://img.shields.io/npm/v/@coreforge/auth)](https://www.npmjs.com/package/@coreforge/auth) |
| `@coreforge/tenant` | Multi-tenant context | [![npm](https://img.shields.io/npm/v/@coreforge/tenant)](https://www.npmjs.com/package/@coreforge/tenant) |
| `@coreforge/api-client` | HTTP client | [![npm](https://img.shields.io/npm/v/@coreforge/api-client)](https://www.npmjs.com/package/@coreforge/api-client) |
| `@coreforge/telemetry` | Event instrumentation | [![npm](https://img.shields.io/npm/v/@coreforge/telemetry)](https://www.npmjs.com/package/@coreforge/telemetry) |
| `@coreforge/shell` | Application shell | [![npm](https://img.shields.io/npm/v/@coreforge/shell)](https://www.npmjs.com/package/@coreforge/shell) |
| `@coreforge/pages` | Pre-built pages | [![npm](https://img.shields.io/npm/v/@coreforge/pages)](https://www.npmjs.com/package/@coreforge/pages) |
| `@coreforge/design-tokens` | Design system tokens | [![npm](https://img.shields.io/npm/v/@coreforge/design-tokens)](https://www.npmjs.com/package/@coreforge/design-tokens) |

## Quick Start

```bash
# Install packages
pnpm add @coreforge/shell @coreforge/auth @coreforge/tenant

# Wrap your app
import { AuthProvider } from '@coreforge/auth';
import { TenantProvider } from '@coreforge/tenant';
import { AppShell } from '@coreforge/shell';

function App() {
  return (
    <AuthProvider>
      <TenantProvider>
        <AppShell>
          <YourApp />
        </AppShell>
      </TenantProvider>
    </AuthProvider>
  );
}
```

## Documentation

Full documentation available at [coreforge-platform](https://github.com/grokify/coreforge-platform).

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run development mode
pnpm dev

# Run tests
pnpm test

# Lint
pnpm lint
```

## License

MIT
