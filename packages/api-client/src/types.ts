/**
 * HTTP methods supported by the API client
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * API error response from the server
 */
export interface ApiErrorResponse {
  error: string;
  message: string;
  code?: string;
  details?: Record<string, unknown>;
  status: number;
}

/**
 * Custom API error class
 */
export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly details?: Record<string, unknown>;

  constructor(response: ApiErrorResponse) {
    super(response.message);
    this.name = 'ApiError';
    this.status = response.status;
    this.code = response.code;
    this.details = response.details;
  }

  /**
   * Check if error is a specific status code
   */
  is(status: number): boolean {
    return this.status === status;
  }

  /**
   * Check if error is a 401 Unauthorized
   */
  isUnauthorized(): boolean {
    return this.status === 401;
  }

  /**
   * Check if error is a 403 Forbidden
   */
  isForbidden(): boolean {
    return this.status === 403;
  }

  /**
   * Check if error is a 404 Not Found
   */
  isNotFound(): boolean {
    return this.status === 404;
  }

  /**
   * Check if error is a validation error (422)
   */
  isValidationError(): boolean {
    return this.status === 422;
  }

  /**
   * Check if error is a server error (5xx)
   */
  isServerError(): boolean {
    return this.status >= 500;
  }
}

/**
 * Request options for API calls
 */
export interface RequestOptions {
  /**
   * Request headers
   */
  headers?: Record<string, string>;

  /**
   * URL query parameters
   */
  params?: Record<string, string | number | boolean | undefined>;

  /**
   * AbortController signal for request cancellation
   */
  signal?: AbortSignal;

  /**
   * Skip authentication (for public endpoints)
   */
  skipAuth?: boolean;

  /**
   * Organization ID for multi-tenant requests
   */
  orgId?: string;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

/**
 * API client configuration
 */
export interface ApiClientConfig {
  /**
   * Base URL for API requests
   */
  baseUrl: string;

  /**
   * Default headers to include in all requests
   */
  defaultHeaders?: Record<string, string>;

  /**
   * Request timeout in milliseconds (default: 30000)
   */
  timeout?: number;

  /**
   * Current organization ID for multi-tenant requests
   */
  currentOrgId?: string;

  /**
   * Called when a 401 response is received
   */
  onUnauthorized?: () => void;

  /**
   * Called before each request (for logging, etc.)
   */
  onRequest?: (method: HttpMethod, url: string, body?: unknown) => void;

  /**
   * Called after each response (for logging, etc.)
   */
  onResponse?: (method: HttpMethod, url: string, status: number) => void;

  /**
   * Called when an error occurs
   */
  onError?: (error: ApiError) => void;
}

/**
 * API client context value
 */
export interface ApiClientContextValue {
  /**
   * The API client instance
   */
  client: ApiClientInterface;

  /**
   * Current organization ID
   */
  currentOrgId: string | null;

  /**
   * Set the current organization ID
   */
  setCurrentOrgId: (orgId: string | null) => void;
}

/**
 * API client interface
 */
export interface ApiClientInterface {
  /**
   * GET request
   */
  get<T>(path: string, options?: RequestOptions): Promise<T>;

  /**
   * POST request
   */
  post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T>;

  /**
   * PUT request
   */
  put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T>;

  /**
   * PATCH request
   */
  patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T>;

  /**
   * DELETE request
   */
  delete<T>(path: string, options?: RequestOptions): Promise<T>;

  /**
   * Get paginated data
   */
  getPaginated<T>(
    path: string,
    pagination?: PaginationParams,
    options?: RequestOptions
  ): Promise<PaginatedResponse<T>>;

  /**
   * Set the current organization ID for multi-tenant requests
   */
  setOrgId(orgId: string | null): void;

  /**
   * Get the current organization ID
   */
  getOrgId(): string | null;
}

/**
 * Props for ApiProvider
 */
export interface ApiProviderProps {
  children: React.ReactNode;
  config: ApiClientConfig;
}

/**
 * Query key factory type
 */
export type QueryKeyFactory<T extends string = string> = {
  all: readonly [T];
  lists: () => readonly [T, 'list'];
  list: (filters?: Record<string, unknown>) => readonly [T, 'list', Record<string, unknown>?];
  details: () => readonly [T, 'detail'];
  detail: (id: string) => readonly [T, 'detail', string];
};

/**
 * Create a query key factory for a resource
 */
export function createQueryKeys<T extends string>(resource: T): QueryKeyFactory<T> {
  return {
    all: [resource] as const,
    lists: () => [resource, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [resource, 'list', filters] as const,
    details: () => [resource, 'detail'] as const,
    detail: (id: string) => [resource, 'detail', id] as const,
  };
}
