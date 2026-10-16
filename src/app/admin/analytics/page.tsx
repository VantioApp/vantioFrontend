'use client';

import { useState } from 'react';
import { useAdminAnalytics } from '@/presentation/hooks/use-admin-analytics';
import type { AnalyticsQuestionItem } from '@/core/interfaces';

const RANGES = [7, 30, 90] as const;

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 md:p-6 flex flex-col gap-4">
      <h2 className="font-serif text-lg font-bold text-slate-900">{title}</h2>
      {children}
    </section>
  );
}

function Kpi({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</p>
      <p className="font-serif text-3xl font-bold text-slate-900 mt-1">{value}</p>
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

function Bar({ pct, tone = 'amber' }: { pct: number; tone?: 'amber' | 'emerald' | 'rose' }) {
  const color = { amber: 'bg-amber-500', emerald: 'bg-emerald-500', rose: 'bg-rose-500' }[tone];
  return (
    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(100, Math.max(0, pct))}%` }} />
    </div>
  );
}

const toneFor = (accuracy: number) => (accuracy >= 70 ? 'emerald' : accuracy >= 50 ? 'amber' : 'rose');

function QuestionList({ items, empty }: { items: AnalyticsQuestionItem[]; empty: string }) {
  if (items.length === 0) return <p className="text-sm text-slate-400">{empty}</p>;
  return (
    <ol className="flex flex-col divide-y divide-slate-100">
      {items.map((q) => (
        <li key={q.id} className="py-3 flex flex-col gap-1.5">
          <p className="text-sm text-slate-800 line-clamp-3">{q.text}</p>
          <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
            <span className="truncate">{q.subject}</span>
            <span className="shrink-0 font-semibold">
              {q.accuracy}% · {q.attempts} intentos
            </span>
          </div>
          <Bar pct={q.accuracy} tone={toneFor(q.accuracy)} />
        </li>
      ))}
    </ol>
  );
}

export default function AdminAnalyticsPage() {
  const [days, setDays] = useState<(typeof RANGES)[number]>(30);
  const { data, isLoading, isError } = useAdminAnalytics(days);

  const maxDaily = Math.max(1, ...(data?.daily.map((d) => d.tests) ?? [1]));
  const maxBucket = Math.max(1, ...(data?.scoreDistribution.map((b) => b.tests) ?? [1]));

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Actividad, rendimiento y calidad del banco de preguntas.</p>
        </div>
        <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 self-start">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setDays(r)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                days === r ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {r} días
            </button>
          ))}
        </div>
      </div>

      {isLoading && <p className="text-sm text-slate-400">Cargando analíticas...</p>}
      {isError && <p className="text-sm text-rose-600">No se pudieron cargar las analíticas.</p>}

      {data && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Kpi label="Usuarios" value={data.overview.totalUsers} hint={`+${data.overview.newUsers} en ${days} días`} />
            <Kpi label="Usuarios activos" value={data.overview.activeUsers} hint="con simulacros terminados" />
            <Kpi label="Simulacros" value={data.overview.testsCompleted} hint={`~${data.overview.averageQuestionsPerTest} preguntas c/u`} />
            <Kpi label="Aprobación" value={`${data.overview.passRate}%`} hint={`puntaje medio ${data.overview.averageScore}%`} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Simulacros por día">
              <div className="flex items-end gap-px h-32" role="img" aria-label="Simulacros terminados por día">
                {data.daily.map((d) => (
                  <div
                    key={d.date}
                    title={`${d.date}: ${d.tests} simulacros, ${d.newUsers} registros`}
                    className="flex-1 bg-amber-500/80 rounded-t min-h-px"
                    style={{ height: `${(d.tests / maxDaily) * 100}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>{data.daily[0]?.date}</span>
                <span>{data.daily[data.daily.length - 1]?.date}</span>
              </div>
            </Card>

            <Card title="Distribución de puntajes">
              <div className="flex flex-col gap-3">
                {data.scoreDistribution.map((b) => (
                  <div key={b.range} className="flex items-center gap-3 text-xs">
                    <span className="w-14 text-slate-500 font-semibold">{b.range}%</span>
                    <div className="flex-1">
                      <Bar pct={(b.tests / maxBucket) * 100} />
                    </div>
                    <span className="w-8 text-right text-slate-700 font-semibold">{b.tests}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card title="Acierto por eje temático">
            {data.bySubject.length === 0 ? (
              <p className="text-sm text-slate-400">Aún no hay respuestas en este periodo.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {data.bySubject.map((s) => (
                  <div key={s.subjectId} className="flex flex-col gap-1">
                    <div className="flex justify-between gap-3 text-xs">
                      <span className="text-slate-700 font-medium truncate">
                        <span className="text-slate-400">{s.area} · </span>
                        {s.name}
                      </span>
                      <span className="shrink-0 text-slate-500 font-semibold">
                        {s.accuracy}% · {s.answered} resp.
                      </span>
                    </div>
                    <Bar pct={s.accuracy} tone={toneFor(s.accuracy)} />
                  </div>
                ))}
              </div>
            )}
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Preguntas más difíciles">
              <QuestionList items={data.hardestQuestions} empty="Se necesitan al menos 5 intentos por pregunta." />
            </Card>
            <Card title="Preguntas más fáciles">
              <QuestionList items={data.easiestQuestions} empty="Se necesitan al menos 5 intentos por pregunta." />
            </Card>
          </div>

          <Card title="Revisión profesional">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <Kpi label="Enlaces activos" value={data.reviews.activeLinks} />
              <Kpi label="Dictámenes" value={data.reviews.reviewedQuestions} />
              <Kpi label="Correctas" value={data.reviews.verdicts.ok} />
              <Kpi label="A corregir" value={data.reviews.verdicts.fix} />
              <Kpi label="Descartar" value={data.reviews.verdicts.no} hint={`${data.reviews.flaggedQuestions} preguntas marcadas`} />
            </div>
          </Card>
        </>
      )}
    </>
  );
}
