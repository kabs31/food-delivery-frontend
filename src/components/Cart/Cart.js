import React, { useContext, useState } from 'react';
import { CartContext } from '../Auth/CartProvider';
import './Cart.css'; // Add styles for the cart
import { PiShoppingCartBold } from 'react-icons/pi'; // Import a cart icon

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  // Calculate the total price of all items in the cart
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle Razorpay payment
  const handlePayment = () => {
    if (totalPrice === 0) {
      alert("Your cart is empty");
      return;
    }

    const options = {
      key: "rzp_test_ffSb2yIkIflJH9", // Replace with your Razorpay key
      amount: totalPrice * 100, // Razorpay accepts amount in paisa (1 INR = 100 paisa)
      currency: "INR",
      name: "Your Shop Name",
      description: "Purchase Description",
      handler: function (response) {
        alert("Payment successful. Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Your Name",
        email: "your-email@example.com",
        contact: "1234567890",
      },
      notes: {
        address: "Your Shop Address",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <div className={`cart-icon ${isOpen ? 'open' : ''}`} onClick={toggleCart}>
        <PiShoppingCartBold size={24} />
      </div>
      <div className={`cart ${isOpen ? 'open' : ''}`}>
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <ul>
              {cart.map(item => (
                <li key={item.id}>
                  {item.name} - {item.price} &#x20b9; x {item.quantity} = {item.price * item.quantity} &#x20b9;
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </li>
              ))}
            </ul>
            <div className="total">
              <strong>Total:</strong> {totalPrice} &#x20b9;
            </div>
            <button className="pay-button" onClick={handlePayment}>Pay with Razorpay</button>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
