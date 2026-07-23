import { api } from '../api/fetch-client';
import type {
  AdminStats,
  AdminUsersResponse,
  AdminSubject,
  AdminQuestionsResponse,
  AdminQuestion,
  CreateQuestionData,
  UpdateQuestionData,
  ImportQuestionsData,
  ImportResult,
} from '@/core/interfaces';

export const getAdminStatsAction = async (days: number, token: string): Promise<AdminStats> => {
  return api.get<AdminStats>(`/admin/stats?days=${days}`, token);
};

export const getAdminUsersAction = async (
  params: { search?: string; page?: number; limit?: number },
  token: string
): Promise<AdminUsersResponse> => {
  const queryParams = new URLSearchParams();
  if (params.search) queryParams.set('search', params.search);
  if (params.page) queryParams.set('page', params.page.toString());
  if (params.limit) queryParams.set('limit', params.limit.toString());
  return api.get<AdminUsersResponse>(`/admin/users?${queryParams.toString()}`, token);
};

export const getAdminSubjectsAction = async (token: string): Promise<AdminSubject[]> => {
  return api.get<AdminSubject[]>('/admin/subjects', token);
};

export const getAdminQuestionsAction = async (
  params: { area?: string; subjectId?: string; search?: string; isActive?: boolean; page?: number; limit?: number },
  token: string
): Promise<AdminQuestionsResponse> => {
  const queryParams = new URLSearchParams();
  if (params.area) queryParams.set('area', params.area);
  if (params.subjectId) queryParams.set('subjectId', params.subjectId);
  if (params.search) queryParams.set('search', params.search);
  if (params.isActive !== undefined) queryParams.set('isActive', params.isActive.toString());
  if (params.page) queryParams.set('page', params.page.toString());
  if (params.limit) queryParams.set('limit', params.limit.toString());
  return api.get<AdminQuestionsResponse>(`/admin/questions?${queryParams.toString()}`, token);
};

export const createQuestionAction = async (data: CreateQuestionData, token: string): Promise<AdminQuestion> => {
  return api.post<AdminQuestion>('/admin/questions', data, token);
};

export const updateQuestionAction = async (id: string, data: UpdateQuestionData, token: string): Promise<AdminQuestion> => {
  return api.put<AdminQuestion>(`/admin/questions/${id}`, data, token);
};

export const toggleQuestionAction = async (id: string, token: string): Promise<AdminQuestion> => {
  return api.patch<AdminQuestion>(`/admin/questions/${id}/toggle`, null, token);
};

export const importQuestionsAction = async (data: ImportQuestionsData, token: string): Promise<ImportResult> => {
  return api.post<ImportResult>('/admin/questions/import', data, token);
};

export const createAreaAction = async (name: string, token: string): Promise<{ id: string; name: string }> => {
  return api.post<{ id: string; name: string }>('/admin/areas', { name }, token);
};
