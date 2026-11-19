import React, { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'en' | 'ta';

export interface CartItem {
  id: string;
  name: string;
  tamil: string;
  price: number;
  image: string;
  qty: number;
}

export type Theme = 'light' | 'dark';

interface SiteContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, 'qty'>) => void;
  updateQty: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = window.localStorage.getItem('psa-theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = window.localStorage.getItem('psa-lang');
    return saved === 'ta' ? 'ta' : 'en';
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = window.localStorage.getItem('psa-cart');
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      window.localStorage.setItem('psa-theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem('psa-lang', lang);
    } catch {
      // ignore storage errors
    }
  }, [lang]);

  useEffect(() => {
    try {
      window.localStorage.setItem('psa-cart', JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  function setTheme(next: Theme) {
    setThemeState(next);
  }

  function toggleTheme() {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  function setLang(next: Lang) {
    setLangState(next);
  }

  function toggleLang() {
    setLangState((prev) => (prev === 'en' ? 'ta' : 'en'));
  }

  function addToCart(item: Omit<CartItem, 'qty'>) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setCartOpen(true);
  }

  function updateQty(id: string, delta: number) {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  }

  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <SiteContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        lang,
        setLang,
        toggleLang,
        cart,
        cartCount,
        cartTotal,
        cartOpen,
        setCartOpen,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside SiteProvider');
  return ctx;
}
