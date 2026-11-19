export const IMAGES = {
  heroAshram: './src/assets/images/hero_temple_ashram_1795007316512.jpg',
  siddharLineage: './src/assets/images/about_siddhar_lineage_1795007316463.jpg',
  yogaMeditation: './src/assets/images/yoga_meditation_hall_1795007317190.jpg',
  herbalLiving: './src/assets/images/herbal_siddha_living_1795007316663.jpg',
  annadhanamSeva: './src/assets/images/annadhanam_community_seva_1795007317965.jpg',
  homaCeremony: './src/assets/images/sacred_homa_ceremony_1795007319325.jpg',
  templeHeritage: './src/assets/images/temple_gopuram_heritage_1795007318668.jpg',
  sacredDiya: './src/assets/images/sacred_brass_diya_1795007319457.jpg',
} as const;

export const SITE_INFO = {
  name: 'Pulipani Siddhar Aadheenam',
  tamilName: 'புலிப்பாணி சித்தர் ஆதீனம்',
  logoUrl: './assets/aistudio/Picsart_26-10-14_19-29-45-183_64d9621d.png',
  invocation: 'ஓம் நமச்சிவாய',
  blessingMotto: '"அன்பும் • அறிவும் • ஞானமும் எங்கும் நிலைக்கட்டும்"',
  taglineTamil: 'ஆன்மீகம், இயற்கை, மனிதநேயம்',
  taglineEnglish: 'Spirituality, Nature, Humanity',
  heroDescription:
    'ஆன்மீக வளர்ச்சி, இயற்கை வாழ்வியல் மற்றும் மனிதநேய சேவைகள் மூலம் அமைதியான, அர்த்தமுள்ள வாழ்க்கையை நோக்கி ஒன்றிணைவோம்.',
  addressTamil: 'புலிப்பாணி சித்தர் ஆதீனம்',
  addressEnglish: 'Mallankuli, Thalavadi, Tamil Nadu, India',
  phoneDisplay: '+91 9385305844',
  phoneHref: 'tel:+919385305844',
  whatsappNumber: '919385305844',
  whatsappUrl:
    'https://wa.me/919385305844?text=Vanakkam%2C%20I%20would%20like%20to%20enquire%20about%20Pulipani%20Siddhar%20Aadheenam.',
  email: 'pulipanisiddharaadheenam@gmail.com',
  social: {
    facebookUrl: 'https://www.facebook.com/pulipanisiddharaadheenam',
    instagramUrl: 'https://www.instagram.com/pulipanisiddharaadheenam',
    youtubeUrl: 'https://www.youtube.com/@pulipanisiddharaadheenam',
  },
} as const;

export const STATS = [
  { num: '18+', label: 'Years of Service', tamil: 'ஆண்டுகள் சேவை' },
  { num: '5,000+', label: 'Lives Touched', tamil: 'பயனடைந்த உயிர்கள்' },
  { num: '200+', label: 'Programs Conducted', tamil: 'நிகழ்ச்சிகள்' },
  { num: '12+', label: 'Temples & Initiatives', tamil: 'கோயில்கள் & சேவைகள்' },
] as const;

export interface ActivityItem {
  id: string;
  tamil: string;
  english: string;
  desc: string;
  href: string;
  image: string;
}

export const HOME_ACTIVITIES: ActivityItem[] = [
  {
    id: 'activity-classes',
    tamil: 'ஆன்மீக வகுப்புகள்',
    english: 'Spiritual Classes',
    desc: 'Structured online and in-person Siddhar philosophy, Thirumandiram, and spiritual guidance in Tamil.',
    href: '/classes',
    image: IMAGES.siddharLineage,
  },
  {
    id: 'activity-meditation',
    tamil: 'யோகா & தியானம்',
    english: 'Yoga & Meditation',
    desc: 'Authentic Siddhar asanas, pranayama, and guided inner stillness practices for physical and mental clarity.',
    href: '/classes',
    image: IMAGES.yogaMeditation,
  },
  {
    id: 'activity-nature',
    tamil: 'இயற்கை வாழ்வியல்',
    english: 'Natural Living',
    desc: 'Siddha diet principles, medicinal herbs, detoxification, and living in harmony with nature.',
    href: '/classes',
    image: IMAGES.herbalLiving,
  },
  {
    id: 'activity-events',
    tamil: 'பக்தி நிகழ்வுகள்',
    english: 'Devotional Events',
    desc: 'Sacred Agni Homa ceremonies, seasonal meditation retreat camps, and traditional Siddhar festivals.',
    href: '/events',
    image: IMAGES.homaCeremony,
  },
  {
    id: 'activity-temple',
    tamil: 'கோயில் வளர்ச்சி',
    english: 'Temple Development',
    desc: 'Restoration, renovation, and preservation of ancient Tamil temples and sacred heritage sites.',
    href: '/about',
    image: IMAGES.templeHeritage,
  },
  {
    id: 'activity-annadhanam',
    tamil: 'அன்னதானம்',
    english: 'Annadhanam',
    desc: 'Daily wholesome free meals served to pilgrims, elders, and underprivileged families.',
    href: '/donate',
    image: IMAGES.annadhanamSeva,
  },
  {
    id: 'activity-education',
    tamil: 'கல்வி உதவி',
    english: 'Education Support',
    desc: 'Scholarships, school books, uniforms, and mentoring for over 300 deserving students every year.',
    href: '/donate',
    image: IMAGES.siddharLineage,
  },
  {
    id: 'activity-welfare',
    tamil: 'சமூக சேவை',
    english: 'Social Welfare',
    desc: 'Free medical camps, elder care, rural outreach, and disaster relief across Tamil Nadu.',
    href: '/volunteer',
    image: IMAGES.annadhanamSeva,
  },
  {
    id: 'activity-products',
    tamil: 'எங்கள் பொருட்கள்',
    english: 'Our Products',
    desc: 'Traditional Siddha herbal powders, spiritual books, brass lamps, and pure Western Ghats forest honey.',
    href: '/store',
    image: IMAGES.sacredDiya,
  },
];

