import type { Question } from '../quiz/quiz';

export interface Subject {
  id: string;
  name: string;
  area: string;
  description?: string;
  questionCount?: number;
  activeQuestionCount?: number;
}

export interface QuestionsPaginatedResponse {
  questions: Question[];
  total: number;
  page: number;
  totalPages: number;
}
