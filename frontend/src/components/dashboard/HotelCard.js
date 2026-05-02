import React, { useState } from 'react';
import '../../HotelCard.css';
import axios from 'axios'; // Import axios for making HTTP requests

const HotelCard = ({ hotel, onBookNow, onRatingChange, onReviewSubmit }) => {
  const [guestCount, setGuestCount] = useState(1);
  const [userRating, setUserRating] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [newReview, setNewReview] = useState('');

  const calculatePrice = (basePrice, guestCount) => basePrice * guestCount;

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
    onRatingChange(hotel.id, newRating);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    // Trim the newReview input to remove any extra whitespace
    const trimmedReview = newReview.trim();
    
    if (trimmedReview) { // Only add the review if it's not empty
      const review = {
        text: trimmedReview,
        phone: hotel.phone || '', // Ensure the phone field is handled properly
      };

      // Update the reviews directly in the hotel object
      if (hotel.reviews) {
        hotel.reviews.push(review);
      } else {
        hotel.reviews = [review];
      }

      onReviewSubmit(hotel.id, trimmedReview); // Call the parent component function
      setNewReview(''); // Clear the input field
    }
  };

  const handleBookNow = async (e) => {
    e.stopPropagation();
    onBookNow(hotel);
    try {
      const response = await axios.get('http://127.0.0.1:5000/mail');
      alert(response.data.message);
    } catch (error) {
      alert('Failed to send email');
      console.error(error);
    }
  };

  return (
    <div className={`hotel-card ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
      <div className="hotel-card-left">
        <img src={hotel.image} alt={hotel.name} className="hotel-card-image" />
      </div>
      <div className="hotel-card-middle">
        <h3 className="hotel-name">{hotel.name}</h3>
        <p className="hotel-location">{hotel.location}</p>
        <div className="hotel-stars">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={i < (userRating !== null ? userRating : Math.floor(hotel.rating)) ? 'star filled' : 'star'}
              onClick={(e) => { e.stopPropagation(); handleRatingChange(i + 1); }}
            >
              &#9733;
            </span>
          ))}
          <span className="review-count">{hotel.reviewCount} reviews</span>
        </div>
        <div className="hotel-amenities">
          {hotel.amenities.map((amenity, index) => (
            <span key={index} className="amenity-tag">{amenity}</span>
          ))}
        </div>
        <p className="hotel-description">{hotel.description}</p>
        <div className="recent-review">
          <h4>Recent Review</h4>
          <p>"{hotel.recentReview}"</p>
          <p><strong>Phone:</strong> {hotel.phone}</p>
        </div>
        {isExpanded && (
          <>
            <div className="all-reviews">
              <h4>All Reviews</h4>
              {(hotel.reviews || [])
                .filter(review => review.text) // Filter out empty reviews
                .map((review, index) => (
                  <div key={index} className="review-item">
                    <p>"{review.text}"</p>
                    {review.phone && <p><strong>Phone:</strong> {review.phone}</p>} {/* Only display phone if it exists */}
                  </div>
              ))}
            </div>
            <div className="review-form-wrapper">
              <form onSubmit={handleReviewSubmit} className="review-form" onClick={(e) => e.stopPropagation()}>
                <h4>Add a Review</h4>
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Write your review here"
                />
                <button type="submit">Submit Review</button>
              </form>
            </div>
          </>
        )}
      </div>
      <div className="hotel-card-right">
        <div className="price-container">
          <p className="price">Rs. {calculatePrice(hotel.basePrice, guestCount)}</p>
          <p className="price-per-night">per night</p>
        </div>
        <div className="guest-count">
          <button onClick={(e) => { e.stopPropagation(); setGuestCount(Math.max(1, guestCount - 1)); }}>-</button>
          <span>{guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}</span>
          <button onClick={(e) => { e.stopPropagation(); setGuestCount(guestCount + 1); }}>+</button>
        </div>
        <button className="book-now" onClick={handleBookNow}>Book Now</button>
      </div>
    </div>
  );
};

export default HotelCard;
