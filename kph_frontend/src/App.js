import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CoordinatorsPage from './pages/CoordinatorsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import ConnectPage from './pages/ConnectPage';
import FeedbackPage from './pages/FeedbackPage';
import PODPage from './pages/PODPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage isAuthenticated={isAuthenticated}/>} />
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/coordinators" element={<CoordinatorsPage isAuthenticated={isAuthenticated}/>} />
            <Route path="/announcements" element={<AnnouncementsPage isAuthenticated={isAuthenticated}/>} />
            <Route path="/connect" element={<ConnectPage />} />
            <Route path="/feedback" element={<FeedbackPage isAuthenticated={isAuthenticated} />} />
            <Route path="/pod" element={<PODPage isAuthenticated={isAuthenticated}/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
