'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Eye, EyeOff, Download } from 'lucide-react';
import { useSaveReview } from '@/presentation/hooks/use-reviews';
import type { ReviewQuestion, ReviewSet, ReviewState, ReviewVerdict } from '@/core/interfaces';

const PAGE_SIZE = 40;
const VERDICTS: { value: ReviewVerdict; label: string; on: string }[] = [
  { value: 'ok', label: 'Correcta', on: 'bg-emerald-100 border-emerald-400 text-emerald-800' },
  { value: 'fix', label: 'Corregir', on: 'bg-amber-100 border-amber-400 text-amber-800' },
  { value: 'no', label: 'Rechazar', on: 'bg-rose-100 border-rose-400 text-rose-800' },
];
const BORDER: Record<ReviewVerdict, string> = {
  ok: 'border-l-emerald-400',
  fix: 'border-l-amber-400',
  no: 'border-l-rose-400',
};

type SaveStatus = 'saving' | 'saved' | 'error';

interface ReviewWorkspaceProps {
  token: string;
  data: ReviewSet;
}

export default function ReviewWorkspace({ token, data }: ReviewWorkspaceProps) {
  const { mutate: save } = useSaveReview(token);
  const [reviews, setReviews] = useState<Record<string, ReviewState>>(() =>
    Object.fromEntries(data.questions.map((q) => [q.id, q.review])),
  );
  const [status, setStatus] = useState<Record<string, SaveStatus>>({});
  const [subjectId, setSubjectId] = useState('');
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [blind, setBlind] = useState(false);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    const pending = timers.current;
    return () => Object.values(pending).forEach(clearTimeout);
  }, []);

  const subjectName = useMemo(
    () => Object.fromEntries(data.subjects.map((s) => [s.id, s.name])),
    [data.subjects],
  );

  const persist = useCallback(
    (questionId: string, patch: Partial<ReviewState>) => {
      setStatus((s) => ({ ...s, [questionId]: 'saving' }));
      save(
        { questionId, data: patch },
        {
          onSuccess: () => setStatus((s) => ({ ...s, [questionId]: 'saved' })),
          onError: () => setStatus((s) => ({ ...s, [questionId]: 'error' })),
        },
      );
    },
    [save],
  );

  const setVerdict = (q: ReviewQuestion, verdict: ReviewVerdict) => {
    const next = reviews[q.id]?.verdict === verdict ? null : verdict;
    setReviews((r) => ({ ...r, [q.id]: { ...r[q.id], verdict: next } }));
    persist(q.id, { verdict: next });
  };

  const setComment = (q: ReviewQuestion, comment: string) => {
    setReviews((r) => ({ ...r, [q.id]: { ...r[q.id], comment } }));
    setStatus((s) => ({ ...s, [q.id]: 'saving' }));
    clearTimeout(timers.current[q.id]);
    timers.current[q.id] = setTimeout(() => persist(q.id, { comment }), 700);
  };

  const filtered = useMemo(() => {
    const t = search.trim().toLowerCase();
    return data.questions.filter((q) => {
      if (subjectId && q.subjectId !== subjectId) return false;
      const v = reviews[q.id]?.verdict ?? null;
      if (filter === 'p' ? v !== null : filter && v !== filter) return false;
      if (!t) return true;
      return [q.externalId, q.caseText, q.text, q.sources.join(' '), ...q.options.map((o) => o.text)]
        .join(' ')
        .toLowerCase()
        .includes(t);
    });
  }, [data.questions, reviews, subjectId, filter, search]);

  const reviewed = data.questions.filter((q) => reviews[q.id]?.verdict).length;
  const count = (v: ReviewVerdict) => data.questions.filter((q) => reviews[q.id]?.verdict === v).length;

  const exportCsv = () => {
    const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
    const rows = data.questions
      .filter((q) => reviews[q.id]?.verdict || reviews[q.id]?.comment)
      .map((q) =>
        [q.externalId ?? q.id, subjectName[q.subjectId] ?? '', reviews[q.id]?.verdict ?? '', reviews[q.id]?.comment ?? '']
          .map(esc)
          .join(','),
      );
    const blob = new Blob(['﻿id,eje,dictamen,comentario\n' + rows.join('\n')], {
      type: 'text/csv;charset=utf-8',
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'mi-revision.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-24">
      <header className="pt-6 pb-3">
        <h1 className="font-serif text-2xl font-bold text-slate-900">Revisión del banco de preguntas</h1>
        <p className="text-sm text-slate-500 mt-1">
          Revisor: <span className="font-semibold text-slate-700">{data.reviewerName}</span>. Marque cada pregunta como
          Correcta, Corregir o Rechazar y deje un comentario. Sus respuestas se guardan automáticamente.
        </p>
      </header>

      <div className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur py-3 border-b border-slate-200 space-y-2">
        <div className="flex flex-wrap gap-2">
          <select
            value={subjectId}
            onChange={(e) => { setSubjectId(e.target.value); setLimit(PAGE_SIZE); }}
            aria-label="Filtrar por eje"
            className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm cursor-pointer"
          >
            <option value="">Todos los ejes ({data.questions.length})</option>
            {data.subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({data.questions.filter((q) => q.subjectId === s.id).length})
              </option>
            ))}
          </select>
          <select
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setLimit(PAGE_SIZE); }}
            aria-label="Filtrar por estado"
            className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm cursor-pointer"
          >
            <option value="">Todos los estados</option>
            <option value="p">Pendientes</option>
            <option value="ok">Correctas</option>
            <option value="fix">A corregir</option>
            <option value="no">Rechazadas</option>
          </select>
          <input
            type="search"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setLimit(PAGE_SIZE); }}
            placeholder="Buscar texto o artículo (ej. 855)"
            aria-label="Buscar"
            className="flex-1 min-w-[180px] px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setBlind((b) => !b)}
            title="Oculta la clave y las explicaciones para resolver la pregunta primero"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:border-slate-400 cursor-pointer"
          >
            {blind ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            {blind ? 'Mostrar clave' : 'Modo ciego'}
          </button>
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:border-slate-400 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Descargar mi revisión
          </button>
          <span className="text-xs text-slate-500">
            {filtered.length} visibles · revisadas {reviewed}/{data.questions.length} · correctas {count('ok')} · corregir{' '}
            {count('fix')} · rechazar {count('no')}
          </span>
        </div>
        <div className="h-1.5 bg-slate-200 rounded overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${data.questions.length ? (100 * reviewed) / data.questions.length : 0}%` }}
          />
        </div>
      </div>

      {filtered.length === 0 && <p className="text-center text-slate-500 py-12">Sin resultados.</p>}

      {filtered.slice(0, limit).map((q) => {
        const r = reviews[q.id] ?? { verdict: null, comment: null };
        const st = status[q.id];
        const needsComment = (r.verdict === 'fix' || r.verdict === 'no') && !r.comment?.trim();
        return (
          <article
            key={q.id}
            className={`bg-white border border-slate-200 border-l-4 rounded-xl p-4 my-3 ${
              r.verdict ? BORDER[r.verdict] : 'border-l-slate-200'
            }`}
          >
            <div className="flex flex-wrap gap-x-3 text-xs text-slate-500">
              <span>{q.externalId ?? q.id}</span>
              <span>{subjectName[q.subjectId]}</span>
              {q.theme && <span>{q.theme}</span>}
              <span>dificultad {q.difficulty}</span>
            </div>
            {q.caseText && (
              <div className="mt-2 p-3 bg-slate-50 rounded-lg text-sm">
                <p className="text-[10px] font-bold tracking-wider text-slate-400 mb-1">CASO</p>
                {q.caseText}
              </div>
            )}
            <p className="mt-3 font-semibold text-slate-900">{q.text}</p>
            <div className="mt-2 space-y-1.5">
              {q.options.map((o) => {
                const isKey = !blind && o.label === q.correctAnswer;
                return (
                  <div
                    key={o.label}
                    className={`rounded-lg border px-3 py-2 text-sm ${
                      isKey ? 'bg-emerald-50 border-emerald-300' : 'border-slate-200'
                    }`}
                  >
                    <span className="font-bold">{o.label}.</span> {o.text}
                    {!blind && q.optionExplanations?.[o.label] && (
                      <p className="text-xs text-slate-500 mt-1">{q.optionExplanations[o.label]}</p>
                    )}
                  </div>
                );
              })}
            </div>
            {!blind && q.sources.length > 0 && (
              <p className="mt-2 text-xs text-sky-700">Fuente: {q.sources.join('; ')}</p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {VERDICTS.map((v) => (
                <button
                  key={v.value}
                  onClick={() => setVerdict(q, v.value)}
                  aria-pressed={r.verdict === v.value}
                  className={`px-3 py-1.5 rounded-lg border text-sm font-semibold cursor-pointer ${
                    r.verdict === v.value ? v.on : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                  }`}
                >
                  {v.label}
                </button>
              ))}
              <span className="text-xs text-slate-400 ml-auto" aria-live="polite">
                {st === 'saving' && 'Guardando…'}
                {st === 'saved' && 'Guardado'}
                {st === 'error' && <span className="text-rose-600">No se pudo guardar. Reintente.</span>}
              </span>
            </div>
            <textarea
              value={r.comment ?? ''}
              onChange={(e) => setComment(q, e.target.value)}
              placeholder={
                needsComment ? 'Indique qué debe corregirse o por qué se rechaza' : 'Comentario (opcional)'
              }
              maxLength={4000}
              aria-label="Comentario"
              className={`mt-2 w-full min-h-[56px] px-3 py-2 rounded-lg border text-sm resize-y ${
                needsComment ? 'border-amber-400 bg-amber-50' : 'border-slate-300'
              }`}
            />
          </article>
        );
      })}

      {filtered.length > limit && (
        <div className="text-center py-4">
          <button
            onClick={() => setLimit((l) => l + PAGE_SIZE)}
            className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm font-semibold cursor-pointer hover:border-slate-400"
          >
            Mostrar más ({filtered.length - limit} restantes)
          </button>
        </div>
      )}
    </div>
  );
}
