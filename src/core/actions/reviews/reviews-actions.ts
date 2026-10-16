import { api } from '../api/fetch-client';
import type {
  CreateReviewLinkData,
  ReviewLink,
  ReviewLinkResults,
  ReviewSet,
  SaveReviewData,
} from '@/core/interfaces';

// Públicas: el acceso lo da el token del enlace, sin sesión.
export const getReviewSetAction = async (token: string): Promise<ReviewSet> => {
  return api.get<ReviewSet>(`/reviews/${encodeURIComponent(token)}`);
};

export const saveReviewAction = async (
  token: string,
  questionId: string,
  data: SaveReviewData
): Promise<{ verdict: string | null; comment: string | null; updatedAt: string }> => {
  return api.put(`/reviews/${encodeURIComponent(token)}/questions/${questionId}`, data);
};

// Admin
export const getReviewLinksAction = async (token: string): Promise<ReviewLink[]> => {
  return api.get<ReviewLink[]>('/admin/review-links', token);
};

export const createReviewLinkAction = async (
  data: CreateReviewLinkData,
  token: string
): Promise<{ id: string; token: string }> => {
  return api.post('/admin/review-links', data, token);
};

export const setReviewLinkActiveAction = async (
  id: string,
  active: boolean,
  token: string
): Promise<{ id: string; isActive: boolean }> => {
  return api.patch(`/admin/review-links/${id}/${active ? 'activate' : 'revoke'}`, undefined, token);
};

export const getReviewLinkResultsAction = async (
  id: string,
  token: string
): Promise<ReviewLinkResults> => {
  return api.get<ReviewLinkResults>(`/admin/review-links/${id}/results`, token);
};