export interface EventItem {
  id: string;
  tamil: string;
  english: string;
  date: string;
  time: string;
  venue: string;
  category: 'Ceremony' | 'Retreat' | 'Workshop';
  spotsLeft: number;
  calendarStart: string;
  calendarEnd: string;
  desc: string;
  image: string;
}

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 'sacred-homa',
    tamil: 'யாக ஹோமம்',
    english: 'Sacred Homa Ceremony',
    date: 'Nov 15, 2026',
    time: '06:00 AM – 11:30 AM',
    venue: 'Aadheenam, Tamil Nadu',
    category: 'Ceremony',
    spotsLeft: 45,
    calendarStart: '20261115T060000',
    calendarEnd: '20261115T113000',
    desc: 'Traditional Siddhar Agni Homa ceremony for universal peace, clarity, and inner harmony, followed by community Annadhanam.',
    image: IMAGES.homaCeremony,
  },
  {
    id: 'meditation-retreat',
    tamil: 'தியான முகாம்',
    english: 'Meditation Retreat Camp',
    date: 'Dec 1–3, 2026',
    time: '3 Days Residential',
    venue: 'Forest Ashram, Tamil Nadu',
    category: 'Retreat',
    spotsLeft: 22,
    calendarStart: '20261201T060000',
    calendarEnd: '20261203T180000',
    desc: 'Three-day silent meditation and pranayama immersion nestled in the tranquil Western Ghats foothills of Thalavadi.',
    image: IMAGES.yogaMeditation,
  },
  {
    id: 'natural-living-workshop',
    tamil: 'இயற்கை வாழ்வியல் பயிற்சி',
    english: 'Natural Living Workshop',
    date: 'Dec 20, 2026',
    time: '09:30 AM – 04:30 PM',
    venue: 'Aadheenam Campus',
    category: 'Workshop',
    spotsLeft: 30,
    calendarStart: '20261220T093000',
    calendarEnd: '20261220T163000',
    desc: 'Hands-on training in Siddha medicinal herbs, daily dietary discipline, natural remedies, and chemical-free living.',
    image: IMAGES.herbalLiving,
  },
];

export interface CourseItem {
  id: string;
  tamil: string;
  english: string;
  tag: string;
  formats: string;
  duration: string;
  sessions: string;
  fee: string;
  desc: string;
  highlights: string[];
  image: string;
}

