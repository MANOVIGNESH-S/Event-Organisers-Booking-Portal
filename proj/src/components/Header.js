import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContexts'; // Update the path to match your structure
import '../Header.css'; 
import logoImage from '../Assets/logo.jpg'; // Ensure the path to the logo image is correct

function Header({ title }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { userName, setUserName, userRole, setUserRole } = useUser();
  
  // Check if the current page should have the dashboard-like header
  const isDashboardPage = [
    '/dashboard', 
    '/manager-dashboard', 
    '/bookings', 
    '/payment' // Include payment page here
  ].includes(location.pathname);

  const handleLogout = () => {
    setUserName('');
    setUserRole(''); // Clear the user role
    localStorage.removeItem('userName'); // Clear local storage
    localStorage.removeItem('userRole'); // Clear local storage
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logoImage} alt="Event Planner Logo" />
        Event Planner
      </div>
      <nav>
        <ul>
          {isDashboardPage ? (
            <>
              <li className="hello">Hello, {userName}</li>
              {userRole === 'manager' ? (
                <>
                  <li><NavLink to="/manager-dashboard" activeClassName="active">Manager Dashboard</NavLink></li>
                  <li><NavLink to="/bookings" activeClassName="active">Booking Tracking</NavLink></li>
                </>
              ) : (
                <>
                  <li><NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink></li>
                  <li><NavLink to="/bookings" activeClassName="active">Booking Tracking</NavLink></li>
                </>
              )}
              <li><button onClick={handleLogout} className="logout-button">Log Out</button></li>
            </>
          ) : (
            <>
              <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
              <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
              <li><NavLink to="/register" activeClassName="active">Register</NavLink></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
