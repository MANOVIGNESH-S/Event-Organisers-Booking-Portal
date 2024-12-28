
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContexts';
import axios from 'axios';
import '../../Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const navigate = useNavigate();
  const { setUserName, setUserRole } = useUser();

  const fullText = "This portal features an innovative event management system, equipped with the latest organizational tools and a sleek, user-friendly interface.";

  const roleOptions = [
    { value: '', label: 'Select Role', disabled: true },
    { value: 'organiser', label: 'Event Organiser' },
    { value: 'manager', label: 'Event Manager' }
  ];

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
    
    if (password !== retypePassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5001/api/register', {
        name,
        email,
        password,
        role
      });
      setUserName(name);
      setUserRole(role);
      setSuccess('Registration successful!');
      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
        navigate(role === 'organiser' ? '/dashboard' : '/manager-dashboard');
      }, 2000);
    } catch (err) {
      setError(`Error: ${err.response?.data || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setModalVisible(false);

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="welcome-section">
          <h1>[RE]MASTER02</h1>
          <h2>A TRIBUTE TO EVENT PLANNING</h2>
          <p style={{ color: 'wheat' }}>{typedText}</p>
          <Link to="/" className="discover-button">Discover more</Link>
        </div>
        <div className="registration-form-section">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-label="Name"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
            />
            <input
              type="password"
              placeholder="Retype Password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              required
              aria-label="Retype Password"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              aria-label="Role"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ))}
            </select>
            <button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
          </form>
          <div className="registration-footer">
            <p className="login-link">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2>Registration Successful!</h2>
            <p>Redirecting to your dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;