export const COURSES: CourseItem[] = [
  {
    id: 'yoga-meditation',
    tamil: 'யோகா & தியானம்',
    english: 'Yoga & Meditation',
    tag: 'Most Popular',
    formats: 'Online,Offline',
    duration: '3 Months',
    sessions: '3 sessions/week',
    fee: 'FREE',
    desc: 'A comprehensive course covering Siddhar yoga postures (asanas), pranayama (breathing techniques), and deep meditation practices rooted in the Tamil Siddhar tradition. Suitable for all levels.',
    highlights: [
      'Siddhar asanas & pranayama',
      'Guided meditation sessions',
      'Siddhar philosophy & texts',
      'Certificate on completion',
    ],
    image: IMAGES.yogaMeditation,
  },
  {
    id: 'natural-living',
    tamil: 'இயற்கை வாழ்வியல்',
    english: 'Natural Living & Siddha Medicine',
    tag: 'New Batch',
    formats: 'Online,Offline',
    duration: '2 Months',
    sessions: '2 sessions/week',
    fee: '₹500',
    desc: 'Learn the Siddhar way of natural living — Siddha diet principles, medicinal plants, herbal preparations, detoxification, and a lifestyle in harmony with nature. Includes hands-on herbal workshop.',
    highlights: [
      'Siddha diet & nutrition',
      'Medicinal plant identification',
      'Herbal preparation workshop',
      'Detox & cleansing protocols',
    ],
    image: IMAGES.herbalLiving,
  },
  {
    id: 'siddhar-philosophy',
    tamil: 'சித்தர் தத்துவம்',
    english: 'Siddhar Philosophy & Literature',
    tag: 'Online Only',
    formats: 'Online',
    duration: '4 Months',
    sessions: '2 sessions/week',
    fee: 'FREE',
    desc: 'An in-depth study of Tamil Siddhar literature — the Thirumandiram, Siddhar Padalgal, and the philosophical teachings of the 18 Siddhars. Conducted in Tamil with English notes.',
    highlights: [
      'Thirumandiram study',
      '18 Siddhars & their teachings',
      'Tamil Siddhar poetry',
      'Spiritual philosophy',
    ],
    image: IMAGES.siddharLineage,
  },
  {
    id: 'temple-rituals',
    tamil: 'ஆகம சாஸ்திரம்',
    english: 'Agama Shastra & Temple Rituals',
    tag: 'Offline Only',
    formats: 'Offline',
    duration: '6 Months',
    sessions: '1 session/week',
    fee: '₹1000',
    desc: 'A structured course on Tamil Agama Shastra — the sacred science of temple construction, rituals, puja procedures, and the spiritual significance of temple worship. For serious devotees.',
    highlights: [
      'Agama Shastra texts',
      'Puja procedures & mantras',
      'Temple architecture basics',
      'Practical ritual training',
    ],
    image: IMAGES.templeHeritage,
  },
  {
    id: 'kids-spirituality',
    tamil: 'குழந்தைகள் ஆன்மீகம்',
    english: "Children's Spiritual Programme",
    tag: 'Ages 8–16',
    formats: 'Online,Offline',
    duration: '3 Months',
    sessions: '2 sessions/week',
    fee: 'FREE',
    desc: 'A fun and engaging spiritual programme for children aged 8–16. Covers simple yoga, meditation, Tamil Siddhar stories, moral values, and nature awareness. Conducted in Tamil.',
    highlights: [
      'Simple yoga & meditation',
      'Siddhar stories & values',
      'Nature awareness activities',
      'Tamil cultural heritage',
    ],
    image: IMAGES.heroAshram,
  },
  {
    id: 'advanced-yoga',
    tamil: 'உயர் நிலை யோகா',
    english: 'Advanced Siddhar Yoga',
    tag: 'Prerequisites Required',
    formats: 'Offline',
    duration: '6 Months',
    sessions: '3 sessions/week',
    fee: '₹2000',
    desc: 'An advanced programme for practitioners who have completed the basic Yoga & Meditation course. Covers Kundalini yoga, advanced pranayama, Siddhar mudras, and deeper meditation techniques.',
    highlights: [
      'Kundalini yoga practices',
      'Advanced pranayama',
      'Siddhar mudras & bandhas',
      'Deep meditation techniques',
    ],
    image: IMAGES.homaCeremony,
  },
];

export interface ProductItem {
  id: string;
  tamil: string;
  name: string;
  category: 'Herbal' | 'Books' | 'Sacred Items' | 'Natural Food';
  price: number;
  unit: string;
  desc: string;
  image: string;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: 'herbal-powder',
    tamil: 'சித்தர் மூலிகை பொடி',
    name: 'Siddhar Herbal Powder',
    category: 'Herbal',
    price: 350,
    unit: '200g Jar',
    desc: 'Traditional stone-ground herbal chooranam prepared according to classical Siddha texts using sun-dried forest botanicals.',
    image: IMAGES.herbalLiving,
  },
  {
    id: 'teachings-book',
    tamil: 'ஆன்மீக போதனை நூல்',
    name: 'Spiritual Teachings Book',
    category: 'Books',
    price: 180,
    unit: '240 Pages · Tamil & English',
    desc: 'A curated compendium of Pulipani Siddhar verses, meditation reflections, and practical natural living guidance.',
    image: IMAGES.siddharLineage,
  },
  {
    id: 'brass-diya',
    tamil: 'பஞ்சலோக குத்துவிளக்கு',
    name: 'Sacred Brass Diya Lamp',
    category: 'Sacred Items',
    price: 650,
    unit: 'Handcrafted Solid Brass',
    desc: 'Traditional South Indian temple-grade brass Kuthu Vilakku lamp crafted by artisan metalworkers for daily prayer.',
    image: IMAGES.sacredDiya,
  },
  {
    id: 'forest-honey',
    tamil: 'மலைத்தேன் (500 கிராம்)',
    name: 'Forest Honey (500g)',
    category: 'Natural Food',
    price: 420,
    unit: '500g Raw Unfiltered',
    desc: 'Pure, ethically harvested wildflower forest honey sourced from the pristine Thalavadi hills of the Western Ghats.',
    image: IMAGES.herbalLiving,
  },
];

