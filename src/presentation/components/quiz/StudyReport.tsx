'use client';

import React from 'react';
import { Sparkles, Target, CheckCircle, ArrowRight, BookOpen, RefreshCw } from 'lucide-react';
import { useAiReport } from '@/presentation/hooks/use-ai-report';
import type { TestFeedback } from '@/core/interfaces';

function Skeleton() {
  return (
    <div className="animate-pulse motion-reduce:animate-none flex flex-col gap-3" role="status">
      <div className="h-5 w-1/3 bg-slate-200 rounded" />
      <div className="h-3 w-full bg-slate-100 rounded" />
      <div className="h-3 w-5/6 bg-slate-100 rounded" />
      <div className="h-3 w-2/3 bg-slate-100 rounded" />
      <p className="text-xs text-slate-500 mt-2">Preparando tu informe de estudio personalizado…</p>
    </div>
  );
}

function FallbackRecommendation({ text }: { text: string }) {
  return (
    <div className="text-sm text-slate-700 leading-relaxed">
      {text.split('\n').map((line, idx) => {
        if (line.trim() === '') return <br key={idx} />;
        if (line.startsWith('•')) {
          return (
            <div key={idx} className="flex items-start gap-2 ml-4 my-1">
              <span className="text-amber-600 mt-0.5">•</span>
              <span>{line.substring(1).trim()}</span>
            </div>
          );
        }
        return <p key={idx} className="my-2">{line}</p>;
      })}
    </div>
  );
}

export default function StudyReport({
  testId,
  feedback,
  canGenerate = true,
}: {
  testId: string;
  feedback: TestFeedback;
  /** El admin visualiza el informe guardado pero no lo genera. */
  canGenerate?: boolean;
}) {
  const { report, isGenerating, isFailed, retry } = useAiReport(testId, feedback.aiReport, canGenerate);

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-xs flex flex-col gap-6">
      <header className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-amber-600" />
        <h2 className="font-serif text-2xl font-bold text-slate-900">{canGenerate ? 'Tu informe de estudio' : 'Informe de estudio'}</h2>
      </header>

      {report ? (
        <>
          <div>
            <p className="font-serif text-lg text-slate-900 font-bold">{report.greeting}</p>
            <p className="text-sm text-slate-700 leading-relaxed mt-2">{report.summary}</p>
          </div>

          {(report.priorities ?? []).length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" /> Prioridades de estudio
              </h3>
              {(report.priorities ?? []).map((p, i) => (
                <article key={i} className="border border-rose-100 bg-rose-50/30 rounded-lg p-4">
                  <h4 className="font-semibold text-sm text-slate-900">
                    {i + 1}. {p.theme}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">{p.why}</p>
                  {(p.whatToStudy ?? []).length > 0 && (
                    <ul className="mt-3 flex flex-col gap-1">
                      {(p.whatToStudy ?? []).map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="text-amber-600 mt-0.5">•</span>
                          <span className="min-w-0 wrap-break-word">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {(p.suggestedSources ?? []).length > 0 && (
                    <div className="mt-3 pt-3 border-t border-rose-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> Dónde estudiar
                      </span>
                      <ul className="mt-1 flex flex-col gap-0.5">
                        {(p.suggestedSources ?? []).map((src, j) => (
                          <li key={j} className="text-xs text-slate-600 wrap-break-word">{src}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}

          {(report.strengths ?? []).length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Lo que ya dominas</h3>
              <ul className="flex flex-wrap gap-2">
                {(report.strengths ?? []).map((s, i) => (
                  <li
                    key={i}
                    className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-slate-900 text-white rounded-lg p-4 flex items-start gap-3">
            <ArrowRight className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-sm leading-relaxed">{report.nextStep}</p>
          </div>
        </>
      ) : isGenerating ? (
        <Skeleton />
      ) : (
        <div className="flex flex-col gap-3">
          {feedback.recommendation && <FallbackRecommendation text={feedback.recommendation} />}
          {isFailed && canGenerate && (
            <button
              onClick={retry}
              className="self-start inline-flex items-center gap-2 text-xs font-semibold text-slate-700 border border-slate-300 hover:bg-slate-50 rounded-lg px-3 py-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
              Reintentar informe personalizado
            </button>
          )}
        </div>
      )}
    </section>
  );
}
