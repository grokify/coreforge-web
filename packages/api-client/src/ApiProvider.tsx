import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiClient } from './client';
import type { ApiClientConfig, ApiClientContextValue, ApiClientInterface } from './types';

/**
 * API client context
 */
const ApiClientContext = createContext<ApiClientContextValue | null>(null);

/**
 * Props for ApiProvider
 */
export interface ApiProviderProps {
  children: ReactNode;
  /**
   * API client configuration
   */
  config: ApiClientConfig;
  /**
   * Optional existing QueryClient instance
   */
  queryClient?: QueryClient;
}

/**
 * Default query client with sensible defaults
 */
function createDefaultQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60, // 1 minute
        retry: (failureCount, error) => {
          // Don't retry on 4xx errors
          if (error && typeof error === 'object' && 'status' in error) {
            const status = (error as { status: number }).status;
            if (status >= 400 && status < 500) {
              return false;
            }
          }
          return failureCount < 3;
        },
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

/**
 * ApiProvider - Provides API client and React Query to the component tree
 *
 * @example
 * ```tsx
 * import { ApiProvider } from '@coreforge/api-client';
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
 * ```
 */
export function ApiProvider({
  children,
  config,
  queryClient: providedQueryClient,
}: ApiProviderProps) {
  const [currentOrgId, setCurrentOrgIdState] = useState<string | null>(
    config.currentOrgId || null
  );

  // Create or use provided QueryClient
  const queryClient = useMemo(
    () => providedQueryClient || createDefaultQueryClient(),
    [providedQueryClient]
  );

  // Create API client
  const client = useMemo<ApiClientInterface>(() => {
    const apiClient = new ApiClient({
      ...config,
      currentOrgId: currentOrgId || undefined,
    });
    return apiClient;
  }, [config, currentOrgId]);

  // Update org ID and invalidate queries
  const setCurrentOrgId = useCallback(
    (orgId: string | null) => {
      setCurrentOrgIdState(orgId);
      client.setOrgId(orgId);
      // Invalidate all queries when org changes
      queryClient.invalidateQueries();
    },
    [client, queryClient]
  );

  const value = useMemo<ApiClientContextValue>(
    () => ({
      client,
      currentOrgId,
      setCurrentOrgId,
    }),
    [client, currentOrgId, setCurrentOrgId]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ApiClientContext.Provider value={value}>{children}</ApiClientContext.Provider>
    </QueryClientProvider>
  );
}

/**
 * Hook to access the API client
 *
 * @throws Error if used outside ApiProvider
 *
 * @example
 * ```tsx
 * function UserList() {
 *   const { client } = useApiClient();
 *
 *   const fetchUsers = async () => {
 *     const users = await client.get<User[]>('/users');
 *     return users;
 *   };
 *
 *   // ...
 * }
 * ```
 */
export function useApiClient(): ApiClientContextValue {
  const context = useContext(ApiClientContext);
  if (!context) {
    throw new Error('useApiClient must be used within an ApiProvider');
  }
  return context;
}

/**
 * Get API client without throwing (returns null if not in provider)
 */
export function useApiClientOptional(): ApiClientContextValue | null {
  return useContext(ApiClientContext);
}
