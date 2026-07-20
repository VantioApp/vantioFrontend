interface LogoProps {
  variant?: 'full' | 'isotype';
  theme?: 'light' | 'dark';
  height?: number;
  className?: string;
}

export function Logo({ variant = 'full', theme = 'light', height = 32, className = '' }: LogoProps) {
  const src = `/images/logos/${variant === 'full' ? 'logotipo' : 'isotipo'}-vantio${theme === 'dark' ? '-dark' : ''}.svg`;

  return (
    <img
      src={src}
      alt="Vantio"
      style={{ height: `${height}px`, width: 'auto' }}
      className={className}
    />
  );
}
