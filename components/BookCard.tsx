
  import React, { useContext } from 'react';
  import { Link } from 'react-router-dom';
  import { Book } from '../types';
  import { CartContext } from '../contexts/CartContext';
  import RatingStars from './RatingStars';
  
  interface BookCardProps {
    book: Book;
  }
  
  const BookCard: React.FC<BookCardProps> = ({ book }) => {
    const { addToCart } = useContext(CartContext);
  
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
        <Link to={`/book/${book.id}`} className="block">
          <img 
            src={book.coverImageUrl} 
            alt={book.title} 
            className="w-full h-64 object-cover object-center" 
          />
        </Link>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-brand-primary mb-2 font-serif">
            <Link to={`/book/${book.id}`} className="hover:text-brand-secondary transition-colors">
              {book.title}
            </Link>
          </h3>
          <p className="text-sm text-gray-600 mb-1">By {book.author}</p>
          <p className="text-xs text-brand-secondary font-medium uppercase mb-3">{book.genre}</p>
          
          <div className="mb-3">
            <RatingStars rating={book.rating} size="sm" />
          </div>
  
          <p className="text-sm text-gray-700 mb-4 flex-grow line-clamp-3">{book.descriptionShort}</p>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <p className="text-2xl font-bold text-brand-primary">${book.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => addToCart(book)}
              className="w-full bg-brand-secondary hover:bg-opacity-80 text-white font-semibold py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-opacity-50"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default BookCard;
      