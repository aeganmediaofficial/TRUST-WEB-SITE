import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router';
import { SiteProvider } from './context/SiteContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { OfflineIndicator } from './components/PWAInstallButton';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ClassesPage from './pages/ClassesPage';
import EventsPage from './pages/EventsPage';
import StorePage from './pages/StorePage';
import GalleryPage from './pages/GalleryPage';
import DonatePage from './pages/DonatePage';
import VolunteerPage from './pages/VolunteerPage';
import ContactPage from './pages/ContactPage';
import AdminRegistrationsPage from './pages/AdminRegistrationsPage';
import { PrivacyPage, TermsPage } from './pages/LegalPages';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#070D19] text-slate-900 dark:text-slate-100">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/classes" element={<ClassesPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/volunteer" element={<VolunteerPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin/registrations" element={<AdminRegistrationsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
          <CartDrawer />
          <OfflineIndicator />
        </div>
      </BrowserRouter>
    </SiteProvider>
  );
}
