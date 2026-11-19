import { useEffect, useState } from 'react';
import { Download, Share, WifiOff, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { tr } from '../data/translations';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  prompt(): Promise<void>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in window.navigator && Boolean((window.navigator as { standalone?: boolean }).standalone))
    );
  });
  const [isIOS] = useState(() => {
    if (typeof navigator === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
  });

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  async function install(): Promise<boolean> {
    if (!deferredPrompt) return false;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    return outcome === 'accepted';
  }

  return {
    canInstall: Boolean(deferredPrompt),
    isInstalled,
    isIOS,
    install,
  };
}

export function PWAInstallButton() {
  const { lang } = useSite();
  const { canInstall, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  if (isInstalled || (!canInstall && !isIOS)) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => (isIOS ? setShowIOSModal(true) : void install())}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-semibold hover:bg-amber-500/20 transition-colors whitespace-nowrap shrink-0"
      >
        <Download className="w-3.5 h-3.5" aria-hidden="true" />
        <span>{tr(lang, 'Install App', 'செயலியை நிறுவுக')}</span>
      </button>

      {showIOSModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ios-install-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60"
          onClick={() => setShowIOSModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-6 bg-white dark:bg-[#10192D] border border-slate-200 dark:border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 id="ios-install-title" className="text-base font-semibold text-slate-900 dark:text-white">
                {tr(lang, 'Install Aadheenam App', 'ஆதீனச் செயலியை நிறுவுங்கள்')}
              </h3>
              <button
                type="button"
                onClick={() => setShowIOSModal(false)}
                aria-label={tr(lang, 'Close', 'மூடு')}
                className="p-1 rounded-lg text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 mb-4">
              {tr(
                lang,
                'Add Pulipani Siddhar Aadheenam to your iPhone or iPad Home Screen for quick offline access:',
                'இணையம் இல்லாத நேரத்திலும் விரைவாக அணுக உங்கள் iPhone / iPad முகப்புத் திரையில் சேர்க்கவும்:'
              )}
            </p>
            <ol className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 mb-5">
              <li className="flex items-center gap-2">
                <Share className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
                <span>
                  {tr(lang, '1. Tap the Share icon in Safari.', '1. Safari-இல் பகிர் (Share) பொத்தானைத் தட்டவும்.')}
                </span>
              </li>
              <li>
                {tr(
                  lang,
                  '2. Scroll and select "Add to Home Screen".',
                  '2. "முகப்புத் திரையில் சேர் (Add to Home Screen)" என்பதைத் தேர்ந்தெடுக்கவும்.'
                )}
              </li>
            </ol>
            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 px-4 rounded-lg bg-amber-500 text-slate-950 text-xs font-semibold hover:bg-amber-400 transition-colors"
            >
              {tr(lang, 'Got It', 'புரிந்தது')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function OfflineIndicator() {
  const { lang } = useSite();
  const [online, setOnline] = useState(() => (typeof navigator === 'undefined' ? true : navigator.onLine));

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (online) return null;

  return (
    <div
      role="status"
      className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-500 text-slate-950 text-xs font-semibold shadow-lg"
    >
      <WifiOff className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{tr(lang, 'Offline mode · Viewing cached content', 'ஆஃப்லைன் நிலை · சேமிக்கப்பட்ட பக்கங்கள்')}</span>
    </div>
  );
}
