import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../BookingForm.css';
import { useUser } from '../../contexts/UserContexts';

function BookingForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const organizer = location.state?.organizer || {};

  const { userToken } = useUser(); // Fetch the token from UserContext

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [email] = useState(localStorage.getItem('userEmail') || ''); // Fetch email from localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cost = numberOfPeople * 50; // Example cost calculation
    const booking = { organizer, name, date, time, address, phone, numberOfPeople, cost, email };

    try {
      const response = await axios.post('http://localhost:5001/bookings', booking, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}` // Include the token in the Authorization header
        },
      });

      if (response.status === 200 || response.status === 201) {
        navigate('/bookings', { state: { newBooking: true } });
      } else {
        console.error('Failed to save booking.');
      }
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  };

  return (
    <div className="booking-form-container">
      <form className="booking-form" onSubmit={handleSubmit}>
        <h2>Book {organizer.name}</h2>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Time:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div>
          <label>Number of People:</label>
          <input type="number" value={numberOfPeople} onChange={(e) => setNumberOfPeople(Number(e.target.value))} required />
        </div>
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}

export default BookingForm;
