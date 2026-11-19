import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  X,
} from 'lucide-react';
import { GALLERY_ITEMS, IMAGES } from '../data/aadheenamData';
import { PageHero, SectionHeading } from '../components/KolamMotif';
import { SmartImage } from '../components/SmartImage';
import { useSite } from '../context/SiteContext';
import { GALLERY_TA, tr } from '../data/translations';

type GalleryCategory =
  | 'All'
  | 'Ashram & Temples'
  | 'Classes & Retreats'
  | 'Events & Ceremonies'
  | 'Humanitarian Seva';

export default function GalleryPage() {
  const { lang } = useSite();
  const [category, setCategory] = useState<GalleryCategory>('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const lightboxRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const touchStartX = useRef<number | null>(null);

  const filtered = GALLERY_ITEMS.filter((item) => category === 'All' || item.category === category);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i === null || filtered.length === 0 ? null : (i + 1) % filtered.length));
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) =>
      i === null || filtered.length === 0 ? null : (i - 1 + filtered.length) % filtered.length
    );
  }, [filtered.length]);

  const closeLightbox = useCallback(() => {
    setIsPlaying(false);
    setActiveIndex(null);
    if (document.fullscreenElement && document.exitFullscreen) {
      void document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Keyboard navigation when lightbox is open
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (activeIndex === null) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        setIsPlaying(false);
        goNext();
      } else if (e.key === 'ArrowLeft') {
        setIsPlaying(false);
        goPrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, closeLightbox, goNext, goPrev]);

  // Lock page scroll while lightbox is active
  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex]);

  // Auto-advance slideshow
  useEffect(() => {
    if (activeIndex === null || !isPlaying) return;
    const timer = window.setInterval(() => {
      goNext();
    }, 4000);
    return () => window.clearInterval(timer);
  }, [activeIndex, isPlaying, goNext]);

  // Track browser fullscreen state
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Scroll active thumbnail into view in filmstrip
  useEffect(() => {
    if (activeIndex === null) return;
    const thumb = thumbRefs.current[activeIndex];
    if (thumb) {
      thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeIndex]);

  async function toggleFullscreen() {
    const el = lightboxRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement && el.requestFullscreen) {
        await el.requestFullscreen();
      } else if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch {
      // gracefully ignore if container iframe blocks Fullscreen API
    }
  }

  function handleTouchStart(e: TouchEvent<HTMLDivElement>) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(e: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    setIsPlaying(false);
    if (delta < 0) {
      goNext();
    } else {
      goPrev();
    }
  }

  const activeItem = activeIndex !== null ? filtered[activeIndex] : null;
  const activeTitle = activeItem
    ? tr(lang, activeItem.title, GALLERY_TA[activeItem.id]?.title ?? activeItem.tamil)
    : '';
  const activeSecondaryTitle = activeItem
    ? lang === 'ta'
      ? activeItem.title
      : activeItem.tamil
    : '';
  const activeCategoryLabel = activeItem
    ? tr(lang, activeItem.category, GALLERY_TA[activeItem.id]?.category ?? activeItem.category)
    : '';

  return (
    <main>
      <PageHero
        tamil={tr(lang, 'படங்கள் தொகுப்பு', 'Photo Gallery')}
        title={tr(lang, 'Photo Gallery', 'படங்கள் தொகுப்பு')}
        subtitle={tr(
          lang,
          'Sacred moments from our forest ashram, Siddhar yoga retreats, daily Annadhanam, and ancient temple restoration.',
          'வன ஆசிரமம், சித்தர் யோகா முகாம்கள், தினசரி அன்னதானம் மற்றும் பழமையான கோயில் திருப்பணிகளின் புனிதத் தருணங்கள்.'
        )}
        image={IMAGES.templeHeritage}
        alt="Restored ancient Tamil temple gopuram"
        breadcrumbs={[
          { label: tr(lang, 'Home', 'முகப்பு'), to: '/' },
          { label: tr(lang, 'Gallery', 'படங்கள்') },
        ]}
      />

      <section className="py-20 sm:py-24 bg-white dark:bg-[#070D19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tamil="ஆதீன நினைவுகள்"
            english="Visual Archive"
            subtitle={tr(
              lang,
              'Select any photograph to open the full-screen heritage carousel with slideshow and keyboard navigation.',
              'முழுத்திரை ஒளிக்காட்சித் தொகுப்பில் காண எந்தப் படத்தையும் தட்டவும்.'
            )}
          />

          <div className="flex justify-center mb-10">
            <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#10192D] border border-slate-200 dark:border-white/10">
              {(
                [
                  { id: 'All', label: tr(lang, 'All', 'அனைத்தும்') },
                  { id: 'Ashram & Temples', label: tr(lang, 'Ashram & Temples', 'ஆசிரமம் & கோயில்கள்') },
                  { id: 'Classes & Retreats', label: tr(lang, 'Classes & Retreats', 'வகுப்புகள் & முகாம்கள்') },
                  { id: 'Events & Ceremonies', label: tr(lang, 'Events & Ceremonies', 'நிகழ்வுகள் & வழிபாடு') },
                  { id: 'Humanitarian Seva', label: tr(lang, 'Humanitarian Seva', 'மனிதநேய சேவை') },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setCategory(tab.id);
                    setActiveIndex(null);
                    setIsPlaying(false);
                  }}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                    category === tab.id
                      ? 'bg-white dark:bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((item, idx) => {
              const title = tr(lang, item.title, GALLERY_TA[item.id]?.title ?? item.tamil);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsPlaying(false);
                  }}
                  aria-label={tr(lang, `View ${title} in full-screen lightbox`, `${title} — முழுத்திரையில் காண்க`)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <SmartImage
                    src={item.image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-slate-950/70 text-white border border-white/15 inline-flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
                    aria-hidden="true"
                  >
                    <Expand className="w-4 h-4" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end p-4">
                    <div>
                      <p className="text-xs text-amber-300 mb-0.5">
                        {lang === 'ta' ? item.title : item.tamil}
                      </p>
                      <p className="text-sm font-semibold text-white">{title}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FULL-SCREEN LIGHTBOX CAROUSEL ───────────────────────────────────── */}
      {activeItem && activeIndex !== null && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between text-white select-none"
          role="dialog"
          aria-modal="true"
          aria-label={activeTitle}
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5 border-b border-white/10 bg-slate-950/70"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xs font-semibold text-amber-400 tabular-nums whitespace-nowrap">
                {activeIndex + 1} / {filtered.length}
              </span>
              <span className="text-white/25" aria-hidden="true">
                |
              </span>
              <span className="text-xs text-slate-300 truncate">{activeCategoryLabel}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                aria-label={isPlaying ? tr(lang, 'Pause slideshow', 'ஸ்லைடுஷோவை நிறுத்து') : tr(lang, 'Play slideshow', 'ஸ்லைடுஷோவை இயக்கு')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors whitespace-nowrap"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" /> : <Play className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />}
                <span className="hidden sm:inline">
                  {isPlaying ? tr(lang, 'Pause', 'நிறுத்து') : tr(lang, 'Slideshow', 'தானியங்கி')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => void toggleFullscreen()}
                aria-label={isFullscreen ? tr(lang, 'Exit fullscreen', 'முழுத்திரையை மூடு') : tr(lang, 'Enter fullscreen', 'முழுத்திரை')}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" aria-hidden="true" /> : <Maximize2 className="w-4 h-4" aria-hidden="true" />}
              </button>

              <button
                type="button"
                onClick={closeLightbox}
                aria-label={tr(lang, 'Close lightbox', 'படத் தொகுப்பை மூடு')}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Main Stage Image & Prev/Next Controls */}
          <div
            className="flex-1 min-h-0 flex items-center justify-between gap-2 sm:gap-4 px-2 sm:px-6 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                goPrev();
              }}
              aria-label={tr(lang, 'Previous photo', 'முந்தைய படம்')}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-amber-500 hover:text-slate-950 text-white inline-flex items-center justify-center transition-colors shrink-0"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="flex-1 h-full min-w-0 flex flex-col items-center justify-center">
              <img
                src={activeItem.image}
                alt={activeTitle}
                referrerPolicy="no-referrer"
                className="max-h-[58vh] sm:max-h-[64vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
              />
              <div className="mt-3 text-center max-w-2xl px-2">
                <p className="text-xs sm:text-sm text-amber-400 font-medium">{activeSecondaryTitle}</p>
                <p className="text-base sm:text-lg font-semibold text-white mt-0.5">{activeTitle}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                goNext();
              }}
              aria-label={tr(lang, 'Next photo', 'அடுத்த படம்')}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-amber-500 hover:text-slate-950 text-white inline-flex items-center justify-center transition-colors shrink-0"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Thumbnail Filmstrip Carousel */}
          <div
            className="px-4 sm:px-6 py-3 border-t border-white/10 bg-slate-950/80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-4xl mx-auto flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto py-1">
              {filtered.map((item, idx) => {
                const thumbTitle = tr(lang, item.title, GALLERY_TA[item.id]?.title ?? item.tamil);
                const isSelected = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      thumbRefs.current[idx] = el;
                    }}
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setActiveIndex(idx);
                    }}
                    aria-label={thumbTitle}
                    aria-current={isSelected ? 'true' : undefined}
                    className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      isSelected
                        ? 'border-amber-400 scale-105 opacity-100'
                        : 'border-white/15 opacity-55 hover:opacity-90'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={thumbTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
