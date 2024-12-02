import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/homepage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Navbar Section */}
      <nav className="navbar">
        <div className="logo">Study with Us</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/universities">Universities</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>

      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        {/* Floating Elements */}
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>

        {/* Hero Content */}
        <div className="hero-content">
          <div className="hero-text">
            <h1>Shape Your Future With Study with Us</h1>
            <p>Discover your perfect career path and unlock your potential with our comprehensive guidance platform. Join thousands of successful students who have found their dream careers.</p>
            <div className="cta-buttons">
              <Link to="/explore" className="cta-button primary-btn">Explore Now</Link>
              <Link to="/login" className="cta-button secondary-btn">Get Started</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://picsum.photos/800/600?random=1" alt="Students learning" />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer-container">
        {/* Footer Waves */}
        <div className="footer-waves">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>

        {/* Footer Content */}
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section">
            <h3>Study with Us</h3>
            <p>Shaping futures through education excellence. Join us in your journey towards academic success.</p>
            <div className="social-icons">
              <a href="https://facebook.com" className="social-icon"><FaFacebook /></a>
              <a href="https://twitter.com" className="social-icon"><FaTwitter /></a>
              <a href="https://linkedin.com" className="social-icon"><FaLinkedin /></a>
              <a href="https://instagram.com" className="social-icon"><FaInstagram /></a>
            </div>
          </div>

          {/* Resources Section */}
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Academic Calendar</a></li>
              <li><a href="#">Student Portal</a></li>
              <li><a href="#">Library</a></li>
              <li><a href="#">Research</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h4>Contact Us</h4>
            <div className="contact-info">
              <p><i className="fas fa-phone"></i> +1 234 567 8900</p>
              <p><i className="fas fa-envelope"></i> info@studywithus.edu</p>
              <p><i className="fas fa-map-marker-alt"></i> 123 Education Ave, Learning City</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Study with Us. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
            <Link to="/cookie-policy">Cookie Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
