import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/contact.css';
import '../styles/homepage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`contact-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
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

      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div className="contact-content">
        <h1>Contact Us</h1>
        <p id='myp'>We'd love to hear from you! Fill out the form below, and we'll respond as soon as possible.</p>

        {isSubmitted ? (
          <div className="success-message">
            <h2>Thank You!</h2>
            <p>Your message has been sent successfully. We will be in touch shortly.</p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="send-new-message"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone Number"
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className={errors.subject ? 'error' : ''}
              />
              {errors.subject && <span className="error-message">{errors.subject}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className={errors.message ? 'error' : ''}
              ></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button type="submit" className="submit-button">Send Message</button>
          </form>
        )}

        <div className="contact-info">
          <div className="info-item">
            <span className="icon">📍</span>
            <p>Limkokwing Maseru, Main Campus</p>
          </div>
          <div className="info-item">
            <span className="icon">📞</span>
            <p>+266 57760576</p>
          </div>
          <div className="info-item">
            <span className="icon">✉️</span>
            <p>contact@careercrafters.com</p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
      /* New Navigation Styles */
        .navbar {
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .light-mode .navbar {
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .dark-mode .navbar {
          background: rgba(26, 26, 26, 0.9);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: ${isDarkMode ? '#fff' : '#333'};
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-links li a {
          text-decoration: none;
          color: ${isDarkMode ? '#fff' : '#333'};
          font-weight: 500;
          transition: all 0.3s ease;
          padding: 0.5rem 1rem;
          border-radius: 8px;
        }
          .theme-toggle{
          padding-top:5rem;
          marging-right: 0rem;
          }

        .nav-links li a:hover {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
          transform: translateY(-2px);
        }

        /* Adjust contact container padding to account for fixed navbar */
        .contact-container {
          padding-top: 5rem;
        }
        .contact-container {
          min-height: 100vh;
          padding: 2rem;
          transition: all 0.3s ease;
        }

        .light-mode {
          background: #f0f2f5;
          color: #333;
        }

        .dark-mode {
          background: #1a1a1a;
          color: #fff;
        }

        .contact-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          border-radius: 20px;
          position: relative;
        }

        .light-mode .contact-content {
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 20px 20px 60px #d1d9e6,
                     -20px -20px 60px #ffffff;
        }

        .dark-mode .contact-content {
          background: rgba(40, 40, 40, 0.9);
          box-shadow: 20px 20px 60px #151515,
                     -20px -20px 60px #1f1f1f;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          text-align: center;
        }

        .subtitle {
          text-align: center;
          margin-bottom: 3rem;
          color: ${isDarkMode ? '#aaa' : '#666'};
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        label {
          font-weight: 500;
          color: ${isDarkMode ? '#fff' : '#333'};
        }

        input, textarea {
          padding: 1rem;
          border-radius: 10px;
          border: none;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .light-mode input, .light-mode textarea {
          background: #f0f2f5;
          box-shadow: inset 5px 5px 10px #d1d9e6,
                     inset -5px -5px 10px #ffffff;
          color: #333;
        }

        .dark-mode input, .dark-mode textarea {
          background: #2d2d2d;
          box-shadow: inset 5px 5px 10px #252525,
                     inset -5px -5px 10px #353535;
          color: #fff;
        }

        input:focus, textarea:focus {
          outline: none;
          transform: scale(1.01);
        }

        .error {
          border: 1px solid #ff4444;
        }

        .error-message {
          color: #ff4444;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }

        .submit-button {
          padding: 1rem 2rem;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
          background: linear-gradient(145deg, #6366f1, #4f46e5);
          color: white;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(79, 70, 229, 0.4);
        }

        .success-message {
          text-align: center;
          padding: 3rem;
          animation: fadeIn 0.5s ease;
        }

        .success-icon {
          font-size: 4rem;
          color: #4CAF50;
          margin-bottom: 1rem;
        }

        .send-new-message {
          margin-top: 2rem;
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: 2px solid ${isDarkMode ? '#fff' : '#333'};
          color: ${isDarkMode ? '#fff' : '#333'};
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .send-new-message:hover {
          background: ${isDarkMode ? '#fff' : '#333'};
          color: ${isDarkMode ? '#333' : '#fff'};
        }

        .contact-info {
          margin-top: 4rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          border-radius: 15px;
          transition: all 0.3s ease;
        }

        .light-mode .info-item {
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 5px 5px 15px #d1d9e6,
                     -5px -5px 15px #ffffff;
        }

        .dark-mode .info-item {
          background: rgba(45, 45, 45, 0.8);
          box-shadow: 5px 5px 15px #151515,
                     -5px -5px 15px #1f1f1f;
        }

        .icon {
          font-size: 2rem;
        }

        .theme-toggle {
          position: absolute;
          top: 2rem;
          right: 2rem;
        }

        .theme-toggle button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .theme-toggle button:hover {
          transform: scale(1.1);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .contact-info {
            grid-template-columns: 1fr;
          }

          .contact-content {
            padding: 1rem;
          }

          h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
