
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import CartItemCard from '../components/CartItemCard';
import SectionTitle from '../components/SectionTitle';

const CartPage: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const [showPaymentPlaceholder, setShowPaymentPlaceholder] = useState(false);
  const [paymentStatusMessage, setPaymentStatusMessage] = useState('');


  const subtotal = getCartTotal();
  const shippingFee = subtotal > 0 && subtotal < 50 ? 5.00 : 0; // Example: Free shipping over $50
  const taxes = subtotal * 0.08; // Example: 8% tax
  const total = subtotal + shippingFee + taxes;

  const handleCheckout = () => {
    setShowPaymentPlaceholder(true);
    setPaymentStatusMessage(''); // Clear previous messages
  };

  if (showPaymentPlaceholder) {
    return (
      <div className="text-center py-16 bg-white p-8 rounded-lg shadow-xl">
        <SectionTitle title="Payment Gateway Simulation" subtitle="Complete Your Purchase" />
        {paymentStatusMessage ? (
           <div className={`p-4 mb-6 rounded-md text-white ${paymentStatusMessage.includes("Successful") ? 'bg-green-500' : 'bg-red-500'}`}>
            <p className="font-semibold">{paymentStatusMessage.split('!')[0]}!</p>
            <p className="text-sm">{paymentStatusMessage.split('!').slice(1).join('!')}</p>
          </div>
        ) : (
          <p className="text-lg text-brand-dark mb-4">
            This is where you would normally be redirected to Stripe, PayPal, Razorpay, or another payment processor.
          </p>
        )}

        <p className="text-md text-gray-700 mb-6">
          Your order total is: <span className="font-bold text-brand-primary">${total.toFixed(2)}</span>
        </p>
        <div className="space-y-4 max-w-md mx-auto">
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition-colors"
            onClick={() => {
              setPaymentStatusMessage("Payment Successful! A confirmation email with your receipt has been sent to your email address. (This is a simulation). Your cart has been cleared.");
              clearCart();
              // In a real app, you might delay hiding or redirect after a few seconds
              // For now, the message stays until user navigates or clicks back
            }}
            disabled={!!paymentStatusMessage && paymentStatusMessage.includes("Successful")}
          >
            Simulate Successful Payment
          </button>
          <button
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-md transition-colors"
            onClick={() => {
              setPaymentStatusMessage("Payment Failed! Please try again or contact support. (Simulated)");
            }}
            disabled={!!paymentStatusMessage && paymentStatusMessage.includes("Successful")}
          >
            Simulate Failed Payment
          </button>
          <button
            onClick={() => {
                setShowPaymentPlaceholder(false);
                if (paymentStatusMessage.includes("Successful")) {
                    // If payment was successful and they go back, they are effectively starting over
                    // or navigating away from the success message.
                }
            }}
            className="text-sm text-brand-secondary hover:underline mt-4"
          >
            {paymentStatusMessage.includes("Successful") ? 'Continue Shopping' : 'Back to Cart'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <SectionTitle title="Your Shopping Cart" subtitle="Review your items and proceed to checkout." />

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-brand-secondary mb-4">Your cart is empty.</p>
          <Link
            to="/books"
            className="bg-brand-secondary hover:bg-opacity-80 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <CartItemCard key={item.id} item={item} />
            ))}
             <button
                onClick={() => { if(window.confirm('Are you sure you want to clear your cart?')) clearCart(); }}
                className="mt-4 text-sm text-red-500 hover:text-red-700 hover:underline transition-colors"
              >
                Clear Entire Cart
              </button>
          </div>

          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-xl h-fit">
            <h2 className="text-2xl font-semibold text-brand-primary mb-6 font-serif border-b pb-3">Order Summary</h2>
            <div className="space-y-3 text-brand-dark">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shippingFee > 0 ? `$${shippingFee.toFixed(2)}` : 'Free'}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (Est.):</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-brand-primary pt-3 border-t mt-3">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-brand-primary hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-lg mt-8 text-lg transition-colors shadow-md"
            >
              Proceed to Checkout
            </button>
            <Link
              to="/books"
              className="block text-center mt-4 text-brand-secondary hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
