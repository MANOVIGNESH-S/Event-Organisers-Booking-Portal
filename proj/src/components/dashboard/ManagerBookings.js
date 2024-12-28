import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios
import { useUser } from '../../contexts/UserContexts'; // Import useUser
import '../../ManagerBookings.css';  // Ensure this CSS file is imported

const imageUrls = [
  'https://img.freepik.com/premium-photo/experienced-event-planner-this-adult-has-organized-wide-range-events-from-corporate-conferences-weddings_1214173-23145.jpg?size=626&ext=jpg&uid=R156593389&ga=GA1.1.1906655549.1720779948&semt=ais_hybrid', // Corporate meeting with a modern setup
  'https://img.freepik.com/premium-photo/esports-arena-filled-with-cheering-fans-colorful-led-lights-players-compete-large-stage_407474-55380.jpg?size=626&ext=jpg&uid=R156593389&ga=GA1.1.1906655549.1720779948&semt=ais_hybrid', // Conference room with a speaker and audience
  'https://img.freepik.com/premium-photo/esports-arena-filled-with-cheering-fans-colorful-led-lights-players-compete-large-stage_407474-55380.jpg?size=626&ext=jpg&uid=R156593389&ga=GA1.1.1906655549.1720779948&semt=ais_hybrid', // Elegant wedding reception setup
  'https://img.freepik.com/premium-photo/esports-arena-filled-with-cheering-fans-colorful-led-lights-players-compete-large-stage_407474-55380.jpg?size=626&ext=jpg&uid=R156593389&ga=GA1.1.1906655549.1720779948&semt=ais_hybrid', // Music concert with dramatic lighting
  'https://img.freepik.com/premium-photo/virtual-concerts-events_861346-46754.jpg?size=626&ext=jpg&uid=R156593389&ga=GA1.1.1906655549.1720779948&semt=ais_hybrid', // Trade show exhibition
  'https://img.freepik.com/premium-photo/music-festival-where-audience-dances-happily-music-artists-stage_111726-2594.jpg?size=626&ext=jpg&uid=R156593389&ga=GA1.1.1906655549.1720779948&semt=ais_hybrid', // Professional speaker at a seminar
  'https://img.freepik.com/free-photo/back-view-crowd-fans-watching-live-performance-music-concert-night-copy-space_637285-544.jpg?size=626&ext=jpg&uid=R156593389&ga=GA1.1.1906655549.1720779948&semt=ais_hybrid', // Beautifully decorated banquet hall
  'https://img.freepik.com/free-photo/back-view-crowd-fans-watching-live-performance-music-concert-night-copy-space_637285-544.jpg?size=626&ext=jpg&uid=R156593389&ga=GA1.1.1906655549.1720779948&semt=ais_hybrid', // Concert stage with vibrant lights
  'https://img.freepik.com/premium-photo/creating-eyecatching-banners-conferences-events-concept-event-branding-visual-design-promotional-materials-banner-design-advertising-strategy_864588-158894.jpg?size=626&ext=jpg&uid=R156593389&ga=GA1.1.1906655549.1720779948&semt=ais_hybrid' // Outdoor festival with a lively crowd
];



function ManagerBookings() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const { userToken } = useUser(); // Get the userToken from context

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/events', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}` // Include the token in headers
          },
        });
        setEvents(response.data || []);
      } catch (err) {
        setError('Failed to load events.');
      }
    };

    fetchEvents();
  }, [userToken]); // Depend on userToken to refetch if it changes

  // Function to get a random image URL
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  };

  return (
    <div className="manager-bookings">
      <h2>Event Tracking</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="booking-grid">
        {events.length === 0 && !error && <p>No events found.</p>}
        {events.map((event) => (
          <div
            key={event.id}
            className="booking-card"
            style={{ backgroundImage: `url(${getRandomImage()})` }}
          >
            <div className="booking-info">
              <h3>{event.name}</h3>
              <p><strong>ID:</strong> {event.id}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Rating:</strong> {event.rating}</p>
              <p><strong>Review Count:</strong> {event.reviewCount}</p>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Base Price:</strong> ${event.basePrice.toFixed(2)}</p>
              <p><strong>Email:</strong> {event.email}</p>
              <p><strong>Phone:</strong> {event.phone}</p>
            </div>
            {/* <div className="booking-actions">
              <button className="chat-button">Chat with Clients</button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManagerBookings;
