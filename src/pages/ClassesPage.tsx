import { useEffect, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Check, ChevronDown } from 'lucide-react';
import { COURSES, DISTRICTS, FAQS, IMAGES, SITE_INFO } from '../data/aadheenamData';
import { PageHero, SectionHeading } from '../components/KolamMotif';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { SmartImage } from '../components/SmartImage';
import { useSite } from '../context/SiteContext';
import { COURSES_TA, FAQS_TA, tr } from '../data/translations';

type FilterTab = 'all' | 'online' | 'offline' | 'free';

export default function ClassesPage() {
  const { lang } = useSite();
  const [searchParams] = useSearchParams();
  const initialCourse = searchParams.get('course') ?? '';

  const [filter, setFilter] = useState<FilterTab>('all');
  const [selectedCourse, setSelectedCourse] = useState(initialCourse);
  const [openFaq, setOpenFaq] = useState<string | null>(FAQS[0].id);

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialCourse) setSelectedCourse(initialCourse);
  }, [initialCourse]);

  const filteredCourses = COURSES.filter((course) => {
    if (filter === 'online') return course.formats.includes('Online');
    if (filter === 'offline') return course.formats.includes('Offline');
    if (filter === 'free') return course.fee === 'FREE';
    return true;
  });

  function handleSelectCourse(courseName: string) {
    setSelectedCourse(courseName);
    setStatus('idle');
    const el = document.getElementById('register');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get('_gotcha')) return;

    const payload = {
      name: String(fd.get('name') ?? '').trim(),
      age: String(fd.get('age') ?? '').trim(),
      mobile: String(fd.get('mobile') ?? '').trim(),
      whatsapp: String(fd.get('whatsapp') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      district: String(fd.get('district') ?? '').trim(),
      course: String(fd.get('course') ?? '').trim(),
      format: String(fd.get('format') ?? '').trim(),
      preferredDate: String(fd.get('preferredDate') ?? '').trim(),
      notes: String(fd.get('notes') ?? '').trim(),
    };

    if (!payload.name || !payload.age || !payload.mobile || !payload.whatsapp || !payload.email || !payload.district || !payload.course || !payload.format) {
      setStatus('error');
      setErrorMsg(
        tr(lang, 'Please fill in all required fields marked with *.', '* குறியிட்ட அனைத்து விவரங்களையும் நிரப்பவும்.')
      );
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(json.error ?? 'Registration failed');
      setStatus('success');
      form.reset();
      setSelectedCourse('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : tr(lang, 'Something went wrong. Please try again.', 'ஏதோ தவறு ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.')
      );
    }
  }

  return (
    <main>
      <ReadingProgressBar />
      <PageHero
        tamil={tr(lang, 'ஆன்மீக வகுப்புகள்', 'Spiritual Classes')}
        title={tr(lang, 'Spiritual Classes & Registration', 'ஆன்மீக வகுப்புகள் & பதிவு')}
        subtitle={tr(
          lang,
          'Explore structured Tamil Siddhar yoga, meditation, natural living, Agama Shastra, and children’s programmes.',
          'தமிழ் சித்தர் யோகா, தியானம், இயற்கை வாழ்வியல், ஆகம சாஸ்திரம் மற்றும் குழந்தைகள் ஆன்மீகப் பயிற்சிகளைத் தேர்வு செய்யுங்கள்.'
        )}
        image={IMAGES.yogaMeditation}
        alt="Spiritual classes and meditation hall"
        breadcrumbs={[
          { label: tr(lang, 'Home', 'முகப்பு'), to: '/' },
          { label: tr(lang, 'Classes', 'வகுப்புகள்') },
        ]}
      />

      {/* ── STATS STRIP ─────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 dark:bg-[#0D1526] border-b border-slate-200 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: '6+', label: tr(lang, 'Courses Available', 'வகுப்புகள்') },
            { num: tr(lang, 'FREE', 'இலவசம்'), label: tr(lang, 'Many Courses', 'பல வகுப்புகள்') },
            { num: tr(lang, 'Online & Offline', 'ஆன்லைன் & நேரில்'), label: tr(lang, 'Flexible Formats', 'எளிய முறைகள்') },
            { num: tr(lang, 'Tamil', 'தமிழ்'), label: tr(lang, 'Medium of Instruction', 'பயிற்று மொழி') },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-xl sm:text-2xl font-bold text-amber-700 dark:text-amber-300 tabular-nums">
                {s.num}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-200 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── OUR COURSES ─────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white dark:bg-[#070D19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tamil="எங்கள் வகுப்புகள்"
            english="Our Courses"
            subtitle={tr(
              lang,
              'Choose a programme that fits your stage of spiritual and wellness journey.',
              'உங்கள் ஆன்மீக மற்றும் ஆரோக்கியப் பயணத்திற்கு ஏற்ற வகுப்பைத் தேர்ந்தெடுக்கவும்.'
            )}
          />

          {/* Interactive Filter Bar */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#10192D] border border-slate-200 dark:border-white/10">
              {(
                [
                  { id: 'all', label: tr(lang, 'All Courses', 'அனைத்து வகுப்புகள்') },
                  { id: 'online', label: tr(lang, 'Online', 'ஆன்லைன்') },
                  { id: 'offline', label: tr(lang, 'Offline', 'நேரில்') },
                  { id: 'free', label: tr(lang, 'Free Courses', 'இலவச வகுப்புகள்') },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                    filter === tab.id
                      ? 'bg-white dark:bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const taC = COURSES_TA[course.id];
              const title = tr(lang, course.english, taC?.title ?? course.tamil);
              const tag = tr(lang, course.tag, taC?.tag ?? course.tag);
              const formats = tr(lang, course.formats.replace(',', ' & '), taC?.formats ?? course.formats);
              const duration = tr(lang, course.duration, taC?.duration ?? course.duration);
              const sessions = tr(lang, course.sessions, taC?.sessions ?? course.sessions);
              const fee = tr(lang, course.fee, taC?.fee ?? course.fee);
              const desc = tr(lang, course.desc, taC?.desc ?? course.desc);
              const highlights = lang === 'ta' && taC ? taC.highlights : course.highlights;

              return (
                <article
                  key={course.id}
                  className="rounded-xl overflow-hidden bg-slate-50 dark:bg-[#10192D] border border-slate-200 dark:border-white/10 flex flex-col"
                >
                  <div className="aspect-video overflow-hidden">
                    <SmartImage src={course.image} alt={title} className="w-full h-full object-cover" />
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300 tabular-nums mb-2">
                      <span className="font-semibold text-amber-700 dark:text-amber-300">{tag}</span>
                      <span aria-hidden="true">·</span>
                      <span>{formats}</span>
                      <span aria-hidden="true">·</span>
                      <span>{duration}</span>
                    </div>

                    <p className="text-xs font-medium text-amber-700 dark:text-amber-300 mb-0.5">
                      {lang === 'ta' ? course.english : course.tamil}
                    </p>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-200 leading-relaxed mb-4">
                      {desc}
                    </p>

                    <ul className="space-y-1.5 mb-6 flex-1">
                      {highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                          <Check className="w-4 h-4 text-amber-600 dark:text-amber-300 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-300">{sessions}</p>
                        <p className="text-base font-bold text-slate-900 dark:text-white tabular-nums">{fee}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSelectCourse(course.english)}
                        className="px-4 py-2.5 rounded-lg bg-[#0B1324] dark:bg-amber-500 text-white dark:text-slate-950 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-amber-400 transition-colors whitespace-nowrap"
                      >
                        {tr(lang, 'Register Now', 'பதிவு செய்யுங்கள்')}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── REGISTRATION FORM ───────────────────────────────────────────────── */}
      <section id="register" className="py-20 sm:py-24 bg-slate-50 dark:bg-[#0B1324] transition-colors duration-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tamil="பதிவு செய்யுங்கள்"
            english="Register for a Class"
            subtitle={tr(
              lang,
              'Fill in the form below to register. Our team will contact you on WhatsApp within 24 hours to confirm your batch details and answer any questions.',
              'கீழே உள்ள படிவத்தைப் பூர்த்தி செய்து பதிவு செய்யுங்கள். உங்கள் வகுப்பு நேர விவரங்களை உறுதிப்படுத்த எங்கள் குழுவினர் 24 மணி நேரத்திற்குள் WhatsApp மூலம் தொடர்பு கொள்வர்.'
            )}
          />

          <div className="rounded-2xl p-6 sm:p-10 bg-white dark:bg-[#111C33] border border-slate-200 dark:border-white/10">
            {status === 'success' ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 inline-flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <p className="text-2xl font-semibold text-amber-700 dark:text-amber-300" style={{ fontFamily: 'var(--font-tamil)' }}>
                  பதிவு வெற்றிகரமாக முடிந்தது!
                </p>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {tr(lang, 'Registration Successful!', 'உங்கள் பதிவு வெற்றிகரமாகப் பெறப்பட்டது!')}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-200 max-w-md mx-auto leading-relaxed">
                  {tr(
                    lang,
                    'Thank you for registering. Our team will contact you on your WhatsApp / mobile number within 24 hours to confirm your batch details.',
                    'பதிவு செய்தமைக்கு நன்றி. எங்கள் குழுவினர் 24 மணி நேரத்திற்குள் உங்கள் WhatsApp / மொபைல் எண்ணில் தொடர்பு கொண்டு வகுப்பு விவரங்களை உறுதிப்படுத்துவர்.'
                  )}
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="px-5 py-2.5 rounded-lg bg-amber-500 text-slate-950 text-sm font-semibold hover:bg-amber-400 transition-colors"
                  >
                    {tr(lang, 'Register for Another Course', 'மற்றொரு வகுப்பிற்குப் பதிவு செய்ய')}
                  </button>
                  <Link
                    to="/admin/registrations"
                    className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white text-sm font-medium hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  >
                    {tr(lang, 'View Registrations Portal', 'பதிவுப் பட்டியலைப் பார்க்க')}
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="reg-name" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Name', 'பெயர்')} <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <input
                      id="reg-name"
                      name="name"
                      type="text"
                      required
                      placeholder={tr(lang, 'Your full name', 'உங்கள் பெயர்')}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="reg-age" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Age', 'வயது')} <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <input
                      id="reg-age"
                      name="age"
                      type="number"
                      min={5}
                      max={100}
                      required
                      placeholder={tr(lang, 'Your age', 'உங்கள் வயது')}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="reg-mobile" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Mobile', 'மொபைல் எண்')} <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <input
                      id="reg-mobile"
                      name="mobile"
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="reg-whatsapp" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'WhatsApp Number', 'WhatsApp எண்')} <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <input
                      id="reg-whatsapp"
                      name="whatsapp"
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="reg-email" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Email', 'மின்னஞ்சல்')} <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <input
                      id="reg-email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="reg-district" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'District', 'மாவட்டம்')} <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <select
                      id="reg-district"
                      name="district"
                      required
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">{tr(lang, 'Select District', 'மாவட்டம் தேர்ந்தெடுக்கவும்')}</option>
                      {DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="reg-course" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Course', 'வகுப்பு')} <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <select
                      id="reg-course"
                      name="course"
                      required
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">{tr(lang, 'Select a Course', 'வகுப்பைத் தேர்ந்தெடுக்கவும்')}</option>
                      {COURSES.map((c) => {
                        const taC = COURSES_TA[c.id];
                        return (
                          <option key={c.id} value={c.english}>
                            {tr(lang, `${c.english} — ${c.fee}`, `${taC?.title ?? c.tamil} — ${taC?.fee ?? c.fee}`)}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="reg-format" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Format', 'வகுப்பு முறை')} <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <select
                      id="reg-format"
                      name="format"
                      required
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Online">{tr(lang, 'Online (Zoom / Google Meet)', 'ஆன்லைன் (Zoom / Google Meet)')}</option>
                      <option value="Offline">{tr(lang, 'Offline (Aadheenam Campus, Thalavadi)', 'நேரில் (ஆதீன வளாகம், தாளவாடி)')}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="reg-date" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Preferred Start Date', 'விரும்பிய தொடக்கத் தேதி')}
                    </label>
                    <input
                      id="reg-date"
                      name="preferredDate"
                      type="date"
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="reg-notes" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Additional Notes', 'கூடுதல் குறிப்புகள்')}
                    </label>
                    <textarea
                      id="reg-notes"
                      name="notes"
                      rows={3}
                      placeholder={tr(lang, 'Any questions or special requirements...', 'உங்கள் கேள்விகள் அல்லது சிறப்புத் தேவைகள்...')}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <p className="text-sm text-rose-600 dark:text-rose-400 font-medium">{errorMsg}</p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex-1 py-3 px-6 rounded-lg bg-amber-500 text-slate-950 font-semibold text-sm hover:bg-amber-400 transition-colors disabled:opacity-60"
                  >
                    {status === 'sending'
                      ? tr(lang, 'Submitting...', 'பதிவு செய்கிறோம்...')
                      : tr(lang, 'Register Now', 'பதிவு செய்யுங்கள்')}
                  </button>
                  <a
                    href={`https://wa.me/${SITE_INFO.whatsappNumber}?text=${encodeURIComponent(
                      'I want to register for a class at Pulipani Siddhar Aadheenam'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-6 rounded-lg border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white text-sm font-semibold text-center hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  >
                    {tr(lang, 'WhatsApp Enquiry', 'WhatsApp விசாரணை')}
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS ──────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white dark:bg-[#070D19]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading tamil="அடிக்கடி கேட்கப்படும் கேள்விகள்" english="Frequently Asked Questions" />

          <div className="divide-y divide-slate-200 dark:divide-white/10 border-y border-slate-200 dark:border-white/10">
            {FAQS.map((faq) => {
              const isOpen = openFaq === faq.id;
              const taFaq = FAQS_TA[faq.id];
              return (
                <div key={faq.id}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    className="w-full py-5 flex items-center justify-between gap-4 text-left"
                  >
                    <span className="text-base font-semibold text-slate-900 dark:text-white">
                      {tr(lang, faq.q, taFaq?.q ?? faq.q)}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 dark:text-slate-300 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-amber-600 dark:text-amber-300' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="pb-5 text-sm sm:text-base text-slate-600 dark:text-slate-200 leading-relaxed">
                      {tr(lang, faq.a, taFaq?.a ?? faq.a)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
