import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ setIsAuthenticated, isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">Knuth Programming Hub</div>
      <nav className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <Link to="/"><i className="fas fa-home"></i> Home</Link>
        <Link to="/events"><i className="fas fa-calendar-alt"></i> Events</Link>
        <Link to="/announcements"><i className="fas fa-bullhorn"></i> Announcements</Link>
        <Link to="/coordinators"><i className="fas fa-users"></i> Coordinators</Link>
        <Link to="/pod"><i className="fas fa-tasks"></i> POD</Link>
        <Link to="/feedback"><i className="fas fa-comment-dots"></i> Feedback</Link>
        <Link to="/connect"><i className="fas fa-link"></i> Connect</Link>
        
        {isAuthenticated ? (
          <div className="auth-links">
            <Link to="/profile"><i className="fas fa-user"></i> Profile</Link>
            <button onClick={handleLogout} className="logout-btn"><i className="fas fa-sign-out-alt"></i> Logout</button>
          </div>
        ) : (
          <Link to="/login"><i className="fas fa-sign-in-alt"></i> Login</Link>
        )}
      </nav>
      
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
};

export default Navbar;
