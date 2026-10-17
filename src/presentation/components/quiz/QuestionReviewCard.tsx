'use client';

import React from 'react';
import { CheckCircle, Gavel, BookOpen, X, MinusCircle } from 'lucide-react';
import { CaseBlock, OptionExplanation, SourcesBlock } from '@/presentation/components/quiz/QuestionExtras';
import type { TestResultQuestionRaw } from '@/core/interfaces';

interface QuestionReviewCardProps {
  question: TestResultQuestionRaw;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  qIdx: number;
  /** 'student' usa segunda persona ("Tu respuesta"); 'admin' tercera ("Su respuesta"). */
  audience?: 'student' | 'admin';
}

const QuestionReviewCard = React.memo(function QuestionReviewCard({
  question,
  selectedAnswer,
  isCorrect,
  qIdx,
  audience = 'student',
}: QuestionReviewCardProps) {
  const studentAnswerIdx = selectedAnswer
    ? question.options.findIndex((o) => o.label === selectedAnswer)
    : -1;
  const isUnanswered = !selectedAnswer;
  const possessive = audience === 'admin' ? 'Su' : 'Tu';

  const tone = isCorrect ? 'emerald' : isUnanswered ? 'amber' : 'rose';
  const borderTone = {
    emerald: 'border-emerald-200',
    amber: 'border-amber-200',
    rose: 'border-rose-200',
  }[tone];
  const barTone = {
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  }[tone];

  return (
    <div
      className={`bg-white rounded-xl border p-6 md:p-8 shadow-xs flex flex-col gap-4 relative overflow-hidden ${borderTone}`}
    >
      <div className={`absolute top-0 left-0 w-1.5 h-full ${barTone}`} />

      <div className="flex justify-between items-center gap-4 border-b border-slate-100 pb-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Pregunta {qIdx + 1}
        </span>
        <div className="flex items-center gap-2 flex-wrap justify-end">
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

      <CaseBlock caseText={question.caseText} />

      <h3 className="font-serif text-lg text-slate-900 font-bold leading-normal">
        {question.text}
      </h3>

      {isUnanswered && (
        <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-2.5 py-1.5 w-fit">
          <MinusCircle className="w-3.5 h-3.5" />
          Sin responder
        </p>
      )}

      <div className="flex flex-col gap-2 pt-2">
        {question.options.map((option, oIdx) => {
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
            <div
              key={oIdx}
              className={`rounded-lg p-3.5 flex items-start gap-3 border text-xs sm:text-sm ${rowStyle}`}
            >
              <span
                className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs border ${letterStyle}`}
              >
                {option.label}
              </span>
              <div className="flex-1 min-w-0 pt-0.5 leading-normal flex flex-col gap-2">
                <span className="wrap-break-word">{option.text}</span>

                {(isCorrectOption || (isStudentChoice && !isCorrectOption)) && (
                  <div className="flex flex-wrap gap-1.5">
                    {isCorrectOption && (
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Correcta
                      </span>
                    )}
                    {isStudentChoice && (
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md inline-flex items-center gap-1 ${
                          isCorrectOption
                            ? 'text-emerald-700 bg-emerald-100'
                            : 'text-rose-700 bg-rose-100'
                        }`}
                      >
                        {!isCorrectOption && <X className="w-3 h-3" />}
                        {possessive} respuesta
                      </span>
                    )}
                  </div>
                )}

                <OptionExplanation
                  text={question.optionExplanations?.[option.label]}
                  isCorrect={isCorrectOption}
                />
              </div>
            </div>
          );
        })}
      </div>

      <SourcesBlock sources={question.sources} />

      {question.explanation && !question.optionExplanations && (
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

export default QuestionReviewCard;
