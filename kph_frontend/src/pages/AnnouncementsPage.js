import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'; // Modal for adding/updating announcements
import Carousel from 'react-bootstrap/Carousel'; // Carousel for images
import './AnnouncementsPage.css'; // Custom CSS for styling

const AnnouncementsPage = ({ isAuthenticated }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [announcementDetails, setAnnouncementDetails] = useState({
    title: '',
    content: '',
    date: '',
    images: [],
  });
  const [currentAnnouncementId, setCurrentAnnouncementId] = useState(null);

  const isAdmin = localStorage.getItem('role') === 'admin';

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/announcements');
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setAnnouncementDetails((prev) => ({ ...prev, images: imageUrls }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(announcementDetails),
      });
      fetchAnnouncements();
      handleAddClose();
    } catch (error) {
      console.error('Error creating announcement', error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/announcements/${currentAnnouncementId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(announcementDetails),
      });
      fetchAnnouncements();
      handleUpdateClose();
    } catch (error) {
      console.error('Error updating announcement', error);
    }
  };

  const handleDelete = async (announcementId) => {
    try {
      await fetch(`http://localhost:5000/api/announcements/${announcementId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchAnnouncements();
    } catch (error) {
      console.error('Error deleting announcement', error);
    }
  };

  const handleAddClose = () => {
    setShowAddModal(false);
    setAnnouncementDetails({ title: '', content: '', date: '', images: [] });
  };

  const handleUpdateClose = () => {
    setShowUpdateModal(false);
    setAnnouncementDetails({ title: '', content: '', date: '', images: [] });
  };

  const openUpdateModal = (announcement) => {
    setAnnouncementDetails({
      title: announcement.title,
      content: announcement.content,
      date: announcement.date.split('T')[0],
      images: announcement.images,
    });
    setCurrentAnnouncementId(announcement._id);
    setShowUpdateModal(true);
  };

  return (
    <div className="announcements-page">
      {isAdmin && isAuthenticated && (
        <button onClick={() => setShowAddModal(true)} className="add-announcement-btn">Add New Announcement</button>
      )}
      
      {/* Add Announcement Modal */}
      <Modal show={showAddModal} onHide={handleAddClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddSubmit}>
            <input
              type="text"
              name="title"
              value={announcementDetails.title}
              onChange={handleChange}
              placeholder="Announcement Title"
              required
            />
            <textarea
              name="content"
              value={announcementDetails.content}
              onChange={handleChange}
              placeholder="Announcement Content"
              required
            />
            <input
              type="date"
              name="date"
              value={announcementDetails.date}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            <button type="submit">Submit</button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Update Announcement Modal */}
      <Modal show={showUpdateModal} onHide={handleUpdateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateSubmit}>
            <input
              type="text"
              name="title"
              value={announcementDetails.title}
              onChange={handleChange}
              placeholder="Announcement Title"
              required
            />
            <textarea
              name="content"
              value={announcementDetails.content}
              onChange={handleChange}
              placeholder="Announcement Content"
              required
            />
            <input
              type="date"
              name="date"
              value={announcementDetails.date}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            <button type="submit">Update</button>
          </form>
        </Modal.Body>
      </Modal>

      <div className="announcement-cards">
        {announcements.map((announcement) => (
          <div key={announcement._id} className="announcement-card">
            <h3>{announcement.title}</h3>
            <p>{announcement.content}</p>
            <p>{new Date(announcement.date).toLocaleDateString()}</p>
            <Carousel>
              {announcement.images.map((url, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={url} alt={`Announcement-image ${index + 1}`} />
                </Carousel.Item>
              ))}
            </Carousel>
            {isAdmin && isAuthenticated && (
              <div>
                <button onClick={() => openUpdateModal(announcement)}>Update</button>
                <button onClick={() => handleDelete(announcement._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
