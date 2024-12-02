import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaUniversity, FaBookReader, FaClock, FaStar, FaFilter } from 'react-icons/fa';
import Navbar from './Navbar'; // Import the Navbar component
import './styles/courses.css';
import './styles/homepage.css';

const Courses = () => {
  // State variables
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Fetch courses from API
  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:8081/courses');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCourses(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Filter courses based on search term and selected university
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.university.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUniversity =
      selectedUniversity === 'all' || course.university === selectedUniversity;
    return matchesSearch && matchesUniversity;
  });

  // Get unique universities for the filter dropdown
  const universities = [...new Set(courses.map((course) => course.university))];

  if (loading)
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading amazing courses...</p>
        </div>
      </>
    );

  if (error)
    return (
      <>
        <Navbar />
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={fetchCourses}>Try Again</button>
        </div>
      </>
    );

  return (
    <>
      <Navbar /> {/* Add Navbar at the top */}
      <div className="courses-page">
        <div className="courses-header">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Discover Your Perfect Course
          </motion.h1>

          <div className="search-filter-container">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              className="filter-button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FaFilter /> Filter
            </button>

            {isFilterOpen && (
              <motion.div
                className="filter-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <select
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                >
                  <option value="all">All Universities</option>
                  {universities.map((uni) => (
                    <option key={uni} value={uni}>
                      {uni}
                    </option>
                  ))}
                </select>
              </motion.div>
            )}
          </div>
        </div>

        <motion.div
          className="card-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              className="course-card"
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
            >
              <div className="course-image">
                <img
                  src={`https://picsum.photos/400/250?random=${course.id}`}
                  alt={course.name}
                />
                <div className="course-overlay">
                  <span className="course-duration">
                    <FaClock /> 6 months
                  </span>
                  <span className="course-rating">
                    <FaStar /> 4.5
                  </span>
                </div>
              </div>

              <div className="course-content">
                <h2>{course.name}</h2>

                <div className="course-info">
                  <p className="university">
                    <FaUniversity />
                    {course.university}
                  </p>

                  <div className="requirements">
                    <FaBookReader />
                    <p>{course.requirements}</p>
                  </div>
                </div>

                <div className="course-footer">
                  <button className="enroll-button">Learn More</button>
                  <span className="course-spots">20 spots remaining</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredCourses.length === 0 && (
          <div className="no-results">
            <h2>No courses found</h2>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Footer Component */}
      <footer className="footer-container">
        <div className="footer-waves">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
        
        <div className="footer-content">
          <div className="footer-section">
            <h3>CareerCrafters</h3>
            <p>Shaping futures through education excellence. Join us in your journey towards academic success.</p>
            <div className="social-icons">
              <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Academic Calendar</a></li>
              <li><a href="#">Student Portal</a></li>
              <li><a href="#">Library</a></li>
              <li><a href="#">Research</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Us</h4>
            <div className="contact-info">
              <p><i className="fas fa-phone"></i> +1 234 567 8900</p>
              <p><i className="fas fa-envelope"></i> info@careercrafters.edu</p>
              <p><i className="fas fa-map-marker-alt"></i> 123 Education Ave, Learning City</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 CareerCrafters. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Courses;