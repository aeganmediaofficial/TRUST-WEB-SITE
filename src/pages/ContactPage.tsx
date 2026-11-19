import { useState, type FormEvent } from 'react';
import { Check, Clock, Compass, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { IMAGES, SITE_INFO, TRAVEL_ROUTES } from '../data/aadheenamData';
import { PageHero, SectionHeading } from '../components/KolamMotif';
import { useSite } from '../context/SiteContext';
import { TRAVEL_TA, tr } from '../data/translations';

export default function ContactPage() {
  const { lang } = useSite();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get('name') ?? '').trim();
    const mobile = String(fd.get('mobile') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const subject = String(fd.get('subject') ?? '').trim();
    const message = String(fd.get('message') ?? '').trim();

    if (!name || !mobile || !email || !message) {
      setStatus('error');
      setErrorMsg(
        tr(
          lang,
          'Please fill in your name, mobile number, email, and message.',
          'உங்கள் பெயர், மொபைல் எண், மின்னஞ்சல் மற்றும் செய்தியை நிரப்பவும்.'
        )
      );
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mobile, email, subject, message }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(json.error ?? 'Submission failed');
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : tr(lang, 'Unable to send enquiry.', 'செய்தியை அனுப்ப முடியவில்லை.')
      );
    }
  }

  return (
    <main>
      <PageHero
        tamil={tr(lang, 'தொடர்பு கொள்ள', 'Contact Us')}
        title={tr(lang, 'Contact Pulipani Siddhar Aadheenam', 'புலிப்பாணி சித்தர் ஆதீனத்தைத் தொடர்பு கொள்ள')}
        subtitle={tr(
          lang,
          'Reach out for spiritual class enquiries, ashram visits, Annadhanam contributions, or heritage restoration support.',
          'ஆன்மீக வகுப்புகள், ஆசிரம வருகை, அன்னதான உதவி அல்லது கோயில் திருப்பணி தொடர்பான விவரங்களுக்குத் தொடர்பு கொள்ளுங்கள்.'
        )}
        image={IMAGES.heroAshram}
        alt="Pulipani Siddhar Aadheenam Thalavadi campus"
        breadcrumbs={[
          { label: tr(lang, 'Home', 'முகப்பு'), to: '/' },
          { label: tr(lang, 'Contact', 'தொடர்பு') },
        ]}
      />

      <section className="py-20 sm:py-24 bg-white dark:bg-[#070D19]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <p className="text-base font-medium text-amber-700 dark:text-amber-400 mb-1">
                  {tr(lang, 'நேரடி தொடர்பு', 'Direct Contact')}
                </p>
                <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
                  {tr(lang, 'Visit or Reach Us', 'நேரில் வர அல்லது தொடர்பு கொள்ள')}
                </h2>
              </div>

              <div className="space-y-5 rounded-2xl p-6 bg-slate-50 dark:bg-[#10192D] border border-slate-200 dark:border-white/10">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-0.5">
                      {tr(lang, 'Address', 'முகவரி')}
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-tamil)' }}>
                      {SITE_INFO.addressTamil}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {tr(lang, SITE_INFO.addressEnglish, 'மல்லன்குழி, தாளவாடி, தமிழ்நாடு, இந்தியா')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-0.5">
                      {tr(lang, 'Phone / WhatsApp', 'தொலைபேசி / WhatsApp')}
                    </p>
                    <a
                      href={SITE_INFO.phoneHref}
                      className="text-sm font-semibold text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 tabular-nums"
                    >
                      {SITE_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-0.5">
                      {tr(lang, 'Email', 'மின்னஞ்சல்')}
                    </p>
                    <a
                      href={`mailto:${SITE_INFO.email}`}
                      className="text-sm font-medium text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400"
                    >
                      {SITE_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-0.5">
                      {tr(lang, 'Ashram Hours', 'ஆசிரம நேரம்')}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 tabular-nums">
                      {tr(lang, 'Daily · 06:00 AM – 08:00 PM', 'தினமும் · காலை 06:00 – இரவு 08:00')}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {tr(lang, 'Annadhanam served daily at 12:30 PM', 'தினமும் மதியம் 12:30 மணிக்கு அன்னதானம்')}
                    </p>
                  </div>
                </div>
              </div>

              <a
                href={SITE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 px-5 rounded-xl bg-[#0B1324] dark:bg-amber-500 text-white dark:text-slate-950 font-semibold text-sm hover:bg-slate-800 dark:hover:bg-amber-400 transition-colors"
              >
                {tr(lang, 'Message on WhatsApp', 'WhatsApp மூலம் செய்தி அனுப்ப')}
              </a>
            </div>

            <div className="lg:col-span-3 rounded-2xl p-6 sm:p-10 bg-slate-50 dark:bg-[#10192D] border border-slate-200 dark:border-white/10">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
                {tr(lang, 'Send an Enquiry', 'விசாரணை அனுப்பவும்')}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                {tr(
                  lang,
                  'We typically respond within 24 hours via WhatsApp or email.',
                  'பொதுவாக 24 மணி நேரத்திற்குள் WhatsApp அல்லது மின்னஞ்சல் மூலம் பதிலளிக்கிறோம்.'
                )}
              </p>

              {status === 'success' ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 inline-flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <p className="text-xl font-semibold text-amber-700 dark:text-amber-400" style={{ fontFamily: 'var(--font-tamil)' }}>
                    செய்தி அனுப்பப்பட்டது!
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    {tr(
                      lang,
                      'Thank you for contacting Pulipani Siddhar Aadheenam. Our team will get back to you shortly.',
                      'புலிப்பாணி சித்தர் ஆதீனத்தைத் தொடர்பு கொண்டமைக்கு நன்றி. எங்கள் குழுவினர் விரைவில் உங்களைத் தொடர்பு கொள்வர்.'
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="px-5 py-2.5 rounded-lg bg-amber-500 text-slate-950 text-sm font-semibold hover:bg-amber-400 transition-colors"
                  >
                    {tr(lang, 'Send Another Message', 'மற்றொரு செய்தி அனுப்ப')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="c-name" className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                        {tr(lang, 'Name', 'பெயர்')} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="c-name"
                        name="name"
                        type="text"
                        required
                        placeholder={tr(lang, 'Your name', 'உங்கள் பெயர்')}
                        className="w-full px-4 py-2.5 rounded-lg text-sm bg-white dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="c-mobile" className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                        {tr(lang, 'Mobile / WhatsApp', 'மொபைல் / WhatsApp')} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="c-mobile"
                        name="mobile"
                        type="tel"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-2.5 rounded-lg text-sm bg-white dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="c-email" className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                        {tr(lang, 'Email', 'மின்னஞ்சல்')} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="c-email"
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-2.5 rounded-lg text-sm bg-white dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="c-subject" className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                        {tr(lang, 'Topic', 'தலைப்பு')}
                      </label>
                      <select
                        id="c-subject"
                        name="subject"
                        className="w-full px-4 py-2.5 rounded-lg text-sm bg-white dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="General Enquiry">{tr(lang, 'General Enquiry', 'பொது விசாரணை')}</option>
                        <option value="Spiritual Classes">{tr(lang, 'Spiritual Classes', 'ஆன்மீக வகுப்புகள்')}</option>
                        <option value="Ashram Visit / Stay">{tr(lang, 'Ashram Visit / Stay', 'ஆசிரம வருகை / தங்குமிடம்')}</option>
                        <option value="Annadhanam & Donations">{tr(lang, 'Annadhanam & Donations', 'அன்னதானம் & நன்கொடை')}</option>
                        <option value="Herbal Products">{tr(lang, 'Herbal Products', 'மூலிகைப் பொருட்கள்')}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-message" className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Message', 'செய்தி')} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="c-message"
                      name="message"
                      rows={4}
                      required
                      placeholder={tr(lang, 'How can we assist you?', 'நாங்கள் உங்களுக்கு எவ்வாறு உதவலாம்?')}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {status === 'error' && <p className="text-sm text-rose-600 dark:text-rose-400">{errorMsg}</p>}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-3 px-6 rounded-lg bg-amber-500 text-slate-950 font-semibold text-sm hover:bg-amber-400 transition-colors disabled:opacity-60"
                  >
                    {status === 'sending'
                      ? tr(lang, 'Sending...', 'அனுப்பப்படுகிறது...')
                      : tr(lang, 'Send Enquiry', 'செய்தியை அனுப்பு')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── ASHRAM VISIT & TRAVEL GUIDE ─────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-slate-50 dark:bg-[#0B1324] border-t border-slate-200 dark:border-white/10 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tamil="வழித்தடம் & பயண வழிகாட்டி"
            english="How to Reach Thalavadi Ashram"
            subtitle={tr(
              lang,
              'Located in the serene Western Ghats plateau of Mallankuli, Thalavadi — easily accessible from Tamil Nadu and Karnataka.',
              'மேற்குத் தொடர்ச்சி மலையின் அமைதியான தாளவாடி மல்லன்குழியில் அமைந்துள்ளது — தமிழ்நாடு மற்றும் கர்நாடகாவிலிருந்து எளிதாக அணுகலாம்.'
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {TRAVEL_ROUTES.map((item) => {
              const taRoute = TRAVEL_TA[item.id];
              return (
                <article
                  key={item.id}
                  className="rounded-xl p-6 bg-white dark:bg-[#111C33] border border-slate-200 dark:border-white/10"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                        {tr(lang, item.origin, taRoute?.origin ?? item.origin)}
                      </h3>
                    </div>
                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 tabular-nums whitespace-nowrap shrink-0">
                      {tr(lang, item.distance, taRoute?.distance ?? item.distance)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {tr(lang, item.route, taRoute?.route ?? item.route)}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="rounded-xl p-6 bg-white dark:bg-[#111C33] border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                {tr(lang, 'Planning a Group Visit or Overnight Ashram Stay?', 'குழு வருகை அல்லது ஆசிரமத் தங்குமிடம் திட்டமிடுகிறீர்களா?')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                {tr(
                  lang,
                  'Please inform us via WhatsApp at least 2 days in advance so we can arrange accommodation and Annadhanam.',
                  'தங்குமிடம் மற்றும் அன்னதான ஏற்பாட்டிற்காகக் குறைந்தது 2 நாட்களுக்கு முன்பே WhatsApp மூலம் தெரியப்படுத்தவும்.'
                )}
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Mallankuli+Thalavadi+Tamil+Nadu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0B1324] dark:bg-amber-500 text-white dark:text-slate-950 text-xs sm:text-sm font-semibold hover:bg-slate-800 dark:hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              <span>{tr(lang, 'Open in Google Maps', 'Google Maps-இல் வழி பார்க்க')}</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
