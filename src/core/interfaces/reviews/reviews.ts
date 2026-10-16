import type { QuestionOption } from '../quiz/quiz';

export type ReviewVerdict = 'ok' | 'fix' | 'no';

export interface ReviewState {
  verdict: ReviewVerdict | null;
  comment: string | null;
}

export interface ReviewQuestion {
  id: string;
  externalId: string | null;
  subjectId: string;
  caseText: string | null;
  text: string;
  options: QuestionOption[];
  correctAnswer: string;
  optionExplanations: Record<string, string> | null;
  explanation: string | null;
  sources: string[];
  difficulty: number;
  theme: string | null;
  review: ReviewState;
}

export interface ReviewSet {
  reviewerName: string;
  subjects: { id: string; name: string }[];
  questions: ReviewQuestion[];
}

export interface SaveReviewData {
  verdict?: ReviewVerdict | null;
  comment?: string | null;
}

export interface ReviewLink {
  id: string;
  token: string;
  reviewerName: string;
  isActive: boolean;
  expiresAt: string | null;
  lastUsedAt: string | null;
  createdAt: string;
  subjects: { id: string; name: string }[];
  totalQuestions: number;
  counts: { ok: number; fix: number; no: number };
  reviewed: number;
}

export interface CreateReviewLinkData {
  reviewerName: string;
  subjectIds: string[];
  expiresAt?: string;
}

export interface ReviewLinkResultItem {
  questionId: string;
  externalId: string | null;
  subject: string;
  caseText: string | null;
  text: string;
  correctAnswer: string;
  isActive: boolean;
  verdict: ReviewVerdict | null;
  comment: string | null;
  updatedAt: string;
}

export interface ReviewLinkResults {
  link: { id: string; reviewerName: string; isActive: boolean };
  items: ReviewLinkResultItem[];
}
