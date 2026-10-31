'use client';

import { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Timer, X, ArrowRight, ArrowLeft, Gavel, Loader2, Flag, BookOpenText } from 'lucide-react';
import { Logo } from '@/presentation/components/ui/logo';
import { useQuizStore } from '@/presentation/stores/quizStore';
import { useSubmitQuiz } from '@/presentation/hooks/use-quiz';
import { formatTime } from '@/core/utils/format-time';
import { CaseBlock } from '@/presentation/components/quiz/QuestionExtras';
import QuestionNavigator from '@/presentation/components/quiz/QuestionNavigator';
import NormKiosk from '@/presentation/components/quiz/NormKiosk';

export default function QuizPage() {
  const router = useRouter();
  const { mutate: submitQuiz, isPending: isSubmitting } = useSubmitQuiz();
  const [isFinishing, setIsFinishing] = useState(false);
  const [kioskOpen, setKioskOpen] = useState(false);
  const questions = useQuizStore((s) => s.questions);
  const currentQuestionIndex = useQuizStore((s) => s.currentQuestionIndex);
  const selectedOptionIndex = useQuizStore((s) => s.selectedOptionIndex);
  const isActive = useQuizStore((s) => s.isActive);
  const isFinished = useQuizStore((s) => s.isFinished);
  const timeLeft = useQuizStore((s) => s.timeLeft);
  const selectOption = useQuizStore((s) => s.selectOption);
  const nextQuestion = useQuizStore((s) => s.nextQuestion);
  const tickTimer = useQuizStore((s) => s.tickTimer);
  const mode = useQuizStore((s) => s.mode);
  const answers = useQuizStore((s) => s.answers);
  const flagged = useQuizStore((s) => s.flagged);
  const goToQuestion = useQuizStore((s) => s.goToQuestion);
  const toggleFlag = useQuizStore((s) => s.toggleFlag);
  const isSimulacro = mode === 'idoneidad_simulacro';

  const handleFinishQuiz = useCallback(() => {
    const { testId: currentTestId, answers: currentAnswers } = useQuizStore.getState();
    console.log('[Quiz] handleFinishQuiz called', { testId: currentTestId, answersCount: currentAnswers.length });
    if (!currentTestId) return;
    const submitAnswers = currentAnswers
      .filter((a) => a.selectedAnswer)
      .map((a) => ({
        testQuestionId: a.testQuestionId,
        selectedAnswer: a.selectedAnswer,
      }));
    
    console.log('[Quiz] submitAnswers prepared', { submitAnswersCount: submitAnswers.length, firstFew: submitAnswers.slice(0, 3) });
    
    if (submitAnswers.length === 0) {
      console.warn('[Quiz] No answers to submit, aborting');
      return;
    }
    
    setIsFinishing(true);
    submitQuiz({ testId: currentTestId, answers: submitAnswers }, {
      onSuccess: (data) => {
        console.log('[Quiz] Submit success', data);
        useQuizStore.getState().markSubmitted();
        router.push(`/quiz/${currentTestId}/results`);
      },
      onError: (error) => {
        console.error('[Quiz] Submit error', error);
        setIsFinishing(false);
      },
    });
  }, [submitQuiz, router]);

  const handleNextQuestion = useCallback(() => {
    const isLastQuestion = currentQuestionIndex + 1 >= questions.length;
    nextQuestion();
    if (isLastQuestion) {
      setTimeout(() => {
        handleFinishQuiz();
      }, 0);
    }
  }, [currentQuestionIndex, questions.length, nextQuestion, handleFinishQuiz]);

  // El simulacro sobrevive a recargas: se recupera de sessionStorage al montar.
  useEffect(() => {
    if (useQuizStore.getState().questions.length === 0) {
      void Promise.resolve(useQuizStore.persist.rehydrate()).then(() => {
        useQuizStore.getState().tickTimer();
      });
    }
  }, []);

  useEffect(() => {
    if (!isActive || isFinished) return;

    const interval = setInterval(() => {
      tickTimer();
      // tickTimer desactiva el quiz al llegar a 0; el envío automático se dispara aquí.
      if (useQuizStore.getState().timeLeft <= 0) {
        clearInterval(interval);
        handleFinishQuiz();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isFinished, tickTimer, handleFinishQuiz]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isActive && !isFinished) {
        e.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isActive, isFinished]);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans">
        <p className="text-slate-500 font-semibold">Cargando preguntas del preparatorio...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = isSimulacro
    ? Math.round((answers.length / questions.length) * 100)
    : Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  const isTimeCritical = timeLeft <= 300;
  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleCancelQuiz = () => {
    if (window.confirm('¿Estás seguro de que deseas cancelar la prueba? Perderás todo el progreso actual.')) {
      router.push('/dashboard');
    }
  };

  const isProcessing = isSubmitting || isFinishing;

  const handleSubmitSimulacro = () => {
    const unanswered = questions.length - answers.length;
    const message =
      unanswered > 0
        ? `Tienes ${unanswered} pregunta${unanswered === 1 ? '' : 's'} sin responder. ¿Entregar el simulacro de todas formas?`
        : '¿Entregar el simulacro? No podrás modificar tus respuestas.';
    if (window.confirm(message)) handleFinishQuiz();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800 antialiased justify-between">
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="h-2 w-full bg-slate-100">
          <div 
            className="h-full bg-amber-500 transition-all duration-300 ease-out" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Logo variant="isotype" theme="light" height={28} />
            <span className="font-serif text-lg font-bold text-slate-900 tracking-tight">Vantio</span>
            <span className="hidden md:inline-block text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {isSimulacro ? 'Simulacro Idoneidad' : 'Simulacro Preparatorio'}
            </span>
          </div>

          <div className="flex items-center gap-3">
          {isSimulacro && (
            <button
              type="button"
              onClick={() => setKioskOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <BookOpenText className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">Quiosco Normativo</span>
            </button>
          )}
          <div 
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
              isTimeCritical ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <Timer className={`w-4 h-4 ${isTimeCritical ? 'text-rose-500' : 'text-amber-600'}`} />
            <span className="font-mono text-sm font-bold tabular-nums">{formatTime(timeLeft)}</span>
          </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col justify-center py-10 px-6 max-w-3xl w-full mx-auto">
        <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm p-8 md:p-10 mb-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded">
              Pregunta {currentQuestionIndex + 1} de {questions.length}
            </span>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1">
              <Gavel className="w-3.5 h-3.5" />
              {currentQuestion.category}
            </span>
          </div>

          <CaseBlock caseText={currentQuestion.caseText} />

          <h2 className="font-serif text-xl md:text-2xl text-slate-900 font-bold leading-relaxed mb-8">
            {currentQuestion.statement}
          </h2>

          <div className="flex flex-col gap-3 w-full">
            {currentQuestion.options.map((option, idx) => {
              const letter = optionLetters[idx];
              const isSelected = selectedOptionIndex === idx;

              return (
                <button
                  key={idx}
                  onClick={() => selectOption(idx)}
                  className={`w-full text-left rounded-lg p-4 flex items-start gap-4 transition-all duration-200 group relative border focus:outline-none cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <span className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full font-bold text-xs border transition-colors ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 border-slate-200'
                  }`}>
                    {letter}
                  </span>
                  <span className="text-sm md:text-base font-medium pt-0.5 leading-normal">{option.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {isSimulacro ? (
          <>
            <div className="flex flex-wrap justify-between items-center gap-3 w-full mb-6">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => goToQuestion(currentQuestionIndex - 1)}
                  disabled={currentQuestionIndex === 0 || isProcessing}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={toggleFlag}
                  aria-pressed={flagged.includes(currentQuestion.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-3 rounded-lg border text-xs font-bold cursor-pointer ${
                    flagged.includes(currentQuestion.id)
                      ? 'border-amber-300 bg-amber-50 text-amber-800'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Flag className="w-4 h-4 text-amber-600" />
                  {flagged.includes(currentQuestion.id) ? 'Marcada' : 'Marcar'}
                </button>
              </div>
              <button
                type="button"
                onClick={() => goToQuestion(currentQuestionIndex + 1)}
                disabled={currentQuestionIndex + 1 >= questions.length || isProcessing}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
                <ArrowRight className="w-4 h-4 text-amber-600" />
              </button>
            </div>

            <QuestionNavigator
              questions={questions}
              answers={answers}
              flagged={flagged}
              currentIndex={currentQuestionIndex}
              onSelect={goToQuestion}
            />

            <button
              type="button"
              onClick={handleSubmitSimulacro}
              disabled={isProcessing}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold border border-slate-950 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando respuestas...
                </>
              ) : (
                'Entregar simulacro'
              )}
            </button>
          </>
        ) : (
        <div className="flex justify-between items-center gap-4 w-full">
          <button
            onClick={handleCancelQuiz}
            disabled={isProcessing}
            className="inline-flex items-center gap-1.5 px-5 py-3 rounded-lg border border-slate-200 text-xs font-bold text-slate-500 hover:text-rose-600 hover:border-rose-200 bg-white transition-all active:scale-95 shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-4 h-4" />
            Finalizar Prueba
          </button>

          <button
            onClick={handleNextQuestion}
            disabled={selectedOptionIndex === null || isProcessing}
            className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs font-bold transition-all active:scale-95 shadow-sm ${
              selectedOptionIndex === null || isProcessing
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-950 hover:shadow-md cursor-pointer'
            }`}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Enviando respuestas...
              </>
            ) : (
              <>
                {currentQuestionIndex + 1 === questions.length ? 'Finalizar Prueba' : 'Siguiente Pregunta'}
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </>
            )}
          </button>
        </div>
        )}
      </main>

      {kioskOpen && <NormKiosk onClose={() => setKioskOpen(false)} />}

      <footer className="bg-slate-100 py-4 text-center border-t border-slate-200 shrink-0">
        <div className="max-w-3xl mx-auto px-6 flex justify-between items-center text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
          <span>Rigor Académico</span>
          <span>Vantio Simulador Oficial</span>
        </div>
      </footer>
    </div>
  );
}
