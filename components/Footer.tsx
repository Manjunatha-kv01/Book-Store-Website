
  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';
  import { COMPANY_EMAIL } from '../constants';
  
  const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleNewsletterSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (email && email.includes('@')) {
        // Basic email validation
        setMessage(`Thank you for subscribing, ${email}!`);
        setEmail('');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Please enter a valid email address.');
        setTimeout(() => setMessage(''), 3000);
      }
    };
  
    return (
      <footer className="bg-brand-dark text-brand-light py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold font-serif text-brand-accent mb-4">BookHaven</h3>
              <p className="text-sm">Your literary escape. Discover worlds, ignite imagination.</p>
              <p className="text-sm mt-2">© {new Date().getFullYear()} BookHaven. All rights reserved.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-brand-accent mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-brand-accent transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-brand-accent transition-colors">Contact</Link></li>
                <li><Link to="/books" className="hover:text-brand-accent transition-colors">Shop Books</Link></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-brand-accent mb-4">Newsletter</h3>
              <p className="text-sm mb-3">Stay updated with our latest books and offers.</p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-grow p-2 rounded-md bg-brand-primary text-brand-light border border-brand-secondary focus:ring-brand-accent focus:border-brand-accent placeholder-gray-400"
                  required
                />
                <button
                  type="submit"
                  className="bg-brand-secondary hover:bg-opacity-80 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                >
                  Subscribe
                </button>
              </form>
              {message && <p className="text-sm mt-2 text-brand-accent">{message}</p>}
              <p className="text-sm mt-4">For support, email us at: <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-brand-accent underline">{COMPANY_EMAIL}</a></p>
            </div>
          </div>
          <div className="text-center text-xs text-gray-400 border-t border-brand-primary pt-8">
            <p>Designed with passion for book lovers.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
      