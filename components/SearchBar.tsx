
  import React, { useState, useContext } from 'react';
  import { BookContext } from '../contexts/BookContext';
  
  const SearchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );
  
  const SearchBar: React.FC = () => {
    const { searchTerm, setSearchTerm } = useContext(BookContext);
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearchTerm(e.target.value);
    };
  
    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSearchTerm(localSearchTerm);
    };
  
    return (
      <form onSubmit={handleSearchSubmit} className="w-full max-w-xl mx-auto mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="search"
            value={localSearchTerm}
            onChange={handleSearchChange}
            placeholder="Search by title, author, or genre..."
            className="block w-full p-4 pl-10 text-sm text-brand-dark border border-gray-300 rounded-lg bg-white focus:ring-brand-secondary focus:border-brand-secondary shadow-sm transition-colors"
          />
          <button 
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-brand-secondary hover:bg-opacity-80 focus:ring-4 focus:outline-none focus:ring-brand-accent font-medium rounded-lg text-sm px-4 py-2 transition-colors"
          >
            Search
          </button>
        </div>
      </form>
    );
  };
  
  export default SearchBar;
      