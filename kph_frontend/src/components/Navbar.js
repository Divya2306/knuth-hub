import React, {  useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ setIsAuthenticated , isAuthenticated}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate= useNavigate();

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
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/announcements">Announcements</Link>
        <Link to="/coordinators">Coordinators</Link>
        <Link to="/pod">POD</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/connect">Connect</Link>
        
        {isAuthenticated ? (
          <div className="auth-links">
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
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
