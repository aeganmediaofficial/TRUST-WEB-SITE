import { Link } from 'react-router';
import { ABOUT_CONTENT, IMAGES, STATS } from '../data/aadheenamData';
import { KolamRule, PageHero, SectionHeading } from '../components/KolamMotif';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { SmartImage } from '../components/SmartImage';
import { useSite } from '../context/SiteContext';
import { ABOUT_TA, STATS_TA, tr } from '../data/translations';

export default function AboutPage() {
  const { lang } = useSite();

  return (
    <main>
      <ReadingProgressBar />
      <PageHero
        tamil={tr(lang, 'எங்களை பற்றி', 'About Us')}
        title={tr(lang, 'About Pulipani Siddhar Aadheenam', ABOUT_TA.heroTitle)}
        subtitle={tr(
          lang,
          'A sacred institution established in the lineage of Pulipani Siddhar — dedicated to spiritual awakening, natural living, and compassionate service in Tamil Nadu.',
          ABOUT_TA.heroSubtitle
        )}
        image={IMAGES.heroAshram}
        alt="Pulipani Siddhar Aadheenam sacred landscape"
        breadcrumbs={[
          { label: tr(lang, 'Home', 'முகப்பு'), to: '/' },
          { label: tr(lang, 'About', 'எங்களை பற்றி') },
        ]}
      />

      {/* ── LINEAGE & HISTORY ───────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white dark:bg-[#070D19]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 min-h-[340px]">
              <SmartImage
                src={IMAGES.siddharLineage}
                alt="Pulipani Siddhar palm-leaf manuscripts and sacred traditions"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-base font-medium text-amber-700 dark:text-amber-400 mb-1">
                {tr(lang, 'எங்கள் பாரம்பரியம்', 'Lineage & History')}
              </p>
              <h2
                className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white tracking-tight"
                style={{ fontFamily: lang === 'ta' ? 'var(--font-tamil)' : 'var(--font-display)' }}
              >
                {tr(lang, 'Lineage & History', ABOUT_TA.lineageHeading)}
              </h2>
              <KolamRule centered={false} />
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                {tr(
                  lang,
                  'Pulipani Siddhar Aadheenam is a sacred institution established in the lineage of Pulipani Siddhar — one of the revered 18 Tamil Siddhars. For over 18 years, we have been a beacon of spiritual wisdom, natural living, and compassionate service in Tamil Nadu. Our mission is to guide seekers on the path of inner awakening while serving society through education, healthcare, and humanitarian initiatives.',
                  ABOUT_TA.lineageBody
                )}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl bg-slate-50 dark:bg-[#10192D] border border-slate-200 dark:border-white/10">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl font-bold text-amber-700 dark:text-amber-400 tabular-nums">{stat.num}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      {tr(lang, stat.label, STATS_TA[stat.label] ?? stat.tamil)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-slate-50 dark:bg-[#0B1324] transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading tamil="நோக்கம் & இலக்கு" english="Vision & Mission" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {[ABOUT_CONTENT.vision, ABOUT_CONTENT.mission].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-7 bg-white dark:bg-[#111C33] border border-slate-200 dark:border-white/10"
              >
                <p className="text-base font-semibold text-amber-700 dark:text-amber-400 mb-3">{item.label}</p>
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed mb-3" style={{ fontFamily: 'var(--font-tamil)' }}>
                  {item.tamil}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.english}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ABOUT_CONTENT.pillars.map((pillar, idx) => {
              const taPillar = ABOUT_TA.pillars[idx];
              return (
                <div
                  key={pillar.english}
                  className="rounded-xl p-6 bg-white dark:bg-[#111C33] border border-slate-200 dark:border-white/10"
                >
                  <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums mb-3">0{idx + 1}</p>
                  <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-0.5">
                    {lang === 'ta' ? pillar.english : pillar.tamil}
                  </p>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2.5">
                    {tr(lang, pillar.english, taPillar.title)}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {tr(lang, pillar.desc, taPillar.desc)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SPIRITUAL PHILOSOPHY ────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white dark:bg-[#070D19]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="flex flex-col justify-center">
              <p className="text-base font-medium text-amber-700 dark:text-amber-400 mb-1">
                {tr(lang, 'ஆன்மீக தத்துவம்', 'Spiritual Philosophy')}
              </p>
              <h2
                className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white tracking-tight"
                style={{ fontFamily: lang === 'ta' ? 'var(--font-tamil)' : 'var(--font-display)' }}
              >
                {tr(lang, 'Spiritual Philosophy', ABOUT_TA.philosophyTitle)}
              </h2>
              <KolamRule centered={false} />
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {tr(
                  lang,
                  'The Tamil Siddhar tradition is one of the world’s oldest and most profound spiritual lineages. The Siddhars were enlightened masters who attained liberation through the practice of yoga, meditation, and deep inquiry into the nature of the self. Their teachings — preserved in Tamil Siddhar literature — offer a complete path to physical health, mental clarity, and spiritual liberation.',
                  ABOUT_TA.philosophyBody1
                )}
              </p>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {tr(
                  lang,
                  'Pulipani Siddhar is revered among the 18 Siddhars for his timeless teachings on yoga, herbal medicine, and inner awakening.',
                  ABOUT_TA.philosophyBody2
                )}
              </p>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {tr(
                  lang,
                  'At Pulipani Siddhar Aadheenam, we transmit these teachings in their authentic form — not as mere philosophy, but as a living, practical path that transforms the body, mind, and spirit. Our programmes are designed to make Siddhar wisdom accessible to all, regardless of background or prior experience.',
                  ABOUT_TA.philosophyBody3
                )}
              </p>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 min-h-[340px]">
              <SmartImage
                src={IMAGES.yogaMeditation}
                alt="Meditation and Siddhar yoga practice at the Aadheenam"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY ACTIVITIES ──────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-slate-50 dark:bg-[#0D1526]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading tamil="முக்கிய செயல்பாடுகள்" english="Key Activities & Seva" />

          <div className="space-y-14">
            {ABOUT_CONTENT.activities.map((item, idx) => {
              const taAct = ABOUT_TA.activities[item.id as keyof typeof ABOUT_TA.activities];
              return (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div className={`rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                    <SmartImage src={item.image} alt={tr(lang, item.english, taAct.title)} className="w-full aspect-video object-cover" />
                  </div>
                  <div className={idx % 2 === 1 ? 'md:order-1' : ''}>
                    <p className="text-base font-medium text-amber-700 dark:text-amber-400 mb-1">
                      {lang === 'ta' ? item.english : item.tamil}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white mb-2">
                      {tr(lang, item.english, taAct.title)}
                    </h3>
                    <KolamRule centered={false} />
                    <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {tr(lang, item.desc, taAct.desc)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP & LINEAGE ────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-slate-50 dark:bg-[#0B1324] transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading tamil="தலைமை & குரு பரம்பரை" english="Leadership & Lineage" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ABOUT_CONTENT.leadership.map((leader, idx) => {
              const taLeader = ABOUT_TA.leadership[idx];
              return (
                <div key={leader.name} className="rounded-xl p-7 bg-white dark:bg-[#111C33] border border-slate-200 dark:border-white/10 flex flex-col">
                  <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums mb-3">0{idx + 1}</p>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                    {tr(lang, leader.name, taLeader.name)}
                  </h3>
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-4">
                    {tr(lang, leader.role, taLeader.role)}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
                    {tr(lang, leader.desc, taLeader.desc)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── JOIN OUR SPIRITUAL FAMILY CTA ───────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white dark:bg-[#070D19] text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg font-medium text-amber-700 dark:text-amber-400 mb-2">
            {tr(lang, 'ஒன்றிணைவோம்', 'Join Us')}
          </p>
          <h2
            className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white mb-4"
            style={{ fontFamily: lang === 'ta' ? 'var(--font-tamil)' : 'var(--font-display)' }}
          >
            {tr(lang, 'Join Our Spiritual Family', ABOUT_TA.ctaHeading)}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            {tr(
              lang,
              'Whether you seek spiritual growth, wish to learn natural living, want to serve the community, or simply want to connect with like-minded souls — Pulipani Siddhar Aadheenam welcomes you with open arms.',
              ABOUT_TA.ctaBody
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/classes"
              className="px-6 py-3 rounded-lg bg-[#0B1324] dark:bg-amber-500 text-white dark:text-slate-950 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-amber-400 transition-colors"
            >
              {tr(lang, 'Explore Classes', 'வகுப்புகளைக் காண்க')}
            </Link>
            <Link
              to="/events"
              className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {tr(lang, 'Upcoming Events', 'வரவிருக்கும் நிகழ்வுகள்')}
            </Link>
            <Link
              to="/donate"
              className="px-6 py-3 rounded-lg bg-amber-500 text-slate-950 text-sm font-semibold hover:bg-amber-400 transition-colors"
            >
              {tr(lang, 'Support Our Mission', 'சேவைக்கு உதவுங்கள்')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
