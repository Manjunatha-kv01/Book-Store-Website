
  import React, { useContext, useEffect, useState } from 'react';
  import HeroBanner from '../components/HeroBanner';
  import BookCarousel from '../components/BookCarousel';
  import SectionTitle from '../components/SectionTitle';
  import { BookContext } from '../contexts/BookContext';
  import { Book } from '../types';
  import { Link } from 'react-router-dom';
  
  const HomePage: React.FC = () => {
    const { books, isLoading: booksLoading } = useContext(BookContext);
    const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  
    useEffect(() => {
      if (books && books.length > 0) {
        setFeaturedBooks(books.filter(b => b.isFeatured).slice(0, 6)); // Show up to 6 featured books
      }
    }, [books]);
  
    return (
      <div className="space-y-16">
        <HeroBanner
          title="Discover Your Next Adventure"
          subtitle="Explore a universe of stories. From thrilling mysteries to heartwarming tales, your next favorite book awaits at BookHaven."
          ctaText="Shop All Books"
          ctaLink="/books"
          imageUrl="https://picsum.photos/seed/bookstorebanner/1200/600"
        />
  
        <section>
          <SectionTitle 
            title="Welcome to BookHaven" 
            subtitle="Your cozy corner for literary exploration. We believe in the power of stories to transport, enlighten, and inspire." 
          />
          <div className="max-w-3xl mx-auto text-center text-gray-700 leading-relaxed">
            <p className="mb-4">
              At BookHaven, we're passionate about connecting readers with books they'll love. Whether you're searching for an old favorite or eager to discover a new author, our curated collection offers something for everyone. 
            </p>
            <p>
              Dive into our shelves and let your imagination roam free. Happy reading!
            </p>
          </div>
        </section>
  
        <section>
          <SectionTitle title="Featured Books" subtitle="Handpicked selections to ignite your curiosity." />
          {booksLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-secondary mx-auto"></div>
              <p className="mt-2 text-brand-primary">Loading featured books...</p>
            </div>
          ) : featuredBooks.length > 0 ? (
            <BookCarousel books={featuredBooks} />
          ) : (
            <p className="text-center text-brand-secondary">No featured books available at the moment. <Link to="/books" className="underline hover:text-brand-primary">Explore all books</Link>.</p>
          )}
        </section>
  
        <section className="bg-brand-dark text-brand-light p-12 rounded-lg shadow-xl text-center">
            <h3 className="text-3xl font-serif font-bold text-brand-accent mb-4">Join Our Community</h3>
            <p className="text-lg mb-6 max-w-xl mx-auto">
                Sign up for our newsletter to receive updates on new arrivals, exclusive offers, and author events.
            </p>
            <form 
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              onSubmit={(e) => {
                e.preventDefault(); 
                alert('Thank you for subscribing (this is a demo)!');
                (e.target as HTMLFormElement).reset();
              }}
            >
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow p-3 rounded-md bg-brand-primary text-brand-light border border-brand-secondary focus:ring-brand-accent focus:border-brand-accent placeholder-gray-400" 
                required 
              />
              <button 
                type="submit" 
                className="bg-brand-secondary hover:bg-opacity-80 text-white font-semibold py-3 px-6 rounded-md transition-colors"
              >
                Subscribe Now
              </button>
            </form>
        </section>
      </div>
    );
  };
  
  export default HomePage;
      