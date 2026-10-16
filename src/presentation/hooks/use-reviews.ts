import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createReviewLinkAction,
  getReviewLinkResultsAction,
  getReviewLinksAction,
  getReviewSetAction,
  saveReviewAction,
  setReviewLinkActiveAction,
} from '@/core/actions/reviews/reviews-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { CreateReviewLinkData, SaveReviewData } from '@/core/interfaces';

// Pública (sin sesión): se identifica por el token del enlace.
export function useReviewSet(token: string) {
  return useQuery({
    queryKey: ['review-set', token],
    queryFn: () => getReviewSetAction(token),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export function useSaveReview(token: string) {
  return useMutation({
    mutationFn: ({ questionId, data }: { questionId: string; data: SaveReviewData }) =>
      saveReviewAction(token, questionId, data),
  });
}

export function useReviewLinks() {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['review-links'],
    queryFn: () => getReviewLinksAction(token!),
    enabled: !!token,
  });
}

export function useCreateReviewLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateReviewLinkData) =>
      createReviewLinkAction(data, useAuthStore.getState().token!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['review-links'] }),
  });
}

export function useSetReviewLinkActive() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      setReviewLinkActiveAction(id, active, useAuthStore.getState().token!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['review-links'] }),
  });
}

export function useReviewLinkResults(id: string) {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['review-link-results', id],
    queryFn: () => getReviewLinkResultsAction(id, token!),
    enabled: !!token && !!id,
  });
}
