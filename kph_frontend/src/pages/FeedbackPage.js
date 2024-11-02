import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedbackPage.css';

const FeedbackPage = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ username: '', email: '', category: 'Suggestion', message: '' });
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const isAdmin = localStorage.getItem('role') === 'admin';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (isAdmin) {
      fetchFeedbacks();
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Fetch feedbacks from the backend for admin view
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/feedbacks');
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  // Handle input changes for the feedback form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback({ ...newFeedback, [name]: value });
  };

  // Submit feedback to the backend
  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newFeedback),
      });
      if (response.ok) {
        setNewFeedback({ username: '', email: '', category: 'Suggestion', message: '' });
        alert('Feedback submitted successfully');
      } else {
        console.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  // Delete feedback by ID for admin
  const handleDeleteFeedback = async (feedbackId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/feedbacks/${feedbackId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        setFeedbacks(feedbacks.filter(feedback => feedback._id !== feedbackId));
        alert('Feedback deleted successfully');
      } else {
        console.error('Failed to delete feedback');
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  return (
    <div className="feedback-page">
      <h2>Feedback</h2>

      {isAdmin ? (
        <div className="feedback-list">
          {feedbacks.map((feedback) => (
            <div key={feedback._id} className="feedback-card">
              <div onClick={() => setSelectedFeedback(feedback)}>
                <p className="feedback-category">Category: {feedback.category}</p>
                <p className="feedback-username">Submitted by: {feedback.username}</p>
              </div>
              <button onClick={() => handleDeleteFeedback(feedback._id)} className="delete-btn">Delete</button>
            </div>
          ))}

          {/* Modal for displaying feedback details */}
          {selectedFeedback && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Feedback Details</h3>
                <p><strong>Category:</strong> {selectedFeedback.category}</p>
                <p><strong>Username:</strong> {selectedFeedback.username}</p>
                <p><strong>Email:</strong> {selectedFeedback.email}</p>
                <p><strong>Message:</strong> {selectedFeedback.message}</p>
                <button onClick={() => setSelectedFeedback(null)} className="close-modal-btn">Close</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmitFeedback} className="feedback-form">
          <input
            type="text"
            name="username"
            placeholder="Your Name"
            value={newFeedback.username}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={newFeedback.email}
            onChange={handleInputChange}
            required
          />
          <select name="category" value={newFeedback.category} onChange={handleInputChange} required>
            <option value="Suggestion">Suggestion</option>
            <option value="Appraisal">Appraisal</option>
            <option value="Bug Report">Bug Report</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            name="message"
            placeholder="Your Feedback"
            value={newFeedback.message}
            onChange={handleInputChange}
            required
          ></textarea>
          <button type="submit">Submit Feedback</button>
        </form>
      )}
    </div>
  );
};

export default FeedbackPage;
