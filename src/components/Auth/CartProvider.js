import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        console.log('addToCart called for:', item);
        setCart(prevCart => {
            console.log('setCart called for:', item);
          const itemIndex = prevCart.findIndex(i => i.id === item.id);
          if (itemIndex > -1) {
            const updatedCart = [...prevCart];
            console.log("before add"+updatedCart[itemIndex].quantity);
            updatedCart[itemIndex].quantity += 1; // Increment quantity
            console.log("after add"+updatedCart[itemIndex].quantity);
            return updatedCart;
          } else {
            return [...prevCart, { ...item, quantity: 1 }];
             // Add new item with quantity 1
          }
          
        });
      };
      
      const removeFromCart = (itemId) => {
        setCart(prevCart => {
          const itemIndex = prevCart.findIndex(i => i.id === itemId);
          if (itemIndex > -1) {
            const updatedCart = [...prevCart];
            if (updatedCart[itemIndex].quantity > 1) {
              updatedCart[itemIndex].quantity -= 1; // Decrease quantity if more than 1
            } else {
              updatedCart.splice(itemIndex, 1); // Remove item if quantity is 1
            }
            return updatedCart;
          } else {
            return prevCart; // Return previous state if item not found
          }
        });
      };
      

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
