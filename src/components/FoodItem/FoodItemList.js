import React, { useEffect, useState, useContext } from 'react';
import './FoodItemList.css';
import { useParams } from 'react-router-dom';
import { CartContext } from '../Auth/CartProvider';

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const { restaurantId } = useParams();
  const { addToCart, removeFromCart, cart } = useContext(CartContext);

  useEffect(() => {
    fetch(`http://localhost:8080/api/restaurants/fooditems/${restaurantId}`)
      .then(response => response.json())
      .then(data => setFoodItems(data))
      .catch(error => console.error('Error fetching food items:', error));
  }, [restaurantId]);

  const getItemQuantity = (itemId) => {
    const item = cart.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (foodItem) => {
    console.log('Adding to cart:', foodItem); // Check if this log appears twice per click
    addToCart(foodItem);
  };

  return (
    <>
      <header className="header-box">
        <h2 className="header-title">Our Delicious Menu</h2>
        <p className="header-subtitle">Explore the variety of exquisite dishes we offer</p>
      </header>
      <div className="cards-container">
        {foodItems.map(foodItem => (
          <div className="card" key={foodItem.id}>
            <div className="card-media" style={{ backgroundImage: `url(data:image/jpeg;base64,${foodItem.image})` }}>
              <div className="price">{foodItem.price} &#x20b9;</div>
            </div>
            <div className="card-description">
              <div className="about-place">
                <div className="place">
                  <p className="place-name">{foodItem.name}</p>
                  <p className="place-speciality">{foodItem.description}</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => removeFromCart(foodItem.id)}>-</button>
                  <span>{getItemQuantity(foodItem.id)}</span>
                  <button onClick={() => handleAddToCart(foodItem)}>+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FoodItemList;
