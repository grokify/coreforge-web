# @coreforge/pages

Pre-built pages for common application needs.

## Installation

```bash
pnpm add @coreforge/pages react-router-dom
```

## Features

- Login page with OAuth support
- User settings page
- Error pages (404, 500)
- Loading states
- Maintenance page
- Fully customizable

## Pages

### LoginPage

```tsx
import { LoginPage } from '@coreforge/pages';

function Login() {
  return (
    <LoginPage
      brandName="My App"
      brandLogo="/logo.svg"
      providers={['github', 'google']}
      onLogin={(provider) => {
        // Handle OAuth login
      }}
    />
  );
}
```

### UserSettingsPage

```tsx
import { UserSettingsPage } from '@coreforge/pages';

function Settings() {
  return (
    <UserSettingsPage
      sections={['profile', 'security', 'notifications', 'linked-accounts']}
      onSave={async (data) => {
        await updateUser(data);
      }}
    />
  );
}
```

### ErrorPage

```tsx
import { ErrorPage } from '@coreforge/pages';

function NotFound() {
  return (
    <ErrorPage
      code={404}
      title="Page Not Found"
      message="The page you're looking for doesn't exist."
      action={{ label: 'Go Home', href: '/' }}
    />
  );
}
```

### LoadingPage

```tsx
import { LoadingPage } from '@coreforge/pages';

function AppLoader() {
  return <LoadingPage message="Loading your workspace..." />;
}
```

### MaintenancePage

```tsx
import { MaintenancePage } from '@coreforge/pages';

function Maintenance() {
  return (
    <MaintenancePage
      title="We'll be right back"
      message="We're performing scheduled maintenance."
      estimatedTime="30 minutes"
    />
  );
}
```

## API Reference

### LoginPage Props

| Prop | Type | Description |
|------|------|-------------|
| `brandName` | `string` | Application name |
| `brandLogo` | `string` | Logo URL |
| `providers` | `string[]` | OAuth providers |
| `onLogin` | `(provider: string) => void` | Login callback |
| `showEmailLogin` | `boolean` | Show email/password form |

### UserSettingsPage Props

| Prop | Type | Description |
|------|------|-------------|
| `sections` | `string[]` | Settings sections to show |
| `onSave` | `(data: UserData) => Promise<void>` | Save callback |
| `onCancel` | `() => void` | Cancel callback |

### ErrorPage Props

| Prop | Type | Description |
|------|------|-------------|
| `code` | `number` | Error code (404, 500, etc.) |
| `title` | `string` | Error title |
| `message` | `string` | Error message |
| `action` | `{ label: string; href: string }` | Action button |

### LoadingPage Props

| Prop | Type | Description |
|------|------|-------------|
| `message` | `string` | Loading message |
| `showSpinner` | `boolean` | Show spinner (default: true) |

### MaintenancePage Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Page title |
| `message` | `string` | Maintenance message |
| `estimatedTime` | `string` | Estimated downtime |
