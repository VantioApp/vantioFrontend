'use client';

import { use, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { useReviewLinkResults } from '@/presentation/hooks/use-reviews';
import { formatDateTime } from '@/core/utils/format-date-time';
import type { ReviewVerdict } from '@/core/interfaces';

const LABEL: Record<ReviewVerdict, string> = { ok: 'Correcta', fix: 'Corregir', no: 'Rechazar' };
const BADGE: Record<ReviewVerdict, string> = {
  ok: 'bg-emerald-100 text-emerald-800',
  fix: 'bg-amber-100 text-amber-800',
  no: 'bg-rose-100 text-rose-800',
};

export default function ReviewResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, isLoading, isError } = useReviewLinkResults(id);
  const [filter, setFilter] = useState<'' | ReviewVerdict>('');

  const items = useMemo(
    () => (data?.items ?? []).filter((i) => !filter || i.verdict === filter),
    [data, filter],
  );

  const exportCsv = () => {
    if (!data) return;
    const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
    const rows = data.items.map((i) =>
      [i.externalId ?? i.questionId, i.subject, i.verdict ?? '', i.comment ?? '', data.link.reviewerName, i.updatedAt]
        .map(esc)
        .join(','),
    );
    const blob = new Blob(['﻿id,eje,dictamen,comentario,revisor,fecha\n' + rows.join('\n')], {
      type: 'text/csv;charset=utf-8',
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `revision-${data.link.reviewerName.replace(/\s+/g, '-').toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <>
      <Link href="/admin/reviews" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 cursor-pointer">
        <ArrowLeft className="w-4 h-4" /> Revisiones
      </Link>
      {isLoading && <p className="text-sm text-slate-400">Cargando…</p>}
      {isError && <p className="text-sm text-rose-600">No se pudieron cargar los resultados.</p>}
      {data && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="font-serif text-3xl text-slate-900 font-bold tracking-tight">{data.link.reviewerName}</h1>
              <p className="text-sm text-slate-500 mt-1">{data.items.length} preguntas con dictamen o comentario</p>
            </div>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as '' | ReviewVerdict)}
                aria-label="Filtrar por dictamen"
                className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm cursor-pointer"
              >
                <option value="">Todos</option>
                <option value="fix">A corregir</option>
                <option value="no">Rechazadas</option>
                <option value="ok">Correctas</option>
              </select>
              <button
                onClick={exportCsv}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-700 cursor-pointer"
              >
                <Download className="w-4 h-4" /> CSV
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {items.length === 0 && <p className="text-sm text-slate-500 py-8 text-center">Sin resultados.</p>}
            {items.map((i) => (
              <article key={i.questionId} className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  {i.verdict && (
                    <span className={`px-2 py-0.5 rounded font-bold ${BADGE[i.verdict]}`}>{LABEL[i.verdict]}</span>
                  )}
                  <span>{i.externalId ?? i.questionId}</span>
                  <span>{i.subject}</span>
                  <span>{i.isActive ? 'activa' : 'inactiva'}</span>
                  <span className="ml-auto">{formatDateTime(i.updatedAt)}</span>
                </div>
                {i.caseText && <p className="text-sm text-slate-600 mt-2">{i.caseText}</p>}
                <p className="font-semibold text-slate-900 mt-1">{i.text}</p>
                <p className="text-xs text-slate-500 mt-1">Clave actual: {i.correctAnswer}</p>
                {i.comment && (
                  <p className="mt-2 text-sm bg-slate-50 border border-slate-200 rounded-lg p-3 whitespace-pre-wrap">
                    {i.comment}
                  </p>
                )}
              </article>
            ))}
          </div>
        </>
      )}
    </>
  );
}
