'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  CheckCircle, AlertTriangle, Gavel, ChevronLeft, BookOpen, Award, Loader2, X, ArrowLeft,
} from 'lucide-react';
import { useAuthStore } from '@/presentation/stores/authStore';
import { useAuthHydration } from '@/presentation/hooks/use-auth-hydration';
import { useAdminTestResults } from '@/presentation/hooks/use-admin-test-results';
import { useAdminUserDetails } from '@/presentation/hooks/use-admin-user-details';
import PlanRefuerzo from '@/presentation/components/quiz/PlanRefuerzo';
import PerformancePolarChart from '@/presentation/components/quiz/PerformancePolarChart';
import type { TestResultQuestionRaw, TestResultsResponse, AdminUserDetails } from '@/core/interfaces';

const optionLetters = ['A', 'B', 'C', 'D'];

const QuestionReviewCard = React.memo(function QuestionReviewCard({
  question,
  selectedAnswer,
  isCorrect,
  qIdx,
}: {
  question: TestResultQuestionRaw;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  qIdx: number;
}) {
  const studentAnswerIdx = selectedAnswer
    ? question.options.findIndex((o) => o.label === selectedAnswer)
    : null;

  return (
    <div
      className={`bg-white rounded-xl border p-6 md:p-8 shadow-xs flex flex-col gap-4 relative overflow-hidden ${
        isCorrect ? 'border-emerald-200' : 'border-rose-200'
      }`}
    >
      <div className={`absolute top-0 left-0 w-1.5 h-full ${
        isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
      }`} />

      <div className="flex justify-between items-center gap-4 border-b border-slate-100 pb-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Pregunta {qIdx + 1}
        </span>
        <div className="flex items-center gap-2">
          {question.themeName && (
            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              {question.themeName}
            </span>
          )}
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Gavel className="w-3.5 h-3.5 text-amber-600" />
            {question.subjectName}
          </span>
        </div>
      </div>

      <h3 className="font-serif text-lg text-slate-900 font-bold leading-normal">
        {question.text}
      </h3>

      <div className="flex flex-col gap-2 pt-2">
        {question.options.map((option, oIdx) => {
          const letter = optionLetters[oIdx];
          const isCorrectOption = question.correctAnswer === option.label;
          const isStudentChoice = oIdx === studentAnswerIdx;

          let rowStyle = 'bg-slate-50 border-slate-200 text-slate-700';
          let letterStyle = 'bg-slate-200 text-slate-600 border-slate-300';

          if (isCorrectOption) {
            rowStyle = 'bg-emerald-50/60 border-emerald-300 text-emerald-900 font-medium';
            letterStyle = 'bg-emerald-500 text-white border-emerald-600';
          } else if (isStudentChoice && !isCorrect) {
            rowStyle = 'bg-rose-50/60 border-rose-200 text-rose-900';
            letterStyle = 'bg-rose-500 text-white border-rose-600';
          }

          return (
            <div key={oIdx} className={`rounded-lg p-3.5 flex items-start gap-3 border text-xs sm:text-sm ${rowStyle}`}>
              <span className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs border ${letterStyle}`}>
                {letter}
              </span>
              <span className="pt-0.5 leading-normal">{option.text}</span>

              {isCorrectOption && (
                <span className="ml-auto text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded-md shrink-0 flex items-center gap-1">
                  {isStudentChoice && (
                    <CheckCircle className="w-3 h-3" />
                  )}
                  {isStudentChoice ? 'Respuesta Correcta' : 'Respuesta Correcta'}
                </span>
              )}
              {isStudentChoice && !isCorrectOption && (
                <span className="ml-auto text-[10px] font-bold text-rose-700 uppercase tracking-wider bg-rose-100 px-2 py-0.5 rounded-md shrink-0 flex items-center gap-1">
                  <X className="w-3 h-3" />
                  Su Selección
                </span>
              )}
            </div>
          );
        })}
      </div>

      {question.explanation && (
        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
            <BookOpen className="w-4 h-4 text-amber-600" />
            Fundamento Jurídico
          </p>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
});

interface ExamReviewClientProps {
  userId: string;
  testId: string;
  initialResults: TestResultsResponse | null;
  initialUser: AdminUserDetails | null;
}

export default function ExamReviewClient({
  userId,
  testId,
  initialResults,
  initialUser,
}: ExamReviewClientProps) {
  const router = useRouter();
  const params = useParams();
  void params;
  const shouldReduce = useReducedMotion();
  const user = useAuthStore((s) => s.user);
  const isHydrated = useAuthHydration();

  const { data: resultsData, isLoading: isLoadingResults } = useAdminTestResults(
    testId,
    initialResults || undefined
  );
  const { data: userDetails } = useAdminUserDetails(userId, initialUser || undefined);

  useEffect(() => {
    if (!isHydrated) return;
    if (user?.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [isHydrated, user, router]);

  if (!user) return null;

  if (isLoadingResults) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-slate-400 animate-spin mb-4" />
        <p className="text-slate-500 text-sm">Cargando resultados del examen...</p>
      </div>
    );
  }

  if (!resultsData) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertTriangle className="w-10 h-10 text-amber-500 mb-4" />
        <p className="text-slate-700 text-sm font-semibold">No se pudieron cargar los resultados del examen.</p>
        <Link
          href={`/admin/users/${userId}`}
          className="mt-4 inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al detalle del usuario
        </Link>
      </div>
    );
  }

  const totalQuestions = resultsData.totalQuestions;
  const correctCount = resultsData.correctCount;
  const scorePercent = resultsData.score;
  const isPassed = resultsData.passed;

  const feedback = resultsData.feedback || null;
  const displayUser = userDetails ?? initialUser;

  return (
    <>
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push(`/admin/users/${userId}`)}
          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="font-serif text-2xl md:text-3xl text-slate-900 font-bold tracking-tight">
            Revisión del Examen
          </h1>
          {displayUser && (
            <p className="text-sm text-slate-500 mt-1">
              {displayUser.name} · {displayUser.email}
            </p>
          )}
        </div>
      </div>

      <motion.div
        initial={shouldReduce ? false : { opacity: 0, scale: 0.98 }}
        animate={shouldReduce ? false : { opacity: 1, scale: 1 }}
        className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm text-center flex flex-col items-center gap-4"
      >
        {isPassed ? (
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center shadow-xs">
            <CheckCircle className="w-10 h-10" />
          </div>
        ) : (
          <div className="w-16 h-16 bg-rose-50 border border-rose-200 text-rose-600 rounded-full flex items-center justify-center shadow-xs">
            <AlertTriangle className="w-10 h-10" />
          </div>
        )}

        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Diagnóstico de Desempeño</span>
          <h2 className="font-serif text-3xl font-bold text-slate-900 mt-1">
            {isPassed ? '¡Prueba Aprobada!' : 'Requiere Refuerzo Doctrinal'}
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
            {isPassed
              ? 'El estudiante demostró un nivel sólido de conocimientos en el área evaluada.'
              : 'El estudiante requiere refuerzo en algunos temas clave de la materia evaluada.'}
          </p>
        </div>

        <div className="my-4 flex items-center gap-6 bg-slate-50 border border-slate-200/60 p-4 rounded-xl w-full max-w-sm justify-around">
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aciertos</p>
            <p className="text-3xl font-serif font-bold text-slate-900 mt-0.5">{correctCount} / {totalQuestions}</p>
          </div>
          <div className="w-px h-10 bg-slate-200" />
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nota Porcentual</p>
            <p className={`text-3xl font-serif font-bold mt-0.5 ${isPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
              {Math.round(scorePercent)}%
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <Link
            href={`/admin/users/${userId}`}
            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-lg text-sm shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver al usuario
          </Link>
          <div className="flex-1 border border-slate-300 bg-slate-50 text-slate-500 font-semibold py-3 px-4 rounded-lg text-sm flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            Solo lectura
          </div>
        </div>
      </motion.div>

      {feedback ? (
        <>
          <div>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              Plan de Refuerzo
            </h2>
            <PlanRefuerzo feedback={feedback} />
          </div>
          <PerformancePolarChart themeAnalysis={feedback.themeAnalysis} />
        </>
      ) : null}

      <div>
        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-600" />
          Revisión Doctrinal del Cuestionario
        </h2>

        <div className="flex flex-col gap-6 content-visibility-auto">
          {resultsData.questions.map((question, qIdx) => {
            return (
              <QuestionReviewCard
                key={question.id || qIdx}
                question={question}
                selectedAnswer={question.selectedAnswer || null}
                isCorrect={question.isCorrect || null}
                qIdx={qIdx}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
