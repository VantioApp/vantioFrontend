'use client';

// TODO: Convertir a Server Component — la estructura actual esta profundamente acoplada a Zustand
// (quizStore, useAuthStore) y requiere un timer en tiempo real. Para convertir:
// 1. Crear un QuizClient.tsx con toda la logica interactiva (timer, seleccion de opciones, navegacion)
// 2. El page.tsx Server Component leeria el token de cookies, obtendria las preguntas de la API
//    via GET /quiz/:testId, y pasaria initialQuestions a QuizClient
// 3. El manejo de submit se haria via Server Action en lugar de fetch directo del cliente
// 4. La autenticacion ya es manejada por el middleware.ts (edge), eliminando la necesidad
//    del useEffect con isAuthenticated

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Timer, X, ArrowRight, Gavel } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { useQuizStore } from '@/stores/quizStore';
import { useAuthStore } from '@/stores/authStore';
import { formatTime } from '@/lib/utils';

export default function QuizPage() {
  const router = useRouter();
  const timerRef = useRef<HTMLSpanElement>(null);
  const timerContainerRef = useRef<HTMLDivElement>(null);
  const timerIconRef = useRef<SVGSVGElement>(null);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const questions = useQuizStore((s) => s.questions);
  const currentQuestionIndex = useQuizStore((s) => s.currentQuestionIndex);
  const selectedOptionIndex = useQuizStore((s) => s.selectedOptionIndex);
  const isActive = useQuizStore((s) => s.isActive);
  const isFinished = useQuizStore((s) => s.isFinished);
  const selectOption = useQuizStore((s) => s.selectOption);
  const nextQuestion = useQuizStore((s) => s.nextQuestion);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!isActive || isFinished) return;

    const timerContainer = timerContainerRef.current;
    const timerSpan = timerRef.current;
    const timerIcon = timerIconRef.current;
    const initialTime = useQuizStore.getState().timeLeft;

    if (timerSpan) {
      timerSpan.textContent = formatTime(initialTime);
    }
    if (timerContainer && initialTime <= 300) {
      timerContainer.className = timerContainer.className
        .replace(/bg-slate-50 border-slate-200 text-slate-700/g, '')
        + ' bg-rose-50 border-rose-200 text-rose-600 animate-pulse';
      if (timerIcon) {
        timerIcon.classList.add('text-rose-500');
        timerIcon.classList.remove('text-amber-600');
      }
    }

    const interval = setInterval(() => {
      const currentTime = useQuizStore.getState().timeLeft;
      const newTime = currentTime - 1;

      useQuizStore.setState({ timeLeft: newTime });

      if (timerSpan) {
        timerSpan.textContent = formatTime(newTime);
      }

      if (timerContainer) {
        const isCritical = newTime <= 300;
        const isCurrentlyCritical = timerContainer.classList.contains('bg-rose-50');
        if (isCritical && !isCurrentlyCritical) {
          timerContainer.classList.add('bg-rose-50', 'border-rose-200', 'text-rose-600', 'animate-pulse');
          timerContainer.classList.remove('bg-slate-50', 'border-slate-200', 'text-slate-700');
          if (timerIcon) {
            timerIcon.classList.add('text-rose-500');
            timerIcon.classList.remove('text-amber-600');
          }
        }
      }

      if (newTime <= 0) {
        clearInterval(interval);
        useQuizStore.setState({ timeLeft: 0, isActive: false, isFinished: true });
        useQuizStore.getState().finishQuiz();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isFinished]);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans">
        <p className="text-slate-500 font-semibold">Cargando preguntas del preparatorio...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  const initialTimeLeft = useQuizStore.getState().timeLeft;
  const isTimeCritical = initialTimeLeft <= 300;
  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleCancelQuiz = () => {
    if (window.confirm('¿Estás seguro de que deseas cancelar la prueba? Perderás todo el progreso actual.')) {
      router.push('/dashboard');
    }
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
              Simulacro Preparatorio
            </span>
          </div>

          <div 
            ref={timerContainerRef} 
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
              isTimeCritical ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <Timer ref={timerIconRef} className={`w-4 h-4 ${isTimeCritical ? 'text-rose-500' : 'text-amber-600'}`} />
            <span ref={timerRef} className="font-mono text-sm font-bold tabular-nums">{formatTime(initialTimeLeft)}</span>
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
                  className={`w-full text-left rounded-lg p-4 flex items-start gap-4 transition-all duration-200 group relative border focus:outline-none ${
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

        <div className="flex justify-between items-center gap-4 w-full">
          <button
            onClick={handleCancelQuiz}
            className="inline-flex items-center gap-1.5 px-5 py-3 rounded-lg border border-slate-200 text-xs font-bold text-slate-500 hover:text-rose-600 hover:border-rose-200 bg-white transition-all active:scale-95 shadow-xs"
          >
            <X className="w-4 h-4" />
            Finalizar Prueba
          </button>

          <button
            onClick={nextQuestion}
            disabled={selectedOptionIndex === null}
            className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs font-bold transition-all active:scale-95 shadow-sm ${
              selectedOptionIndex === null
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-950 hover:shadow-md'
            }`}
          >
            {currentQuestionIndex + 1 === questions.length ? 'Finalizar Prueba' : 'Siguiente Pregunta'}
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </main>

      <footer className="bg-slate-100 py-4 text-center border-t border-slate-200 shrink-0">
        <div className="max-w-3xl mx-auto px-6 flex justify-between items-center text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
          <span>Rigor Académico</span>
          <span>Vantio Simulador Oficial</span>
        </div>
      </footer>
    </div>
  );
}
