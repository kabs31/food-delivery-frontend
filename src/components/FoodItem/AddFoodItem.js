import React, { useState } from 'react';
import axios from 'axios';
import './AddFoodItem.css'

const AddFoodItem = () => {
  const [foodItem, setFoodItem] = useState({
    restaurantId: '',
    name: '',
    price: '',
    description: ''
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodItem({
      ...foodItem,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('foodItem', JSON.stringify(foodItem));
    formData.append('image', image);

    axios.post('http://localhost:8080/api/restaurants/fooditems/admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response.data);
        alert('FoodItem uploaded successfully');
        // Optionally reset form here
      })
      .catch(error => alert('Error uploading food item:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Restaurant ID:
        <input type="text" name="restaurantId" value={foodItem.restaurantId} onChange={handleChange} required />
      </label>
      <label>
        Name:
        <input type="text" name="name" value={foodItem.name} onChange={handleChange} required />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={foodItem.price} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <textarea name="description" value={foodItem.description} onChange={handleChange} required />
      </label>
      <label>
        Image:
        <input type="file" onChange={handleFileChange} required />
      </label>
      <button type="submit">Add Food Item</button>
    </form>
  );
};

export default AddFoodItem;
