'use client';

import { Flag } from 'lucide-react';
import type { Question, QuizAnswer } from '@/core/interfaces';

interface QuestionNavigatorProps {
  questions: Question[];
  answers: QuizAnswer[];
  flagged: string[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

/** Cuadrícula de preguntas del simulacro: respondida, marcada o pendiente. */
export default function QuestionNavigator({
  questions,
  answers,
  flagged,
  currentIndex,
  onSelect,
}: QuestionNavigatorProps) {
  const answered = new Set(answers.map((a) => a.questionId));
  const flaggedSet = new Set(flagged);

  return (
    <nav aria-label="Navegación entre preguntas" className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <span>
          {answered.size} de {questions.length} respondidas
        </span>
        <span className="inline-flex items-center gap-1">
          <Flag className="h-3 w-3 text-amber-600" /> {flagged.length} marcadas
        </span>
      </div>
      <ol className="grid grid-cols-9 gap-1.5 sm:grid-cols-12 md:grid-cols-[repeat(21,minmax(0,1fr))]">
        {questions.map((q, idx) => {
          const isCurrent = idx === currentIndex;
          const isAnswered = answered.has(q.id);
          const isFlagged = flaggedSet.has(q.id);
          return (
            <li key={q.id}>
              <button
                type="button"
                onClick={() => onSelect(idx)}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={`Pregunta ${idx + 1}${isAnswered ? ', respondida' : ''}${isFlagged ? ', marcada' : ''}`}
                className={`relative flex h-8 w-full cursor-pointer items-center justify-center rounded text-[11px] font-bold tabular-nums transition-colors ${
                  isCurrent
                    ? 'bg-slate-900 text-white'
                    : isAnswered
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
                {isFlagged && <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-amber-500" />}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
