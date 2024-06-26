import React from 'react';
import RestaurantList from '../Restaurant/RestaurantList';
import FoodItemList from '../FoodItem/FoodItemList';
import './Home.css';

function Home() {
  return (
    <>
      <header className="header-box">
        <h2 className="header-title">Explore Restaurants Near You</h2>
        <p className="header-subtitle">Discover delicious dishes and cuisines from local restaurants.</p>
      </header>
      <RestaurantList />
    </>
  );
}

export default Home;
