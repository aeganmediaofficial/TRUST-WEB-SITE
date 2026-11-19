import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Globe, Menu, Moon, Sun, X } from 'lucide-react';
import { SITE_INFO } from '../data/aadheenamData';
import { useSite } from '../context/SiteContext';
import { NAV_LABELS, tr } from '../data/translations';

export default function Header() {
  const { pathname } = useLocation();
  const { lang, setLang, theme, setTheme } = useSite();
  const [mobileOpen, setMobileOpen] = useState(false);

  const topNav = [
    { href: '/about', label: tr(lang, NAV_LABELS.about.en, NAV_LABELS.about.ta) },
    { href: '/classes', label: tr(lang, NAV_LABELS.classes.en, NAV_LABELS.classes.ta) },
    { href: '/events', label: tr(lang, NAV_LABELS.events.en, NAV_LABELS.events.ta) },
    { href: '/store', label: tr(lang, NAV_LABELS.store.en, NAV_LABELS.store.ta) },
    { href: '/contact', label: tr(lang, NAV_LABELS.contact.en, NAV_LABELS.contact.ta) },
  ];

  const mobileNav = [
    { href: '/', label: tr(lang, NAV_LABELS.home.en, NAV_LABELS.home.ta) },
    { href: '/about', label: tr(lang, NAV_LABELS.aboutFull.en, NAV_LABELS.aboutFull.ta) },
    { href: '/classes', label: tr(lang, NAV_LABELS.classesFull.en, NAV_LABELS.classesFull.ta) },
    { href: '/events', label: tr(lang, NAV_LABELS.eventsFull.en, NAV_LABELS.eventsFull.ta) },
    { href: '/store', label: tr(lang, NAV_LABELS.storeFull.en, NAV_LABELS.storeFull.ta) },
    { href: '/gallery', label: tr(lang, NAV_LABELS.galleryFull.en, NAV_LABELS.galleryFull.ta) },
    { href: '/volunteer', label: tr(lang, NAV_LABELS.volunteer.en, NAV_LABELS.volunteer.ta) },
    { href: '/contact', label: tr(lang, NAV_LABELS.contactFull.en, NAV_LABELS.contactFull.ta) },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0B1324]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10 text-slate-900 dark:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2.5 text-sm sm:text-base lg:text-lg font-semibold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
            style={{ fontFamily: lang === 'ta' ? 'var(--font-tamil)' : 'var(--font-display)' }}
          >
            <img
              src={SITE_INFO.logoUrl}
              alt={tr(lang, 'Pulipani Siddhar Aadheenam Logo', 'புலிப்பாணி சித்தர் ஆதீனம் சின்னம்')}
              className="w-10 h-10 rounded-full object-cover object-top bg-white p-0.5 ring-1 ring-amber-500/45 shrink-0"
            />
            <span className="truncate max-w-[150px] sm:max-w-none">
              {tr(lang, NAV_LABELS.brand.en, NAV_LABELS.brand.ta)}
            </span>
          </Link>

          {/* Zone 2: 5 concise single-line text nav links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7" aria-label="Main navigation">
            {topNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm ${
                    active
                      ? 'text-amber-700 dark:text-amber-300'
                      : 'text-slate-600 hover:text-slate-950 dark:text-slate-100 dark:hover:text-amber-300'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-amber-600 dark:bg-amber-400 rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Theme Changer + Language Switcher + Primary CTA + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Light / Dark Theme Changer */}
            <div
              role="group"
              aria-label={tr(lang, 'Theme switch', 'தீம் மாற்றம்')}
              className="inline-flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-[#17233B] border border-slate-300 dark:border-slate-500 shrink-0"
            >
              <button
                type="button"
                onClick={() => setTheme('light')}
                aria-pressed={theme === 'light'}
                aria-label={tr(lang, 'Switch to light theme', 'ஒளி தீம்')}
                title={tr(lang, 'Light Theme', 'ஒளி தீம்')}
                className={`inline-flex items-center justify-center gap-1 px-2 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  theme === 'light'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-700 hover:text-slate-950 dark:text-slate-100 dark:hover:text-white dark:hover:bg-[#223354]'
                }`}
              >
                <Sun className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="hidden xl:inline">{tr(lang, 'Light', 'ஒளி')}</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                aria-pressed={theme === 'dark'}
                aria-label={tr(lang, 'Switch to dark theme', 'இருள் தீம்')}
                title={tr(lang, 'Dark Theme', 'இருள் தீம்')}
                className={`inline-flex items-center justify-center gap-1 px-2 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  theme === 'dark'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-700 hover:text-slate-950 dark:text-slate-100 dark:hover:text-white dark:hover:bg-[#223354]'
                }`}
              >
                <Moon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="hidden xl:inline">{tr(lang, 'Dark', 'இருள்')}</span>
              </button>
            </div>

            {/* Language Switcher */}
            <div
              role="group"
              aria-label="Language switch"
              className="inline-flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-[#17233B] border border-slate-300 dark:border-slate-500 shrink-0"
            >
              <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-amber-300 ml-1.5 mr-1 hidden sm:block shrink-0" aria-hidden="true" />
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  lang === 'en'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-700 hover:text-slate-950 dark:text-slate-100 dark:hover:text-white dark:hover:bg-[#223354]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('ta')}
                aria-pressed={lang === 'ta'}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  lang === 'ta'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-700 hover:text-slate-950 dark:text-slate-100 dark:hover:text-white dark:hover:bg-[#223354]'
                }`}
                style={{ fontFamily: 'var(--font-tamil)' }}
              >
                தமிழ்
              </button>
            </div>

            <Link
              to="/donate"
              className="hidden sm:inline-flex items-center justify-center px-3.5 py-2 text-xs lg:text-sm font-semibold rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              {tr(lang, NAV_LABELS.donateNow.en, NAV_LABELS.donateNow.ta)}
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B1324]">
          <nav className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 gap-1.5" aria-label="Mobile navigation">
            {mobileNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                    active
                      ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
                      : 'text-slate-700 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Mobile Theme Row */}
            <div className="col-span-2 mt-2 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-200">
                {tr(lang, 'Appearance', 'தோற்றம்')}
              </span>
              <div className="inline-flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-[#17233B] border border-slate-300 dark:border-slate-500">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    theme === 'light'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-700 dark:text-slate-100'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>{tr(lang, 'Light', 'ஒளி')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    theme === 'dark'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-700 dark:text-slate-100'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>{tr(lang, 'Dark', 'இருள்')}</span>
                </button>
              </div>
            </div>

            <Link
              to="/donate"
              onClick={() => setMobileOpen(false)}
              className="col-span-2 mt-2 px-4 py-3 rounded-lg text-sm font-semibold text-center bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors min-h-[44px] flex items-center justify-center"
            >
              {tr(lang, NAV_LABELS.donateNow.en, NAV_LABELS.donateNow.ta)}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
