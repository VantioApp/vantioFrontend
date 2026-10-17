import React from 'react';
import type { ThemeAnalysisItem } from '@/core/interfaces';

const PASS_THRESHOLD = 60;

function tone(pct: number) {
  if (pct >= 70) return { bar: 'bg-emerald-500', text: 'text-emerald-700' };
  if (pct >= 40) return { bar: 'bg-amber-500', text: 'text-amber-700' };
  return { bar: 'bg-rose-500', text: 'text-rose-700' };
}

const ThemePerformanceBars = React.memo(function ThemePerformanceBars({
  themeAnalysis,
}: {
  themeAnalysis: ThemeAnalysisItem[];
}) {
  if (themeAnalysis.length === 0) return null;
  const sorted = [...themeAnalysis].sort((a, b) => a.pct - b.pct);

  return (
    <section
      aria-label="Rendimiento por tema"
      className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-xs"
    >
      <h3 className="font-serif text-lg font-bold text-slate-900">Rendimiento por tema</h3>
      <p className="text-xs text-slate-500 mt-1 mb-5">
        Ordenado del más débil al más fuerte. La línea punteada marca el {PASS_THRESHOLD}% de aprobación.
      </p>

      <ul className="flex flex-col gap-4">
        {sorted.map((t) => {
          const c = tone(t.pct);
          return (
            <li key={t.themeId}>
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <span className="text-sm font-medium text-slate-800 wrap-break-word min-w-0">
                  {t.themeName}
                </span>
                <span className={`text-xs font-bold shrink-0 ${c.text}`}>
                  {t.correct}/{t.total} · {Math.round(t.pct)}%
                </span>
              </div>
              <div
                className="relative h-2.5 bg-slate-100 rounded-full overflow-hidden"
                role="img"
                aria-label={`${t.themeName}: ${Math.round(t.pct)}% de aciertos`}
              >
                <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${Math.min(100, t.pct)}%` }} />
                <div
                  className="absolute top-0 h-full border-l border-dashed border-slate-500/70"
                  style={{ left: `${PASS_THRESHOLD}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
});

export default ThemePerformanceBars;
