import type { QuestionOption } from '../quiz/quiz';
import type { Subject } from '../questions/questions';

export interface AdminStats {
  totalUsers: number;
  totalTests: number;
  averageScore: number;
  recentTestTakers: number;
  testsByArea: { area: string; totalTests: number; averageScore: number }[];
  availableAreas: { area: string; subjectCount: number; totalQuestions: number }[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string | null;
  createdAt: Date;
  totalTests: number;
  averageScore: number;
  lastTestDate: Date | null;
  enrolledAreas: string[];
  enrolledAreasCount: number;
}

export interface AdminUsersResponse {
  users: AdminUser[];
  total: number;
  page: number;
  totalPages: number;
}

export interface AdminSubject {
  id: string;
  name: string;
  area: string;
  description: string | null;
  questionCount: number;
  activeQuestionCount: number;
}

export type AdminSubjectsResponse = AdminSubject[];

export interface AdminQuestion {
  id: string;
  externalId: string | null;
  text: string;
  options: QuestionOption[];
  correctAnswers: string[];
  explanation: string | null;
  difficulty: number;
  source: string | null;
  themeId: string | null;
  subjectId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  subject: Subject;
}

export interface AdminQuestionsResponse {
  questions: AdminQuestion[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CreateQuestionData {
  text: string;
  options: QuestionOption[];
  correctAnswers: string[];
  explanation?: string;
  difficulty?: number;
  source?: string;
  subjectId: string;
  isActive?: boolean;
}

export type UpdateQuestionData = Partial<CreateQuestionData>;

export interface ImportQuestionsData {
  subject: string;
  area: string;
  sourcePdf: string;
  pageRange: string;
  totalQuestions: number;
  questions: {
    id: string;
    number: number;
    text: string;
    options: QuestionOption[];
    correctAnswer: string | null;
    explanation: string | null;
    theme: string | null;
    needsReview: boolean;
  }[];
}

export interface ImportResult {
  imported: number;
  skipped: number;
  subject: string;
}

export interface QuizAttempt {
  id: string;
  studentName: string;
  studentEmail: string;
  date: string;
  score: number;
  totalQuestions: number;
  status: 'Aprobado' | 'Requiere refuerzo';
}

export interface AvailableArea {
  area: string;
  subjectCount: number;
  totalQuestions: number;
}

export interface MyEnrollments {
  enrolledAreas: string[];
}
