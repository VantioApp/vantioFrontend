import Link from 'next/link';
import { Logo } from './logo';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center">
            <Logo variant="full" theme="dark" height={28} />
          </div>
          <p className="text-xs text-slate-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} XChecho Dev. Todos los derechos reservados.
          </p>
        </div>

        <nav className="flex flex-wrap gap-6 justify-center" aria-label="Enlaces del pie de página">
          <Link href="/about" className="text-xs hover:text-white transition-colors cursor-pointer">
            Sobre Nosotros
          </Link>
          <Link href="/contact" className="text-xs hover:text-white transition-colors cursor-pointer">
            Contacto
          </Link>
          <Link href="/terms" className="text-xs hover:text-white transition-colors cursor-pointer">
            Términos y Condiciones
          </Link>
          <Link href="/privacy" className="text-xs hover:text-white transition-colors cursor-pointer">
            Política de Privacidad
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export function FooterMinimal() {
  return (
    <footer className="bg-slate-900 w-full py-4 text-center border-t border-slate-800 shrink-0">
      <p className="text-[11px] text-slate-500">
        &copy; {new Date().getFullYear()} XChecho Dev. Todos los derechos reservados.
      </p>
    </footer>
  );
}
