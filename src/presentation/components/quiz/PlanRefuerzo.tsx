'use client';

import React from 'react';
import { BookOpen, Scale, FileText, Link2, AlertCircle, CheckCircle } from 'lucide-react';
import type { TestFeedback, StudyResource } from '@/core/interfaces';

const resourceTypeConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  ley: { icon: <FileText className="w-3.5 h-3.5" />, label: 'Ley', color: 'bg-slate-100 text-slate-700 border-slate-200' },
  jurisprudencia: { icon: <Scale className="w-3.5 h-3.5" />, label: 'Jurisprudencia', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  doctrina: { icon: <BookOpen className="w-3.5 h-3.5" />, label: 'Doctrina', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  articulo: { icon: <FileText className="w-3.5 h-3.5" />, label: 'Artículo', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};

const PlanRefuerzo = React.memo(function PlanRefuerzo({ feedback }: { feedback: TestFeedback }) {
  const { weakThemes, strongThemes, recommendation, studyResources } = feedback;

  const groupedResources = studyResources.reduce<Record<string, StudyResource[]>>((acc, r) => {
    const key = r.themeName || r.subjectName;
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-6">
      {recommendation && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-xs">
          <h3 className="font-serif text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            Diagnóstico y Recomendaciones
          </h3>
          <div className="text-sm text-slate-700 leading-relaxed">
            {recommendation.split('\n').map((line, idx) => {
              if (line.trim() === '') {
                return <br key={idx} />;
              }
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
        </div>
      )}

      {weakThemes.length > 0 && (
        <div className="bg-white rounded-xl border border-rose-200 p-6 md:p-8 shadow-xs">
          <h3 className="font-serif text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-500" />
            Temas a Reforzar
          </h3>
          <div className="flex flex-col gap-3">
            {weakThemes.map((theme) => {
              const resources = groupedResources[theme.name] || groupedResources[theme.subjectName] || [];
              return (
                <div key={theme.themeId} className="border border-rose-100 rounded-lg p-4 bg-rose-50/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-slate-900">
                      {theme.name}
                      <span className="text-xs font-normal text-slate-500 ml-2">({theme.subjectName})</span>
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      theme.pct < 40 ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {theme.correct}/{theme.total} ({theme.pct}%)
                    </span>
                  </div>
                  {resources.length > 0 && (
                    <div className="flex flex-col gap-1.5 mt-3 pt-3 border-t border-rose-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recursos sugeridos</span>
                      {resources.map((resource) => {
                        const config = resourceTypeConfig[resource.type] || resourceTypeConfig.ley;
                        return (
                          <div key={resource.id} className="flex items-start gap-2 text-xs">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-semibold shrink-0 ${config.color}`}>
                              {config.icon}
                              {config.label}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-slate-800 font-medium">{resource.title}</span>
                              {resource.citation && (
                                <span className="text-slate-500 text-[11px]">{resource.citation}</span>
                              )}
                              {resource.description && (
                                <span className="text-slate-500 text-[11px]">{resource.description}</span>
                              )}
                              {resource.url && (
                                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 text-[11px] inline-flex items-center gap-1 mt-0.5">
                                  <Link2 className="w-3 h-3" />
                                  Abrir recurso
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {strongThemes.length > 0 && (
        <div className="bg-white rounded-xl border border-emerald-200 p-6 md:p-8 shadow-xs">
          <h3 className="font-serif text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            Temas Dominados
          </h3>
          <div className="flex flex-wrap gap-2">
            {strongThemes.map((theme) => (
              <span
                key={theme.themeId}
                className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium px-3 py-1.5 rounded-full"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                {theme.name}
                <span className="text-emerald-600 font-bold">({theme.pct}%)</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default PlanRefuerzo;
