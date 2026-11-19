import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import { Check } from 'lucide-react';
import { DONATION_FUNDS, IMAGES, SITE_INFO } from '../data/aadheenamData';
import { PageHero, SectionHeading } from '../components/KolamMotif';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { useSite } from '../context/SiteContext';
import { DONATIONS_TA, tr } from '../data/translations';

export default function DonatePage() {
  const { lang } = useSite();
  const [searchParams] = useSearchParams();
  const initialFund = searchParams.get('fund') ?? DONATION_FUNDS[0].id;

  const [selectedFundId, setSelectedFundId] = useState(initialFund);
  const [amount, setAmount] = useState<number>(1500);
  const [frequency, setFrequency] = useState<'One-Time' | 'Monthly'>('One-Time');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const paramFund = searchParams.get('fund');
    if (paramFund && DONATION_FUNDS.some((f) => f.id === paramFund)) {
      setSelectedFundId(paramFund);
    }
  }, [searchParams]);

  const activeFund = DONATION_FUNDS.find((f) => f.id === selectedFundId) ?? DONATION_FUNDS[0];
  const activeFundTitle = tr(lang, activeFund.english, DONATIONS_TA[activeFund.id]?.title ?? activeFund.tamil);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get('name') ?? '').trim();
    const mobile = String(fd.get('mobile') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const pan = String(fd.get('pan') ?? '').trim();

    if (!name || !mobile || !email || amount < 100) {
      setStatus('error');
      setErrorMsg(
        tr(
          lang,
          'Please enter your contact details and a minimum contribution of ₹100.',
          'உங்கள் தொடர்பு விவரங்களையும் குறைந்தபட்சம் ₹100 பங்களிப்புத் தொகையையும் உள்ளிடவும்.'
        )
      );
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fundId: activeFund.id,
          fundTitle: activeFund.english,
          amount,
          frequency,
          name,
          mobile,
          email,
          pan,
        }),
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
          : tr(lang, 'Unable to record contribution pledge.', 'பங்களிப்பைப் பதிவு செய்ய முடியவில்லை.')
      );
    }
  }

  return (
    <main>
      <ReadingProgressBar />
      <PageHero
        tamil={tr(lang, 'எங்கள் நோக்கத்தை ஆதரிக்கவும்', 'Support Our Mission')}
        title={tr(lang, 'Support Our Mission', 'எங்கள் அறப்பணிக்கு ஆதரவளியுங்கள்')}
        subtitle={tr(
          lang,
          'Your generosity sustains daily Annadhanam for 500+ souls, scholarships for 300+ students, healthcare outreach, and ancient temple restoration.',
          'உங்கள் தாராள மனப்பான்மை தினமும் 500+ பேருக்கு அன்னதானம், 300+ மாணவர்களுக்குக் கல்வி உதவி, மருத்துவ முகாம்கள் மற்றும் கோயில் திருப்பணிகளைத் தொடர்ந்து நடத்த உதவுகிறது.'
        )}
        image={IMAGES.annadhanamSeva}
        alt="Daily Annadhanam community meal service"
        breadcrumbs={[
          { label: tr(lang, 'Home', 'முகப்பு'), to: '/' },
          { label: tr(lang, 'Donate', 'நன்கொடை') },
        ]}
      />

      <section className="py-20 sm:py-24 bg-white dark:bg-[#070D19]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading tamil="சேவை நிதிகள்" english="Choose a Charitable Fund" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {DONATION_FUNDS.map((fund) => {
              const active = fund.id === selectedFundId;
              const taF = DONATIONS_TA[fund.id];
              return (
                <button
                  key={fund.id}
                  type="button"
                  onClick={() => {
                    setSelectedFundId(fund.id);
                    setAmount(fund.suggestedAmounts[1]);
                    setStatus('idle');
                  }}
                  className={`text-left rounded-xl p-6 border transition-colors flex flex-col ${
                    active
                      ? 'bg-[#0B1324] dark:bg-[#172542] text-white border-amber-500 ring-1 ring-amber-500/40'
                      : 'bg-slate-50 dark:bg-[#10192D] text-slate-900 dark:text-white border-slate-200 dark:border-white/10 hover:border-amber-500/60'
                  }`}
                >
                  <p className={`text-xs font-medium mb-1 ${active ? 'text-amber-300' : 'text-amber-700 dark:text-amber-300'}`}>
                    {lang === 'ta' ? fund.english : fund.tamil}
                  </p>
                  <h3 className="text-lg font-semibold mb-2">
                    {tr(lang, fund.english, taF?.title ?? fund.tamil)}
                  </h3>
                  <p className={`text-xs leading-relaxed mb-4 flex-1 ${active ? 'text-slate-200' : 'text-slate-600 dark:text-slate-200'}`}>
                    {tr(lang, fund.desc, taF?.desc ?? fund.desc)}
                  </p>
                  <p className={`text-xs font-semibold tabular-nums pt-3 border-t ${active ? 'border-white/15 text-amber-300' : 'border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200'}`}>
                    {tr(lang, 'Target:', 'இலக்கு:')} {tr(lang, fund.target, taF?.target ?? fund.target)}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="max-w-2xl mx-auto rounded-2xl p-6 sm:p-10 bg-slate-50 dark:bg-[#10192D] border border-slate-200 dark:border-white/10">
            {status === 'success' ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 inline-flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <p className="text-2xl font-semibold text-amber-700 dark:text-amber-300" style={{ fontFamily: 'var(--font-tamil)' }}>
                  நன்றி — உங்கள் நன்கொடை பதிவு செய்யப்பட்டது!
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-200 max-w-md mx-auto leading-relaxed">
                  {tr(
                    lang,
                    `Thank you for pledging ₹${amount.toLocaleString('en-IN')} (${frequency}) towards ${activeFund.english}. Our office will share UPI / bank transfer details and receipt on your WhatsApp & email.`,
                    `${activeFundTitle} நிதிக்காக ₹${amount.toLocaleString('en-IN')} (${frequency === 'Monthly' ? 'மாதாந்திர' : 'ஒருமுறை'}) பங்களிப்பைப் பதிவு செய்தமைக்கு நன்றி. UPI / வங்கி விவரங்கள் மற்றும் ரசீது உங்கள் WhatsApp & மின்னஞ்சலில் அனுப்பப்படும்.`
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="px-5 py-2.5 rounded-lg bg-amber-500 text-slate-950 text-sm font-semibold hover:bg-amber-400 transition-colors"
                >
                  {tr(lang, 'Make Another Contribution', 'மற்றொரு பங்களிப்பைச் செய்ய')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
                  <div>
                    <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">
                      {lang === 'ta' ? activeFund.english : activeFund.tamil}
                    </p>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{activeFundTitle}</h3>
                  </div>

                  <div className="inline-flex p-1 rounded-lg bg-slate-200/80 dark:bg-[#0B1324] border border-slate-300 dark:border-white/10 w-fit">
                    {(
                      [
                        { id: 'One-Time', label: tr(lang, 'One-Time', 'ஒருமுறை') },
                        { id: 'Monthly', label: tr(lang, 'Monthly', 'மாதாந்திரம்') },
                      ] as const
                    ).map((freq) => (
                      <button
                        key={freq.id}
                        type="button"
                        onClick={() => setFrequency(freq.id)}
                        className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                          frequency === freq.id
                            ? 'bg-white dark:bg-amber-500 text-slate-950 shadow-sm'
                            : 'text-slate-600 dark:text-slate-200'
                        }`}
                      >
                        {freq.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                    {tr(lang, 'Select or Enter Amount (₹)', 'தொகையைத் தேர்ந்தெடுக்கவும் அல்லது உள்ளிடவும் (₹)')}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
                    {activeFund.suggestedAmounts.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setAmount(preset)}
                        className={`py-2.5 rounded-lg text-sm font-semibold tabular-nums border transition-colors ${
                          amount === preset
                            ? 'bg-[#0B1324] dark:bg-amber-500 text-white dark:text-slate-950 border-transparent'
                            : 'bg-white dark:bg-[#0B1324] text-slate-800 dark:text-slate-200 border-slate-300 dark:border-white/15 hover:border-amber-500'
                        }`}
                      >
                        ₹{preset.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    min={100}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value) || 0)}
                    aria-label="Custom contribution amount in INR"
                    className="w-full px-4 py-2.5 rounded-lg text-sm tabular-nums bg-white dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="don-name" className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Full Name', 'முழு பெயர்')} <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <input
                      id="don-name"
                      name="name"
                      type="text"
                      required
                      placeholder={tr(lang, 'Your name', 'உங்கள் பெயர்')}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="don-mobile" className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Mobile / WhatsApp', 'மொபைல் / WhatsApp')} <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <input
                      id="don-mobile"
                      name="mobile"
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="don-email" className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'Email', 'மின்னஞ்சல்')} <span className="text-rose-500 dark:text-rose-400">*</span>
                    </label>
                    <input
                      id="don-email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="don-pan" className="block text-xs font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                      {tr(lang, 'PAN (Optional, for receipt)', 'PAN எண் (ரசீதுக்காக - விருப்பம்)')}
                    </label>
                    <input
                      id="don-pan"
                      name="pan"
                      type="text"
                      placeholder="ABCDE1234F"
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-white dark:bg-[#0B1324] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {status === 'error' && <p className="text-sm text-rose-600 dark:text-rose-400">{errorMsg}</p>}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex-1 py-3 px-6 rounded-lg bg-amber-500 text-slate-950 font-semibold text-sm hover:bg-amber-400 transition-colors disabled:opacity-60"
                  >
                    {status === 'sending'
                      ? tr(lang, 'Recording Pledge...', 'பதிவு செய்யப்படுகிறது...')
                      : tr(
                          lang,
                          `Proceed to Contribute ₹${amount.toLocaleString('en-IN')}`,
                          `₹${amount.toLocaleString('en-IN')} பங்களிக்கத் தொடரவும்`
                        )}
                  </button>
                  <a
                    href={`https://wa.me/${SITE_INFO.whatsappNumber}?text=${encodeURIComponent(
                      `Vanakkam, I would like to contribute ₹${amount} (${frequency}) to ${activeFund.english}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 rounded-lg border border-slate-300 dark:border-white/20 text-sm font-semibold text-center text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  >
                    {tr(lang, 'WhatsApp Support', 'WhatsApp உதவி')}
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
