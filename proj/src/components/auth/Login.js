
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContexts';
import axios from 'axios';
import '../../Login.css';

function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState(''); // Changed from 'email'
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const navigate = useNavigate();
  const { setUserName, setUserRole, setUserToken } = useUser();

  const fullText =
    'Our venue is equipped with the latest amenities to elevate your event. From high-definition Calibre 7129 audio-visual technology to luxurious furnishings.';

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await axios.post('http://localhost:5001/api/authenticate', {
        "username" : emailOrUsername, // Changed from just 'email'
        "password":password,
      });

      const user = response.data;
      if (!user) {
        setError('Invalid email/username or password.');
        setLoading(false);
        return;
      }
      setUserToken(user.token);
      setUserName(user.username);
      setUserRole(user.role); // Set the user role in the context
      setSuccess('Login successful!');
      setModalVisible(true);
          
      console.log(user);

      setTimeout(() => {
        // console.log(user.name);
        if (user.role === 'manager') {
          console.log("Welcome Manager!");
          navigate('/manager-dashboard');
        } else {
          console.log("Welcome User!");
          navigate('/dashboard');
        }
      }, 2000);
    } catch (err) {
      setError(err.response?.data || 'Failed to login.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDiscoverClick = () => {
    navigate('/');
  };

  return (
    <div className="login-wrapper">
      <div className="login-main-content">
        <div className="login-image-section">
          <h1 className="login-heading">[RE]MASTER02</h1>
          <p className="login-subheading">A TRIBUTE TO MANERISM</p>
          <p className="login-typed-text">{typedText}</p>
          <button className="discover-more-btn" onClick={handleDiscoverClick}>
            Discover more
          </button>
        </div>
        <div className="login-form-section">
          <div className="login-form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Email or Username" // Updated placeholder
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)} // Updated onChange
                required
                aria-label="Email or Username" // Updated aria-label
                className="login-input"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Password"
                className="login-input"
              />
              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? 'Logging in...' : 'Login'}
              </button>
              {success && <p className="success-message">{success}</p>}
              {error && <p className="error-message">{error}</p>}
            </form>
            <div className="login-footer">
              <p className="forgot-password-link">
                <a href="/forgot-password">Forgot Password?</a>
              </p>
              <p className="signup-link">
                Don't have an account? <a href="/register">Sign up here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="modal-close" onClick={closeModal}>
              &times;
            </span>
            <h2>Login Successful!</h2>
            <p>Redirecting to your dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
