
  import React from 'react';
  import { Link } from 'react-router-dom';
  import SectionTitle from '../components/SectionTitle';
  
  const SadBookIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-brand-secondary mx-auto mb-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75c0 .097.027.19.076.276m-1.622-.276a2.25 2.25 0 0 1 3.086 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75c0 .097-.027.19-.076.276m1.622-.276a2.25 2.25 0 0 0-3.086 0" />
    </svg>
  );
  
  const NotFoundPage: React.FC = () => {
    return (
      <div className="text-center py-20 bg-white p-8 rounded-lg shadow-xl">
        <SadBookIcon />
        <SectionTitle 
          title="404 - Page Not Found"
          subtitle="Oops! It seems the page you're looking for has wandered off the shelf."
        />
        <div className="max-w-md mx-auto text-gray-700">
          <p className="mb-8 text-lg">
            Don't worry, even the best stories have a few missing pages sometimes.
            Let's get you back to a familiar chapter.
          </p>
          <Link
            to="/"
            className="bg-brand-primary hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors shadow-md"
          >
            Go to Homepage
          </Link>
          <p className="mt-6">
            Or, <Link to="/books" className="text-brand-secondary hover:underline">explore our book catalog</Link>.
          </p>
        </div>
      </div>
    );
  };
  
  export default NotFoundPage;
      