
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContexts';
import axios from 'axios';
import '../../Bookings.css';

const imageUrls = [
  'https://img.freepik.com/premium-photo/explore-influence-grammy-events-global-m-generative-ai_1198249-82707.jpg?size=626&ext=jpg&uid=R156593389&ga=GA1.1.1906655549.1720779948&semt=ais_hybrid',
  'https://img.freepik.com/free-photo/crystal-champagne-flutes-stand-table_8353-8468.jpg?size=626&ext=jpg&uid=R156593389&ga=GA1.1.1906655549.1720779948&semt=ais_hybrid',
  'https://media.istockphoto.com/id/1623303770/photo/creative-background-image-is-blurred-evening-city-lights-and-light-snowfall.webp?b=1&s=170667a&w=0&k=20&c=PhWd1zt98e6K70KAAb1BjzZXGdQZZRwfqvdtJOwTfIw=',
  'https://wallpapercave.com/wp/wp7488449.jpg',
  'https://img.freepik.com/free-photo/glance-path-lies-garlands-made-threads-with-chrysanthemum-buds_1304-3347.jpg?size=626&ext=jpg&uid=R156593389&ga=GA1.1.1906655549.1720779948&semt=ais_hybrid',
  'https://img.freepik.com/free-photo/photorealistic-wedding-venue-with-intricate-decor-ornaments_23-2151481530.jpg?size=626&ext=jpg&uid=R156593389&ga=GA1.1.1906655549.1720779948&semt=ais_hybrid',
  'https://img.freepik.com/premium-photo/scene-movie-with-person-stage-colorful-painting_1277187-24146.jpg?size=626&ext=jpg&uid=R156593389&ga=GA1.1.1906655549.1720779948&semt=ais_hybrid',
  'https://img.freepik.com/premium-photo/fashion-week-press-events-afterparties-ar-generative-ai_1169665-126091.jpg?size=626&ext=jpg&uid=R156593389&ga=GA1.1.1906655549.1720779948&semt=ais_hybrid',
  'https://img.freepik.com/free-photo/people-taking-part-high-protocol-event_23-2150951407.jpg?size=626&ext=jpg&uid=R156593389&ga=GA1.1.1906655549.1720779948&semt=ais_hybrid'
];

function Bookings() {
  const { userToken } = useUser();
  const [bookings, setBookings] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const newBookingMade = location.state?.newBooking || false;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5001/bookings', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          },
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [newBookingMade, userToken]);

  const handleChat = (bookingId) => {
    // Implement chat functionality here
    console.log(`Chat initiated for booking ${bookingId}`);
  };

  const handlePay = (bookingId) => {
    // Navigate to Payment page with bookingId
    navigate('/payment', { state: { bookingId } });
  };

  // Function to get a random image
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  };

  return (
    <div className="bookings">
      <h2>Booking Tracking</h2>
      {newBookingMade && <p className="success-message">New booking confirmed!</p>}
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} className="booking-card" style={{ backgroundImage: `url(${getRandomImage()})` }}>
              <div className="booking-info">
                <h3>Booking ID: {booking.id}</h3>
                <p><strong>Name:</strong> {booking.name}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.time}</p>
                <p><strong>Address:</strong> {booking.address}</p>
                <p><strong>Phone:</strong> {booking.phone}</p>
                <p><strong>Number of People:</strong> {booking.numberOfPeople}</p>
                <p><strong>Total Cost:</strong> ${booking.cost}</p>
              </div>
              <div className="booking-actions">
                <button onClick={() => handlePay(booking.id)} className="pay-button">Pay to Confirm</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Bookings;