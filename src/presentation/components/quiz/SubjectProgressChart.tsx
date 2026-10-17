'use client';

import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useSubjectProgress } from '@/presentation/hooks/use-subject-progress';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' });

export default function SubjectProgressChart({ testId }: { testId: string }) {
  const { data } = useSubjectProgress(testId);
  const attempts = useMemo(() => data?.attempts ?? [], [data]);

  const chartData = useMemo(
    () => ({
      labels: attempts.map((a) => formatDate(a.finishedAt)),
      datasets: [
        {
          data: attempts.map((a) => Math.round(a.score)),
          borderColor: '#0f172a',
          backgroundColor: 'rgba(217, 119, 6, 0.08)',
          fill: true,
          tension: 0.25,
          borderWidth: 2,
          pointRadius: attempts.map((a) => (a.testId === testId ? 7 : 4)),
          pointBackgroundColor: attempts.map((a) => (a.testId === testId ? '#d97706' : '#0f172a')),
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
        },
      ],
    }),
    [attempts, testId]
  );

  if (attempts.length < 2) return null;

  const idx = attempts.findIndex((a) => a.testId === testId);
  const delta = idx > 0 ? Math.round(attempts[idx].score - attempts[idx - 1].score) : null;
  const DeltaIcon = delta === null ? Minus : delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus;
  const deltaColor = delta === null ? 'text-slate-500' : delta > 0 ? 'text-emerald-600' : delta < 0 ? 'text-rose-600' : 'text-slate-500';

  return (
    <section
      aria-label="Evolución en la materia"
      className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-xs"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0">
          <h3 className="font-serif text-lg font-bold text-slate-900">Evolución en la materia</h3>
          <p className="text-xs text-slate-500 mt-1">
            {data?.subjectName} · últimas {attempts.length} pruebas
          </p>
        </div>
        {delta !== null && (
          <span className={`inline-flex items-center gap-1 text-sm font-bold shrink-0 ${deltaColor}`}>
            <DeltaIcon className="w-4 h-4" />
            {delta > 0 ? '+' : ''}
            {delta} pts vs. anterior
          </span>
        )}
      </div>
      <div className="h-52" role="img" aria-label={`Puntajes de las últimas ${attempts.length} pruebas: ${attempts.map((a) => `${Math.round(a.score)}%`).join(', ')}`}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y}%` } },
            },
            scales: {
              y: { min: 0, max: 100, ticks: { stepSize: 20, callback: (v) => `${v}%` }, grid: { color: '#f1f5f9' } },
              x: { grid: { display: false } },
            },
          }}
        />
      </div>
    </section>
  );
}
