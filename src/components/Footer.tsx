import { Link } from 'react-router';
import { Download, Moon, Sun } from 'lucide-react';
import { SITE_INFO } from '../data/aadheenamData';
import { useSite } from '../context/SiteContext';
import { NAV_LABELS, tr } from '../data/translations';
import { PWAInstallButton } from './PWAInstallButton';

export default function Footer() {
  const { theme, setTheme, lang } = useSite();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 dark:bg-[#0B1324] text-slate-700 dark:text-slate-200 border-t border-slate-200 dark:border-white/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <Link to="/" className="inline-block mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl">
              <img
                src={SITE_INFO.logoUrl}
                alt={tr(lang, 'Pulipani Siddhar Aadheenam Trust Logo', 'புலிப்பாணி சித்தர் ஆதீனம் அறக்கட்டளை சின்னம்')}
                className="w-28 h-28 rounded-xl bg-white p-1.5 object-contain border border-slate-200 dark:border-amber-400/25 shadow-sm"
              />
            </Link>
            <Link
              to="/"
              className="block text-lg font-semibold text-slate-900 dark:text-white mb-2"
              style={{ fontFamily: lang === 'ta' ? 'var(--font-tamil)' : 'var(--font-display)' }}
            >
              <span>{tr(lang, NAV_LABELS.brand.en, NAV_LABELS.brand.ta)}</span>
            </Link>
            <p className="text-sm text-amber-700 dark:text-amber-300/95 leading-relaxed mb-3" style={{ fontFamily: 'var(--font-tamil)' }}>
              {tr(
                lang,
                `${SITE_INFO.taglineTamil} — ${SITE_INFO.taglineEnglish}.`,
                `${SITE_INFO.taglineTamil} — ஆன்மீகம், இயற்கை, மனிதநேயம்.`
              )}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
              {tr(
                lang,
                'A sacred institution rooted in Tamil Siddhar tradition, serving humanity through spiritual wisdom and compassionate action.',
                'தமிழ் சித்தர் மரபில் வேரூன்றிய புனித நிறுவனம் — ஆன்மீக ஞானம் மற்றும் கருணைச் சேவையின் மூலம் மனிதகுலத்திற்குத் தொண்டாற்றுகிறது.'
              )}
            </p>
            <div>
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2.5">
                {tr(lang, 'Join Our Community', 'நமது சமூகத்துடன் இணைய')}
              </p>
              <div className="flex items-center gap-2.5">
                <a
                  href={SITE_INFO.social.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tr(lang, 'Pulipani Siddhar Aadheenam on Facebook', 'புலிப்பாணி சித்தர் ஆதீனம் — Facebook')}
                  className="w-9 h-9 rounded-lg inline-flex items-center justify-center bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-amber-500 hover:text-amber-700 dark:hover:border-amber-400 dark:hover:text-amber-400 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                    <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.6c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V22h3.4z" />
                  </svg>
                </a>
                <a
                  href={SITE_INFO.social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tr(lang, 'Pulipani Siddhar Aadheenam on Instagram', 'புலிப்பாணி சித்தர் ஆதீனம் — Instagram')}
                  className="w-9 h-9 rounded-lg inline-flex items-center justify-center bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-amber-500 hover:text-amber-700 dark:hover:border-amber-400 dark:hover:text-amber-400 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href={SITE_INFO.social.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tr(lang, 'Pulipani Siddhar Aadheenam on YouTube', 'புலிப்பாணி சித்தர் ஆதீனம் — YouTube')}
                  className="w-9 h-9 rounded-lg inline-flex items-center justify-center bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-amber-500 hover:text-amber-700 dark:hover:border-amber-400 dark:hover:text-amber-400 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white pb-2.5 mb-4 border-b border-slate-200 dark:border-white/10">
              {tr(lang, 'Quick Links', 'விரைவு இணைப்புகள்')}
            </h3>
            <nav className="flex flex-col gap-2.5 text-sm text-slate-600 dark:text-slate-300" aria-label="Footer quick links">
              {[
                { href: '/', label: tr(lang, 'Home', 'முகப்பு') },
                { href: '/about', label: tr(lang, 'About Aadheenam', 'ஆதீனம் பற்றி') },
                { href: '/classes', label: tr(lang, 'Spiritual Classes', 'ஆன்மீக வகுப்புகள்') },
                { href: '/events', label: tr(lang, 'Events & Programs', 'நிகழ்வுகள் & முகாம்கள்') },
                { href: '/store', label: tr(lang, 'Our Products', 'எங்கள் பொருட்கள்') },
                { href: '/gallery', label: tr(lang, 'Photo Gallery', 'படங்கள் தொகுப்பு') },
                { href: '/volunteer', label: tr(lang, 'Volunteer', 'தன்னார்வ சேவை') },
              ].map((item) => (
                <Link key={item.href} to={item.href} className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors w-fit">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Our Mission */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white pb-2.5 mb-4 border-b border-slate-200 dark:border-white/10">
              {tr(lang, 'Our Mission', 'எங்கள் நோக்கம்')}
            </h3>
            <nav className="flex flex-col gap-2.5 text-sm text-slate-600 dark:text-slate-300" aria-label="Footer mission links">
              {[
                { href: '/classes', label: tr(lang, 'Yoga & Meditation', 'யோகா & தியானம்') },
                { href: '/classes', label: tr(lang, 'Natural Living Training', 'இயற்கை வாழ்வியல் பயிற்சி') },
                { href: '/classes', label: tr(lang, 'Spiritual Awareness', 'ஆன்மீக விழிப்புணர்வு') },
                { href: '/donate', label: tr(lang, 'Annadhanam Support', 'அன்னதான உதவி') },
                { href: '/donate', label: tr(lang, 'Education Support', 'கல்வி உதவி') },
                { href: '/about', label: tr(lang, 'Temple Development', 'கோயில் வளர்ச்சி') },
                { href: '/donate', label: tr(lang, 'Donate Now', 'நன்கொடை அளிக்க') },
                { href: '/admin/registrations', label: tr(lang, 'Registrations Portal', 'பதிவு நிர்வாகப் பலகை') },
              ].map((item, i) => (
                <Link key={i} to={item.href} className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors w-fit">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white pb-2.5 mb-4 border-b border-slate-200 dark:border-white/10">
              {tr(lang, 'Contact Us', 'தொடர்பு கொள்ள')}
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">{tr(lang, 'Address', 'முகவரி')}</p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span style={{ fontFamily: 'var(--font-tamil)' }}>{SITE_INFO.addressTamil}</span>
                  <br />
                  {tr(lang, SITE_INFO.addressEnglish, 'மல்லன்குழி, தாளவாடி, தமிழ்நாடு, இந்தியா')}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">
                  {tr(lang, 'Phone / WhatsApp', 'தொலைபேசி / WhatsApp')}
                </p>
                <a
                  href={SITE_INFO.phoneHref}
                  className="font-semibold text-slate-900 dark:text-white hover:text-amber-700 dark:hover:text-amber-400 transition-colors tabular-nums"
                >
                  {SITE_INFO.phoneDisplay}
                </a>
              </div>
              <div>
                <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">{tr(lang, 'Email', 'மின்னஞ்சல்')}</p>
                <a
                  href={`mailto:${SITE_INFO.email}`}
                  className="text-slate-600 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                >
                  {SITE_INFO.email}
                </a>
              </div>
              <div className="pt-1">
                <a
                  href={SITE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-white/10 dark:hover:bg-white/15 text-xs font-medium transition-colors"
                >
                  {tr(lang, 'WhatsApp Enquiry', 'WhatsApp விசாரணை')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            © {currentYear} {tr(lang, SITE_INFO.name, SITE_INFO.tamilName)}.{' '}
            {tr(lang, 'All rights reserved.', 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <div
              role="group"
              aria-label={tr(lang, 'Theme switch', 'தீம் மாற்றம்')}
              className="inline-flex items-center p-0.5 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15"
            >
              <button
                type="button"
                onClick={() => setTheme('light')}
                aria-pressed={theme === 'light'}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors whitespace-nowrap ${
                  theme === 'light'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{tr(lang, 'Light', 'ஒளி')}</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                aria-pressed={theme === 'dark'}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors whitespace-nowrap ${
                  theme === 'dark'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{tr(lang, 'Dark', 'இருள்')}</span>
              </button>
            </div>
            <PWAInstallButton />
            <a
              href="/pulipani-siddhar-aadheenam.html?download=1"
              download="pulipani-siddhar-aadheenam.html"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-white/10 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:border-amber-500 hover:text-amber-700 dark:hover:border-amber-400 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{tr(lang, 'Download HTML', 'HTML பதிவிறக்கம்')}</span>
            </a>
            <Link to="/privacy" className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              {tr(lang, 'Privacy Policy', 'தனியுரிமைக் கொள்கை')}
            </Link>
            <Link to="/terms" className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              {tr(lang, 'Terms of Use', 'பயன்பாட்டு விதிமுறைகள்')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
