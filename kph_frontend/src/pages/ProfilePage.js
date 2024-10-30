import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';

function ProfilePage() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get('/api/profile').then((res) => setUser(res.data));
  }, []);

  const handleLogout = () => {
    // Implement logout logic here
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default ProfilePage;
