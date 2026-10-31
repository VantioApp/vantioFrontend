import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getNormArticlesAction, getNormsAction } from '@/core/actions/norms/norms-actions';
import { useAuthStore } from '@/presentation/stores/authStore';

export function useNorms() {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['norms'],
    queryFn: () => getNormsAction(token!),
    enabled: !!token,
    staleTime: 60 * 60 * 1000,
  });
}

/**
 * Lectura secuencial por cursor. `gcTime: 0`: al cerrar el visor no se conserva
 * lo leído, como en el Quiosco del examen (cada ingreso empieza desde cero).
 */
export function useNormArticles(slug: string | null) {
  const token = useAuthStore((s) => s.token);
  return useInfiniteQuery({
    queryKey: ['norm-articles', slug],
    queryFn: ({ pageParam }) => getNormArticlesAction(slug!, pageParam, token!),
    initialPageParam: 0,
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    enabled: !!token && !!slug,
    gcTime: 0,
    staleTime: 0,
  });
}
