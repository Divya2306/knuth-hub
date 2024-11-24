import React, { useEffect, useState } from 'react';
import { Modal, Carousel } from 'react-bootstrap';
import './EventsPage.css';

const EventsPage = ({ isAuthenticated }) => {
  const [events, setEvents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    date: '',
    images: [],
  });
  const [currentEventId, setCurrentEventId] = useState(null);

  const isAdmin = localStorage.getItem('role') === 'admin';

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('https://knuth-hub.onrender.com/api/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setEventDetails((prev) => ({ ...prev, images: e.target.files }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', eventDetails.title);
    formData.append('description', eventDetails.description);
    formData.append('date', eventDetails.date || new Date().toISOString());

    for (let i = 0; i < eventDetails.images.length; i++) {
      formData.append('images', eventDetails.images[i]);
    }

    try {
      const response = await fetch('https://knuth-hub.onrender.com/api/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to create event');
      fetchEvents();
      handleAddClose();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const response = await fetch(`https://knuth-hub.onrender.com/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete event');
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const openUpdateModal = (event) => {
    setCurrentEventId(event._id);
    setEventDetails({
      title: event.title,
      description: event.description,
      date: event.date,
      images: [],
    });
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', eventDetails.title);
    formData.append('description', eventDetails.description);
    formData.append('date', eventDetails.date || new Date().toISOString());

    for (let i = 0; i < eventDetails.images.length; i++) {
      formData.append('images', eventDetails.images[i]);
    }

    try {
      const response = await fetch(`https://knuth-hub.onrender.com/api/events/${currentEventId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to update event');
      fetchEvents();
      handleUpdateClose();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleAddClose = () => {
    setShowAddModal(false);
    resetEventDetails();
  };

  const handleUpdateClose = () => {
    setShowUpdateModal(false);
    resetEventDetails();
    setCurrentEventId(null);
  };

  const resetEventDetails = () => {
    setEventDetails({ title: '', description: '', date: '', images: [] });
  };

  return (
    <div className="events-page">
      {isAdmin && isAuthenticated && (
        <button onClick={() => setShowAddModal(true)} className="add-event-btn">
          Add New Event
        </button>
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
              type="file"
              name="images"
              onChange={handleFileChange}
              multiple
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
              type="file"
              name="images"
              onChange={handleFileChange}
              multiple
            />
            <button type="submit">Update</button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Event Cards Display */}
      <div className="event-cards">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <Carousel>
              {event.imageUrl.map((url, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={`https://knuth-hub.onrender.com/${url}`} alt={`Event-image ${index + 1}`} />
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
