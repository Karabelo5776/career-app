import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/homepage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../styles/navbar.css"; // Create a CSS file for the Navbar styling

const Navbar = () => {
  return (
    <nav className="navbar">
    <div className="logo">CareerCrafters</div>

    <ul className="nav-links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/universities">Universities</Link></li>
      <li><Link to="/courses">Courses</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  </nav>
  );
};

export default Navbar;
