
import React, { useContext } from 'react';
import { BookContext } from '../contexts/BookContext';
import { GENRES, PRICE_RANGES, RATINGS_FILTER } from '../constants';
import { FiltersState } from '../types';

const Filters: React.FC = () => {
  const { activeFilters, setFilters, clearFilters } = useContext(BookContext);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ [name]: name === 'rating' ? parseInt(value) : value } as Partial<FiltersState>);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold text-brand-primary mb-4 font-serif">Filter Books</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
          <select
            id="genre"
            name="genre"
            value={activeFilters.genre}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary text-sm sm:text-base"
          >
            {['All', ...GENRES].map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <select
            id="priceRange"
            name="priceRange"
            value={activeFilters.priceRange}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary text-sm sm:text-base"
          >
            {PRICE_RANGES.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Min. Rating</label>
          <select
            id="rating"
            name="rating"
            value={activeFilters.rating.toString()}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary text-sm sm:text-base"
          >
            {RATINGS_FILTER.map(rating => (
              <option key={rating} value={rating.toString()}>
                {rating === 0 ? 'All Ratings' : `${rating}+ Stars`}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-end">
          <button
            onClick={clearFilters}
            className="w-full bg-gray-200 hover:bg-gray-300 text-brand-dark font-semibold py-2 px-4 rounded-md transition-colors text-sm sm:text-base"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
