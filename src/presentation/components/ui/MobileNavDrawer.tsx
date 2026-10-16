'use client';

import { useEffect, useState, type ComponentType } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Menu, X } from 'lucide-react';
import { Logo } from '@/presentation/components/ui/logo';

export interface MobileNavItem {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

interface MobileNavDrawerProps {
  items: MobileNavItem[];
  title: string;
  subtitle: string;
  logoutLabel: string;
  onLogout: () => void;
  /** Rutas que solo se activan con coincidencia exacta (p. ej. el inicio de cada sección). */
  exactHrefs?: string[];
}

export function MobileNavDrawer({
  items,
  title,
  subtitle,
  logoutLabel,
  onLogout,
  exactHrefs = [],
}: MobileNavDrawerProps) {
  const pathname = usePathname();
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  // El menú queda abierto solo mientras la ruta sea la misma en que se abrió.
  const open = openedAt === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenedAt(null);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    exactHrefs.includes(href) ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenedAt(pathname)}
        aria-label="Abrir menú"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        className="p-2 -ml-2 text-slate-300 hover:bg-slate-800 rounded-lg cursor-pointer"
      >
        <Menu className="w-6 h-6" />
      </button>

      {open && (
        <div className="md:hidden fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Menú de navegación">
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setOpenedAt(null)}
            className="absolute inset-0 bg-slate-950/60 cursor-default"
          />
          <aside
            id="mobile-nav-drawer"
            className="absolute inset-y-0 left-0 w-72 max-w-[85%] bg-slate-900 text-slate-300 border-r border-slate-800 p-6 flex flex-col overflow-y-auto"
          >
            <div className="flex items-start justify-between mb-8 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <Logo variant="isotype" theme="dark" height={36} />
                <div>
                  <h2 className="font-serif text-lg font-bold text-white tracking-tight leading-none">{title}</h2>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">{subtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpenedAt(null)}
                aria-label="Cerrar menú"
                className="p-1.5 -mr-2 text-slate-400 hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col gap-1">
              {items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                      active ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${active ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-6 border-t border-slate-800">
              <button
                type="button"
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-400/80" />
                {logoutLabel}
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
