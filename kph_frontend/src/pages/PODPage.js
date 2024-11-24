import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'; // Bootstrap modal for add problem form
import './PODPage.css';

const PODPage = ({ isAuthenticated }) => {
  const [podList, setPodList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProblem, setNewProblem] = useState({ image: '', rating: 'Easy', name: '', link: '' });
  const isAdmin = localStorage.getItem('role') === 'admin';

  // Fetch problems from API
  const fetchPOD = async () => {
    try {
      const response = await fetch('https://knuth-hub.onrender.com/api/pod');
      const data = await response.json();
      setPodList(data);
    } catch (error) {
      console.error('Error fetching problems of the day:', error);
    }
  };

  useEffect(() => {
    fetchPOD();
  }, []);

  // Handle input changes for new problem
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProblem({ ...newProblem, [name]: value });
  };

  // Submit new problem to API
  const handleAddProblem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://knuth-hub.onrender.com/api/pod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newProblem),
      });
      if (response.ok) {
        setShowAddModal(false);
        fetchPOD(); // Refresh problems list
        setNewProblem({ image: '', rating: 'Easy', name: '', link: '' });
      } else {
        console.error('Failed to add new problem');
      }
    } catch (error) {
      console.error('Error adding problem:', error);
    }
  };

  // Delete a problem
  const handleDeleteProblem = async (problemId) => {
    try {
      const response = await fetch(`https://knuth-hub.onrender.com/api/pod/${problemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        fetchPOD(); // Refresh list after deletion
      } else {
        console.error('Failed to delete problem');
      }
    } catch (error) {
      console.error('Error deleting problem:', error);
    }
  };

  return (
    <div className="pod-page">
      <h2>Problem of the Day</h2>
      <div className="pod-list">
        {podList.map((problem) => (
          <div key={problem._id} className="pod-card">
            <img src={problem.image} alt={`${problem.name} visual`} className="pod-image" />
            <h3>{problem.name}</h3>
            <p>Difficulty: {problem.rating}</p>
            <a href={problem.link} target="_blank" rel="noopener noreferrer">View Problem</a>
            {isAdmin && isAuthenticated && (
              <button onClick={() => handleDeleteProblem(problem._id)} className="delete-btn">Delete</button>
            )}
          </div>
        ))}
      </div>

      {isAdmin && isAuthenticated && (
        <button onClick={() => setShowAddModal(true)} className="add-problem-btn">Add New Problem</button>
      )}

      {/* Add Problem Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Problem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddProblem} className="add-problem-form">
            <input
              type="text"
              name="name"
              placeholder="Problem Name"
              value={newProblem.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="url"
              name="link"
              placeholder="Problem Link"
              value={newProblem.link}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newProblem.image}
              onChange={handleInputChange}
              required
            />
            <select
              name="rating"
              value={newProblem.rating}
              onChange={handleInputChange}
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <button type="submit">Add Problem</button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PODPage;
