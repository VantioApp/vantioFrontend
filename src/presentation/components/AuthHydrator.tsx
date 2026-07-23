'use client';

import { useEffect } from 'react';
import { useSyncExternalStore } from 'react';
import { useAuthStore } from '@/presentation/stores/authStore';
import { getProfileAction } from '@/core/actions/auth/auth-actions';

const getServerSnapshot = () => false;

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
