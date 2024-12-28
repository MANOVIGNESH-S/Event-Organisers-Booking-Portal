import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContexts';
import '../Header.css';
import logoImage from '../Assets/logo.jpg'; // Ensure the path to the logo image is correct

function ManagerBoardHeader() {
  const { userName, setUserName, userRole, setUserRole } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserName('');
    setUserRole(''); // Clear the user role
    localStorage.removeItem('userName'); // Clear local storage
    localStorage.removeItem('userRole'); // Clear local storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logoImage} alt="Event Planner Logo" />
        Event Planner - Manager Dashboard
      </div>
      <nav>
        <ul>
          <li className="hello">Hello, {userName}</li>
          <li><NavLink to="/manager-dashboard" activeClassName="active">Manager Dashboard</NavLink></li>
          <li><NavLink to="/manager-bookings" activeClassName="active">Booking Tracking</NavLink></li>
          <li><button onClick={handleLogout} className="logout-button">Log Out</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default ManagerBoardHeader;
