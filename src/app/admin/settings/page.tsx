'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Settings } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

export default function AdminSettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!user) return null;

  return (
    <>
      <div>
        <h1 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Configuración de la plataforma.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
        <Settings className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-2">Sección en desarrollo</h2>
        <p className="text-sm text-slate-500">La configuración estará disponible próximamente.</p>
      </div>
    </>
  );
}
