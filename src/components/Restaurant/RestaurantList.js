import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RestaurantList.css';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  return (
    <div className="cards-container">
      {restaurants.map(restaurant => (
        <Link key={restaurant.id} to={`/restaurant/${restaurant.id}/fooditems`} className="card-link">
          <div className="card">
            <div className="card-media" style={{ backgroundImage: `url(data:image/jpeg;base64,${restaurant.image})` }}>
              <div className="discount">40% OFF<p>Up to &#x20b9;80</p></div>
              <div className="pro-discount">PRO extra 15% OFF</div>
              <div className="delivery-time">39 mins</div>
            </div>
            <div className="card-description">
              <div className="about-place">
                <div className="place">
                  <p className="place-name">{restaurant.name}</p>
                  <p className="place-speciality">{restaurant.speciality}</p>
                </div>
                <div className="place-review">
                  <p className="rating">{restaurant.rating} &#x2605;</p>
                  <p className="per-person">&#x20b9; {restaurant.price} per one</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RestaurantList;
