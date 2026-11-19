import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, Quote, Shuffle } from 'lucide-react';
import { PULIPANI_WISDOM_QUOTES } from '../data/aadheenamData';
import { useSite } from '../context/SiteContext';
import { tr } from '../data/translations';
import { KolamRule } from './KolamMotif';

const EASE_SERENE = [0.22, 1, 0.36, 1] as const;

function pickRandomIndex(excludeIndex: number, total: number): number {
  if (total <= 1) return 0;
  let next = Math.floor(Math.random() * total);
  while (next === excludeIndex) {
    next = Math.floor(Math.random() * total);
  }
  return next;
}

export function DailyWisdomWidget() {
  const { lang } = useSite();
  const [quoteIdx, setQuoteIdx] = useState<number>(() =>
    Math.floor(Math.random() * PULIPANI_WISDOM_QUOTES.length)
  );
  const [copied, setCopied] = useState(false);

  const current = PULIPANI_WISDOM_QUOTES[quoteIdx] ?? PULIPANI_WISDOM_QUOTES[0];

  const handleRandomCycle = () => {
    setCopied(false);
    setQuoteIdx((prev) => pickRandomIndex(prev, PULIPANI_WISDOM_QUOTES.length));
  };

  const handleCopy = async () => {
    const text =
      lang === 'ta'
        ? `“${current.tamil}”\n— ${current.sourceTa}\n(${current.english})`
        : `“${current.english}”\n— ${current.sourceEn}\n(${current.tamil})`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access denied or unavailable in non-secure contexts
    }
  };

  return (
    <section
      id="daily-wisdom"
      aria-label={tr(lang, 'Daily Wisdom from Pulipani Siddhar', 'புலிப்பாணி சித்தர் தினசரி ஞானம்')}
      className="py-14 sm:py-16 bg-slate-50 dark:bg-[#0B1324] border-b border-slate-200 dark:border-white/10 transition-colors duration-200"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.48, ease: EASE_SERENE }}
          className="relative rounded-2xl bg-white dark:bg-[#10192D] border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden"
        >
          {/* Top sacred hairline bar */}
          <div
            className="h-1 w-full bg-gradient-to-r from-amber-500/40 via-amber-500 to-amber-500/40"
            aria-hidden="true"
          />

          <div className="p-6 sm:p-10">
            {/* Header row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 dark:bg-amber-400/15 border border-amber-500/25 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0">
                  <Quote className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300"
                    style={{ fontFamily: lang === 'ta' ? 'var(--font-tamil)' : 'var(--font-sans)' }}
                  >
                    {tr(lang, 'Daily Siddhar Wisdom', 'தினசரி சித்தர் ஞானம்')}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-300 mt-0.5">
                    {tr(lang, current.themeEn, current.themeTa)} ·{' '}
                    <span className="tabular-nums">
                      {quoteIdx + 1} / {PULIPANI_WISDOM_QUOTES.length}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label={tr(lang, 'Copy wisdom quote', 'ஞான உரையை நகலெடுக்க')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-white/15 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{tr(lang, 'Copied', 'நகலெடுக்கப்பட்டது')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{tr(lang, 'Copy', 'நகலெடு')}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleRandomCycle}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B1324] dark:bg-amber-500 text-white dark:text-slate-950 text-xs sm:text-sm font-semibold hover:bg-slate-800 dark:hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  <Shuffle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{tr(lang, 'Next Wisdom', 'அடுத்த ஞானம்')}</span>
                </button>
              </div>
            </div>

            {/* Animated Bilingual Quote Content */}
            <div className="pt-7 pb-2 text-center max-w-3xl mx-auto min-h-[156px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: EASE_SERENE }}
                >
                  {lang === 'ta' ? (
                    <>
                      <blockquote
                        className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white leading-relaxed"
                        style={{ fontFamily: 'var(--font-tamil)' }}
                      >
                        “{current.tamil}”
                      </blockquote>
                      <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-200 leading-relaxed">
                        {current.english}
                      </p>
                    </>
                  ) : (
                    <>
                      <blockquote
                        className="text-xl sm:text-2xl lg:text-[26px] font-medium text-slate-900 dark:text-white leading-relaxed"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        “{current.english}”
                      </blockquote>
                      <p
                        className="mt-4 text-sm sm:text-base text-amber-800 dark:text-amber-300 leading-relaxed font-medium"
                        style={{ fontFamily: 'var(--font-tamil)' }}
                      >
                        {current.tamil}
                      </p>
                    </>
                  )}

                  <KolamRule />

                  <p className="text-xs sm:text-sm font-semibold text-amber-700 dark:text-amber-300">
                    — {tr(lang, current.sourceEn, current.sourceTa)}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
