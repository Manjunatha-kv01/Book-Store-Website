
  import React, { useContext } from 'react';
  import { CartItem } from '../types';
  import { CartContext } from '../contexts/CartContext';
  import { Link } from 'react-router-dom';
  
  interface CartItemCardProps {
    item: CartItem;
  }
  
  const TrashIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c1.153 0 2.24.032 3.223.091M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
  
  const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useContext(CartContext);
  
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuantity = parseInt(e.target.value, 10);
      if (!isNaN(newQuantity)) {
        updateQuantity(item.id, newQuantity > 0 ? newQuantity : 1);
      }
    };
  
    return (
      <div className="flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow-md mb-4 gap-4">
        <Link to={`/book/${item.id}`} className="flex-shrink-0">
          <img 
            src={item.coverImageUrl} 
            alt={item.title} 
            className="w-24 h-36 md:w-28 md:h-40 object-cover rounded-md"
          />
        </Link>
        <div className="flex-grow text-center md:text-left">
          <Link to={`/book/${item.id}`} className="hover:text-brand-secondary">
            <h3 className="text-lg font-semibold text-brand-primary font-serif">{item.title}</h3>
          </Link>
          <p className="text-sm text-gray-600">by {item.author}</p>
          <p className="text-sm text-brand-secondary">{item.genre}</p>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <p className="text-md font-semibold text-brand-primary w-20 text-center">${item.price.toFixed(2)}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={handleQuantityChange}
            min="1"
            className="w-16 p-2 border border-gray-300 rounded-md text-center focus:ring-brand-secondary focus:border-brand-secondary"
            aria-label={`Quantity for ${item.title}`}
          />
          <p className="text-md font-bold text-brand-primary w-24 text-center">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors"
          aria-label={`Remove ${item.title} from cart`}
        >
          <TrashIcon/>
        </button>
      </div>
    );
  };
  
  export default CartItemCard;
      