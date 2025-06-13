
  import React, { useContext, useState } from 'react';
  import BookCard from '../components/BookCard';
  import SearchBar from '../components/SearchBar';
  import Filters from '../components/Filters';
  import SectionTitle from '../components/SectionTitle';
  import { BookContext } from '../contexts/BookContext';
  
  const BooksCatalogPage: React.FC = () => {
    const { filteredBooks, isLoading, error } = useContext(BookContext);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 12;
  
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
    if (isLoading) {
      return (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-secondary mx-auto"></div>
          <p className="mt-4 text-xl text-brand-primary">Loading books...</p>
        </div>
      );
    }
  
    if (error) {
      return <p className="text-center text-red-500 text-xl py-20">Error: {error}</p>;
    }
  
    return (
      <div className="space-y-12">
        <SectionTitle title="Our Book Collection" subtitle="Find your next great read from our diverse catalog." />
        
        <SearchBar />
        <Filters />
  
        {filteredBooks.length === 0 && !isLoading ? (
          <p className="text-center text-brand-secondary text-lg py-10">
            No books match your current filters or search term. Try adjusting your criteria!
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {currentBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
  
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-brand-secondary text-white rounded-md hover:bg-opacity-80 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      currentPage === pageNumber 
                        ? 'bg-brand-primary text-white' 
                        : 'bg-white text-brand-primary border border-brand-primary hover:bg-brand-light'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-brand-secondary text-white rounded-md hover:bg-opacity-80 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };
  
  export default BooksCatalogPage;
      