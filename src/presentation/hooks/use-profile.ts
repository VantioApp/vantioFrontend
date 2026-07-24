import { useQuery } from '@tanstack/react-query';
import { getProfileAction } from '@/core/actions/auth/auth-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { User } from '@/core/interfaces';

export function useProfile(initialData?: User) {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfileAction(token!),
    enabled: !!token,
    initialData,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
