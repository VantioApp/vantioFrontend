'use client';

import NormKiosk from '@/presentation/components/quiz/NormKiosk';

export default function NormsClient() {
  return (
    <>
      <div>
        <h1 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight">Quiosco Normativo</h1>
        <p className="text-sm text-slate-500 mt-1">
          Practica la consulta de normas en las mismas condiciones del examen: lectura secuencial, sin búsqueda ni copia.
        </p>
      </div>
      <NormKiosk variant="page" />
    </>
  );
}
