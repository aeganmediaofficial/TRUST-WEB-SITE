import { useState } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import {
  COURSES,
  DONATION_FUNDS,
  GALLERY_ITEMS,
  HOME_ACTIVITIES,
  IMAGES,
  MONTHLY_OBSERVANCES,
  PRODUCTS,
  SITE_INFO,
  SOCIAL_MISSIONS,
  STATS,
  TESTIMONIALS,
  UPCOMING_EVENTS,
} from '../data/aadheenamData';
import { DailyWisdomWidget } from '../components/DailyWisdomWidget';
import { KolamRule, SectionHeading } from '../components/KolamMotif';
import { SmartImage } from '../components/SmartImage';
import { useSite } from '../context/SiteContext';
import {
  ACTIVITIES_TA,
  COURSES_TA,
  DONATIONS_TA,
  EVENTS_TA,
  GALLERY_TA,
  MISSIONS_TA,
  OBSERVANCES_TA,
  PRODUCTS_TA,
  STATS_TA,
  TESTIMONIALS_TA,
  tr,
} from '../data/translations';

const EASE_SERENE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT_ONCE = { once: true, amount: 0.12 } as const;

export default function HomePage() {
  const { addToCart, lang } = useSite();
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const featuredCourses = [COURSES[0], COURSES[1], COURSES[2]];
  const currentTestimonial = TESTIMONIALS[testimonialIdx];

  return (
    <MotionConfig reducedMotion="user">
      <main>
      {/* ── HERO SECTION ────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0B1324] text-white overflow-hidden">
        <SmartImage
          src={IMAGES.heroAshram}
          alt={tr(
            lang,
            'Pulipani Siddhar Aadheenam sacred forest ashram at dawn',
            'புலிப்பாணி சித்தர் ஆதீனம் — அதிகாலை வன ஆசிரமம்'
          )}
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0B1324]/75 via-[#0B1324]/65 to-[#0B1324]"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: EASE_SERENE }}
            className="mb-5 flex justify-center"
          >
            <img
              src={SITE_INFO.logoUrl}
              alt={tr(lang, 'Pulipani Siddhar Aadheenam Emblem', 'புலிப்பாணி சித்தர் ஆதீனம் சின்னம்')}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover object-top bg-white p-1 shadow-2xl ring-2 ring-amber-400/70"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.04, ease: EASE_SERENE }}
            className="mb-5 space-y-1.5"
            style={{ fontFamily: 'var(--font-tamil)' }}
          >
            <p className="text-lg sm:text-xl font-semibold text-amber-400 tracking-wide">
              {SITE_INFO.invocation}
            </p>
            <p className="text-sm sm:text-base font-medium text-amber-200/95">
              {SITE_INFO.blessingMotto}
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease: EASE_SERENE }}
            className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.14] max-w-4xl mx-auto"
            style={{ fontFamily: lang === 'ta' ? 'var(--font-tamil)' : 'var(--font-display)' }}
          >
            {lang === 'ta' ? (
              <span>
                ஆன்மீகம், இயற்கை,
                <br />
                மனிதநேயம்
              </span>
            ) : (
              <span>
                Spirituality, Nature,
                <br />
                Humanity
              </span>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: EASE_SERENE }}
            className="mt-5 text-lg sm:text-2xl font-medium text-amber-300 tracking-wide"
          >
            {tr(lang, SITE_INFO.name, SITE_INFO.tamilName)}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: EASE_SERENE }}
            className="mt-5 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: lang === 'ta' ? 'var(--font-tamil)' : 'var(--font-sans)' }}
          >
            {tr(
              lang,
              'Uniting through spiritual awakening, natural living, and compassionate humanitarian service toward a peaceful and meaningful life.',
              SITE_INFO.heroDescription
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: EASE_SERENE }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/classes"
              className="px-6 py-3 rounded-lg bg-amber-500 text-slate-950 font-semibold text-sm sm:text-base hover:bg-amber-400 transition-colors whitespace-nowrap"
            >
              {tr(lang, 'Join Our Classes', 'வகுப்புகளில் இணையுங்கள்')}
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 rounded-lg border border-white/25 text-white font-medium text-sm sm:text-base hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              {tr(lang, 'Explore Aadheenam', 'ஆதீனத்தை அறிய')}
            </Link>
            <Link
              to="/events"
              className="px-6 py-3 rounded-lg border border-white/25 text-white font-medium text-sm sm:text-base hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              {tr(lang, 'Upcoming Events', 'வரவிருக்கும் நிகழ்வுகள்')}
            </Link>
            <Link
              to="/donate"
              className="px-6 py-3 rounded-lg border border-amber-400/50 text-amber-300 font-medium text-sm sm:text-base hover:bg-amber-400/10 transition-colors whitespace-nowrap"
            >
              {tr(lang, 'Support Our Mission', 'சேவைக்கு உதவுங்கள்')}
            </Link>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Proof Strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28, ease: EASE_SERENE }}
          className="relative z-10 border-t border-white/10 bg-[#080E1C]/90"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-bold text-amber-400 tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
                  {stat.num}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {tr(lang, stat.label, STATS_TA[stat.label] ?? stat.tamil)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── DAILY WISDOM WIDGET ─────────────────────────────────────────────── */}
      <DailyWisdomWidget />

      {/* ── ABOUT AADHEENAM INTRO ───────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white dark:bg-[#070D19]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.5, ease: EASE_SERENE }}
              className="rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 min-h-[320px]"
            >
              <SmartImage
                src={IMAGES.siddharLineage}
                alt={tr(
                  lang,
                  'Tamil Siddhar palm-leaf manuscripts and sacred brass lamp',
                  'தமிழ் சித்தர் ஓலைச்சுவடிகள் மற்றும் புனித குத்துவிளக்கு'
                )}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.5, delay: 0.08, ease: EASE_SERENE }}
              className="flex flex-col justify-center"
            >
              <p className="text-lg font-medium text-amber-700 dark:text-amber-400 mb-1" style={{ fontFamily: 'var(--font-tamil)' }}>
                {tr(lang, 'நமது ஆதீனம்', 'About Aadheenam')}
              </p>
              <h2
                className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white tracking-tight"
                style={{ fontFamily: lang === 'ta' ? 'var(--font-tamil)' : 'var(--font-display)' }}
              >
                {tr(
                  lang,
                  'Rooted in Ancient Tamil Siddhar Wisdom',
                  'பழமையான தமிழ் சித்தர் ஞானத்தில் வேரூன்றியது'
                )}
              </h2>
              <KolamRule centered={false} />
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {tr(
                  lang,
                  'Rooted in the ancient Tamil Siddhar tradition, Pulipani Siddhar Aadheenam is a sacred institution dedicated to spiritual awakening, natural living, and compassionate service. Located in Mallankuli, Thalavadi, Tamil Nadu, we offer authentic teachings, transformative programs, and community welfare initiatives that honour the timeless wisdom of the Siddhar lineage.',
                  'பழமையான தமிழ் சித்தர் மரபில் வேரூன்றிய புலிப்பாணி சித்தர் ஆதீனம், ஆன்மீக விழிப்புணர்வு, இயற்கை வாழ்வியல் மற்றும் கருணை சேவைக்காக அர்ப்பணிக்கப்பட்ட புனித நிறுவனம். தமிழ்நாட்டின் தாளவாடி மல்லன்குழியில் அமைந்துள்ள எங்கள் ஆதீனம், சித்தர் பரம்பரையின் அழியாத ஞானத்தைப் போற்றும் வகையில் உண்மையான போதனைகள், பயிற்சிகள் மற்றும் சமூக நலத் திட்டங்களை வழங்குகிறது.'
                )}
              </p>

              <div className="grid grid-cols-2 gap-4 py-5 border-y border-slate-200 dark:border-white/10 mb-7">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">{s.num}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {tr(lang, s.label, STATS_TA[s.label] ?? s.tamil)}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0B1324] dark:bg-amber-500 text-white dark:text-slate-950 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-amber-400 transition-colors w-fit"
              >
                <span>{tr(lang, 'Learn Our Story', 'எங்கள் வரலாற்றை அறிய')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── EXPLORE OUR ACTIVITIES ──────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-slate-50 dark:bg-[#0B1324] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tamil="எங்கள் செயல்பாடுகள்"
            english="Explore Our Activities"
            subtitle={tr(
              lang,
              'Nine interconnected avenues of spiritual learning, natural healing, and community service.',
              'ஆன்மீகக் கல்வி, இயற்கை மருத்துவம் மற்றும் சமூக சேவையின் ஒன்பது ஒருங்கிணைந்த தளங்கள்.'
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOME_ACTIVITIES.map((act, idx) => {
              const taAct = ACTIVITIES_TA[act.id];
              const title = tr(lang, act.english, taAct?.title ?? act.tamil);
              const desc = tr(lang, act.desc, taAct?.desc ?? act.desc);
              return (
                <motion.div
                  key={act.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.42, delay: (idx % 3) * 0.06, ease: EASE_SERENE }}
                  className="flex"
                >
                  <Link
                    to={act.href}
                    className="group relative rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111C33] flex flex-col w-full hover:border-amber-500/60 dark:hover:border-amber-400/50 transition-colors"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <SmartImage
                        src={act.image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-[#111C33] via-[#111C33]/35 to-transparent" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-xs text-amber-700 dark:text-amber-400 font-medium mb-1">
                        {lang === 'ta' ? act.english : act.tamil}
                      </p>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                          {title}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 transition-transform group-hover:translate-x-1" />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{desc}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white dark:bg-[#0D1526] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tamil="வரவிருக்கும் நிகழ்வுகள்"
            english="Upcoming Events"
            subtitle={tr(
              lang,
              'Join our upcoming sacred homas, silent forest meditation retreats, and Siddha living workshops.',
              'புனித யாக ஹோமங்கள், வன ஆசிரம தியான முகாம்கள் மற்றும் இயற்கை வாழ்வியல் பயிற்சிகளில் கலந்து கொள்ளுங்கள்.'
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UPCOMING_EVENTS.map((ev, idx) => {
              const taEv = EVENTS_TA[ev.id];
              const title = tr(lang, ev.english, taEv?.title ?? ev.tamil);
              const date = tr(lang, ev.date, taEv?.date ?? ev.date);
              const venue = tr(lang, ev.venue, taEv?.venue ?? ev.venue);
              const desc = tr(lang, ev.desc, taEv?.desc ?? ev.desc);
              return (
                <motion.article
                  key={ev.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.44, delay: idx * 0.07, ease: EASE_SERENE }}
                  className="rounded-xl overflow-hidden bg-slate-50 dark:bg-[#111C33] border border-slate-200 dark:border-white/10 flex flex-col"
                >
                  <div className="aspect-video overflow-hidden">
                    <SmartImage src={ev.image} alt={title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 tabular-nums mb-2">
                      <span className="font-semibold text-amber-700 dark:text-amber-400">{date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{venue}</span>
                    </div>
                    <p className="text-xs text-amber-700 dark:text-amber-400 font-medium mb-0.5">
                      {lang === 'ta' ? ev.english : ev.tamil}
                    </p>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 flex-1">
                      {desc}
                    </p>
                    <Link
                      to={`/events?event=${ev.id}`}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#0B1324] dark:bg-amber-500 text-white dark:text-slate-950 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-amber-400 transition-colors"
                    >
                      {tr(lang, 'Register Now', 'பதிவு செய்யுங்கள்')}
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span>{tr(lang, 'View All Events', 'அனைத்து நிகழ்வுகளையும் காண்க')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* ── MONTHLY OBSERVANCES ─────────────────────────────────────────── */}
          <div id="monthly-observances" className="mt-16 pt-16 border-t border-slate-200 dark:border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.45, ease: EASE_SERENE }}
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>{tr(lang, 'Monthly Sacred Cycle', 'மாதாந்திர சிறப்பு வழிபாடுகள்')}</span>
              </div>
              <h3
                className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white mb-6"
                style={{ fontFamily: lang === 'ta' ? 'var(--font-tamil)' : 'var(--font-display)' }}
              >
                {tr(lang, 'Sacred Monthly Observances', 'மாதாந்திர புனித நிகழ்வுகள்')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MONTHLY_OBSERVANCES.map((obs) => {
                  const taObs = OBSERVANCES_TA[obs.id];
                  return (
                    <div
                      key={obs.id}
                      className="rounded-xl p-5 bg-slate-50 dark:bg-[#111C33] border border-slate-200 dark:border-white/10"
                    >
                      <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">
                        {tr(lang, obs.cycle, taObs?.cycle ?? obs.cycle)}
                      </p>
                      <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-1.5">
                        {tr(lang, obs.english, taObs?.title ?? obs.tamil)}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {tr(lang, obs.desc, taObs?.desc ?? obs.desc)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SPIRITUAL CLASSES & TRAINING ────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-slate-50 dark:bg-[#0B1324] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tamil="ஆன்மீக வகுப்புகள்"
            english="Spiritual Classes & Training"
            subtitle={tr(
              lang,
              'Structured programmes conducted in Tamil with supplementary English notes — accessible online and in person.',
              'தமிழில் (ஆங்கிலக் குறிப்புகளுடன்) ஆன்லைன் மற்றும் நேரில் கற்பிக்கப்படும் கட்டமைக்கப்பட்ட வகுப்புகள்.'
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map((course, idx) => {
              const taCourse = COURSES_TA[course.id];
              const title = tr(lang, course.english, taCourse?.title ?? course.tamil);
              const formats = tr(lang, course.formats.replace(',', ' / '), taCourse?.formats ?? course.formats);
              const duration = tr(lang, course.duration, taCourse?.duration ?? course.duration);
              const fee = tr(lang, course.fee, taCourse?.fee ?? course.fee);
              const desc = tr(lang, course.desc, taCourse?.desc ?? course.desc);
              return (
                <motion.article
                  key={course.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.44, delay: idx * 0.07, ease: EASE_SERENE }}
                  className="rounded-xl overflow-hidden bg-white dark:bg-[#111C33] border border-slate-200 dark:border-white/10 flex flex-col"
                >
                  <div className="aspect-video overflow-hidden">
                    <SmartImage src={course.image} alt={title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300 tabular-nums mb-2">
                      <span>{formats}</span>
                      <span aria-hidden="true">·</span>
                      <span>{duration}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-amber-700 dark:text-amber-400">{fee}</span>
                    </div>
                    <p className="text-xs text-amber-700 dark:text-amber-400 font-medium mb-0.5">
                      {lang === 'ta' ? course.english : course.tamil}
                    </p>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 flex-1 line-clamp-3">
                      {desc}
                    </p>
                    <Link
                      to={`/classes?course=${encodeURIComponent(course.english)}#register`}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#0B1324] dark:bg-amber-500 text-white dark:text-slate-950 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-amber-400 transition-colors"
                    >
                      {tr(lang, 'Register Now', 'பதிவு செய்யுங்கள்')}
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/classes"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-white/25 text-sm font-semibold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              <span>{tr(lang, 'Explore All 6 Courses', 'அனைத்து 6 வகுப்புகளையும் காண்க')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── AADHEENAM PRODUCTS ──────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white dark:bg-[#070D19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tamil="எங்கள் பொருட்கள்"
            english="Aadheenam Products"
            subtitle={tr(
              lang,
              'Pure Siddha preparations, spiritual literature, and handcrafted brassware supporting our charitable initiatives.',
              'எங்கள் அறப்பணிகளுக்குத் துணைபுரியும் சுத்தமான சித்த மூலிகைகள், ஆன்மீக நூல்கள் மற்றும் பித்தளை விளக்குகள்.'
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product, idx) => {
              const taProd = PRODUCTS_TA[product.id];
              const name = tr(lang, product.name, taProd?.name ?? product.tamil);
              const cat = tr(lang, product.category, taProd?.category ?? product.category);
              const unit = tr(lang, product.unit, taProd?.unit ?? product.unit);
              return (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.42, delay: idx * 0.06, ease: EASE_SERENE }}
                  className="rounded-xl overflow-hidden bg-slate-50 dark:bg-[#10192D] border border-slate-200 dark:border-white/10 flex flex-col"
                >
                  <div className="aspect-square overflow-hidden">
                    <SmartImage
                      src={product.image}
                      alt={name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                      {cat} · {unit}
                    </p>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">{name}</h3>
                    <p className="text-lg font-bold text-amber-700 dark:text-amber-400 tabular-nums mb-4 mt-auto">
                      ₹{product.price}
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          addToCart({
                            id: product.id,
                            name: product.name,
                            tamil: product.tamil,
                            price: product.price,
                            image: product.image,
                          })
                        }
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#0B1324] dark:bg-amber-500 text-white dark:text-slate-950 text-xs font-semibold hover:bg-slate-800 dark:hover:bg-amber-400 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{tr(lang, 'Add to Cart', 'கூடையில் சேர்')}</span>
                      </button>
                      <a
                        href={`https://wa.me/${SITE_INFO.whatsappNumber}?text=${encodeURIComponent(
                          `Vanakkam, I would like to enquire about ${product.name} (₹${product.price}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/store"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span>{tr(lang, 'Visit Our Store', 'எங்கள் அங்காடியைப் பார்க்க')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SOCIAL MISSION ──────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-slate-50 dark:bg-[#0B1324] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tamil="எங்கள் சமூக சேவை"
            english="Our Social Mission"
            subtitle={tr(
              lang,
              'Serving society with compassion through daily Annadhanam, rural education, healthcare, and temple preservation.',
              'தினசரி அன்னதானம், கிராமியக் கல்வி, மருத்துவ முகாம்கள் மற்றும் கோயில் திருப்பணி மூலம் கருணைச் சேவை.'
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SOCIAL_MISSIONS.map((mission, idx) => {
              const taM = MISSIONS_TA[mission.id];
              const title = tr(lang, mission.english, taM?.title ?? mission.tamil);
              const desc = tr(lang, mission.desc, taM?.desc ?? mission.desc);
              const impact = tr(lang, mission.impact, taM?.impact ?? mission.impact);
              return (
                <motion.article
                  key={mission.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.42, delay: idx * 0.06, ease: EASE_SERENE }}
                  className="rounded-xl overflow-hidden bg-white dark:bg-[#111C33] border border-slate-200 dark:border-white/10 flex flex-col"
                >
                  <div className="h-44 overflow-hidden">
                    <SmartImage src={mission.image} alt={title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-xs text-amber-700 dark:text-amber-400 font-medium mb-1">
                      {lang === 'ta' ? mission.english : mission.tamil}
                    </p>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 flex-1">{desc}</p>
                    <p className="text-lg font-bold text-amber-700 dark:text-amber-400 tabular-nums pt-3 border-t border-slate-200 dark:border-white/10">
                      {impact}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SUPPORT OUR MISSION (DONATIONS) ─────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white dark:bg-[#0D1526] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tamil="எங்கள் நோக்கத்தை ஆதரிக்கவும்"
            english="Support Our Mission"
            subtitle={tr(
              lang,
              'Every contribution directly funds daily meals, student scholarships, temple restoration, and rural welfare.',
              'உங்கள் ஒவ்வொரு பங்களிப்பும் தினசரி அன்னதானம், மாணவர் கல்வி, கோயில் திருப்பணி மற்றும் கிராமிய நலனுக்குப் பயன்படுகிறது.'
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DONATION_FUNDS.map((fund, idx) => {
              const taF = DONATIONS_TA[fund.id];
              const title = tr(lang, fund.english, taF?.title ?? fund.tamil);
              const desc = tr(lang, fund.desc, taF?.desc ?? fund.desc);
              const target = tr(lang, fund.target, taF?.target ?? fund.target);
              return (
                <motion.article
                  key={fund.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.42, delay: idx * 0.06, ease: EASE_SERENE }}
                  className="rounded-xl p-6 bg-slate-50 dark:bg-[#111C33] border border-slate-200 dark:border-white/10 flex flex-col"
                >
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-medium mb-1">
                    {lang === 'ta' ? fund.english : fund.tamil}
                  </p>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 flex-1">{desc}</p>
                  <div className="pt-4 border-t border-slate-200 dark:border-white/10 mb-5">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {tr(lang, 'Goal Target', 'இலக்கு')}
                    </p>
                    <p className="text-base font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">
                      {target}
                    </p>
                  </div>
                  <Link
                    to={`/donate?fund=${fund.id}`}
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-amber-500 text-slate-950 text-sm font-semibold hover:bg-amber-400 transition-colors"
                  >
                    {tr(lang, 'Contribute', 'பங்களிக்கவும்')}
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY PREVIEW ───────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-slate-50 dark:bg-[#0B1324] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tamil="படங்கள் தொகுப்பு"
            english="Photo Gallery"
            subtitle={tr(
              lang,
              'Moments from our daily Annadhanam, Siddhar yoga retreats, and temple restoration initiatives.',
              'தினசரி அன்னதானம், சித்தர் யோகா முகாம்கள் மற்றும் கோயில் திருப்பணிகளின் இனிய தருணங்கள்.'
            )}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_ITEMS.slice(0, 6).map((item, idx) => {
              const title = tr(lang, item.title, GALLERY_TA[item.id]?.title ?? item.tamil);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.4, delay: (idx % 3) * 0.06, ease: EASE_SERENE }}
                >
                  <Link
                    to="/gallery"
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 block"
                  >
                    <SmartImage
                      src={item.image}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <div>
                        <p className="text-xs text-amber-300">
                          {lang === 'ta' ? item.title : item.tamil}
                        </p>
                        <p className="text-sm font-medium text-white">{title}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0B1324] dark:bg-amber-500 text-white dark:text-slate-950 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-amber-400 transition-colors"
            >
              <span>{tr(lang, 'View Full Gallery', 'முழுப் படத் தொகுப்பைப் பார்க்க')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white dark:bg-[#070D19]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading tamil="அனுபவங்கள்" english="What People Say" />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.45, ease: EASE_SERENE }}
            className="rounded-2xl p-8 sm:p-10 bg-slate-50 dark:bg-[#10192D] border border-slate-200 dark:border-white/10 text-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EASE_SERENE }}
              >
                <p className="text-lg sm:text-xl leading-relaxed text-slate-800 dark:text-slate-100 mb-6">
                  “{tr(lang, currentTestimonial.quote, TESTIMONIALS_TA[currentTestimonial.id]?.quote ?? currentTestimonial.quote)}”
                </p>
                <p className="text-base font-semibold text-amber-700 dark:text-amber-400">
                  {currentTestimonial.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {tr(lang, currentTestimonial.role, TESTIMONIALS_TA[currentTestimonial.id]?.role ?? currentTestimonial.role)}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setTestimonialIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                aria-label={tr(lang, 'Previous testimonial', 'முந்தைய அனுபவம்')}
                className="w-10 h-10 rounded-lg border border-slate-300 dark:border-slate-700 inline-flex items-center justify-center hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums px-2">
                {testimonialIdx + 1} / {TESTIMONIALS.length}
              </span>
              <button
                type="button"
                onClick={() => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length)}
                aria-label={tr(lang, 'Next testimonial', 'அடுத்த அனுபவம்')}
                className="w-10 h-10 rounded-lg border border-slate-300 dark:border-slate-700 inline-flex items-center justify-center hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      </main>
    </MotionConfig>
  );
}
