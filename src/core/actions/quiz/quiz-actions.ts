import { api } from '../api/fetch-client';
import type {
  GenerateQuizRequest,
  GenerateQuizResponse,
  SubmitQuizRequest,
  SubmitQuizResponse,
  TestResultsResponse,
  TestHistoryItem,
} from '@/core/interfaces';

export const generateQuizAction = async (
  data: GenerateQuizRequest,
  token: string
): Promise<GenerateQuizResponse> => {
  return api.post<GenerateQuizResponse>('/quiz/generate', data, token);
};

export const submitQuizAction = async (
  testId: string,
  answers: SubmitQuizRequest['answers'],
  token: string
): Promise<SubmitQuizResponse> => {
  return api.post<SubmitQuizResponse>(`/quiz/${testId}/submit`, { answers }, token);
};

export const getQuizResultsAction = async (testId: string, token: string): Promise<TestResultsResponse> => {
  return api.get<TestResultsResponse>(`/quiz/${testId}/results`, token);
};

export const getQuizHistoryAction = async (
  userId: string,
  token: string,
  params?: { page?: number; limit?: number }
): Promise<TestHistoryItem[]> => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  const query = queryParams.toString();
  return api.get<TestHistoryItem[]>(`/quiz/history/${userId}${query ? `?${query}` : ''}`, token);
};
