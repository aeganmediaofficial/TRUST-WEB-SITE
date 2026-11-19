import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { IMAGES, PRODUCTS, SITE_INFO } from '../data/aadheenamData';
import { PageHero, SectionHeading } from '../components/KolamMotif';
import { SmartImage } from '../components/SmartImage';
import { useSite } from '../context/SiteContext';
import { PRODUCTS_TA, tr } from '../data/translations';

export default function StorePage() {
  const { addToCart, cartCount, setCartOpen, lang } = useSite();
  const [category, setCategory] = useState<'All' | 'Herbal' | 'Books' | 'Sacred Items' | 'Natural Food'>('All');

  const filteredProducts = PRODUCTS.filter((p) => category === 'All' || p.category === category);

  return (
    <main>
      <PageHero
        tamil={tr(lang, 'எங்கள் பொருட்கள்', 'Our Products')}
        title={tr(lang, 'Aadheenam Store', 'ஆதீன அங்காடி')}
        subtitle={tr(
          lang,
          'Authentic Siddha herbal preparations, spiritual publications, handcrafted brassware, and pure Western Ghats forest honey.',
          'தூய சித்த மூலிகைப் பொடிகள், ஆன்மீக நூல்கள், கைவினைப் பித்தளை குத்துவிளக்குகள் மற்றும் மேற்குத் தொடர்ச்சி மலைத்தேன்.'
        )}
        image={IMAGES.herbalLiving}
        alt="Aadheenam herbal preparations and forest honey"
        breadcrumbs={[
          { label: tr(lang, 'Home', 'முகப்பு'), to: '/' },
          { label: tr(lang, 'Store', 'பொருட்கள்') },
        ]}
      />

      <section className="py-20 sm:py-24 bg-white dark:bg-[#070D19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
            <div>
              <p className="text-base font-medium text-amber-700 dark:text-amber-400 mb-1">
                {tr(lang, 'இயற்கை & ஆன்மீக தயாரிப்புகள்', 'Sacred & Natural Products')}
              </p>
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
                {tr(lang, 'Sacred & Natural Offerings', 'புனித & இயற்கைத் தயாரிப்புகள்')}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#0B1324] dark:bg-amber-500 text-white dark:text-slate-950 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-amber-400 transition-colors w-fit"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{tr(lang, 'View Cart', 'கூடையைப் பார்க்க')}</span>
              <span className="tabular-nums font-bold">({cartCount})</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#10192D] border border-slate-200 dark:border-white/10 w-fit mb-10">
            {(
              [
                { id: 'All', label: tr(lang, 'All', 'அனைத்தும்') },
                { id: 'Herbal', label: tr(lang, 'Herbal', 'மூலிகை') },
                { id: 'Books', label: tr(lang, 'Books', 'நூல்கள்') },
                { id: 'Sacred Items', label: tr(lang, 'Sacred Items', 'பூஜைப் பொருட்கள்') },
                { id: 'Natural Food', label: tr(lang, 'Natural Food', 'இயற்கை உணவு') },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategory(tab.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  category === tab.id
                    ? 'bg-white dark:bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const taP = PRODUCTS_TA[product.id];
              const name = tr(lang, product.name, taP?.name ?? product.tamil);
              const cat = tr(lang, product.category, taP?.category ?? product.category);
              const unit = tr(lang, product.unit, taP?.unit ?? product.unit);
              const desc = tr(lang, product.desc, taP?.desc ?? product.desc);
              return (
                <article
                  key={product.id}
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
                    <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-0.5">
                      {lang === 'ta' ? product.name : product.tamil}
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 flex-1">
                      {desc}
                    </p>
                    <p className="text-xl font-bold text-amber-700 dark:text-amber-400 tabular-nums mb-4">
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
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#0B1324] dark:bg-amber-500 text-white dark:text-slate-950 text-xs font-semibold hover:bg-slate-800 dark:hover:bg-amber-400 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{tr(lang, 'Add to Cart', 'கூடையில் சேர்')}</span>
                      </button>
                      <a
                        href={`https://wa.me/${SITE_INFO.whatsappNumber}?text=${encodeURIComponent(
                          `Vanakkam, I would like to order ${product.name} (₹${product.price}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-16 rounded-2xl p-8 bg-slate-50 dark:bg-[#0B1324] border border-slate-200 dark:border-white/10">
            <SectionHeading
              tamil="நேரடி சேவை"
              english="Every Purchase Supports Annadhanam & Education"
              subtitle={tr(
                lang,
                'Proceeds from Aadheenam products go directly toward daily free meals and rural student scholarships in Thalavadi and across Tamil Nadu.',
                'ஆதீனத் தயாரிப்புகளிலிருந்து கிடைக்கும் வருவாய் தாளவாடி மற்றும் தமிழ்நாடு முழுவதும் நடைபெறும் தினசரி அன்னதானத்திற்கும் ஏழை மாணவர்களின் கல்விக்கும் நேரடியாகப் பயன்படுகிறது.'
              )}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
