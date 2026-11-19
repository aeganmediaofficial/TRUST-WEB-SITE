import React from 'react';
import { Link } from 'react-router';
import { useSite } from '../context/SiteContext';

export function KolamRule({ darkSurface = false, centered = true }: { darkSurface?: boolean; centered?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 my-4 ${centered ? 'justify-center' : 'justify-start'}`}
      aria-hidden="true"
    >
      <div
        className={`h-px w-12 sm:w-16 ${
          darkSurface ? 'bg-amber-400/35' : 'bg-slate-300 dark:bg-slate-700'
        }`}
      />
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" fill="currentColor">
        <polygon points="12,2 14.5,9.5 22,12 14.5,14.5 12,22 9.5,14.5 2,12 9.5,9.5" />
      </svg>
      <div
        className={`h-px w-12 sm:w-16 ${
          darkSurface ? 'bg-amber-400/35' : 'bg-slate-300 dark:bg-slate-700'
        }`}
      />
    </div>
  );
}

export function SectionHeading({
  tamil,
  english,
  subtitle,
  darkSurface = false,
  align = 'center',
}: {
  tamil: string;
  english: string;
  subtitle?: string;
  darkSurface?: boolean;
  align?: 'center' | 'left';
}) {
  const { lang } = useSite();
  const isCentered = align === 'center';
  const mainTitle = lang === 'ta' ? tamil : english;
  const secondaryLine = lang === 'ta' ? english : tamil;

  return (
    <div className={`${isCentered ? 'text-center mx-auto max-w-2xl' : 'text-left max-w-2xl'} mb-12`}>
      <p
        className={`text-sm sm:text-base font-medium tracking-wide mb-1.5 ${
          darkSurface ? 'text-amber-300' : 'text-amber-700 dark:text-amber-300'
        }`}
        style={{ fontFamily: lang === 'ta' ? 'var(--font-sans)' : 'var(--font-tamil)' }}
      >
        {secondaryLine}
      </p>
      <h2
        className={`text-3xl sm:text-4xl font-semibold tracking-tight ${
          darkSurface ? 'text-white' : 'text-slate-900 dark:text-white'
        }`}
        style={{ fontFamily: lang === 'ta' ? 'var(--font-tamil)' : 'var(--font-display)' }}
      >
        {mainTitle}
      </h2>
      <KolamRule darkSurface={darkSurface} centered={isCentered} />
      {subtitle && (
        <p
          className={`text-sm sm:text-base leading-relaxed ${
            darkSurface ? 'text-slate-200' : 'text-slate-600 dark:text-slate-200'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  tamil,
  title,
  subtitle,
  image,
  alt,
  breadcrumbs,
}: {
  tamil: string;
  title: string;
  subtitle?: string;
  image: string;
  alt: string;
  breadcrumbs?: Array<{ label: string; to?: string }>;
}) {
  const { lang } = useSite();
  return (
    <section className="relative bg-[#0B1324] text-white overflow-hidden border-b border-white/10">
      <img
        src={image}
        alt={alt}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0B1324] via-[#0B1324]/75 to-[#0B1324]/45"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-slate-300">
            {breadcrumbs.map((b, idx) => (
              <React.Fragment key={b.label}>
                {idx > 0 && <span aria-hidden="true">/</span>}
                {b.to ? (
                  <Link to={b.to} className="hover:text-amber-400 transition-colors">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-amber-400 font-medium">{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <p
          className="text-base sm:text-lg text-amber-400 font-medium mb-2"
          style={{ fontFamily: 'var(--font-tamil)' }}
        >
          {tamil}
        </p>
        <h1
          className="text-3xl sm:text-5xl font-semibold tracking-tight text-white max-w-3xl"
          style={{ fontFamily: lang === 'ta' ? 'var(--font-tamil)' : 'var(--font-display)' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