export const SOCIAL_MISSIONS = [
  {
    id: 'annadhanam',
    tamil: 'அன்னதானம்',
    english: 'Annadhanam',
    desc: 'Daily free meals served to the needy, pilgrims, and underprivileged communities across Tamil Nadu.',
    impact: '500+ fed daily',
    image: IMAGES.annadhanamSeva,
  },
  {
    id: 'education',
    tamil: 'கல்வி உதவி',
    english: 'Education Support',
    desc: 'Scholarships, books, uniforms, and mentoring for deserving school and college students.',
    impact: '300+ students',
    image: IMAGES.siddharLineage,
  },
  {
    id: 'welfare',
    tamil: 'சமூக நலன்',
    english: 'Community Welfare',
    desc: 'Healthcare camps, elder care, disaster relief, and support for marginalised communities.',
    impact: '1,000+ families',
    image: IMAGES.herbalLiving,
  },
  {
    id: 'temple',
    tamil: 'கோயில் வளர்ச்சி',
    english: 'Temple Development',
    desc: 'Restoration, construction, and preservation of ancient Tamil temples and sacred heritage sites.',
    impact: '12+ temples',
    image: IMAGES.templeHeritage,
  },
] as const;

export const DONATION_FUNDS = [
  {
    id: 'annadhanam-fund',
    tamil: 'அன்னதான நிதி',
    english: 'Annadhanam Fund',
    desc: 'Your contribution feeds hundreds of hungry souls every day. No one should sleep hungry.',
    target: '₹5,00,000 / month',
    suggestedAmounts: [500, 1500, 3000, 5000],
  },
  {
    id: 'education-fund',
    tamil: 'கல்வி நிதி',
    english: 'Education Fund',
    desc: 'Help a deserving child complete their education. Every rupee builds a brighter future.',
    target: '₹2,00,000 / year',
    suggestedAmounts: [1000, 2500, 5000, 10000],
  },
  {
    id: 'temple-fund',
    tamil: 'கோயில் நிதி',
    english: 'Temple Development',
    desc: 'Restore and build sacred spaces that preserve Tamil heritage for future generations.',
    target: '₹10,00,000',
    suggestedAmounts: [1000, 5000, 11000, 25000],
  },
  {
    id: 'welfare-fund',
    tamil: 'சமூக நலன் நிதி',
    english: 'Social Welfare Fund',
    desc: 'Support healthcare camps, elder care, and emergency relief for vulnerable communities.',
    target: '₹3,00,000 / year',
    suggestedAmounts: [500, 2000, 5000, 10000],
  },
] as const;

export const GALLERY_ITEMS = [
  {
    id: 'g1',
    title: 'Aadheenam Forest Mandapam at Dawn',
    tamil: 'ஆதீன வன மண்டபம்',
    category: 'Ashram & Temples',
    image: IMAGES.heroAshram,
  },
  {
    id: 'g2',
    title: 'Morning Siddhar Yoga & Meditation',
    tamil: 'காலை தியானப் பயிற்சி',
    category: 'Classes & Retreats',
    image: IMAGES.yogaMeditation,
  },
  {
    id: 'g3',
    title: 'Sacred Agni Homa Ceremony',
    tamil: 'புனித யாக ஹோமம்',
    category: 'Events & Ceremonies',
    image: IMAGES.homaCeremony,
  },
  {
    id: 'g4',
    title: 'Daily Annadhanam Community Meal',
    tamil: 'தினசரி அன்னதான சேவை',
    category: 'Humanitarian Seva',
    image: IMAGES.annadhanamSeva,
  },
  {
    id: 'g5',
    title: 'Restored Ancient Dravidian Temple',
    tamil: 'பழமையான கோயில் திருப்பணி',
    category: 'Ashram & Temples',
    image: IMAGES.templeHeritage,
  },
  {
    id: 'g6',
    title: 'Olai Chuvadi & Siddha Medicinal Preparation',
    tamil: 'ஓலைச்சுவடி & சித்த மருத்துவம்',
    category: 'Classes & Retreats',
    image: IMAGES.siddharLineage,
  },
  {
    id: 'g7',
    title: 'Traditional Herbal Chooranam & Forest Honey',
    tamil: 'இயற்கை மூலிகைத் தயாரிப்பு',
    category: 'Humanitarian Seva',
    image: IMAGES.herbalLiving,
  },
  {
    id: 'g8',
    title: 'Evening Deeparadhana Brass Lamp',
    tamil: 'சந்தியா தீப வழிபாடு',
    category: 'Events & Ceremonies',
    image: IMAGES.sacredDiya,
  },
] as const;

