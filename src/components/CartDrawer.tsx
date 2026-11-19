import { useState, type FormEvent } from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { SITE_INFO } from '../data/aadheenamData';
import { PRODUCTS_TA, tr } from '../data/translations';

export default function CartDrawer() {
  const { cart, cartTotal, cartOpen, setCartOpen, updateQty, removeFromCart, clearCart, lang } = useSite();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  if (!cartOpen) return null;

  async function handleOrderSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name') ?? '').trim();
    const mobile = String(fd.get('mobile') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const address = String(fd.get('address') ?? '').trim();

    if (!name || !mobile || !email || !address) {
      setStatus('error');
      setErrorMsg(tr(lang, 'Please complete all delivery fields.', 'அனைத்து விநியோக விவரங்களையும் நிரப்பவும்.'));
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          mobile,
          email,
          address,
          items: cart.map((c) => ({ id: c.id, name: c.name, price: c.price, qty: c.qty })),
          total: cartTotal,
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(json.error ?? 'Order submission failed');
      clearCart();
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : tr(lang, 'Unable to submit order. Please try again.', 'ஆர்டரைச் சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.')
      );
    }
  }

  const whatsappText = encodeURIComponent(
    `Vanakkam, I would like to order from Pulipani Siddhar Aadheenam Store:\n${cart
      .map((i) => `- ${i.name} x${i.qty} (₹${i.price * i.qty})`)
      .join('\n')}\nTotal: ₹${cartTotal}`
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping Cart">
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />
      <aside className="relative z-10 w-full max-w-md bg-white dark:bg-[#0D1526] text-slate-900 dark:text-slate-100 h-full flex flex-col border-l border-slate-200 dark:border-white/10 shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h2 className="text-lg font-semibold">
              {tr(lang, 'Aadheenam Store Cart', 'ஆதீன அங்காடி கூடை')}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setCartOpen(false);
              setStatus('idle');
            }}
            aria-label="Close cart"
            className="w-9 h-9 rounded-lg inline-flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {status === 'success' ? (
            <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/30 p-6 text-center space-y-3">
              <p className="text-lg font-semibold text-emerald-900 dark:text-emerald-200" style={{ fontFamily: 'var(--font-tamil)' }}>
                ஆர்டர் பதிவு செய்யப்பட்டது!
              </p>
              <p className="text-sm text-emerald-800 dark:text-emerald-300">
                {tr(
                  lang,
                  'Thank you for supporting Pulipani Siddhar Aadheenam. Our team will confirm dispatch details via WhatsApp within 24 hours.',
                  'புலிப்பாணி சித்தர் ஆதீனத்திற்கு ஆதரவளித்தமைக்கு நன்றி. எங்கள் குழுவினர் 24 மணி நேரத்திற்குள் WhatsApp மூலம் விநியோக விவரங்களை உறுதிப்படுத்துவர்.'
                )}
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus('idle');
                  setCartOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-500 transition-colors"
              >
                {tr(lang, 'Continue Browsing', 'தொடர்ந்து பார்க்க')}
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <p className="text-base font-medium text-slate-700 dark:text-slate-200">
                {tr(lang, 'Your cart is currently empty', 'உங்கள் கூடை தற்போது காலியாக உள்ளது')}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                {tr(
                  lang,
                  'Explore herbal chooranam, spiritual books, sacred brass diyas, and pure forest honey.',
                  'மூலிகை சூரணம், ஆன்மீக நூல்கள், பித்தளை குத்துவிளக்கு மற்றும் சுத்தமான மலைத்தேன் ஆகியவற்றைப் பாருங்கள்.'
                )}
              </p>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-slate-200 dark:divide-white/10">
                {cart.map((item) => {
                  const localizedName = tr(lang, item.name, PRODUCTS_TA[item.id]?.name ?? item.tamil);
                  return (
                    <li key={item.id} className="py-4 flex gap-4">
                      <img
                        src={item.image}
                        alt={localizedName}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-lg object-cover shrink-0 border border-slate-200 dark:border-white/10"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{localizedName}</p>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300 tabular-nums mt-0.5">
                          ₹{item.price * item.qty}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, -1)}
                            aria-label={`Decrease quantity of ${localizedName}`}
                            className="w-7 h-7 rounded border border-slate-300 dark:border-slate-700 inline-flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-semibold w-6 text-center tabular-nums">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, 1)}
                            aria-label={`Increase quantity of ${localizedName}`}
                            className="w-7 h-7 rounded border border-slate-300 dark:border-slate-700 inline-flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${localizedName}`}
                            className="ml-auto text-slate-500 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-200">
                  {tr(lang, 'Order Subtotal', 'மொத்தத் தொகை')}
                </span>
                <span className="text-xl font-bold tabular-nums">₹{cartTotal}</span>
              </div>

              <form onSubmit={handleOrderSubmit} className="space-y-3 pt-2">
                <p className="text-sm font-semibold">
                  {tr(lang, 'Request Order Dispatch', 'ஆர்டர் விநியோக விவரங்கள்')}
                </p>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder={tr(lang, 'Full Name *', 'முழு பெயர் *')}
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    name="mobile"
                    type="tel"
                    required
                    placeholder={tr(lang, 'Mobile / WhatsApp *', 'மொபைல் / WhatsApp *')}
                    className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={tr(lang, 'Email Address *', 'மின்னஞ்சல் *')}
                    className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <textarea
                  name="address"
                  rows={2}
                  required
                  placeholder={tr(lang, 'Delivery Address & Pincode *', 'விநியோக முகவரி & அஞ்சல் குறியீடு *')}
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                {status === 'error' && (
                  <p className="text-xs font-medium text-rose-600 dark:text-rose-400">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-2.5 px-4 rounded-lg bg-amber-500 text-slate-950 font-semibold text-sm hover:bg-amber-400 transition-colors disabled:opacity-60"
                >
                  {status === 'sending'
                    ? tr(lang, 'Submitting Request...', 'சமர்ப்பிக்கப்படுகிறது...')
                    : tr(lang, 'Place Order Request', 'ஆர்டரை உறுதிப்படுத்தவும்')}
                </button>
                <a
                  href={`https://wa.me/${SITE_INFO.whatsappNumber}?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2.5 px-4 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {tr(lang, 'Order via WhatsApp', 'WhatsApp மூலம் ஆர்டர் செய்ய')}
                </a>
              </form>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
