
import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookContext } from '../contexts/BookContext';
import { CartContext } from '../contexts/CartContext';
import { Book as BookType, Review } from '../types';
import RatingStars from '../components/RatingStars';
import SectionTitle from '../components/SectionTitle';
import BookCard from '../components/BookCard'; // For related books

const SingleBookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBookById, books: allBooks, isLoading: bookContextLoading } = useContext(BookContext);
  const { addToCart, getItemQuantity } = useContext(CartContext);
  const [book, setBook] = useState<BookType | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<BookType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCartMessage, setAddedToCartMessage] = useState('');

  useEffect(() => {
    const fetchBookData = async () => {
      if (id) {
        setIsLoading(true);
        setError(null);
        setAddedToCartMessage('');
        try {
          const fetchedBook = await getBookById(id);
          if (fetchedBook) {
            setBook(fetchedBook);
            const related = allBooks
              .filter(b => b.genre === fetchedBook.genre && b.id !== fetchedBook.id)
              .slice(0, 4); 
            setRelatedBooks(related);
          } else {
            setError('Book not found.');
          }
        } catch (err) {
          setError('Failed to load book details.');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (!bookContextLoading) {
       fetchBookData();
    }
     // Scroll to top when component mounts or id changes
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, getBookById, allBooks, bookContextLoading]);

  useEffect(() => {
      if (book) {
          setQuantity(1); 
      }
  }, [book]);

  const handleAddToCart = () => {
    if (book) {
      addToCart(book, quantity);
      setAddedToCartMessage(`${quantity} "${book.title}" added to cart!`);
      setTimeout(() => setAddedToCartMessage(''), 3000); // Clear message after 3 seconds
    }
  };

  if (isLoading || bookContextLoading) {
    return (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-secondary mx-auto"></div>
          <p className="mt-4 text-xl text-brand-primary">Loading book details...</p>
        </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 text-xl py-20">{error} <Link to="/books" className="underline">Go back to books</Link>.</p>;
  }

  if (!book) {
    return <p className="text-center text-brand-secondary text-xl py-20">Book not found. <Link to="/books" className="underline">Go back to books</Link>.</p>;
  }

  return (
    <div className="space-y-12">
      <div className="bg-white p-4 sm:p-6 md:p-10 rounded-lg shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="md:col-span-1">
            <img 
              src={book.coverImageUrl} 
              alt={book.title} 
              className="w-full h-auto object-contain rounded-lg shadow-lg max-h-[400px] sm:max-h-[500px] mx-auto" 
            />
          </div>
          <div className="md:col-span-2 space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-primary font-serif">{book.title}</h1>
            <p className="text-md sm:text-lg text-gray-700">by <span className="font-semibold text-brand-secondary">{book.author}</span></p>
            <div className="flex items-center space-x-2">
              <RatingStars rating={book.rating} size="md" />
              <span className="text-sm text-gray-600">({book.reviews.length} reviews)</span>
            </div>
            <p className="text-xs text-brand-primary font-medium uppercase bg-brand-accent inline-block px-2 py-1 rounded">{book.genre}</p>
            <p className="text-2xl sm:text-3xl font-bold text-brand-primary my-3 sm:my-4">${book.price.toFixed(2)}</p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 my-4">
              <div className="flex items-center gap-2">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity:</label>
                <input 
                  type="number" 
                  id="quantity" 
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                  min="1"
                  className="w-20 p-2 border border-gray-300 rounded-md text-center focus:ring-brand-secondary focus:border-brand-secondary"
                />
              </div>
               <button
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto bg-brand-secondary hover:bg-opacity-80 text-white font-semibold py-2.5 px-5 rounded-md transition-colors text-base sm:text-lg shadow-md"
                >
                  Add to Cart
                </button>
            </div>
            {addedToCartMessage && (
              <p className="text-green-600 bg-green-100 p-2 rounded-md text-sm">{addedToCartMessage}</p>
            )}

            <div className="text-sm text-gray-700 space-y-1 pt-2">
                <p><strong>ISBN:</strong> {book.isbn}</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
                <p><strong>Published:</strong> {book.publishedDate}</p>
                <p><strong>Pages:</strong> {book.pages}</p>
                <p><strong>Language:</strong> {book.language}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-brand-primary font-serif mb-3 sm:mb-4">Full Description</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">{book.descriptionFull}</p>
        </div>

        {book.samplePreviewText && (
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-brand-primary font-serif mb-3 sm:mb-4">Sample Preview</h2>
            <div className="bg-brand-light p-4 sm:p-6 rounded-md shadow">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line italic text-sm sm:text-base">{book.samplePreviewText}</p>
            </div>
          </div>
        )}

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-brand-primary font-serif mb-4 sm:mb-6">Customer Reviews</h2>
          {book.reviews.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              {book.reviews.map((review: Review) => (
                <div key={review.id} className="bg-brand-light p-3 sm:p-4 rounded-md shadow">
                  <div className="flex items-center mb-1 sm:mb-2">
                    <RatingStars rating={review.rating} size="sm" />
                    <p className="ml-2 font-semibold text-brand-dark text-sm sm:text-base">{review.reviewerName}</p>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{new Date(review.date).toLocaleDateString()}</p>
                  <p className="text-gray-700 text-sm sm:text-base">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-sm sm:text-base">No reviews yet for this book.</p>
          )}
        </div>
      </div>
      
      {relatedBooks.length > 0 && (
        <section className="mt-12 sm:mt-16">
          <SectionTitle title="Related Books" subtitle="You might also like these titles." />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedBooks.map(relatedBook => (
              <BookCard key={relatedBook.id} book={relatedBook} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default SingleBookPage;