export const TESTIMONIALS = [
  {
    id: 't1',
    quote:
      'The meditation classes at Pulipani Siddhar Aadheenam transformed my life. The teachings are rooted in authentic Siddhar wisdom and delivered with deep compassion.',
    name: 'Karthikeyan R.',
    role: 'Devotee, Coimbatore',
  },
  {
    id: 't2',
    quote:
      'அன்னதான சேவை மிகவும் அருமையாக நடைபெறுகிறது. ஆதீனத்தின் சேவை மனப்பான்மை என்னை மிகவும் ஈர்க்கிறது.',
    name: 'Meenakshi S.',
    role: 'Volunteer, Chennai',
  },
  {
    id: 't3',
    quote:
      'The natural living workshops opened my eyes to the wisdom of our ancestors. I have completely changed my diet and lifestyle following the Siddhar way.',
    name: 'Suresh M.',
    role: 'Participant, Madurai',
  },
] as const;

export const ABOUT_CONTENT = {
  vision: {
    label: 'நமது நோக்கம் — Our Vision',
    tamil:
      'ஆன்மீக விழிப்புணர்வு, இயற்கை ஆரோக்கியம் மற்றும் மனிதநேயம் கொண்ட ஒரு சமூகத்தை உருவாக்குவதே எங்கள் நோக்கம்.',
    english:
      'To create a spiritually awakened, naturally healthy, and compassionately united society — rooted in the timeless wisdom of the Tamil Siddhar tradition.',
  },
  mission: {
    label: 'நமது இலக்கு — Our Mission',
    tamil:
      'தமிழ் சித்தர்களின் உண்மையான போதனைகளை ஆன்மீக வகுப்புகள், இயற்கை வாழ்வியல் பயிற்சி, மனிதநேய சேவை மற்றும் கோயில் வளர்ச்சி மூலம் பரப்புவதே எங்கள் இலக்கு.',
    english:
      'To spread the authentic teachings of Tamil Siddhars through spiritual classes, natural living programmes, humanitarian service, and temple development — making the Siddhar path accessible to all.',
  },
  pillars: [
    {
      tamil: 'ஆன்மீகம்',
      english: 'Spirituality',
      desc: 'Rooted in authentic Tamil Siddhar wisdom, we guide seekers towards inner awakening through meditation, yoga, and sacred teachings.',
    },
    {
      tamil: 'இயற்கை',
      english: 'Nature',
      desc: 'We champion natural living — Siddhar-prescribed diet, herbal medicine, and a lifestyle in harmony with the rhythms of the earth.',
    },
    {
      tamil: 'மனிதநேயம்',
      english: 'Humanity',
      desc: 'Compassionate service is our dharma. From Annadhanam to education support, we serve the needy with love and dedication.',
    },
    {
      tamil: 'கோயில் பாரம்பரியம்',
      english: 'Temple Heritage',
      desc: 'We preserve and restore ancient Tamil temples, keeping alive the sacred architectural and cultural legacy of our ancestors.',
    },
  ],
  activities: [
    {
      id: 'natural-living',
      tamil: 'இயற்கை வாழ்வியல்',
      english: 'Natural Living & Siddhar Medicine',
      desc: 'Our natural living programmes draw directly from the Siddhar tradition — teaching participants about medicinal plants, Siddha diet principles, detoxification, and a lifestyle free from chemical dependency. Workshops are conducted both at the Aadheenam campus and in villages across Tamil Nadu, empowering communities to return to nature.',
      image: IMAGES.herbalLiving,
    },
    {
      id: 'humanitarian',
      tamil: 'மனிதநேய சேவை',
      english: 'Humanitarian Service',
      desc: 'Annadhanam (free meals), education scholarships, healthcare camps, elder care, and disaster relief are the pillars of our humanitarian mission. We believe that serving the hungry and the helpless is the highest form of worship. Over 500 people receive free meals daily through our Annadhanam initiative, and more than 300 students receive educational support every year.',
      image: IMAGES.annadhanamSeva,
    },
    {
      id: 'temple-heritage',
      tamil: 'கோயில் வளர்ச்சி',
      english: 'Temple Development & Heritage',
      desc: 'Tamil Nadu is home to thousands of ancient temples, many of which are in a state of neglect. Pulipani Siddhar Aadheenam has taken up the sacred responsibility of restoring, renovating, and reviving these temples. We have contributed to the development of over 12 temples, preserving the architectural grandeur and spiritual energy of these sacred spaces for future generations.',
      image: IMAGES.templeHeritage,
    },
  ],
  leadership: [
    {
      name: 'Pulipani Siddhar',
      role: 'Patron Saint & Spiritual Founder',
      desc: 'The Aadheenam is established in the name and lineage of Pulipani Siddhar — one of the 18 Tamil Siddhars revered for his mastery of yoga, medicine, and spiritual wisdom. His teachings form the philosophical foundation of all our activities.',
    },
    {
      name: 'Aadheena Gurumahan',
      role: 'Spiritual Head (Aadheenakarthar)',
      desc: 'The present Aadheenakarthar carries forward the Siddhar lineage with deep devotion and tireless service. Under his guidance, the Aadheenam has grown into a vibrant centre of spiritual learning and social service, touching thousands of lives across Tamil Nadu.',
    },
    {
      name: 'Seva Mandram',
      role: 'Volunteer & Service Wing',
      desc: 'A dedicated team of volunteers and trustees who manage the day-to-day operations of the Aadheenam — from organising events and classes to running the Annadhanam kitchen and coordinating welfare programmes.',
    },
  ],
} as const;

