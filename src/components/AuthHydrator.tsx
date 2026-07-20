'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';

export function AuthHydrator() {
  const [isHydrated, setIsHydrated] = useState(false);
  const { token, loadProfile } = useAuthStore();

  useEffect(() => {
    console.log('[AuthHydrator] Mounting, checking hydration...');
    
    if (useAuthStore.persist.hasHydrated()) {
      console.log('[AuthHydrator] Already hydrated');
      setIsHydrated(true);
      return;
    }

    const unsub = useAuthStore.persist.onFinishHydration(() => {
      console.log('[AuthHydrator] Hydration finished');
      setIsHydrated(true);
    });

    return unsub;
  }, []);

  useEffect(() => {
    console.log('[AuthHydrator] isHydrated:', isHydrated, 'token:', token ? 'EXISTS' : 'NULL');
    if (isHydrated && token) {
      console.log('[AuthHydrator] Calling loadProfile...');
      loadProfile();
    }
  }, [isHydrated, token, loadProfile]);

  return null;
}
