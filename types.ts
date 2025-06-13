
export interface Review {
  id: string;
  reviewerName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  descriptionShort: string;
  descriptionFull: string;
  price: number;
  coverImageUrl: string;
  rating: number; // Average rating 0-5
  reviews: Review[];
  isbn: string;
  publisher: string;
  publishedDate: string;
  pages: number;
  language: string;
  samplePreviewText: string;
  isFeatured?: boolean;
}

export interface CartItem extends Book {
  quantity: number;
}

export interface FiltersState {
  genre: string;
  priceRange: string;
  rating: number;
}

// New Types for Auth
export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  role: 'user'; 
}

// AdminUser interface removed

export type CurrentUser = User | null; // Updated CurrentUser type

export interface OrderItem {
  bookId: string;
  title: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId?: string; // If placed by a logged-in user
  customerInfo: { // For guests or basic info
    name?: string;
    email?: string;
  };
  items: OrderItem[];
  totalAmount: number;
  orderDate: string; // ISO string
  shippingFee: number;
  taxes: number;
  status: 'Completed' | 'Pending' | 'Cancelled'; // Example statuses
}