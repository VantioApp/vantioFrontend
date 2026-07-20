import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';

export function useAuthHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    console.log('[useAuthHydration] Mounting, checking hydration...');
    
    // Verificar si ya está hidratado
    if (useAuthStore.persist.hasHydrated()) {
      console.log('[useAuthHydration] Already hydrated');
      setIsHydrated(true);
      return;
    }

    // Suscribirse a la hidratación
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      console.log('[useAuthHydration] Hydration finished');
      setIsHydrated(true);
    });

    return unsub;
  }, []);

  return isHydrated;
}
