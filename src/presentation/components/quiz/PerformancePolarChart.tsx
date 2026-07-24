'use client';

import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import type { ThemeAnalysisItem } from '@/core/interfaces';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const LEXICON_PALETTE = [
  'rgba(15, 23, 42, 0.6)',
  'rgba(245, 158, 11, 0.6)',
  'rgba(239, 68, 68, 0.5)',
  'rgba(16, 185, 129, 0.5)',
  'rgba(59, 130, 246, 0.5)',
  'rgba(139, 92, 246, 0.5)',
  'rgba(236, 72, 153, 0.5)',
  'rgba(20, 184, 166, 0.5)',
  'rgba(249, 115, 22, 0.5)',
  'rgba(107, 114, 128, 0.5)',
  'rgba(99, 102, 241, 0.5)',
  'rgba(244, 63, 94, 0.5)',
];

const LEXICON_BORDER = [
  'rgba(15, 23, 42, 0.9)',
  'rgba(245, 158, 11, 0.9)',
  'rgba(239, 68, 68, 0.8)',
  'rgba(16, 185, 129, 0.8)',
  'rgba(59, 130, 246, 0.8)',
  'rgba(139, 92, 246, 0.8)',
  'rgba(236, 72, 153, 0.8)',
  'rgba(20, 184, 166, 0.8)',
  'rgba(249, 115, 22, 0.8)',
  'rgba(107, 114, 128, 0.8)',
  'rgba(99, 102, 241, 0.8)',
  'rgba(244, 63, 94, 0.8)',
];

interface PerformancePolarChartProps {
  themeAnalysis: ThemeAnalysisItem[];
}

const PerformancePolarChart = React.memo(function PerformancePolarChart({
  themeAnalysis,
}: PerformancePolarChartProps) {
  if (!themeAnalysis || themeAnalysis.length < 2) {
    return null;
  }

  const sorted = [...themeAnalysis].sort((a, b) => a.themeName.localeCompare(b.themeName));
  const labels = sorted.map((t) => t.themeName);
  const data = sorted.map((t) => t.pct);
  const backgroundColor = data.map((_, i) => LEXICON_PALETTE[i % LEXICON_PALETTE.length]);
  const borderColor = data.map((_, i) => LEXICON_BORDER[i % LEXICON_BORDER.length]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-xs">
      <h3 className="font-serif text-lg font-bold text-slate-900 mb-6 text-center">
        Rendimiento por Tema
      </h3>
      <div className="max-w-md mx-auto">
        <PolarArea
          data={{
            labels,
            datasets: [
              {
                label: '% Aciertos',
                data,
                backgroundColor,
                borderColor,
                borderWidth: 1.5,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  font: {
                    family: "'Inter', sans-serif",
                    size: 11,
                  },
                  padding: 12,
                  usePointStyle: true,
                  pointStyleWidth: 10,
                },
              },
              tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleFont: { family: "'Merriweather', serif", size: 13 },
                bodyFont: { family: "'Inter', sans-serif", size: 12 },
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                  label: (ctx) => {
                    const item = sorted[ctx.dataIndex];
                    return `${item.correct}/${item.total} aciertos (${ctx.parsed.r}%)`;
                  },
                },
              },
            },
            scales: {
              r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  stepSize: 20,
                  font: { family: "'Inter', sans-serif", size: 10 },
                  color: '#94a3b8',
                  backdropColor: 'transparent',
                },
                grid: {
                  color: 'rgba(148, 163, 184, 0.15)',
                },
                pointLabels: {
                  font: { family: "'Inter', sans-serif", size: 10 },
                  color: '#475569',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
});

export default PerformancePolarChart;
