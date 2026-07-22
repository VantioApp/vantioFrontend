import { useSyncExternalStore } from 'react';
import { useAuthStore } from '@/stores/authStore';

const getServerSnapshot = () => false;

export function useAuthHydration() {
  return useSyncExternalStore(
    (onStoreChange) => {
      console.log('[useAuthHydration] Subscribing to hydration...');
      if (useAuthStore.persist.hasHydrated()) return () => {};
      const unsub = useAuthStore.persist.onFinishHydration(() => {
        console.log('[useAuthHydration] Hydration finished');
        onStoreChange();
      });
      return unsub;
    },
    () => useAuthStore.persist.hasHydrated(),
    getServerSnapshot
  );
}
