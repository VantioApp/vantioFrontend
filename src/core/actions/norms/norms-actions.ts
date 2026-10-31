import { api } from '../api/fetch-client';
import type { NormSummary, NormArticlesPage } from '@/core/interfaces';

export const getNormsAction = async (token: string): Promise<NormSummary[]> => {
  return api.get<NormSummary[]>('/norms', token);
};

export const getNormArticlesAction = async (
  slug: string,
  cursor: number,
  token: string
): Promise<NormArticlesPage> => {
  return api.get<NormArticlesPage>(
    `/norms/${encodeURIComponent(slug)}/articles?cursor=${cursor}`,
    token
  );
};
