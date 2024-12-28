import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Home.css';

function Home() {
  const navigate = useNavigate();

  const handleStartJourneyClick = () => {
    navigate('/login');
  };

  return (
    <div className="home">
      <section className="hero">
        <h1>Elevate Your Event Experience</h1>
        <p style={{ color: 'black' }}>
          Partner with top-tier event professionals to bring your vision to life with precision and flair.
        </p>
        <button className="cta-button" onClick={handleStartJourneyClick}>Start Your Journey</button>
      </section>
      
      <section className="features">
        <h2>Why Choose Us</h2>
        <div className="feature-grid">
          <div className="feature">
            <h3>Experienced Professionals</h3>
            <p>Our network includes highly skilled event managers dedicated to crafting memorable events tailored to your needs.</p>
          </div>
          <div className="feature">
            <h3>Smooth and Intuitive Booking</h3>
            <p>Our platform simplifies event management with user-friendly tools, ensuring a seamless planning process from start to finish.</p>
          </div>
          <div className="feature">
            <h3>Reliable Payment Solutions</h3>
            <p>Secure and efficient payment processing ensures peace of mind for all transactions.</p>
          </div>
        </div>
      </section>

      <section className="showcase">
        <h2>Showcasing Excellence</h2>
        <div className="showcase-grid">
          <div className="showcase-item">
            <img src="https://www.happywedding.app/blog/wp-content/uploads/2021/04/Most-Expensive-Weddings-in-the-World.jpg" alt="Luxury Wedding" />
            <h3>Luxurious Weddings</h3>
            <p>Curate unforgettable moments with our bespoke wedding planning services.</p>
          </div>
          <div className="showcase-item">
            <img src="https://hire4event.com/blogs/wp-content/uploads/2020/01/Conference.jpg" alt="Corporate Event" />
            <h3>Corporate Summits</h3>
            <p>Elevate your brand with meticulously organized corporate events and conferences.</p>
          </div>
          <div className="showcase-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMMYhYl--ELsKdZZFuZKmPPZlIJY76Q2n8i9b3Njs8UuZx5-sbgy6FUOs9KyEuiTe0BpI&usqp=CAU" alt="Gala Dinner" />
            <h3>Gala Dinners</h3>
            <p>Create lasting impressions with sophisticated gala dinners and charity events.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Define Your Vision</h3>
            <p>Share your event details and requirements through our intuitive platform.</p>
          </div>
          <div className="step">
            <h3>2. Match with Experts</h3>
            <p>Our algorithm pairs you with event professionals that best suit your needs.</p>
          </div>
          <div className="step">
            <h3>3. Collaborate and Plan</h3>
            <p>Work closely with your chosen event manager to bring your vision to life.</p>
          </div>
          <div className="step">
            <h3>4. Execute Flawlessly</h3>
            <p>Enjoy a seamlessly executed event that exceeds expectations.</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial">
            <p>"The level of professionalism and attention to detail was outstanding. Our corporate gala was a resounding success!"</p>
            - Sarah J., CEO of TechInnovate
          </div>
          <div className="testimonial">
            <p>"From concept to execution, the team delivered beyond our wildest dreams. Our wedding was truly magical."</p>
            - Michael & Emily Thompson
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Create Something Extraordinary?</h2>
        <p>Let's collaborate to bring your vision to life. Our expert event managers are ready to elevate your next event.</p>
        <button className="cta-button" onClick={handleStartJourneyClick}>Start Planning Now</button>
      </section>
    </div>
  );
}

export default Home;