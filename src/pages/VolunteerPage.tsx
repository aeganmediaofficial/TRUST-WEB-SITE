import { useState, type FormEvent } from 'react';
import { Check } from 'lucide-react';
import { DISTRICTS, IMAGES, SITE_INFO } from '../data/aadheenamData';
import { PageHero, SectionHeading } from '../components/KolamMotif';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { useSite } from '../context/SiteContext';
import { tr } from '../data/translations';

const SEVA_WINGS = [
  {
    enTitle: 'Annadhanam Kitchen Seva',
    taTitle: 'அன்னதான சேவை',
    enDesc: 'Assist in cooking, serving daily meals to 500+ visitors, and organizing special festival feasts.',
    taDesc: 'தினமும் 500-க்கும் மேற்பட்டோருக்கு உணவு சமைத்தல், பரிமாறுதல் மற்றும் திருவிழா அன்னதான ஏற்பாடுகளில் உதவுதல்.',
  },
  {
    enTitle: 'Medical & Welfare Camps',
    taTitle: 'மருத்துவ & நல முகாம்கள்',
    enDesc: 'Coordinate rural healthcare outreach, elder care visits, and Siddha awareness drives.',
    taDesc: 'கிராமிய மருத்துவ முகாம்கள், முதியோர் பராமரிப்பு மற்றும் சித்த மருத்துவ விழிப்புணர்வுப் பணிகளை ஒருங்கிணைத்தல்.',
  },
  {
    enTitle: 'Temple Restoration & Heritage',
    taTitle: 'கோயில் திருப்பணி',
    enDesc: 'Support temple cleaning, maintenance, and restoration projects across Tamil Nadu.',
    taDesc: 'தமிழ்நாடு முழுவதும் உள்ள பழமையான கோயில்களின் தூய்மை, பராமரிப்பு மற்றும் திருப்பணிகளில் பங்கேற்றல்.',
  },
  {
    enTitle: 'Classes & Outreach Coordination',
    taTitle: 'வகுப்பு ஒருங்கிணைப்பு',
    enDesc: 'Help manage online/offline class schedules, student support, and bilingual Tamil/English materials.',
    taDesc: 'ஆன்லைன் / நேரடி வகுப்பு அட்டவணைகள், மாணவர் வழிகாட்டுதல் மற்றும் தமிழ்/ஆங்கிலக் குறிப்புகளை ஒருங்கிணைத்தல்.',
  },
] as const;