export const FAQS = [
  {
    id: 'faq1',
    q: 'Are the classes really free?',
    a: 'Yes — Yoga & Meditation, Siddhar Philosophy, and Children’s Spiritual Programme are completely free. Some advanced courses have a nominal fee to cover materials and instructor costs.',
  },
  {
    id: 'faq2',
    q: 'Can I join online from outside Tamil Nadu?',
    a: 'Absolutely. Our online classes are open to Tamil-speaking participants from anywhere in the world. All you need is a stable internet connection.',
  },
  {
    id: 'faq3',
    q: 'What language are the classes conducted in?',
    a: 'All classes are conducted primarily in Tamil. Some courses provide supplementary notes in English.',
  },
  {
    id: 'faq4',
    q: 'How will I receive class details after registration?',
    a: 'Our team will contact you on your WhatsApp number within 24 hours of registration to share batch timings, Zoom/Google Meet links (for online), and venue details (for offline).',
  },
  {
    id: 'faq5',
    q: 'Is there a certificate on completion?',
    a: 'Yes, certificates are issued on successful completion of the Yoga & Meditation and Advanced Siddhar Yoga courses. Other courses provide a participation acknowledgement.',
  },
  {
    id: 'faq6',
    q: 'Can children join the adult yoga classes?',
    a: 'Children aged 8–16 should join the dedicated Children’s Spiritual Programme. Adults (17+) can join the regular Yoga & Meditation course.',
  },
] as const;

export const DISTRICTS = [
  'Chennai',
  'Coimbatore',
  'Madurai',
  'Tiruchirappalli',
  'Salem',
  'Tirunelveli',
  'Erode',
  'Vellore',
  'Thoothukudi',
  'Dindigul',
  'Thanjavur',
  'Ranipet',
  'Sivaganga',
  'Virudhunagar',
  'Namakkal',
  'Karur',
  'Nagapattinam',
  'Cuddalore',
  'Villupuram',
  'Kancheepuram',
  'Tiruvannamalai',
  'Dharmapuri',
  'Krishnagiri',
  'Perambalur',
  'Ariyalur',
  'Pudukkottai',
  'Ramanathapuram',
  'Tenkasi',
  'Tiruppur',
  'Nilgiris',
  'Kallakurichi',
  'Chengalpattu',
  'Tirupattur',
  'Mayiladuthurai',
  'Other',
] as const;

