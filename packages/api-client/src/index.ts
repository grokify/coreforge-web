/**
 * @coreforge/api-client
 *
 * Type-safe API client with React Query integration for CoreForge applications.
 *
 * @example
 * ```tsx
 * import { ApiProvider, useApiQuery, useApiMutation } from '@coreforge/api-client';
 *
 * function App() {
 *   return (
 *     <ApiProvider
 *       config={{
 *         baseUrl: '/api',
 *         onUnauthorized: () => router.push('/login'),
 *       }}
 *     >
 *       <MyApp />
 *     </ApiProvider>
 *   );
 * }
 *
 * function UserList() {
 *   const { data, isLoading } = useApiQuery<User[]>(
 *     ['users'],
 *     '/users'
 *   );
 *
 *   if (isLoading) return <Spinner />;
 *
 *   return (
 *     <ul>
 *       {data?.map(user => <li key={user.id}>{user.name}</li>)}
 *     </ul>
 *   );
 * }
 *
 * function CreateUserForm() {
 *   const { mutate, isPending } = useApiMutation<User, CreateUserInput>(
 *     '/users',
 *     {
 *       invalidateQueries: [['users']],
 *     }
 *   );
 *
 *   return (
 *     <form onSubmit={(e) => { e.preventDefault(); mutate(formData); }}>
 *       ...
 *     </form>
 *   );
 * }
 * ```
 *
 * @packageDocumentation
 */

// Client
export { ApiClient, createApiClient } from './client';

// Provider
export { ApiProvider, useApiClient, useApiClientOptional } from './ApiProvider';
export type { ApiProviderProps } from './ApiProvider';

// Hooks
export {
  useApiQuery,
  usePaginatedQuery,
  useInfiniteApiQuery,
  useApiMutation,
  useApiDelete,
  useInvalidateQueries,
  usePrefetch,
} from './hooks';

// Types
export { ApiError, createQueryKeys } from './types';
export type {
  HttpMethod,
  ApiErrorResponse,
  RequestOptions,
  PaginatedResponse,
  PaginationParams,
  ApiClientConfig,
  ApiClientContextValue,
  ApiClientInterface,
  QueryKeyFactory,
} from './types';

// Re-export useful React Query exports
export {
  useQueryClient,
  type QueryKey,
  type UseQueryOptions,
  type UseMutationOptions,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query';
