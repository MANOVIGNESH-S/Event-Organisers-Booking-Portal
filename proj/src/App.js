import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './contexts/UserContexts';
import Header from './components/Header';
import ManagerBoardHeader from './components/ManagerBoardHeader';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Footer from './components/Footer';
import Dashboard from './components/dashboard/Dashboard';
import Bookings from './components/dashboard/Bookings';
import BookingForm from './components/dashboard/BookingForm';
import ManagerBoard from './components/dashboard/ManagerBoard';
import ManagerBookings from './components/dashboard/ManagerBookings';
import Payment from './components/Payment'; // Import the Payment component
import CookieConsent from './components/CookieConsent';
import Chatbot from './components/Chatbot';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component
import './App.css';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isManagerPage = location.pathname.startsWith('/manager');

  return (
    <div className="App">
      {!isAuthPage && (isManagerPage ? <ManagerBoardHeader /> : <Header />)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}> {/* Protected Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/booking-form" element={<BookingForm />} />
          <Route path="/payment" element={<Payment />} /> {/* Protect this route */}
          <Route path="/manager-dashboard" element={<ManagerBoard />} />
          <Route path="/manager-bookings" element={<ManagerBookings />} />
        </Route>
      </Routes>
      {!isAuthPage && <Footer />}
      <CookieConsent />
      {!isAuthPage && <Chatbot />} {/* Add the Chatbot component here */}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  );
}

export default AppWrapper;
