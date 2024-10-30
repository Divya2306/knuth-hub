import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'; // Modal for adding coordinators
import './CoordinatorsPage.css';

const CoordinatorsPage = ({ isAuthenticated }) => {
  const [coordinators, setCoordinators] = useState([]);
  const [year, setYear] = useState(null);
  const [page, setPage] = useState(1);
  const [totalYears, setTotalYears] = useState(0);
  const [newCoordinator, setNewCoordinator] = useState({ name: '', linkedin: '', year: '' });
  const [showAddModal, setShowAddModal] = useState(false); // For Add Coordinator Modal
  const isAdmin = localStorage.getItem('role') === 'admin';

  const fetchCoordinators = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/coordinators/${page}`);
      if (response.ok) {
        const data = await response.json();
        setCoordinators(data.coordinators);
        setYear(data.year);
        setTotalYears(data.totalYears);
      } else {
        console.error('Failed to fetch coordinators');
      }
    } catch (error) {
      console.error('Error fetching coordinators:', error);
    }
  };

  useEffect(() => {
    fetchCoordinators();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalYears) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Handle input changes for new coordinator
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoordinator({ ...newCoordinator, [name]: value });
  };

  // Handle form submission for adding a new coordinator
  const handleAddCoordinator = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/coordinators', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newCoordinator),
      });

      if (response.ok) {
        fetchCoordinators(); // Refresh coordinators list
        handleAddClose(); // Close modal
        setNewCoordinator({ name: '', linkedin: '', year: '' }); // Reset form
      } else {
        console.error('Failed to add new coordinator');
      }
    } catch (error) {
      console.error('Error adding coordinator:', error);
    }
  };

  const handleAddClose = () => {
    setShowAddModal(false);
    setNewCoordinator({ name: '', linkedin: '', year: '' });
  };

  return (
    <div className="coordinators-page">
      <h2>Coordinators - {year}</h2>
      <div className="coordinators-list">
        {coordinators.map((coordinator) => (
          <div key={coordinator._id} className="coordinator-card">
            <h3>{coordinator.name}</h3>
            <a href={coordinator.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn Profile
            </a>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous Year
        </button>
        <span>Page {page} of {totalYears}</span>
        <button onClick={handleNextPage} disabled={page === totalYears}>
          Next Year
        </button>
      </div>

      {isAdmin && isAuthenticated && (
        <button onClick={() => setShowAddModal(true)} className="add-coordinator-button">
          Add New Coordinator
        </button>
      )}

      {/* Add Coordinator Modal */}
      <Modal show={showAddModal} onHide={handleAddClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Coordinator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddCoordinator}>
            <input
              type="text"
              name="name"
              placeholder="Coordinator Name"
              value={newCoordinator.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn Profile URL"
              value={newCoordinator.linkedin}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={newCoordinator.year}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Add Coordinator</button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CoordinatorsPage;
