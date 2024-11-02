import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'; // Using react-bootstrap for modal
import Carousel from 'react-bootstrap/Carousel'; // Using react-bootstrap for carousel
import './EventsPage.css';

const EventsPage = ({ isAuthenticated }) => {
  const [events, setEvents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    date: '',
    imageUrl: '',
  });
  const [currentEventId, setCurrentEventId] = useState(null);

  const isAdmin = localStorage.getItem('role') === 'admin'; // Check if user is admin

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events'); // Get all events
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Send JWT token
        },
        body: JSON.stringify({ ...eventDetails, imageUrl: eventDetails.imageUrl.split(' ') }), // Convert comma-separated URLs to array
      });
      fetchEvents(); // Refresh the events list
      handleAddClose();
    } catch (error) {
      console.error('Error creating event', error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/events/${currentEventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Send JWT token
        },
        body: JSON.stringify({ ...eventDetails, imageUrl: eventDetails.imageUrl.split(' ') }), // Convert comma-separated URLs to array
      });
      fetchEvents(); // Refresh the events list
      handleUpdateClose();
    } catch (error) {
      console.error('Error updating event', error);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Send JWT token
        },
      });
      fetchEvents(); // Refresh the events list
    } catch (error) {
      console.error('Error deleting event', error);
    }
  };

  const handleAddClose = () => {
    setShowAddModal(false);
    setEventDetails({ title: '', description: '', date: '', imageUrl: '' }); // Reset form
  };

  const handleUpdateClose = () => {
    setShowUpdateModal(false);
    setEventDetails({ title: '', description: '', date: '', imageUrl: '' }); // Reset form
  };

  const openUpdateModal = (event) => {
    setEventDetails({
      title: event.title,
      description: event.description,
      date: event.date.split('T')[0], // Format date for input
      imageUrl: event.imageUrl.join(' '), // Convert array to comma-separated string
    });
    setCurrentEventId(event._id);
    setShowUpdateModal(true);
  };

  return (
    <div className="events-page">
      {isAdmin && isAuthenticated && (
        <button onClick={() => setShowAddModal(true)} className="add-event-btn">Add New Event</button>
      )}
      
      {/* Add Event Modal */}
      <Modal show={showAddModal} onHide={handleAddClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddSubmit}>
            <input
              type="text"
              name="title"
              value={eventDetails.title}
              onChange={handleChange}
              placeholder="Event Title"
              required
            />
            <textarea
              name="description"
              value={eventDetails.description}
              onChange={handleChange}
              placeholder="Event Description"
              required
            />
            <input
              type="date"
              name="date"
              value={eventDetails.date}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="imageUrl"
              value={eventDetails.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URLs, separated by commas"
              required
            />
            <button type="submit">Submit</button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Update Event Modal */}
      <Modal show={showUpdateModal} onHide={handleUpdateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateSubmit}>
            <input
              type="text"
              name="title"
              value={eventDetails.title}
              onChange={handleChange}
              placeholder="Event Title"
              required
            />
            <textarea
              name="description"
              value={eventDetails.description}
              onChange={handleChange}
              placeholder="Event Description"
              required
            />
            <input
              type="date"
              name="date"
              value={eventDetails.date}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="imageUrl"
              value={eventDetails.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URLs, separated by spaces"
              required
            />
            <button type="submit">Update</button>
          </form>
        </Modal.Body>
      </Modal>

      <div className="event-cards">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <Carousel>
              {event.imageUrl.map((url, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={url} alt={`Event-image ${index + 1}`} />
                </Carousel.Item>
              ))}
            </Carousel>
            {isAdmin && isAuthenticated && (
              <div>
                <button onClick={() => openUpdateModal(event)}>Update</button>
                <button onClick={() => handleDelete(event._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
