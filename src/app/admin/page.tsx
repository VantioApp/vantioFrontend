'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Scale, Users, FileText, BarChart2, Settings, HelpCircle, LogOut, PlusCircle,
  TrendingUp, Calendar, CheckCircle2, AlertCircle, Search, Mail, ShieldCheck
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

export default function AdminPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'usuarios' | 'pruebas'>('usuarios');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800 antialiased">
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0 p-6">
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-800">
          <div className="w-10 h-10 bg-amber-500 text-slate-900 rounded-lg flex items-center justify-center font-bold shadow-sm">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold text-white tracking-tight leading-none">Admin Portal</h1>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">Vantio Suite</p>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-1">
          <button 
            onClick={() => setActiveTab('usuarios')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'usuarios' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <Users className={`w-4 h-4 ${activeTab === 'usuarios' ? 'text-amber-400' : 'text-slate-400'}`} />
            <span>Usuarios</span>
          </button>

          <button 
            onClick={() => setActiveTab('pruebas')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'pruebas' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <FileText className={`w-4 h-4 ${activeTab === 'pruebas' ? 'text-amber-400' : 'text-slate-400'}`} />
            <span>Historial de Pruebas</span>
          </button>

          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold hover:bg-slate-800/50 hover:text-white transition-colors">
            <BarChart2 className="w-4 h-4 text-slate-400" />
            <span>Analíticas</span>
          </a>

          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold hover:bg-slate-800/50 hover:text-white transition-colors">
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Configuración</span>
          </a>
        </nav>

        <div className="pt-6 border-t border-slate-800 flex flex-col gap-4">
          <button className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm">
            <PlusCircle className="w-4 h-4" />
            Crear Nueva Prueba
          </button>

          <div className="flex flex-col gap-0.5">
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium hover:text-white transition-colors">
              <HelpCircle className="w-4 h-4 text-slate-500" />
              Centro de Ayuda
            </a>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors text-left"
            >
              <LogOut className="w-4 h-4 text-rose-400/80" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-grow flex flex-col min-w-0 overflow-y-auto">
        <header className="md:hidden bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-amber-600" />
            <span className="font-serif font-bold text-slate-900 text-lg">Vantio Admin</span>
          </div>
          <button onClick={handleLogout} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg">
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        <div className="p-6 md:p-10 max-w-6xl w-full mx-auto flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight">Panel de Administración</h1>
              <p className="text-sm text-slate-500 mt-1">Supervisión de métricas, estudiantes y pruebas completadas.</p>
            </div>
            
            <div className="bg-slate-900 text-white rounded-lg px-4 py-2 text-xs font-semibold flex items-center gap-2 border border-slate-800 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Sesión Iniciada como Administrador</span>
            </div>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 text-slate-900 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estudiantes Registrados</p>
                <p className="text-2xl font-bold text-slate-950 mt-0.5">1,248</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 text-slate-900 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Historial de Simulacros</p>
                <p className="text-2xl font-bold text-slate-950 mt-0.5">3,890</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center border border-amber-200">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Puntaje Promedio General</p>
                <p className="text-2xl font-bold text-slate-950 mt-0.5">82.4%</p>
              </div>
            </div>
          </section>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-4 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
              <div className="flex border border-slate-200 bg-white rounded-lg p-0.5 self-start">
                <button
                  onClick={() => { setActiveTab('usuarios'); setSearchTerm(''); }}
                  className={`px-4 py-2 rounded-md text-xs font-bold transition-colors ${
                    activeTab === 'usuarios' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Estudiantes
                </button>
                <button
                  onClick={() => { setActiveTab('pruebas'); setSearchTerm(''); }}
                  className={`px-4 py-2 rounded-md text-xs font-bold transition-colors ${
                    activeTab === 'pruebas' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Pruebas Realizadas
                </button>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o correo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-slate-900 transition-colors"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <p className="text-center py-8 text-slate-400 text-sm">
                {activeTab === 'usuarios' ? 'Lista de estudiantes aparecerá aquí' : 'Historial de pruebas aparecerá aquí'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
