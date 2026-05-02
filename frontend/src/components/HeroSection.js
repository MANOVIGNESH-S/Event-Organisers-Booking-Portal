import React, { useState } from 'react';
import '../HeroSection.css';
import heroVideo from '../Assets/herovid.mp4';

const HeroSection = ({ onSearch }) => {
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');

  const handleSearch = () => {
    onSearch(eventName, location, price);
  };

  return (
    <div className="hero-container">
        <video
        autoPlay
        loop
        muted
        src={heroVideo}
        controls={false}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          zIndex: 1 
        }}
      ></video>
      <h1>Event Venues & Booking Solutions</h1>
<p>Explore and compare top event venues and services to find the perfect fit for your occasion.</p>

      <div className="hero-search-container">
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={handleSearch}>SEARCH</button>
      </div>
    </div>
  );
};

export default HeroSection;
