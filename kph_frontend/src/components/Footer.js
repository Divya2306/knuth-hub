import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
            Knuth Programming Hub is dedicated to nurturing coding skills and promoting tech knowledge.
            Join us for events, competitions, and resources to become a proficient programmer.
          </p>
        </div>

        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/announcements">Announcements</a></li>
            <li><a href="/pod">Problem of the Day</a></li>
            <li><a href="/connect">Connect</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Email: info@knuthhub.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Coding St., Noida, India</p>
        </div>

        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Knuth Programming Hub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
