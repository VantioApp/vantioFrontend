'use client';

import { useSyncExternalStore, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

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
  const loadProfile = useAuthStore((s) => s.loadProfile);

  useEffect(() => {
    console.log('[AuthHydrator] isHydrated:', isHydrated, 'token:', token ? 'EXISTS' : 'NULL');
    if (isHydrated && token) {
      console.log('[AuthHydrator] Calling loadProfile...');
      loadProfile();
    }
  }, [isHydrated, token, loadProfile]);

  return null;
}
