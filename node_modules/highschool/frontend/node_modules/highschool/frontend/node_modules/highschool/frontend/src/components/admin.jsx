import React, { useState, useEffect } from 'react';
import "../styles/admin.css";
import '../styles/modals.css';
import axios from 'axios';
//import Navbar from '../components/Navbar'; // Import the Navbar component
import { useNavigate } from 'react-router-dom';
import "../styles/admin.css";
import '../styles/modals.css';
import '../styles/homepage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
//import { Link } from 'react-router-dom';

const Admin = () => {
  const [showAddInstitutionModal, setShowAddInstitutionModal] = useState(false);
  const [showAddFacultyModal, setShowAddFacultyModal] = useState(false);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showDeleteInstitutionModal, setShowDeleteInstitutionModal] = useState(false);
  const [showPublishAdmissionsModal, setShowPublishAdmissionsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);

  const [institutionName, setInstitutionName] = useState('');
  const [facultyName, setFacultyName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [institutionToDelete, setInstitutionToDelete] = useState('');
  const [admissionDetails, setAdmissionDetails] = useState('');
  const [profileDetails, setProfileDetails] = useState({ name: '', email: '', phone: '' });
  
  const [numberOfStudents, setNumberOfStudents] = useState('');
  const [numberOfDepartments, setNumberOfDepartments] = useState('');
  const [numberOfCourses, setNumberOfCourses] = useState('');
  const [universityLogo, setUniversityLogo] = useState(null);
  
  // State for adding faculty
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');
  //
  
  // Admissions data
  const [admissionsData, setAdmissionsData] = useState([
    { id: 1, institution: 'Institution A', studentName: 'John Doe', faculty: 'Faculty of Science', course: 'Physics', status: 'Admitted' },
    { id: 2, institution: 'Institution B', studentName: 'Jane Smith', faculty: 'Faculty of Arts', course: 'Literature', status: 'Pending' },
  ]);

  const [institutions, setInstitutions] = useState([]); // State for institutions
  const [faculties, setFaculties] = useState([]); // State for faculties
  const [applications, setApplications] = useState([]); 

  useEffect(() => {
    fetchInstitutions();
    fetchFaculties();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/applications`); // Assuming there is an endpoint to fetch all applications
      setApplications(response.data);
      setShowApplicationsModal(true); // Show the applications modal after fetching
    } catch (error) {
      console.error('Error fetching applications:', error);
      alert('Failed to fetch applications. Please try again.');
    }
  };

  const fetchInstitutions = async () => {
    try {
      const response = await axios.get('http://localhost:8081/institutions');
      setInstitutions(response.data);
    } catch (error) {
      console.error('Error fetching institutions:', error);
    }
  };

  const fetchFaculties = async () => {
    try {
      const response = await axios.get('http://localhost:8081/faculties');
      setFaculties(response.data);
    } catch (error) {
      console.error('Error fetching faculties:', error);
    }
  };

  const handleAddInstitution = async () => {
    // Validate inputs before sending
    if (!institutionName || !numberOfStudents || !numberOfDepartments || !numberOfCourses || !universityLogo) {
      alert('Please fill in all fields before submitting.');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', institutionName);
    formData.append('number_of_students', numberOfStudents);
    formData.append('number_of_departments', numberOfDepartments);
    formData.append('number_of_courses', numberOfCourses);
    formData.append('logo', universityLogo);
  
    try {
      const response = await fetch('http://localhost:8081/institutions', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      alert('Institution added:', data);
      fetchInstitutions();
      setShowAddInstitutionModal(false);
      setInstitutionName('');
      setNumberOfStudents('');
      setNumberOfDepartments('');
      setNumberOfCourses('');
      setUniversityLogo(null);
  
    } catch (error) {
      console.error('Error adding institution:', error);
      alert('Failed to add institution. Please try again.');
    }
  };
  
  
  const handleAddFaculty = async () => {
    try {
      const response = await fetch('http://localhost:8081/faculties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: facultyName,
          institution_id: selectedInstitution,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      alert('Faculty  successful:', data);
      fetchFaculties();
      setShowAddFacultyModal(false);
      setFacultyName('');
      setSelectedInstitution('');
    } catch (error) {
      console.error('Error adding faculty:', error);
      alert('Failed to add faculty. Please try again.');
    }
  };
  
  
  const handleAddCourse = async () => {
    try {
      const response = await fetch('http://localhost:8081/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: courseName,
          faculty: selectedFaculty, 
          institution: selectedInstitution,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      alert('Course added: successful', data);
      
      // Reset state after successful addition
      setShowAddCourseModal(false);
      setCourseName('');
      setSelectedInstitution('');
      setSelectedFaculty('');
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Course added:', data);
    }
  };
  
  

  const handleDeleteInstitution = async (institutionId) => {
    if (window.confirm("Are you sure you want to delete this institution? This action cannot be undone.")) {
      try {
        await axios.delete(`http://localhost:8081/institutions/${institutionId}`);
        alert('Institution deleted:', institutionId);
        fetchInstitutions();
        setShowDeleteInstitutionModal(false);
      } catch (error) {
        console.error('Error deleting institution:', error);
        alert('Failed to delete institution. Please try again.');
      }
    }
  };

  const handlePublishAdmissions = () => {
    alert('admissions published successfully');
    setShowPublishAdmissionsModal(false);
  };

  const handleProfileUpdate = () => {
    console.log('profile updated successfully');
    setShowProfileModal(false);
  };
  const handleLogout = () => {
    // Clear any stored authentication tokens
    localStorage.removeItem('authToken'); // Assuming you store the token in localStorage
    sessionStorage.clear(); // Clear session storage if used
  
    // Redirect to the login page
    navigate('/login');
  };
  const navigate = useNavigate();

  return (

    
    <div className="admin-page">
        
    <div className="sidebar">
        <h1>Admin Panel</h1>
        <div className="admin-buttons">
        <button id='logout' className="admin-button" onClick={handleLogout}>Log Out</button>
            <button className="admin-button" onClick={() => setShowAddInstitutionModal(true)}>Add Institution</button>
            <button className="admin-button" onClick={() => setShowAddFacultyModal(true)}>Add Faculty</button>
            <button className="admin-button" onClick={() => setShowAddCourseModal(true)}>Add Course</button>
            <button className="admin-button" onClick={() => setShowDeleteInstitutionModal(true)}>Delete Institution</button>
            <button className="admin-button" onClick={() => setShowPublishAdmissionsModal(true)}>Publish Admissions</button>
            <button className="admin-button" onClick={() => setShowProfileModal(true)}>Profile</button>
            <button className="admin-button" onClick={fetchApplications}>Show Applications</button>
        </div>
    </div>
    

      {/* Modal for Adding Institution */}
      {showAddInstitutionModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddInstitutionModal(false)}>&times;</span>
            <h2>Add High Learning Institution</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddInstitution(); }}>
              <input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                placeholder="Institution Name"
                required
              />
              <input
                type="number"
                value={numberOfStudents}
                onChange={(e) => setNumberOfStudents(e.target.value)}
                placeholder="Number of Students"
                required
              />
              <input
                type="number"
                value={numberOfDepartments}
                onChange={(e) => setNumberOfDepartments(e.target.value)}
                placeholder="Number of Departments"
                required
              />
              <input
                type="number"
                value={numberOfCourses}
                onChange={(e) => setNumberOfCourses(e.target.value)}
                placeholder="Number of Courses"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setUniversityLogo(e.target.files[0]);
                  }
                }}
                required
              />

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Adding Faculty */}
      {showAddFacultyModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddFacultyModal(false)}>&times;</span>
            <h2>Add Faculty</h2>
            <input
              type="text"
              value={facultyName}
              onChange={(e) => setFacultyName(e.target.value)}
              placeholder="Faculty Name"
              required
            />
