import { useState } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export function SmartImage({ src, alt, className = '', loading = 'lazy' }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-[#0C1322] to-slate-900 text-amber-400/80 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 mb-2 opacity-70" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <polygon points="12,2 14.5,9 22,9 16,13.5 18,21 12,16.8 6,21 8,13.5 2,9 9.5,9" />
        </svg>
        <span className="text-xs font-medium text-slate-300 line-clamp-2 max-w-[180px]">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
