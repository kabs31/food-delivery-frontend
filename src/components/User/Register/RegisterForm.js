import React, { useState, useContext } from 'react';
import axios from 'axios';
import './RegisterForm.css'; // Import the CSS file
import { AuthContext } from '../../Auth/AuthProvider';
import { useNavigate  } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate(); 
  const handleRegister = () => navigate('/login'); 
  const { login } = useContext(AuthContext); // Access login function from AuthContext

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/register', user, { withCredentials: true });
      console.log('Registration successful:', response.data);
      handleRegister();
      
    } catch (error) {
      console.error('Registration error:', error);
      // Handle registration error (show error message, etc.)
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input className="register-input" type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" required />
          <input className="register-input" type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
          <input className="register-input" type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
        <p className="register-link">Already a user? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default RegisterForm;