export const DAILY_SCHEDULE = [
  {
    id: 'brahmamuhurtham',
    time: '05:00 AM – 06:00 AM',
    english: 'Brahmamuhurtham Silent Meditation',
    tamil: 'பிரம்மமுகூர்த்த மௌன தியானம்',
    note: 'Sanctuary & Forest Mandapam',
  },
  {
    id: 'morning-puja',
    time: '06:15 AM – 08:00 AM',
    english: 'Siddhar Yoga, Pranayama & Morning Puja',
    tamil: 'சித்தர் யோகா, பிராணாயாமம் & காலை பூஜை',
    note: 'Open to all visitors & students',
  },
  {
    id: 'annadhanam',
    time: '12:30 PM – 02:00 PM',
    english: 'Daily Annadhanam (Free Sacred Meal)',
    tamil: 'தினசரி அன்னதான சேவை',
    note: '500+ devotees & villagers served daily',
  },
  {
    id: 'herbal-seva',
    time: '03:30 PM – 05:30 PM',
    english: 'Siddha Herbal Care & Scriptural Study',
    tamil: 'சித்த மூலிகை சேவை & திருமுறை / திருமந்திரப் பாடம்',
    note: 'Herbal consultation & community seva',
  },
  {
    id: 'deeparadhana',
    time: '06:00 PM – 07:15 PM',
    english: 'Sandhya Deeparadhana & Siddhar Chants',
    tamil: 'சந்தியா தீபாராதனை & சித்தர் பாடல்கள்',
    note: 'Evening lamp lighting at sanctum',
  },
  {
    id: 'night-silence',
    time: '08:30 PM Onwards',
    english: 'Evening Rest & Ashram Silence',
    tamil: 'இரவு அமைதி நேரம் (மௌனம்)',
    note: 'Restful quiet across ashram grounds',
  },
] as const;

export const MONTHLY_OBSERVANCES = [
  {
    id: 'pournami',
    cycle: 'Full Moon Day',
    english: 'Pournami Special Puja & Night Meditation',
    tamil: 'பௌர்ணமி சிறப்பு பூஜை & இரவு தியானம்',
    desc: 'Monthly full-moon lamp lighting, sacred chants, and special community Annadhanam.',
  },
  {
    id: 'amavasai',
    cycle: 'New Moon Day',
    english: 'Amavasai Agni Homa & Pitru Seva',
    tamil: 'அமாவாசை அக்னி ஹோமம் & பித்ரு சேவை',
    desc: 'Morning Vedic and Siddhar fire offering dedicated to ancestral blessings and inner purification.',
  },
  {
    id: 'guru-puja',
    cycle: 'Monthly Ayilyam / Guru Nakshatra',
    english: 'Pulipani Siddhar Guru Puja',
    tamil: 'புலிப்பாணி சித்தர் குரு பூஜை',
    desc: 'Devotional abhishekam, Siddhar Padalgal recitation, and herbal prasad distribution.',
  },
] as const;

export const TRAVEL_ROUTES = [
  {
    id: 'sathy',
    origin: 'Sathyamangalam',
    distance: '42 km · ~1 hr 15 min',
    route: 'Direct TNSTC town buses from Sathyamangalam Bus Stand to Thalavadi via Dhimbam 27-hairpin ghat road; alight near Mallankuli junction.',
  },
  {
    id: 'coimbatore',
    origin: 'Coimbatore (Airport / Junction)',
    distance: '92 km · ~2 hr 30 min',
    route: 'Travel via Annur and Sathyamangalam (NH-948) up the scenic Dhimbam Ghat to Thalavadi; frequent buses & cabs available from Gandhipuram.',
  },
  {
    id: 'erode',
    origin: 'Erode Railway Junction',
    distance: '98 km · ~2 hr 40 min',
    route: 'Regular express buses to Sathyamangalam via Gobichettipalayam, connecting onward to Thalavadi & Mallankuli.',
  },
  {
    id: 'mysuru',
    origin: 'Mysuru / Chamarajanagar',
    distance: '85 km · ~2 hr 10 min',
    route: 'Smooth Karnataka–Tamil Nadu border route via Nanjangud, Chamarajanagar, and Punajanur checkpost directly into Thalavadi plateau.',
  },
] as const;

export interface WisdomQuote {
  id: string;
  tamil: string;
  english: string;
  themeEn: string;
  themeTa: string;
  sourceEn: string;
  sourceTa: string;
}

