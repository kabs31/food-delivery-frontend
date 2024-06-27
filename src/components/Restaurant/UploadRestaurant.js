import React, { useState } from 'react';
import './UploadRestaurant.css';
import axios from 'axios';
import config from '../Config/Config';

const UploadRestaurant = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('restaurant', JSON.stringify({ name, address }));
    formData.append('image', image);

    try {
        const response = await axios.post(`${config.BASE_URL}/api/restaurants/admin/upload`, formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        if (response.status === 200) {
          alert('Restaurant uploaded successfully');
          setName('');
          setAddress('');
          setImage(null);
        } else {
          throw new Error('Failed to upload restaurant');
        }
      } catch (error) {
        console.error('Error uploading restaurant:', error);
        alert('Error uploading restaurant. Please try again.');
      }
  };

  return (
    <div className="upload-restaurant">
      <h2>Upload Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </label>
        <label>
          Image:
          <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        </label>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadRestaurant;
