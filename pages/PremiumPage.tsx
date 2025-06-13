
  import React from 'react';
  import SectionTitle from '../components/SectionTitle';
  import { Link } from 'react-router-dom';
  
  const LockIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-brand-accent mx-auto mb-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  );
  
  const PremiumPage: React.FC = () => {
    return (
      <div className="text-center py-16 bg-white p-8 rounded-lg shadow-xl">
        <LockIcon />
        <SectionTitle 
          title="Premium Content Area" 
          subtitle="Exclusive access for our valued members." 
        />
        <div className="max-w-xl mx-auto text-gray-700">
          <p className="mb-4 text-lg">
            This section is reserved for BookHaven Premium Members. 
            As a premium member, you'll unlock access to:
          </p>
          <ul className="list-disc list-inside text-left mb-6 space-y-1 inline-block">
            <li>Exclusive e-books and early releases</li>
            <li>Downloadable content and resources</li>
            <li>Invitations to virtual author Q&A sessions</li>
            <li>Special discounts on select titles</li>
          </ul>
          <p className="mb-8">
            User authentication and membership features are not implemented in this demonstration version.
          </p>
          <Link
            to="/"
            className="bg-brand-secondary hover:bg-opacity-80 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors shadow-md"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  };
  
  export default PremiumPage;
      