import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import { Calendar, CalendarPlus, Check, Clock, MapPin } from 'lucide-react';
import { IMAGES, SITE_INFO, UPCOMING_EVENTS, type EventItem } from '../data/aadheenamData';
import { PageHero, SectionHeading } from '../components/KolamMotif';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { SmartImage } from '../components/SmartImage';
import { useSite } from '../context/SiteContext';
import { EVENTS_TA, tr } from '../data/translations';

interface EventRsvpItem {
  id: number;
  eventId: string;
  attendees: number;
}

function downloadEventIcs(ev: EventItem) {
  const escapeIcs = (val: string) => val.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;');
  const nowStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Pulipani Siddhar Aadheenam//Events//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${ev.id}@pulipanisiddhar.org`,
    `DTSTAMP:${nowStamp}`,
    `DTSTART;TZID=Asia/Kolkata:${ev.calendarStart}`,
    `DTEND;TZID=Asia/Kolkata:${ev.calendarEnd}`,
    `SUMMARY:${escapeIcs(`${ev.english} (${ev.tamil})`)}`,
    `DESCRIPTION:${escapeIcs(`${ev.desc} Contact: ${SITE_INFO.phoneDisplay}`)}`,
    `LOCATION:${escapeIcs(`${ev.venue}, Mallankuli, Thalavadi, Tamil Nadu`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsLines], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${ev.id}-aadheenam.ics`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function EventsPage() {
  const { lang } = useSite();
  const [searchParams] = useSearchParams();
  const initialEventId = searchParams.get('event') ?? UPCOMING_EVENTS[0].id;

  const [filter, setFilter] = useState<'All' | 'Ceremony' | 'Retreat' | 'Workshop'>('All');
  const [selectedEventId, setSelectedEventId] = useState(initialEventId);
  const [rsvpCounts, setRsvpCounts] = useState<Record<string, number>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function refreshRsvps() {
    try {
      const res = await fetch('/api/events/rsvps');
      if (!res.ok) return;
      const list = (await res.json()) as EventRsvpItem[];
      const totals: Record<string, number> = {};
      for (const item of list) {
        totals[item.eventId] = (totals[item.eventId] ?? 0) + (Number(item.attendees) || 1);
      }
      setRsvpCounts(totals);
    } catch {
      // keep static fallback counts
    }
  }

  useEffect(() => {
    void refreshRsvps();
  }, []);

  useEffect(() => {
    if (searchParams.get('event')) {
      setSelectedEventId(searchParams.get('event') ?? UPCOMING_EVENTS[0].id);
    }
  }, [searchParams]);

  const filteredEvents = UPCOMING_EVENTS.filter((ev) => filter === 'All' || ev.category === filter);
  const selectedEvent = UPCOMING_EVENTS.find((e) => e.id === selectedEventId) ?? UPCOMING_EVENTS[0];

  function getRemainingSpots(ev: EventItem): { booked: number; remaining: number } {
    const booked = rsvpCounts[ev.id] ?? 0;
    const remaining = Math.max(0, ev.spotsLeft - booked);
    return { booked, remaining };
  }

  function handleSelectForRsvp(eventId: string) {
    setSelectedEventId(eventId);
    setStatus('idle');
    const el = document.getElementById('event-rsvp');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get('name') ?? '').trim();
    const mobile = String(fd.get('mobile') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const attendees = Number(fd.get('attendees') ?? 1) || 1;
    const notes = String(fd.get('notes') ?? '').trim();

    if (!name || !mobile || !email) {
      setStatus('error');
      setErrorMsg(tr(lang, 'Please fill in your name, mobile number, and email.', 'உங்கள் பெயர், மொபைல் எண் மற்றும் மின்னஞ்சலை நிரப்பவும்.'));
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/events/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: selectedEvent.id,
          eventTitle: selectedEvent.english,
          name,
          mobile,
          email,
          attendees,
          notes,
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(json.error ?? 'RSVP failed');
      setStatus('success');
      form.reset();
      void refreshRsvps();
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error ? err.message : tr(lang, 'Unable to register for event.', 'நிகழ்விற்குப் பதிவு செய்ய முடியவில்லை.')
      );
    }
  }

  return (
    <main>
      <ReadingProgressBar />
      <PageHero
        tamil={tr(lang, 'பக்தி நிகழ்வுகள்', 'Devotional Events')}
        title={tr(lang, 'Events & Devotional Programmes', 'நிகழ்வுகள் & பக்தி முகாம்கள்')}
        subtitle={tr(
          lang,
          'Participate in sacred Agni Homa ceremonies, forest ashram meditation retreats, and natural living workshops.',
          'புனித அக்னி ஹோமங்கள், வன ஆசிரம தியான முகாம்கள் மற்றும் இயற்கை வாழ்வியல் பயிற்சிகளில் கலந்து கொள்ளுங்கள்.'
        )}
        image={IMAGES.homaCeremony}
        alt="Sacred Homa ceremony at Pulipani Siddhar Aadheenam"
        breadcrumbs={[
          { label: tr(lang, 'Home', 'முகப்பு'), to: '/' },
          { label: tr(lang, 'Events', 'நிகழ்வுகள்') },
        ]}
      />

      <section className="py-20 sm:py-24 bg-white dark:bg-[#070D19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading tamil="வரவிருக்கும் நிகழ்வுகள்" english="Upcoming Gatherings" />

          <div className="flex justify-center mb-10">
            <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#10192D] border border-slate-200 dark:border-white/10">
              {(
                [
                  { id: 'All', label: tr(lang, 'All Events', 'அனைத்து நிகழ்வுகள்') },
                  { id: 'Ceremony', label: tr(lang, 'Ceremony', 'வழிபாடு') },
                  { id: 'Retreat', label: tr(lang, 'Retreat', 'தியான முகாம்') },
                  { id: 'Workshop', label: tr(lang, 'Workshop', 'பயிற்சி') },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                    filter === tab.id
                      ? 'bg-white dark:bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredEvents.map((ev) => {
              const taEv = EVENTS_TA[ev.id];
              const title = tr(lang, ev.english, taEv?.title ?? ev.tamil);
              const cat = tr(lang, ev.category, taEv?.category ?? ev.category);
              const date = tr(lang, ev.date, taEv?.date ?? ev.date);
              const time = tr(lang, ev.time, taEv?.time ?? ev.time);
              const venue = tr(lang, ev.venue, taEv?.venue ?? ev.venue);
              const desc = tr(lang, ev.desc, taEv?.desc ?? ev.desc);
              const { booked, remaining } = getRemainingSpots(ev);

              return (
                <article
                  key={ev.id}
                  className="rounded-xl overflow-hidden bg-slate-50 dark:bg-[#10192D] border border-slate-200 dark:border-white/10 flex flex-col"
                >
                  <div className="aspect-video overflow-hidden">
                    <SmartImage src={ev.image} alt={title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400 tabular-nums mb-2">
                      <span className="font-semibold text-amber-700 dark:text-amber-400">{cat}</span>
                      <span aria-hidden="true">·</span>
                      <span className={remaining === 0 ? 'text-rose-600 dark:text-rose-400 font-semibold' : ''}>
                        {remaining > 0
                          ? `${remaining} ${tr(lang, 'spots open', 'இடங்கள் உள்ளன')}`
                          : tr(lang, 'Waitlist open', 'காத்திருப்புப் பட்டியல்')}
                      </span>
                      {booked > 0 && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>
                            {booked} {tr(lang, 'registered', 'பதிவு')}
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-0.5">
                      {lang === 'ta' ? ev.english : ev.tamil}
                    </p>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 flex-1">
                      {desc}
                    </p>
                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pb-5 mb-5 border-b border-slate-200 dark:border-white/10 tabular-nums">
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>{date}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>{time}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>{venue}</span>
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => handleSelectForRsvp(ev.id)}
                        className="w-full py-2.5 px-4 rounded-lg bg-[#0B1324] dark:bg-amber-500 text-white dark:text-slate-950 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-amber-400 transition-colors whitespace-nowrap"
                      >
                        {tr(lang, 'Reserve Your Seat', 'இடத்தை முன்பதிவு செய்யுங்கள்')}
                      </button>
                      <button
                        type="button"
                        onClick={() => downloadEventIcs(ev)}
                        className="w-full py-2 px-4 rounded-lg border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
                      >
                        <CalendarPlus className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
                        <span>{tr(lang, 'Add to Calendar (.ics)', 'நாட்காட்டியில் சேர் (.ics)')}</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EVENT RSVP FORM ─────────────────────────────────────────────────── */}
      <section id="event-rsvp" className="py-20 sm:py-24 bg-slate-50 dark:bg-[#0B1324] transition-colors duration-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tamil="நிகழ்வில் பங்கேற்க"
            english="Event Registration (RSVP)"
            subtitle={tr(
              lang,
              'Confirm your attendance so our kitchen and ashram team can arrange Annadhanam and seating.',
              'அன்னதானம் மற்றும் இருக்கை ஏற்பாடுகளை எங்கள் குழுவினர் திட்டமிட உங்கள் வருகையை உறுதிப்படுத்துங்கள்.'
            )}
          />

          <div className="rounded-2xl p-6 sm:p-10 bg-white dark:bg-[#111C33] border border-slate-200 dark:border-white/10">
            {status === 'success' ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 inline-flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <p className="text-2xl font-semibold text-amber-700 dark:text-amber-400" style={{ fontFamily: 'var(--font-tamil)' }}>
                  பங்கேற்பு உறுதி செய்யப்பட்டது!
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  {tr(
                    lang,
                    `Your seat for ${selectedEvent.english} (${selectedEvent.date}) has been registered. We look forward to welcoming you.`,
                    `${EVENTS_TA[selectedEvent.id]?.title ?? selectedEvent.tamil} (${EVENTS_TA[selectedEvent.id]?.date ?? selectedEvent.date}) நிகழ்விற்கு உங்கள் இருக்கை பதிவு செய்யப்பட்டது. உங்களை வரவேற்பதில் மகிழ்ச்சி அடைகிறோம்.`
                  )}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => downloadEventIcs(selectedEvent)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white text-sm font-semibold hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  >
                    <CalendarPlus className="w-4 h-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                    <span>{tr(lang, 'Add to Calendar (.ics)', 'நாட்காட்டியில் சேர் (.ics)')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="px-5 py-2.5 rounded-lg bg-amber-500 text-slate-950 text-sm font-semibold hover:bg-amber-400 transition-colors"
                  >
                    {tr(lang, 'Register for Another Event', 'மற்றொரு நிகழ்விற்குப் பதிவு செய்ய')}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label htmlFor="ev-select" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                    {tr(lang, 'Select Event', 'நிகழ்வைத் தேர்ந்தெடுக்கவும்')} <span className="text-rose-500 dark:text-rose-400">*</span>
                  </label>
                  <select
                    id="ev-select"
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {UPCOMING_EVENTS.map((ev) => {
                      const taEv = EVENTS_TA[ev.id];
                      const { remaining } = getRemainingSpots(ev);
                      return (
                        <option key={ev.id} value={ev.id}>
                          {tr(
                            lang,
                            `${ev.english} — ${ev.date} (${remaining} spots left)`,
                            `${taEv?.title ?? ev.tamil} — ${taEv?.date ?? ev.date} (${remaining} இடங்கள்)`
                          )}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ev-name" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Full Name', 'முழு பெயர்')} <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <input
                      id="ev-name"
                      name="name"
                      type="text"
                      required
                      placeholder={tr(lang, 'Your full name', 'உங்கள் முழு பெயர்')}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="ev-mobile" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Mobile / WhatsApp', 'மொபைல் / WhatsApp')} <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <input
                      id="ev-mobile"
                      name="mobile"
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="ev-email" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Email', 'மின்னஞ்சல்')} <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <input
                      id="ev-email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="ev-attendees" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Number of Attendees', 'பங்கேற்பாளர்களின் எண்ணிக்கை')}
                    </label>
                    <input
                      id="ev-attendees"
                      name="attendees"
                      type="number"
                      min={1}
                      max={20}
                      defaultValue={1}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 tabular-nums"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="ev-notes" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                    {tr(lang, 'Additional Notes (Accommodation / Travel)', 'கூடுதல் குறிப்புகள் (தங்குமிடம் / பயணம்)')}
                  </label>
                  <textarea
                    id="ev-notes"
                    name="notes"
                    rows={2}
                    placeholder={tr(lang, 'Any dietary or accommodation requests...', 'உணவு அல்லது தங்குமிடத் தேவைகள்...')}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                      ? tr(lang, 'Confirming...', 'உறுதிப்படுத்தப்படுகிறது...')
                      : tr(lang, 'Confirm Event Attendance', 'நிகழ்வுப் பங்கேற்பை உறுதிப்படுத்தவும்')}
                  </button>
                  <a
                    href={`https://wa.me/${SITE_INFO.whatsappNumber}?text=${encodeURIComponent(
                      `Vanakkam, I would like to register for ${selectedEvent.english} (${selectedEvent.date}).`
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
    </main>
  );
}
