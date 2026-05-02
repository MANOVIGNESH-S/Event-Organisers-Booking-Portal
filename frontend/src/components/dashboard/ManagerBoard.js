import React, { useState } from 'react';
import EventForm from './EventForm';
import ManagerBookings from './ManagerBookings';
import '../../ManagerBoard.css';

function ManagerBoard() {
  const [showBookings, setShowBookings] = useState(false);

  const handleAddEvent = (eventData) => {
    // Here you can send the eventData to the server if needed
    console.log('New Event Added:', eventData);
    setShowBookings(true); // Display the bookings after adding an event
  };

  return (
    <div className="manager-board">
      {showBookings ? (
        <ManagerBookings />
      ) : (
        <EventForm onSubmit={handleAddEvent} />
      )}
    </div>
  );
}

export default ManagerBoard;
