
import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext'; 

const CartIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
  </svg>
);

const MenuIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const UserIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);


const Navbar: React.FC = () => {
  const { cartItems } = useContext(CartContext);
  const { currentUser, logout, setAuthModalOpen } = useContext(AuthContext); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const totalItemsInCart = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
      isActive
        ? 'bg-brand-secondary text-white'
        : 'text-brand-light hover:bg-brand-primary hover:text-white'
    }`;
  
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
    isActive
      ? 'bg-brand-secondary text-white'
      : 'text-brand-light hover:bg-brand-primary hover:text-white'
  }`;

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/'); 
  };

  const handleLoginClick = () => {
    setAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  }

  return (
    <nav className="bg-brand-dark shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-brand-accent font-serif">
              BookHaven <span className="hidden sm:inline">📚</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={navLinkClass} end>Home</NavLink>
              <NavLink to="/books" className={navLinkClass}>Books</NavLink>
              <NavLink to="/about" className={navLinkClass}>About</NavLink>
              <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
              <NavLink to="/premium" className={navLinkClass}>Premium</NavLink>
              {/* Admin Panel link removed */}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link to="/cart" className="relative text-brand-light hover:text-brand-accent p-2 rounded-full hover:bg-brand-primary transition-colors duration-150">
              <CartIcon />
              {totalItemsInCart > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {totalItemsInCart}
                </span>
              )}
            </Link>

            {currentUser ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-brand-light text-sm">Hi, {currentUser.username}!</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-brand-light hover:bg-brand-primary hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="hidden md:flex items-center px-3 py-2 rounded-md text-sm font-medium text-brand-light hover:bg-brand-primary hover:text-white transition-colors"
              >
                <UserIcon /> <span className="ml-1">Login</span>
              </button>
            )}

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-brand-light hover:text-brand-accent p-2 rounded-md hover:bg-brand-primary transition-colors duration-150"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
              >
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className={mobileNavLinkClass} end onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
            <NavLink to="/books" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Books</NavLink>
            <NavLink to="/about" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>About</NavLink>
            <NavLink to="/contact" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
            <NavLink to="/premium" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Premium</NavLink>
            {/* Admin Panel link removed from mobile menu */}
            {currentUser ? (
              <div className="border-t border-brand-primary mt-2 pt-2">
                <span className="block px-3 py-2 text-base font-medium text-brand-accent">Hi, {currentUser.username}!</span>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-brand-light hover:bg-brand-primary hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
               <button
                onClick={handleLoginClick}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-brand-light hover:bg-brand-primary hover:text-white transition-colors"
              >
                Login / Register
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;