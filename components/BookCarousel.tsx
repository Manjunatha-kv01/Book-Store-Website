
  import React, { useState, useEffect, useRef } from 'react';
  import { Book } from '../types';
  import BookCard from './BookCard';
  
  interface BookCarouselProps {
    books: Book[];
  }
  
  const ChevronLeftIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  );
  
  const ChevronRightIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
  
  const BookCarousel: React.FC<BookCarouselProps> = ({ books }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [itemsPerPage, setItemsPerPage] = useState(3);
  
    useEffect(() => {
      const updateItemsPerPage = () => {
        if (window.innerWidth < 768) setItemsPerPage(1);
        else if (window.innerWidth < 1024) setItemsPerPage(2);
        else setItemsPerPage(3);
      };
      updateItemsPerPage();
      window.addEventListener('resize', updateItemsPerPage);
      return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);
  
    const totalPages = Math.ceil(books.length / itemsPerPage);
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
    };
  
    useEffect(() => {
      if (carouselRef.current) {
        const itemWidth = carouselRef.current.offsetWidth / itemsPerPage;
        carouselRef.current.style.transform = `translateX(-${currentIndex * itemWidth * itemsPerPage}px)`;
      }
    }, [currentIndex, itemsPerPage]);
  
    if (!books || books.length === 0) {
      return <p className="text-center text-brand-secondary">No featured books available at the moment.</p>;
    }
  
    return (
      <div className="relative w-full">
        <div className="overflow-hidden">
          <div 
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ width: `${(books.length / itemsPerPage) * 100}%` }}
          >
            {books.map((book) => (
              <div 
                key={book.id} 
                className="p-2" 
                style={{ width: `${100 / books.length}%`, flex: `0 0 ${100 / itemsPerPage / (books.length / itemsPerPage) }%` }} // Adjust width based on items per page
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
  
        {books.length > itemsPerPage && (
          <>
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 bg-brand-primary text-white p-3 rounded-full shadow-md hover:bg-brand-secondary transition-colors z-10"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 bg-brand-primary text-white p-3 rounded-full shadow-md hover:bg-brand-secondary transition-colors z-10"
              aria-label="Next slide"
            >
              <ChevronRightIcon />
            </button>
          </>
        )}
      </div>
    );
  };
  
  export default BookCarousel;
      