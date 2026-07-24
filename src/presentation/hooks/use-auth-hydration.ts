import { useSyncExternalStore } from 'react';
import { useAuthStore } from '@/presentation/stores/authStore';

const getServerSnapshot = () => false;

export function useAuthHydration() {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (useAuthStore.persist.hasHydrated()) return () => {};
      const unsub = useAuthStore.persist.onFinishHydration(() => {
        onStoreChange();
      });
      return unsub;
    },
    () => useAuthStore.persist.hasHydrated(),
    getServerSnapshot
  );
}
