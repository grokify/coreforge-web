# CoreForge Web

React framework for building multi-tenant SaaS applications with CoreForge.

## Overview

CoreForge Web provides a complete set of React packages for building production-ready SaaS applications:

- **Authentication** - Secure BFF-based auth with HTTP-only cookies
- **Multi-tenancy** - Organization switching, role-based access
- **Application Shell** - Responsive layout with navigation
- **Telemetry** - Event tracking and error boundaries
- **Design Tokens** - Consistent styling primitives

## Packages

| Package | Description |
|---------|-------------|
| `@coreforge/auth` | Authentication primitives (AuthProvider, ProtectedRoute) |
| `@coreforge/tenant` | Multi-tenant context (TenantProvider, RequireRole) |
| `@coreforge/api-client` | HTTP client with auth integration |
| `@coreforge/telemetry` | Event instrumentation and error tracking |
| `@coreforge/shell` | Application shell components |
| `@coreforge/pages` | Pre-built pages (Login, Settings, Error) |
| `@coreforge/design-tokens` | Design system tokens |

## Quick Example

```tsx
import { AuthProvider } from '@coreforge/auth';
import { TenantProvider } from '@coreforge/tenant';
import { AppShell } from '@coreforge/shell';

function App() {
  return (
    <AuthProvider>
      <TenantProvider>
        <AppShell
          brandName="My App"
          navigation={[
            { label: 'Dashboard', href: '/', icon: HomeIcon },
            { label: 'Settings', href: '/settings', icon: SettingsIcon },
          ]}
        >
          <YourRoutes />
        </AppShell>
      </TenantProvider>
    </AuthProvider>
  );
}
```

## Architecture

CoreForge Web is designed to work with [CoreForge](https://github.com/grokify/coreforge) backends using the BFF (Backend-for-Frontend) pattern:

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                   React Application                      ││
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐││
│  │  │ AuthProvider│ │TenantProvider│ │     AppShell       │││
│  │  └─────────────┘ └─────────────┘ └─────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     BFF Proxy Layer                          │
│            (HTTP-only cookies, CSRF protection)              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CoreForge Backend                         │
│         (Identity, Authorization, Multi-tenancy)             │
└─────────────────────────────────────────────────────────────┘
```

## License

MIT
