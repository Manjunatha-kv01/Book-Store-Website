
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Book, FiltersState } from '../types';
import { getAllBooks as fetchAllBooks, getBookById as fetchBookById, getFeaturedBooks as fetchFeaturedBooks } from '../services/bookService'; 
import { GENRES, PRICE_RANGES, RATINGS_FILTER } from '../constants';

interface BookContextType {
  books: Book[];
  featuredBooks: Book[];
  filteredBooks: Book[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilters: FiltersState;
  setFilters: (filters: Partial<FiltersState>) => void;
  getBookById: (id: string) => Promise<Book | undefined>;
  clearFilters: () => void;
  // addBook, deleteBook, refreshBooks removed
}

export const BookContext = createContext<BookContextType>({
  books: [],
  featuredBooks: [],
  filteredBooks: [],
  isLoading: true,
  error: null,
  searchTerm: '',
  setSearchTerm: () => {},
  activeFilters: { genre: GENRES[0], priceRange: PRICE_RANGES[0], rating: RATINGS_FILTER[0] },
  setFilters: () => {},
  getBookById: async () => undefined,
  clearFilters: () => {},
  // addBook, deleteBook, refreshBooks placeholders removed
});

interface BookProviderProps {
  children: ReactNode;
}

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeFilters, setActiveFilters] = useState<FiltersState>({
    genre: 'All', 
    priceRange: 'All', 
    rating: 0 
  });

  const loadBooks = useCallback(async () => {
    try {
      setIsLoading(true);
      const [fetchedBooks, fetchedFeaturedBooks] = await Promise.all([
        fetchAllBooks(),
        fetchFeaturedBooks() 
      ]);
      setBooks(fetchedBooks);
      setFeaturedBooks(fetchedFeaturedBooks);
      setError(null);
    } catch (err) {
      setError('Failed to load books.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const applyFiltersAndSearch = useCallback(() => {
    let tempFilteredBooks = [...books];

    if (searchTerm) {
      tempFilteredBooks = tempFilteredBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeFilters.genre && activeFilters.genre !== 'All') {
      tempFilteredBooks = tempFilteredBooks.filter(book => book.genre === activeFilters.genre);
    }

    if (activeFilters.priceRange && activeFilters.priceRange !== 'All') {
      const [minPriceStr, maxPriceStr] = activeFilters.priceRange.match(/\d+(\.\d+)?/g) || [];
      const minPrice = minPriceStr ? parseFloat(minPriceStr) : 0;
      const maxPrice = maxPriceStr ? parseFloat(maxPriceStr) : Infinity;

      if (activeFilters.priceRange.startsWith("Under")) {
           tempFilteredBooks = tempFilteredBooks.filter(book => book.price < (maxPrice || 10) );
      } else if (activeFilters.priceRange.startsWith("Over")) {
           tempFilteredBooks = tempFilteredBooks.filter(book => book.price > (minPrice || 30));
      } else if (minPrice !== undefined && maxPrice !== undefined) {
           tempFilteredBooks = tempFilteredBooks.filter(book => book.price >= minPrice && book.price <= maxPrice);
      }
    }

    if (activeFilters.rating > 0) {
      tempFilteredBooks = tempFilteredBooks.filter(book => book.rating >= activeFilters.rating);
    }

    setFilteredBooks(tempFilteredBooks);
  }, [books, searchTerm, activeFilters]);

  useEffect(() => {
    if(!isLoading) { 
       applyFiltersAndSearch();
    }
  }, [applyFiltersAndSearch, isLoading]);

  const handleSetFilters = (newFilters: Partial<FiltersState>) => {
    setActiveFilters(prev => ({ ...prev, ...newFilters }));
  };

  const getBookById = async (id: string): Promise<Book | undefined> => {
    const existingBook = books.find(b => b.id === id);
    if (existingBook) return existingBook;

    setIsLoading(true);
    try {
      const book = await fetchBookById(id); 
      setError(null);
      return book;
    } catch (err) {
      setError('Failed to load book details.');
      console.error(err);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setActiveFilters({ genre: 'All', priceRange: 'All', rating: 0 });
  };

  // Admin functions addBook, deleteBook, refreshBooks removed

  return (
    <BookContext.Provider value={{
      books,
      featuredBooks,
      filteredBooks,
      isLoading,
      error,
      searchTerm,
      setSearchTerm,
      activeFilters,
      setFilters: handleSetFilters,
      getBookById,
      clearFilters,
      // addBook, deleteBook, refreshBooks removed from provider value
    }}>
      {children}
    </BookContext.Provider>
  );
};