// src/components/UpdateProfileForm.js

import React, { useState } from 'react';
import axios from 'axios';

const UpdateProfileForm = ({ userId }) => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: ''
    // Add other fields you want to update
  });

  const handleChange = e => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/users/${userId}`, userDetails);
      console.log('Update successful:', response.data);
      // Optionally show success message or redirect
    } catch (error) {
      console.error('Update error:', error);
      // Handle update error (show error message, etc.)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" value={userDetails.firstName} onChange={handleChange} placeholder="First Name" />
      <input type="text" name="lastName" value={userDetails.lastName} onChange={handleChange} placeholder="Last Name" />
      <input type="email" name="email" value={userDetails.email} onChange={handleChange} placeholder="Email" />
      {/* Add other fields as needed */}
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateProfileForm;
