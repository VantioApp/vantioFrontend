import { api } from '../api/fetch-client';
import type {
  GenerateQuizRequest,
  GenerateQuizResponse,
  SubmitQuizRequest,
  SubmitQuizResponse,
  TestResultsResponse,
  PaginatedHistory,
  AiReportResponse,
  SubjectProgress,
} from '@/core/interfaces';

export const generateQuizAction = async (
  data: GenerateQuizRequest,
  token: string
): Promise<GenerateQuizResponse> => {
  return api.post<GenerateQuizResponse>('/quiz/generate', data, token);
};

export const generateIdoneidadSimulacroAction = async (
  token: string
): Promise<GenerateQuizResponse> => {
  return api.post<GenerateQuizResponse>('/quiz/idoneidad/simulacro', undefined, token);
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
): Promise<PaginatedHistory> => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  const query = queryParams.toString();
  return api.get<PaginatedHistory>(`/quiz/history/${userId}${query ? `?${query}` : ''}`, token);
};

export const getSubjectProgressAction = async (testId: string, token: string): Promise<SubjectProgress> => {
  return api.get<SubjectProgress>(`/quiz/${testId}/progress`, token);
};

export const generateAiReportAction = async (testId: string, token: string): Promise<AiReportResponse> => {
  return api.post<AiReportResponse>(`/quiz/${testId}/ai-report`, undefined, token, 45_000);
};
