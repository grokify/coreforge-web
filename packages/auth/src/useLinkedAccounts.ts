import { useState, useCallback, useEffect, useMemo } from 'react';
import { BFFClient } from './bff-client';
import { useAuth } from './AuthProvider';
import type { LinkedAccount, OAuthProvider, LinkedAccountsContextValue } from './types';

/**
 * Hook for managing linked OAuth accounts
 *
 * Allows users to link multiple OAuth accounts (like Gmail/HubSpot pattern)
 * and switch between them.
 *
 * @example
 * ```tsx
 * function LinkedAccountsPage() {
 *   const {
 *     linkedAccounts,
 *     linkAccount,
 *     unlinkAccount,
 *     switchAccount,
 *   } = useLinkedAccounts();
 *
 *   return (
 *     <div>
 *       {linkedAccounts.map(account => (
 *         <div key={account.id}>
 *           <span>{account.provider}: {account.email}</span>
 *           <button onClick={() => unlinkAccount(account.id)}>
 *             Disconnect
 *           </button>
 *         </div>
 *       ))}
 *
 *       <button onClick={() => linkAccount('github')}>
 *         Link GitHub
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useLinkedAccounts(bffBaseUrl: string = ''): LinkedAccountsContextValue {
  const { user, refreshUser } = useAuth();
  const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccount[]>([]);
  const [isLinking, setIsLinking] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const client = useMemo(() => new BFFClient(bffBaseUrl), [bffBaseUrl]);

  /**
   * Fetch linked accounts from server (used for refresh operations)
   */
  const fetchLinkedAccounts = useCallback(async () => {
    if (!user) return;

    try {
      const accounts = await client.getLinkedAccounts();
      setLinkedAccounts(accounts);
      setError(null);
    } catch (err) {
      setError(err as Error);
    }
  }, [client, user]);

  /**
   * Fetch accounts on mount and when user changes
   * Using async IIFE to make the async data fetching pattern explicit
   */
  useEffect(() => {
    let cancelled = false;

    const loadAccounts = async () => {
      if (!user) {
        if (!cancelled) setLinkedAccounts([]);
        return;
      }

      try {
        const accounts = await client.getLinkedAccounts();
        if (!cancelled) {
          setLinkedAccounts(accounts);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
        }
      }
    };

    loadAccounts();

    return () => {
      cancelled = true;
    };
  }, [client, user]);

  /**
   * Current account based on user data
   * (The account that matches the current session)
   */
  const currentAccount = useMemo((): LinkedAccount | null => {
    if (!user || linkedAccounts.length === 0) {
      return null;
    }

    // Try to find account matching user's email
    return linkedAccounts.find((account) => account.email === user.email) ?? linkedAccounts[0];
  }, [user, linkedAccounts]);

  /**
   * Link a new OAuth account
   * This will redirect the browser to the OAuth flow
   */
  const linkAccount = useCallback(
    (provider: OAuthProvider) => {
      setIsLinking(true);
      client.linkAccount(provider);
      // Browser will redirect, so isLinking state doesn't matter after this
    },
    [client]
  );

  /**
   * Unlink an OAuth account
   */
  const unlinkAccount = useCallback(
    async (accountId: string) => {
      // Prevent unlinking the last account
      if (linkedAccounts.length <= 1) {
        throw new Error('Cannot unlink the last account');
      }

      try {
        await client.unlinkAccount(accountId);
        // Refresh the list
        await fetchLinkedAccounts();
      } catch (err) {
        setError(err as Error);
        throw err;
      }
    },
    [client, fetchLinkedAccounts, linkedAccounts.length]
  );

  /**
   * Switch to a different linked account
   * This will create a new session for that account
   */
  const switchAccount = useCallback(
    async (accountId: string) => {
      try {
        await client.switchAccount(accountId);
        // Refresh user data with new account
        await refreshUser();
        // Refresh linked accounts list
        await fetchLinkedAccounts();
      } catch (err) {
        setError(err as Error);
        throw err;
      }
    },
    [client, refreshUser, fetchLinkedAccounts]
  );

  return {
    linkedAccounts,
    currentAccount,
    isLinking,
    error,
    linkAccount,
    unlinkAccount,
    switchAccount,
  };
}
