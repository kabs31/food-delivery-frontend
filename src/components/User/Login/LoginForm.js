// src/components/LoginForm.js
import React, { useState,useContext } from 'react';
import axios from 'axios';
import './LoginForm.css'; // Import the CSS file
import { useNavigate  } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthProvider';
import config from '../../Config/Config';

const LoginForm = () => {
  const navigate = useNavigate(); 
  const handleLogin = () => navigate('/'); 
  const { login } = useContext(AuthContext);
  const [loginRequest, setLoginRequest] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.BASE_URL}/api/users/login`, loginRequest, { withCredentials: true, crossDomain: true });
      console.log('Login successful:', response.data);
      // Call login function to update authentication status
      login();

      // Redirect to update-profile page
      handleLogin();
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (show error message, etc.)
    }
  };

  return (
    <div className="login-container">
  <div className="login-form-container">
    <h2>Login</h2>
    <form className="login-form" onSubmit={handleSubmit}>
      <input className="login-input" type="email" name="email" value={loginRequest.email} onChange={handleChange} placeholder="Email" required />
      <input className="login-input" type="password" name="password" value={loginRequest.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p class="login-link">New user? <a href="/register">Register</a></p>
  </div>
</div>

  );
};

export default LoginForm;
