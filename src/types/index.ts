export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatarUrl?: string | null;
  createdAt: string;
}

export interface Question {
  id: string;
  statement: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  category: string;
  explanation: string;
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

export interface QuizState {
  testId: string | null;
  questions: Question[];
  currentQuestionIndex: number;
  selectedOptionIndex: number | null;
  answers: { questionId: string; selectedIndex: number; isCorrect: boolean }[];
  score: number;
  timeLeft: number;
  isActive: boolean;
  isFinished: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
