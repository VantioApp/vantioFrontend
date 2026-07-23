import { api } from '../api/fetch-client';
import type { Subject, QuestionsPaginatedResponse, Question } from '@/core/interfaces';

export const getSubjectsAction = async (): Promise<Subject[]> => {
  return api.get<Subject[]>('/questions/subjects');
};

export const getQuestionsBySubjectAction = async (
  subjectId: string,
  params?: { page?: number; limit?: number }
): Promise<QuestionsPaginatedResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  const query = queryParams.toString();
  return api.get<QuestionsPaginatedResponse>(`/questions/subject/${subjectId}${query ? `?${query}` : ''}`);
};

export const getQuestionAction = async (id: string): Promise<Question> => {
  return api.get<Question>(`/questions/${id}`);
};