<select
              value={selectedInstitution}
              onChange={(e) => {
                setSelectedInstitution(e.target.value);
                setSelectedFaculty(''); // Reset faculty when institution changes
              }}
              required
            >
              <option value="" disabled>Select Institution</option>
              {institutions.map((institution) => (
                <option key={institution.id} value={institution.id}> {/* Use institution ID */}
                  {institution.name}
                </option>
              ))}
            </select>
            <button onClick={handleAddFaculty}>Submit</button>
          </div>
        </div>
      )}

      {/* Modal for Adding Course */}
      {showAddCourseModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddCourseModal(false)}>&times;</span>
            <h2>Add Course</h2>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Course Name"
              required
            />
            <select
              value={selectedInstitution}
              onChange={(e) => {
                setSelectedInstitution(e.target.value);
                setSelectedFaculty(''); // Reset faculty when institution changes
              }}
              required
            >
              <option value="" disabled>Select Institution</option>
              {institutions.map((institution) => (
                <option key={institution.id} value={institution.id}> {/* Use institution ID */}
                  {institution.name}
                </option>
              ))}
            </select>
            <select value={selectedFaculty} onChange={(e) => setSelectedFaculty(e.target.value)}>
              <option value="" disabled>Select Faculty</option>
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
              ))}
            </select>
            <button onClick={handleAddCourse}>Submit</button>
          </div>
        </div>
      )}


      {/* Modal for Deleting Institution */}
      {showDeleteInstitutionModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowDeleteInstitutionModal(false)}>&times;</span>
            <h2>Delete Institution</h2>
            <table>
              <thead>
                <tr>
                  <th>Institution Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {institutions.map((institution) => (
                  <tr key={institution.id}>
                    <td>{institution.name}</td>
                    <td>
                      <button onClick={() => handleDeleteInstitution(institution.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for Publishing Admissions */}
      {showPublishAdmissionsModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowPublishAdmissionsModal(false)}>&times;</span>
            <h2>Publish Admissions</h2>
            <table>
              <thead>
                <tr>
                  
                  <th>Name of Student</th>
                  <th>Faculty</th>
                  <th>Course Admitted</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                    {[
                        { studentName: "Thabo Lebese", university: "Botho Uneversity", course: "Computer Science", status: "Accepted" },
                        { studentName: "Thaoto Lebese", university: "Lesotho collage of education", course: "Mechanical Engineering", status: "Pending" },
                        { studentName: "mavis lebese", university: "national University of Lesotho", course: "Physics", status: "Rejected" }
                    ].length > 0 ? (
                        [
                            { studentName: "Thabo Lebes", university: "Botho Uneversity", course: "Computer Science", status: "Accepted" },
                            { studentName: "Thaoto Lebese", university: "Lesotho collage of education", course: "Mechanical Engineering", status: "Pending" },
                            { studentName: "mavis lebese", university: "national University of Lesotho", course: "Physics", status: "Rejected" }
                        ].map((admission, index) => (
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
            <button onClick={handlePublishAdmissions}>Publish Admissions</button>
          </div>
        </div>
      )}

      {/* Modal for Admin Profile */}
      {showProfileModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowProfileModal(false)}>&times;</span>
            <h2>Admin Profile</h2>
            <input
              type="text"
              value={profileDetails.name}
              onChange={(e) => setProfileDetails({ ...profileDetails, name: e.target.value })}
              placeholder="Name"
              required
            />
            <input
              type="email"
              value={profileDetails.email}
              onChange={(e) => setProfileDetails({ ...profileDetails, email: e.target.value })}
              placeholder="Email"
              required
            />
            <input
              type="text"
              value={profileDetails.phone}
              onChange={(e) => setProfileDetails({ ...profileDetails, phone: e.target.value })}
              placeholder="Phone Number"
              required
            />
            <button onClick={handleProfileUpdate}>Update Profile</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
