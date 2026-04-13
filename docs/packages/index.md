# Packages Overview

CoreForge Web is organized as a monorepo with focused, composable packages.

## Package Dependency Graph

```
┌─────────────────────────────────────────────────────────────┐
│                      Application                             │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│   @coreforge  │     │   @coreforge  │     │   @coreforge  │
│     /shell    │     │    /pages     │     │  /telemetry   │
└───────────────┘     └───────────────┘     └───────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│   @coreforge  │     │   @coreforge  │     │   @coreforge  │
│     /auth     │     │    /tenant    │     │  /api-client  │
└───────────────┘     └───────────────┘     └───────────────┘
                              │
                              ▼
                    ┌───────────────┐
                    │   @coreforge  │
                    │ /design-tokens│
                    └───────────────┘
```

## Package Summary

| Package | Purpose | Key Exports |
|---------|---------|-------------|
| [@coreforge/auth](auth.md) | Authentication | `AuthProvider`, `ProtectedRoute`, `useAuth` |
| [@coreforge/tenant](tenant.md) | Multi-tenancy | `TenantProvider`, `RequireRole`, `useOrganization` |
| [@coreforge/api-client](api-client.md) | HTTP client | `ApiProvider`, `useApi`, `createClient` |
| [@coreforge/telemetry](telemetry.md) | Instrumentation | `TelemetryProvider`, `ErrorBoundary` |
| [@coreforge/shell](shell.md) | App layout | `AppShell`, `Sidebar`, `Navbar` |
| [@coreforge/pages](pages.md) | Pre-built pages | `LoginPage`, `ErrorPage` |
| [@coreforge/design-tokens](design-tokens.md) | Design system | Colors, typography, spacing |

## Choosing Packages

**Minimal Setup:**

```bash
pnpm add @coreforge/auth @coreforge/tenant
```

**Full Application:**

```bash
pnpm add @coreforge/auth @coreforge/tenant @coreforge/api-client \
         @coreforge/shell @coreforge/pages @coreforge/telemetry
```

**Design System Only:**

```bash
pnpm add @coreforge/design-tokens
```
