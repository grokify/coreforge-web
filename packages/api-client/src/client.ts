import {
  ApiError,
  type ApiClientConfig,
  type ApiClientInterface,
  type ApiErrorResponse,
  type HttpMethod,
  type PaginatedResponse,
  type PaginationParams,
  type RequestOptions,
} from './types';

/**
 * Build URL with query parameters
 */
function buildUrl(
  baseUrl: string,
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  const url = new URL(path, baseUrl);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
}

/**
 * API Client - Type-safe HTTP client with automatic error handling
 *
 * @example
 * ```ts
 * const client = new ApiClient({
 *   baseUrl: '/api',
 *   onUnauthorized: () => router.push('/login'),
 * });
 *
 * // GET request
 * const users = await client.get<User[]>('/users');
 *
 * // POST request
 * const newUser = await client.post<User>('/users', { name: 'John' });
 *
 * // Paginated request
 * const { data, pagination } = await client.getPaginated<User>('/users', {
 *   page: 1,
 *   per_page: 20,
 * });
 * ```
 */
export class ApiClient implements ApiClientInterface {
  private config: ApiClientConfig;
  private currentOrgId: string | null = null;

  constructor(config: ApiClientConfig) {
    this.config = {
      timeout: 30000,
      ...config,
    };
    this.currentOrgId = config.currentOrgId || null;
  }

  /**
   * Set the current organization ID for multi-tenant requests
   */
  setOrgId(orgId: string | null): void {
    this.currentOrgId = orgId;
  }

  /**
   * Get the current organization ID
   */
  getOrgId(): string | null {
    return this.currentOrgId;
  }

  /**
   * Make an HTTP request
   */
  private async request<T>(
    method: HttpMethod,
    path: string,
    body?: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = buildUrl(this.config.baseUrl, path, options.params);

    // Build headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.config.defaultHeaders,
      ...options.headers,
    };

    // Add org ID header for multi-tenant requests
    const orgId = options.orgId || this.currentOrgId;
    if (orgId) {
      headers['X-Organization-ID'] = orgId;
    }

    // Call onRequest hook
    this.config.onRequest?.(method, url, body);

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        credentials: 'include', // Include cookies for BFF pattern
        signal: options.signal || controller.signal,
      });

      clearTimeout(timeoutId);

      // Call onResponse hook
      this.config.onResponse?.(method, url, response.status);

      // Handle non-OK responses
      if (!response.ok) {
        let errorResponse: ApiErrorResponse;

        try {
          const errorBody = await response.json();
          errorResponse = {
            error: errorBody.error || 'Unknown error',
            message: errorBody.message || response.statusText,
            code: errorBody.code,
            details: errorBody.details,
            status: response.status,
          };
        } catch {
          errorResponse = {
            error: 'Request failed',
            message: response.statusText,
            status: response.status,
          };
        }

        const error = new ApiError(errorResponse);

        // Handle 401 specifically
        if (error.isUnauthorized()) {
          this.config.onUnauthorized?.();
        }

        // Call onError hook
        this.config.onError?.(error);

        throw error;
      }

      // Handle empty responses (204 No Content)
      if (response.status === 204) {
        return undefined as T;
      }

      // Parse JSON response
      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      // Handle abort errors
      if (error instanceof DOMException && error.name === 'AbortError') {
        const timeoutError = new ApiError({
          error: 'Request timeout',
          message: 'The request took too long to complete',
          status: 408,
        });
        this.config.onError?.(timeoutError);
        throw timeoutError;
      }

      // Re-throw ApiError
      if (error instanceof ApiError) {
        throw error;
      }

      // Handle network errors
      const networkError = new ApiError({
        error: 'Network error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
        status: 0,
      });
      this.config.onError?.(networkError);
      throw networkError;
    }
  }

  /**
   * GET request
   */
  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('GET', path, undefined, options);
  }

  /**
   * POST request
   */
  async post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('POST', path, body, options);
  }

  /**
   * PUT request
   */
  async put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('PUT', path, body, options);
  }

  /**
   * PATCH request
   */
  async patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('PATCH', path, body, options);
  }

  /**
   * DELETE request
   */
  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('DELETE', path, undefined, options);
  }

  /**
   * GET paginated data
   */
  async getPaginated<T>(
    path: string,
    pagination?: PaginationParams,
    options?: RequestOptions
  ): Promise<PaginatedResponse<T>> {
    const params: Record<string, string | number | boolean | undefined> = {
      ...options?.params,
      page: pagination?.page,
      per_page: pagination?.per_page,
      sort_by: pagination?.sort_by,
      sort_order: pagination?.sort_order,
    };

    return this.request<PaginatedResponse<T>>('GET', path, undefined, {
      ...options,
      params,
    });
  }
}

/**
 * Create a new API client instance
 */
export function createApiClient(config: ApiClientConfig): ApiClient {
  return new ApiClient(config);
}
