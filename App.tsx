
import React, { useContext, useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BooksCatalogPage from './pages/BooksCatalogPage';
import SingleBookPage from './pages/SingleBookPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PremiumPage from './pages/PremiumPage';
import NotFoundPage from './pages/NotFoundPage';
import AuthModal from './components/AuthModal'; 
import { AuthContext } from './contexts/AuthContext'; 
import WhatsAppButton from './components/WhatsAppButton'; // Added WhatsAppButton import
import { WHATSAPP_NUMBER } from './constants'; // Added WHATSAPP_NUMBER import

const App: React.FC = () => {
  const { currentUser, isAuthModalOpen, setAuthModalOpen, isLoadingAuth } = useContext(AuthContext);
  const [showInitialAuthModal, setShowInitialAuthModal] = useState(false);

  useEffect(() => {
    // Only show the auth modal on initial load if not loading auth state and no user is logged in.
    if (!isLoadingAuth && !currentUser) {
      const hasSeenModal = sessionStorage.getItem('hasSeenAuthModal');
      if (!hasSeenModal) {
        setShowInitialAuthModal(true); // This state isn't directly used for padding anymore
        setAuthModalOpen(true);
        sessionStorage.setItem('hasSeenAuthModal', 'true');
      }
    }
  }, [currentUser, isLoadingAuth, setAuthModalOpen]);

  
  // Adjust main padding. If auth is not loading, user is not logged in, and modal hasn't been seen, apply less top padding.
  const mainPaddingClass = (!isLoadingAuth && !currentUser && !sessionStorage.getItem('hasSeenAuthModal')) ? "pt-2 pb-8" : "py-8";


  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className={`flex-grow container mx-auto px-4 ${mainPaddingClass}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksCatalogPage />} />
            <Route path="/book/:id" element={<SingleBookPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton phoneNumber={WHATSAPP_NUMBER} /> {/* Added WhatsAppButton component */}
        {isAuthModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
      </div>
    </HashRouter>
  );
};

export default App;