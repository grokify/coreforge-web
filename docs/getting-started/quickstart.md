# Quick Start

This guide walks you through setting up a basic CoreForge Web application.

## 1. Create a New Project

```bash
pnpm create vite my-app --template react-ts
cd my-app
pnpm install
```

## 2. Install CoreForge Web

```bash
pnpm add @coreforge/auth @coreforge/tenant @coreforge/shell @coreforge/api-client
pnpm add @tanstack/react-query react-router-dom
```

## 3. Set Up Providers

Create `src/App.tsx`:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@coreforge/auth';
import { TenantProvider } from '@coreforge/tenant';
import { ApiProvider } from '@coreforge/api-client';
import { AppShell } from '@coreforge/shell';
import { Routes } from './Routes';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider bffBaseUrl="/api/auth">
          <ApiProvider baseUrl="/api">
            <TenantProvider>
              <AppShell
                brandName="My App"
                navigation={[
                  { label: 'Dashboard', href: '/' },
                  { label: 'Settings', href: '/settings' },
                ]}
              >
                <Routes />
              </AppShell>
            </TenantProvider>
          </ApiProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
```

## 4. Create Routes

Create `src/Routes.tsx`:

```tsx
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@coreforge/auth';
import { LoginPage } from '@coreforge/pages';

function Dashboard() {
  return <h1>Dashboard</h1>;
}

function Settings() {
  return <h1>Settings</h1>;
}

export function Routes() {
  return (
    <RouterRoutes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </RouterRoutes>
  );
}
```

## 5. Configure Backend Proxy

For development, configure your Vite dev server to proxy API requests:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
```

## 6. Run the App

```bash
pnpm dev
```

## Next Steps

- [Authentication](../packages/auth.md) - Learn about auth flows
- [Multi-tenancy](../packages/tenant.md) - Add organization support
- [Application Shell](../packages/shell.md) - Customize the layout
