# @coreforge/telemetry

Event instrumentation and error tracking for React applications.

## Installation

```bash
pnpm add @coreforge/telemetry
```

## Features

- Event tracking with typed schemas
- Error boundary with automatic reporting
- Page view tracking
- Multiple sink support (console, analytics)
- TypeScript-first API

## Usage

### TelemetryProvider

Wrap your application with `TelemetryProvider`:

```tsx
import { TelemetryProvider, consoleSink } from '@coreforge/telemetry';

function App() {
  return (
    <TelemetryProvider
      sinks={[consoleSink()]}
      context={{ appVersion: '1.0.0' }}
    >
      <YourApp />
    </TelemetryProvider>
  );
}
```

### useTrack Hook

Track custom events:

```tsx
import { useTrack } from '@coreforge/telemetry';

function CheckoutButton() {
  const track = useTrack();

  const handleClick = () => {
    track('checkout_started', {
      cartValue: 99.99,
      itemCount: 3,
    });
  };

  return <button onClick={handleClick}>Checkout</button>;
}
```

### ErrorBoundary

Catch and report errors:

```tsx
import { ErrorBoundary } from '@coreforge/telemetry';
import { ErrorPage } from '@coreforge/pages';

function App() {
  return (
    <TelemetryProvider sinks={[consoleSink()]}>
      <ErrorBoundary fallback={<ErrorPage />}>
        <YourApp />
      </ErrorBoundary>
    </TelemetryProvider>
  );
}
```

### Page View Tracking

```tsx
import { usePageView } from '@coreforge/telemetry';

function Page({ title }: { title: string }) {
  usePageView(title);

  return <div>...</div>;
}
```

## Sinks

### Console Sink

```tsx
import { consoleSink } from '@coreforge/telemetry';

<TelemetryProvider sinks={[consoleSink({ level: 'debug' })]}>
```

### Custom Sink

```tsx
const analyticsSink = {
  track: (event, properties) => {
    analytics.track(event, properties);
  },
  error: (error, context) => {
    errorReporting.captureException(error, context);
  },
};

<TelemetryProvider sinks={[analyticsSink]}>
```

## API Reference

### TelemetryProvider Props

| Prop | Type | Description |
|------|------|-------------|
| `sinks` | `TelemetrySink[]` | Array of telemetry sinks |
| `context` | `Record<string, unknown>` | Global context for all events |
| `enabled` | `boolean` | Enable/disable telemetry |

### useTrack Return Value

```typescript
type TrackFunction = (
  event: string,
  properties?: Record<string, unknown>
) => void;
```

### TelemetrySink Interface

```typescript
interface TelemetrySink {
  track: (event: string, properties: Record<string, unknown>) => void;
  error: (error: Error, context: Record<string, unknown>) => void;
  pageView?: (path: string, title: string) => void;
}
```
