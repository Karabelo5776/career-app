import React, { useEffect, useState } from 'react';
import "../styles/university.css";
import '../styles/scroll.css';
import '../styles/homepage.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

const University = () => {
    const [universities, setUniversities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [profile, setProfile] = useState({ name: '', email: '', phone: '', passGrades: '' });
    const [applications, setApplications] = useState([]);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showApplicationsModal, setShowApplicationsModal] = useState(false);
    const [showApplyFormModal, setShowApplyFormModal] = useState(false);

    const [newApplication, setNewApplication] = useState({
        studentName: '',
        phoneNumber: '',
        student_id: '', 
        university: '',
        course_id: '', 
        faculty: '',
        major_subject: '', 
        grades: [{ subject: '', grade: '' }]
    });

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const response = await fetch('http://localhost:8081/university');
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error(`Server Error: ${errorData.message}`);
                    throw new Error(`Error: ${response.status}, Message: ${errorData.message || 'Failed to fetch universities'}`);
                }
                const data = await response.json();
                setUniversities(data);
            } catch (error) {
                console.error('Error fetching universities:', error);
            }
        };
        
        fetchUniversities();
    }, []);

    const filteredUniversities = universities.filter(
        (university) => university.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleProfileUpdate = () => {
        console.log('Updating profile:', profile);
        setShowProfileModal(false);
    };

    const handleInputChange = (field, value) => {
        setNewApplication({ ...newApplication, [field]: value });
    };

    const handleApply = async () => {
        const { studentName, phoneNumber, student_id, university, course_id, faculty, major_subject, grades } = newApplication;
        const payload = {
            student_name: studentName,
            phone_number: phoneNumber,
            student_id,
            university,
            course_id,
            faculty,
            major_subject,
            application_date: new Date().toISOString(),
            subject1: grades[0]?.subject || '',
            grade1: grades[0]?.grade || '',
            subject2: grades[1]?.subject || '',
            grade2: grades[1]?.grade || '',
            subject3: grades[2]?.subject || '',
            grade3: grades[2]?.grade || '',
            subject4: grades[3]?.subject || '',
            grade4: grades[3]?.grade || '',
            subject5: grades[4]?.subject || '',
            grade5: grades[4]?.grade || '',
            subject6: grades[5]?.subject || '',
            grade6: grades[5]?.grade || '',
            subject7: grades[6]?.subject || '',
            grade7: grades[6]?.grade || '',
            subject8: grades[7]?.subject || '',
            grade8: grades[7]?.grade || ''
        };
    
        try {
            const response = await fetch('http://localhost:8081/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Server Error: ${errorData.message}`);
                throw new Error(`Error: ${response.status}, Message: ${errorData.message || 'Failed to submit application'}`);
            }
            const data = await response.json();
            setApplications([...applications, data]);
            setShowApplyFormModal(false);
            alert('Application submitted successfully!');
            setNewApplication({
                studentName: '',
                phoneNumber: '',
                student_id: '',
                university: '',
                course_id: '',
                faculty: '',
                major_subject: '',
                grades: [{ subject: '', grade: '' }]
            });
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Application submission failed.');
        }
    };
    
    const handleAddGrade = () => {
        setNewApplication({
            ...newApplication,
            grades: [...newApplication.grades, { subject: '', grade: '' }]
        });
    };

    return (
        <div className="universities-page">
            <Navbar />
            <div className="sidebar">
                <button className="view-applications-button" onClick={() => setShowApplicationsModal(true)}>
                    View Admissions
                </button>
                <button className="apply-form-button" onClick={() => setShowApplyFormModal(true)}>
                    Apply for a Course
                </button>
                <button className="view-profile-button" onClick={() => setShowProfileModal(true)}>
                    View/Update Profile
                </button>
            </div>

            <div className="main-content">
                {filteredUniversities.length > 0 ? (
                    <table className="university-table">
                        <thead>
                            <tr>
                                <th>University Name</th>
                                <th>Number of Students</th>
                                <th>Number of Departments</th>
                                <th>Number of Courses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUniversities.map((university) => (
                                <tr key={university.id}>
                                    <td>{university.name}</td>
                                    <td>{university.number_of_students}</td>
                                    <td>{university.number_of_departments}</td>
                                    <td>{university.number_of_courses}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No universities or courses found</p>
                )}
            </div>

            {/* Profile Modal */}
            {showProfileModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowProfileModal(false)}>&times;</span>
                        <h2>My Profile</h2>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                        <label>Email:</label>
                        <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        />
                        <label>Phone:</label>
                        <input
                            type="text"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        />
                        <label>Pass Grades:</label>
                        <input
                            type="text"
                            value={profile.passGrades}
                            onChange={(e) => setProfile({ ...profile, passGrades: e.target.value })}
                        />
                        <button className="update-profile-button" onClick={handleProfileUpdate}>Update Profile</button>
                    </div>
                </div>
            )}
          
            {/* Admissions Modal */}
            {showApplicationsModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowApplicationsModal(false)}>&times;</span>
                        <h2>My Admissions</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>University Name</th>
                                    <th>Course</th>
                                    <th>Admission Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.length > 0 ? (
                                    applications.map((admission, index) => (
                                        <tr key={index}>
                                            <td>{admission.studentName}</td>
                                            <td>{admission.university}</td>
                                            <td>{admission.course}</td>
                                            <td>{admission.status}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No admissions found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Apply Form Modal */}
            {showApplyFormModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowApplyFormModal(false)}>&times;</span>
                        <h2>Apply for a Course</h2>
                        <form>
                            <input
                                type="text"
                                placeholder="Student Name"
                                value={newApplication.studentName}
                                onChange={(e) => handleInputChange('studentName', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={newApplication.phoneNumber}
                                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Student ID"
                                value={newApplication.student_id}
                                onChange={(e) => handleInputChange('student_id', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="University"
                                value={newApplication.university}
                                onChange={(e) => handleInputChange('university', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Course ID"
                                value={newApplication.course_id}
                                onChange={(e) => handleInputChange('course_id', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Faculty"
                                value={newApplication.faculty}
                                onChange={(e) => handleInputChange('faculty', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Major Subject"
                                value={newApplication.major_subject}
                                onChange={(e) => handleInputChange('major_subject', e.target.value)}
                            />
                            {newApplication.grades.map((grade, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        placeholder="Subject"
                                        value={grade.subject}
                                        onChange={(e) => {
                                            const newGrades = [...newApplication.grades];
                                            newGrades[index].subject = e.target.value;
                                            setNewApplication({ ...newApplication, grades: newGrades });
                                        }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Grade"
                                        value={grade.grade}
                                        onChange={(e) => {
                                            const newGrades = [...newApplication.grades];
                                            newGrades[index].grade = e.target.value;
                                            setNewApplication({ ...newApplication, grades: newGrades });
                                        }}
                                    />
                                </div>
                            ))}
                            <button type="button" onClick={handleAddGrade}>Add Another Subject</button>
                            <button type="button" onClick={handleApply}>Submit Application</button>
                        </form>
                    </div>
                </div>
            )}

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
        </div>
    );
};

export default University;