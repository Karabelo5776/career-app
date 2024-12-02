import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [userType, setUserType] = useState('student');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setProfilePicturePreview(URL.createObjectURL(file));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Login successful');
        setError('');
        const userType = data.user.user_type;

        if (userType === 'admin') {
          navigate('/admin');
        } else if (userType === 'institute') {
          navigate('/institution');
        } else if (userType === 'student') {
          navigate('/universities');
        } else {
          setError('Unknown user type. Please contact support.');
        }
      } else {
        setError(data.error);
        setSuccess('');
      }
    } catch (err) {
      setError('Error logging in. Please try again later.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password || !name || !profilePicture) {
      setError('Please fill in all fields and upload a profile picture.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('user_type', userType); 
    formData.append('profilePicture', profilePicture);

    try {
      const response = await fetch('http://localhost:8081/register', {
        method: 'POST',
        body: formData, 
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful. You can now log in.');
        setError('');
        setIsRegistering(false); 
      } else {
        setError(data.error);
        setSuccess('');
      }
    } catch (err) {
      setError('Error registering. Please try again later.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>{isRegistering ? 'Register' : 'Login'}</h1>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={isRegistering ? handleRegister : handleLogin} className="login-form">
        {isRegistering && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            {profilePicturePreview && <img src={profilePicturePreview} alt="Profile Preview" />}
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="student">Student</option>
              <option value="institute">Institute</option>
              <option value="admin">Admin</option>
            </select>
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Processing...' : isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
      <p>
        {isRegistering ? 'Already have an account?' : 'Don’t have an account?'}
        <span
          onClick={() => setIsRegistering(!isRegistering)}
          className="toggle-register"
        >
          {isRegistering ? ' Login' : ' Register'}
        </span>
      </p>
    </div>
  );
};

export default Login;
