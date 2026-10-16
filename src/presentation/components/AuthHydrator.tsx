'use client';

import { useEffect } from 'react';
import { useSyncExternalStore } from 'react';
import { useAuthStore } from '@/presentation/stores/authStore';
import { getProfileAction } from '@/core/actions/auth/auth-actions';

const getServerSnapshot = () => false;

/** El token no se persiste en localStorage: tras recargar se recupera de la cookie de sesión. */
function readTokenCookie(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)(?:vantio_token|access_token)=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function useAuthHydrated(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (useAuthStore.persist.hasHydrated()) return () => {};
      const unsub = useAuthStore.persist.onFinishHydration(() => onStoreChange());
      return unsub;
    },
    () => useAuthStore.persist.hasHydrated(),
    getServerSnapshot
  );
}

export function AuthHydrator() {
  const isHydrated = useAuthHydrated();
  const token = useAuthStore((s) => s.token);
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    if (isHydrated && !token) {
      const cookieToken = readTokenCookie();
      if (cookieToken) useAuthStore.setState({ token: cookieToken, isAuthenticated: true });
    }
  }, [isHydrated, token]);

  useEffect(() => {
    if (isHydrated && token) {
      getProfileAction(token)
        .then((user) => setAuth(user, token))
        .catch(() => {
          useAuthStore.getState().clearAuth();
        });
    }
  }, [isHydrated, token, setAuth]);

  return null;
}
