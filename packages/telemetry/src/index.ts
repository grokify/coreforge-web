/**
 * @coreforge/telemetry
 *
 * Telemetry, error tracking, and performance monitoring for CoreForge applications.
 *
 * @example
 * ```tsx
 * import {
 *   TelemetryProvider,
 *   ErrorBoundary,
 *   useTelemetry,
 *   usePageView,
 * } from '@coreforge/telemetry';
 *
 * function App() {
 *   return (
 *     <TelemetryProvider
 *       config={{
 *         appName: 'my-app',
 *         appVersion: '1.0.0',
 *         environment: process.env.NODE_ENV,
 *         endpoint: '/api/telemetry',
 *         debug: process.env.NODE_ENV === 'development',
 *       }}
 *     >
 *       <ErrorBoundary>
 *         <MyApp />
 *       </ErrorBoundary>
 *     </TelemetryProvider>
 *   );
 * }
 *
 * function Dashboard() {
 *   usePageView('/dashboard');
 *   const { trackAction } = useTelemetry();
 *
 *   return (
 *     <button onClick={() => trackAction('dashboard', 'click', { button: 'export' })}>
 *       Export
 *     </button>
 *   );
 * }
 * ```
 *
 * @packageDocumentation
 */

// Provider
export { TelemetryProvider, useTelemetry, useTelemetryOptional } from './TelemetryProvider';
export type { TelemetryProviderProps } from './TelemetryProvider';

// Error boundary
export { ErrorBoundary, DefaultErrorFallback } from './ErrorBoundary';

// Telemetry client
export { TelemetryClient, createTelemetryClient, ConsoleAdapter, HttpAdapter } from './telemetry';

// Hooks
export {
  usePageView,
  useComponentTrack,
  useActionTracker,
  usePerformanceTracker,
  useFormTracker,
  useIdentify,
  useOrgContext,
  useFeatureTracker,
  useWebVitals,
} from './hooks';

// Types
export type {
  TelemetryEventType,
  TelemetryEvent,
  PageViewEvent,
  ActionEvent,
  ErrorEvent,
  PerformanceEvent,
  TelemetryUser,
  TelemetryOrg,
  TelemetryAdapter,
  LogLevel,
  TelemetryConfig,
  TelemetryContextValue,
  ErrorBoundaryProps,
  PerformanceTiming,
} from './types';
