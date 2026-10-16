'use client';

import { use } from 'react';
import { useReviewSet } from '@/presentation/hooks/use-reviews';
import ReviewWorkspace from '@/presentation/components/reviews/ReviewWorkspace';

export default function RevisionPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const { data, isLoading, isError } = useReviewSet(token);

  if (isLoading) {
    return <p className="text-center text-slate-500 py-24">Cargando preguntas…</p>;
  }
  if (isError || !data) {
    return (
      <div className="max-w-md mx-auto text-center py-24 px-4">
        <h1 className="font-serif text-2xl font-bold text-slate-900">Enlace no válido</h1>
        <p className="text-sm text-slate-500 mt-2">
          Este enlace de revisión no existe, venció o fue desactivado. Solicite uno nuevo a quien se lo envió.
        </p>
      </div>
    );
  }
  return <ReviewWorkspace token={token} data={data} />;
}
