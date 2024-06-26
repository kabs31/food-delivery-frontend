import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the updated Navbar.css file

const Navbar = () => {
  return (
    <header className="header">
      <h1 className="logo"><Link to="/">Tomato</Link></h1>
      <ul className="main-nav">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/contact" className="nav-link">Contact</Link></li>
        <li><Link to="/cart" className="nav-link">Cart</Link></li>
      </ul>
    </header>
  );
};

export default Navbar;
