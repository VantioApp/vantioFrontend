import Image from 'next/image';

interface LogoProps {
  variant?: 'full' | 'isotype';
  theme?: 'light' | 'dark';
  height?: number;
  className?: string;
}

export function Logo({ variant = 'full', theme = 'light', height = 32, className = '' }: LogoProps) {
  const src = `/images/logos/${variant === 'full' ? 'logotipo' : 'isotipo'}-vantio${theme === 'dark' ? '-dark' : ''}.svg`;

  return (
    <Image
      src={src}
      alt="Vantio"
      width={variant === 'full' ? height * 4 : height}
      height={height}
      className={className}
      priority={variant === 'isotype'}
    />
  );
}
