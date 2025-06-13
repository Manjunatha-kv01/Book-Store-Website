
  import React, { createContext, useState, useEffect, ReactNode } from 'react';
  import { Book, CartItem } from '../types';
  
  interface CartContextType {
    cartItems: CartItem[];
    addToCart: (book: Book, quantity?: number) => void;
    removeFromCart: (bookId: string) => void;
    updateQuantity: (bookId: string, quantity: number) => void;
    getCartTotal: () => number;
    clearCart: () => void;
    getItemQuantity: (bookId: string) => number;
  }
  
  export const CartContext = createContext<CartContextType>({
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    getCartTotal: () => 0,
    clearCart: () => {},
    getItemQuantity: () => 0,
  });
  
  interface CartProviderProps {
    children: ReactNode;
  }
  
  export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    });
  
    useEffect(() => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);
  
    const addToCart = (book: Book, quantity: number = 1) => {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === book.id);
        if (existingItem) {
          return prevItems.map(item =>
            item.id === book.id ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
        return [...prevItems, { ...book, quantity }];
      });
    };
  
    const removeFromCart = (bookId: string) => {
      setCartItems(prevItems => prevItems.filter(item => item.id !== bookId));
    };
  
    const updateQuantity = (bookId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(bookId);
      } else {
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.id === bookId ? { ...item, quantity } : item
          )
        );
      }
    };
  
    const getCartTotal = (): number => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
  
    const clearCart = () => {
      setCartItems([]);
    };
  
    const getItemQuantity = (bookId: string): number => {
      const item = cartItems.find(cartItem => cartItem.id === bookId);
      return item ? item.quantity : 0;
    };
  
    return (
      <CartContext.Provider value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart,
        getItemQuantity
      }}>
        {children}
      </CartContext.Provider>
    );
  };
      