export default function VolunteerPage() {
  const { lang } = useSite();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get('name') ?? '').trim(),
      age: String(fd.get('age') ?? '').trim(),
      mobile: String(fd.get('mobile') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      district: String(fd.get('district') ?? '').trim(),
      wing: String(fd.get('wing') ?? '').trim(),
      availability: String(fd.get('availability') ?? '').trim(),
      notes: String(fd.get('notes') ?? '').trim(),
    };

    if (!payload.name || !payload.age || !payload.mobile || !payload.email || !payload.district || !payload.wing) {
      setStatus('error');
      setErrorMsg(tr(lang, 'Please complete all required fields.', 'அனைத்துத் தேவையான விவரங்களையும் நிரப்பவும்.'));
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(json.error ?? 'Application failed');
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : tr(lang, 'Unable to submit volunteer application.', 'விண்ணப்பத்தைச் சமர்ப்பிக்க முடியவில்லை.')
      );
    }
  }

  return (
    <main>
      <ReadingProgressBar />
      <PageHero
        tamil={tr(lang, 'சேவா மன்றம்', 'Seva Mandram')}
        title={tr(lang, 'Volunteer with Seva Mandram', 'சேவா மன்றத்தில் தன்னார்வலராக இணையுங்கள்')}
        subtitle={tr(
          lang,
          'Join our dedicated community of volunteers serving through Annadhanam, education support, healthcare camps, and temple preservation.',
          'அன்னதானம், கல்வி உதவி, மருத்துவ முகாம்கள் மற்றும் கோயில் திருப்பணி மூலம் சேவையாற்றும் எங்கள் தன்னார்வலர் குழுவில் இணையுங்கள்.'
        )}
        image={IMAGES.annadhanamSeva}
        alt="Volunteers serving Annadhanam"
        breadcrumbs={[
          { label: tr(lang, 'Home', 'முகப்பு'), to: '/' },
          { label: tr(lang, 'Volunteer', 'சேவை') },
        ]}
      />

      <section className="py-20 sm:py-24 bg-white dark:bg-[#070D19]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading tamil="சேவைப் பிரிவுகள்" english="Ways to Serve" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {SEVA_WINGS.map((w, idx) => (
              <div
                key={w.enTitle}
                className="rounded-xl p-6 bg-slate-50 dark:bg-[#10192D] border border-slate-200 dark:border-white/10"
              >
                <p className="text-xs text-slate-500 dark:text-slate-300 tabular-nums mb-2">0{idx + 1}</p>
                <p className="text-xs font-medium text-amber-700 dark:text-amber-300 mb-0.5">
                  {lang === 'ta' ? w.enTitle : w.taTitle}
                </p>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {tr(lang, w.enTitle, w.taTitle)}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-200 leading-relaxed">
                  {tr(lang, w.enDesc, w.taDesc)}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto rounded-2xl p-6 sm:p-10 bg-slate-50 dark:bg-[#0B1324] border border-slate-200 dark:border-white/10">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
              {tr(lang, 'Seva Mandram Registration', 'சேவா மன்றம் பதிவு')}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-200 mb-6">
              {tr(
                lang,
                'Share your availability and preferred area of service. Our coordinators will connect with you shortly.',
                'உங்கள் நேர வசதி மற்றும் விரும்பும் சேவைப் பிரிவைப் பகிருங்கள். எங்கள் ஒருங்கிணைப்பாளர்கள் விரைவில் தொடர்பு கொள்வர்.'
              )}
            </p>

            {status === 'success' ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 inline-flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <p className="text-2xl font-semibold text-amber-700 dark:text-amber-300" style={{ fontFamily: 'var(--font-tamil)' }}>
                  சேவைப் பதிவு வெற்றிகரமாக முடிந்தது!
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-200 max-w-md mx-auto">
                  {tr(
                    lang,
                    'Thank you for stepping forward to serve with Seva Mandram. Our volunteer coordinator will reach out on WhatsApp.',
                    'சேவா மன்றத்துடன் இணைந்து பணியாற்ற முன்வந்தமைக்கு நன்றி. எங்கள் தன்னார்வ ஒருங்கிணைப்பாளர் WhatsApp மூலம் தொடர்பு கொள்வார்.'
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="px-5 py-2.5 rounded-lg bg-amber-500 text-slate-950 text-sm font-semibold hover:bg-amber-400 transition-colors"
                >
                  {tr(lang, 'Submit Another Application', 'மற்றொரு விண்ணப்பம் சமர்ப்பிக்க')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="vol-name" className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Full Name', 'முழு பெயர்')} <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <input
                      id="vol-name"
                      name="name"
                      type="text"
                      required
                      placeholder={tr(lang, 'Your name', 'உங்கள் பெயர்')}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white dark:bg-[#111C33] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="vol-age" className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Age', 'வயது')} <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <input
                      id="vol-age"
                      name="age"
                      type="number"
                      min={16}
                      max={85}
                      required
                      placeholder={tr(lang, 'Age', 'வயது')}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white dark:bg-[#111C33] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="vol-mobile" className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Mobile / WhatsApp', 'மொபைல் / WhatsApp')} <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <input
                      id="vol-mobile"
                      name="mobile"
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white dark:bg-[#111C33] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="vol-email" className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Email', 'மின்னஞ்சல்')} <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <input
                      id="vol-email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white dark:bg-[#111C33] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="vol-district" className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'District', 'மாவட்டம்')} <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <select
                      id="vol-district"
                      name="district"
                      required
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white dark:bg-[#111C33] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">{tr(lang, 'Select District', 'மாவட்டம் தேர்ந்தெடுக்கவும்')}</option>
                      {DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="vol-wing" className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Service Wing', 'சேவைப் பிரிவு')} <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <select
                      id="vol-wing"
                      name="wing"
                      required
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white dark:bg-[#111C33] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">{tr(lang, 'Select Seva Wing', 'சேவைப் பிரிவைத் தேர்ந்தெடுக்கவும்')}</option>
                      {SEVA_WINGS.map((w) => (
                        <option key={w.enTitle} value={w.enTitle}>
                          {tr(lang, w.enTitle, w.taTitle)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="vol-availability" className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                    {tr(lang, 'Availability', 'நேர வசதி')}
                  </label>
                  <select
                    id="vol-availability"
                    name="availability"
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-white dark:bg-[#111C33] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Weekends">{tr(lang, 'Weekends', 'வார இறுதி நாட்கள்')}</option>
                    <option value="Festival & Special Events">{tr(lang, 'Festival & Special Events', 'திருவிழா & சிறப்பு நிகழ்வுகள்')}</option>
                    <option value="Weekdays">{tr(lang, 'Weekdays', 'வார நாட்கள்')}</option>
                    <option value="Remote / Online Coordination">{tr(lang, 'Remote / Online Coordination', 'ஆன்லைன் ஒருங்கிணைப்பு')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="vol-notes" className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                    {tr(lang, 'Skills or Experience (Optional)', 'திறன்கள் அல்லது அனுபவம் (விருப்பம்)')}
                  </label>
                  <textarea
                    id="vol-notes"
                    name="notes"
                    rows={3}
                    placeholder={tr(lang, 'Share any relevant experience or languages...', 'உங்கள் அனுபவம் அல்லது தெரிந்த மொழிகளைப் பகிருங்கள்...')}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-white dark:bg-[#111C33] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {status === 'error' && <p className="text-sm text-rose-600 dark:text-rose-400">{errorMsg}</p>}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex-1 py-3 px-6 rounded-lg bg-amber-500 text-slate-950 font-semibold text-sm hover:bg-amber-400 transition-colors disabled:opacity-60"
                  >
                    {status === 'sending'
                      ? tr(lang, 'Submitting...', 'சமர்ப்பிக்கப்படுகிறது...')
                      : tr(lang, 'Join Seva Mandram', 'சேவா மன்றத்தில் இணைய')}
                  </button>
                  <a
                    href={SITE_INFO.whatsappUrl}
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
    </main>
  );
}