export const PULIPANI_WISDOM_QUOTES: WisdomQuote[] = [
  {
    id: 'w1',
    tamil: 'அன்பும் அறிவும் ஞானமும் ஒன்றாய் இணையும் இடமே இறைவனின் திருக்கோயில்.',
    english: 'Where love, clear knowledge, and inner wisdom unite as one, there stands the living temple of the Divine.',
    themeEn: 'Love & Wisdom',
    themeTa: 'அன்பும் ஞானமும்',
    sourceEn: 'Pulipani Siddhar Lineage',
    sourceTa: 'புலிப்பாணி சித்தர் மரபு',
  },
  {
    id: 'w2',
    tamil: 'மூச்சை ஒழுங்குபடுத்தினால் மனம் அடங்கும்; மனம் அடங்கினால் பிரபஞ்ச உண்மை தானே விளங்கும்.',
    english: 'When the breath is steadied in rhythm, the restless mind grows still; in stillness, cosmic truth reveals itself.',
    themeEn: 'Breath & Stillness',
    themeTa: 'மூச்சும் அமைதியும்',
    sourceEn: 'Siddhar Pranayama Teaching',
    sourceTa: 'சித்தர் பிராணாயாம உபதேசம்',
  },
  {
    id: 'w3',
    tamil: 'பசித்தவருக்கு உணவளிப்பதே எல்லா யாகங்களையும் விட உயர்ந்த புனித வழிபாடாகும்.',
    english: 'Feeding the hungry with selfless love surpasses every outward ritual and stands as the highest worship.',
    themeEn: 'Annadhanam & Seva',
    themeTa: 'அன்னதான சேவை',
    sourceEn: 'Aadheenam Dharma Maxim',
    sourceTa: 'ஆதீன தர்ம நெறி',
  },
  {
    id: 'w4',
    tamil: 'உடலை ஆலயமாகப் பேணி, இயற்கை உணவும் மூலிகையும் கொண்டு வாழ்வதே சாகாக்கலையின் முதல் படி.',
    english: 'Tending the body as a sacred shrine through pure natural food and herbs is the first step toward timeless vitality.',
    themeEn: 'Natural Living',
    themeTa: 'இயற்கை வாழ்வியல்',
    sourceEn: 'Pulipani Vaidya Tradition',
    sourceTa: 'புலிப்பாணி சித்த மருத்துவ மரபு',
  },
  {
    id: 'w5',
    tamil: 'வெளியே தேடும் ஒளியை உன் உள்ளுக்குள் ஏற்று; அமைதியே சித்தர்களின் நிரந்தர மொழி.',
    english: 'Kindle within your own heart the light you seek outside; deep silence is the eternal language of the Siddhars.',
    themeEn: 'Inner Light',
    themeTa: 'உள்ளொளி',
    sourceEn: 'Pulipani Siddhar Padalgal',
    sourceTa: 'புலிப்பாணி சித்தர் பாடல்',
  },
  {
    id: 'w6',
    tamil: 'காடும் மலையும் நதியும் நமது குருமார்கள்; இயற்கையோடு இயைந்த வாழ்வே உண்மையான தவம்.',
    english: 'Forests, hills, and flowing waters are our silent gurus; living in harmony with nature is true spiritual austerity.',
    themeEn: 'Harmony with Nature',
    themeTa: 'இயற்கை இசைவு',
    sourceEn: 'Thalavadi Forest Ashram',
    sourceTa: 'தாளவாடி வன ஆசிரமம்',
  },
  {
    id: 'w7',
    tamil: 'அகங்காரம் கரையும் தருணத்திலேயே கருணை பிறக்கிறது; கருணையே மனிதனைத் தெய்வமாக்குகிறது.',
    english: 'The moment ego dissolves, genuine compassion awakens; and it is compassion alone that elevates humanity to divinity.',
    themeEn: 'Humility & Compassion',
    themeTa: 'பணிவும் கருணையும்',
    sourceEn: 'Siddhar Philosophy',
    sourceTa: 'சித்தர் தத்துவம்',
  },
  {
    id: 'w8',
    tamil: 'நல்ல எண்ணம், இனிய சொல், பயனுள்ள செயல் — இம்மூன்றும் நாள்தோறும் பயிலும் மந்திரங்கள்.',
    english: 'Pure thought, gentle speech, and selfless action — these three are the living mantras practiced each day.',
    themeEn: 'Mindful Conduct',
    themeTa: 'நல்லொழுக்கம்',
    sourceEn: 'Pulipani Siddhar Lineage',
    sourceTa: 'புலிப்பாணி சித்தர் மரபு',
  },
  {
    id: 'w9',
    tamil: 'நன்றியுணர்வுடன் உண்ணும் எளிய உணவும், பகிர்ந்துண்ணும் அன்பும் வாழ்வை அமிர்தமாக்கும்.',
    english: 'Simple food received with gratitude and shared with others turns daily sustenance into sacred nectar.',
    themeEn: 'Gratitude & Sharing',
    themeTa: 'நன்றியும் பகிர்வும்',
    sourceEn: 'Aadheenam Daily Discipline',
    sourceTa: 'ஆதீன தினசரி ஒழுக்கம்',
  },
  {
    id: 'w10',
    tamil: 'காலம் கடந்தும் நிற்கும் உண்மையை அறிய, ஒவ்வொரு நாளும் ஒரு நொடியாவது உள்நோக்கித் தியானி.',
    english: 'To touch the truth beyond time, pause each day to turn your gaze inward in quiet contemplation.',
    themeEn: 'Daily Contemplation',
    themeTa: 'தினசரி தியானம்',
    sourceEn: 'Pulipani Siddhar Lineage',
    sourceTa: 'புலிப்பாணி சித்தர் மரபு',
  },
];

