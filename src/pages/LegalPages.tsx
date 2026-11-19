import { Link } from 'react-router';
import { SITE_INFO } from '../data/aadheenamData';
import { useSite } from '../context/SiteContext';
import { tr } from '../data/translations';

export function PrivacyPage() {
  const { lang } = useSite();
  return (
    <main className="py-20 bg-white dark:bg-[#070D19]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white">
          {tr(lang, 'Privacy Policy', 'தனியுரிமைக் கொள்கை')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {tr(lang, SITE_INFO.name, SITE_INFO.tamilName)} · {tr(lang, SITE_INFO.addressEnglish, 'மல்லன்குழி, தாளவாடி, தமிழ்நாடு, இந்தியா')}
        </p>
        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            {tr(
              lang,
              'Pulipani Siddhar Aadheenam respects your privacy. Information submitted through our class registration, event RSVP, donation pledge, volunteer application, or enquiry forms is used solely to coordinate spiritual programmes, community seva, and communication with you via WhatsApp, phone, or email.',
              'புலிப்பாணி சித்தர் ஆதீனம் உங்கள் தனியுரிமையை மதிக்கிறது. வகுப்புப் பதிவு, நிகழ்வுப் பங்கேற்பு, நன்கொடை, தன்னார்வலர் விண்ணப்பம் அல்லது விசாரணைப் படிவங்கள் மூலம் சமர்ப்பிக்கப்படும் தகவல்கள் ஆன்மீக நிகழ்ச்சிகள், சமூக சேவை மற்றும் WhatsApp, தொலைபேசி அல்லது மின்னஞ்சல் தொடர்புக்காக மட்டுமே பயன்படுத்தப்படும்.'
            )}
          </p>
          <p>
            {tr(
              lang,
              'We never sell, rent, or disclose devotee or participant information to third-party advertisers. If you wish to update or delete your submitted registration details, please reach us at ',
              'பக்தர்கள் அல்லது பங்கேற்பாளர்களின் தகவல்களை நாங்கள் மூன்றாம் தரப்பினருக்கு ஒருபோதும் விற்பனை செய்யவோ பகிரவோ மாட்டோம். உங்கள் விவரங்களைத் திருத்த அல்லது நீக்க தொடர்பு கொள்ள: '
            )}
            <a href={`mailto:${SITE_INFO.email}`} className="text-amber-700 dark:text-amber-400 underline">
              {SITE_INFO.email}
            </a>{' '}
            ({SITE_INFO.phoneDisplay}).
          </p>
        </div>
        <Link to="/" className="inline-block text-sm font-semibold text-amber-700 dark:text-amber-400 hover:underline">
          ← {tr(lang, 'Return to Home', 'முகப்புப் பக்கத்திற்குச் செல்ல')}
        </Link>
      </div>
    </main>
  );
}

export function TermsPage() {
  const { lang } = useSite();
  return (
    <main className="py-20 bg-white dark:bg-[#070D19]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white">
          {tr(lang, 'Terms of Use', 'பயன்பாட்டு விதிமுறைகள்')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {tr(lang, SITE_INFO.name, SITE_INFO.tamilName)} · {tr(lang, SITE_INFO.addressEnglish, 'மல்லன்குழி, தாளவாடி, தமிழ்நாடு, இந்தியா')}
        </p>
        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            {tr(
              lang,
              'All spiritual teachings, Siddhar literature studies, yoga and meditation sessions, and natural living workshops offered by Pulipani Siddhar Aadheenam are intended for educational, spiritual, and personal wellness guidance rooted in traditional Tamil Siddhar heritage.',
              'புலிப்பாணி சித்தர் ஆதீனத்தால் வழங்கப்படும் அனைத்து ஆன்மீகப் போதனைகள், சித்தர் இலக்கிய ஆய்வுகள், யோகா மற்றும் தியான வகுப்புகள், இயற்கை வாழ்வியல் பயிற்சிகள் ஆகியவை பாரம்பரிய தமிழ் சித்தர் மரபின் அடிப்படையில் கல்வி, ஆன்மீக மற்றும் தனிப்பட்ட நல்வாழ்விற்காக மட்டுமே வழங்கப்படுகின்றன.'
            )}
          </p>
          <p>
            {tr(
              lang,
              'Participants joining physical retreats at our Thalavadi ashram agree to uphold peaceful, respectful conduct aligned with ashram discipline. For questions regarding programmes, orders, or contributions, contact ',
              'தாளவாடி ஆசிரமத்தில் நேரடி முகாம்களில் பங்கேற்பவர்கள் ஆசிரம ஒழுங்குமுறைக்கும் அமைதிக்கும் மதிப்பளிக்க வேண்டும். நிகழ்ச்சிகள், ஆர்டர்கள் அல்லது நன்கொடைகள் குறித்த கேள்விகளுக்கு: '
            )}
            <a href={`mailto:${SITE_INFO.email}`} className="text-amber-700 dark:text-amber-400 underline">
              {SITE_INFO.email}
            </a>
            .
          </p>
        </div>
        <Link to="/" className="inline-block text-sm font-semibold text-amber-700 dark:text-amber-400 hover:underline">
          ← {tr(lang, 'Return to Home', 'முகப்புப் பக்கத்திற்குச் செல்ல')}
        </Link>
      </div>
    </main>
  );
}
