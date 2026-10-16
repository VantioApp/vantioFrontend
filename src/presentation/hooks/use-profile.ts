import { useQuery } from '@tanstack/react-query';
import { getProfileAction } from '@/core/actions/auth/auth-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { User } from '@/core/interfaces';

export function useProfile(initialData?: User) {
  const token = useAuthStore((s) => s.token);
  const persistedUser = useAuthStore((s) => s.user);
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfileAction(token!),
    enabled: !!token,
    initialData,
    // Evita el parpadeo en blanco mientras el token se restaura desde la cookie.
    placeholderData: persistedUser ?? undefined,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
