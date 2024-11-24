import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap"; 
import Carousel from "react-bootstrap/Carousel"; 
import "./AnnouncementsPage.css";

const AnnouncementsPage = ({ isAuthenticated }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [announcementDetails, setAnnouncementDetails] = useState({
    title: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    images: [],
  });
  const [currentAnnouncementId, setCurrentAnnouncementId] = useState(null);

  const isAdmin = localStorage.getItem("role") === "admin";

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("https://knuth-hub.onrender.com/api/announcements");
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setAnnouncementDetails((prev) => ({ ...prev, images: e.target.files }));
  };


  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', announcementDetails.title);
    formData.append('description', announcementDetails.description);
    formData.append('date', announcementDetails.date || new Date().toISOString());

    for (let i = 0; i < announcementDetails.images.length; i++) {
      formData.append('images', announcementDetails.images[i]);
    }

    try {
      await fetch("https://knuth-hub.onrender.com/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      fetchAnnouncements();
      handleAddClose();
    } catch (error) {
      console.error("Error creating announcement", error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', announcementDetails.title);
    formData.append('description', announcementDetails.description);
    formData.append('date', announcementDetails.date || new Date().toISOString());

    for (let i = 0; i < announcementDetails.images.length; i++) {
      formData.append('images', announcementDetails.images[i]);
    }

    try {
      await fetch(
        `https://knuth-hub.onrender.com/api/announcements/${currentAnnouncementId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );
      fetchAnnouncements();
      handleUpdateClose();
    } catch (error) {
      console.error("Error updating announcement", error);
    }
  };

  const handleDelete = async (announcementId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const response = await fetch(`https://knuth-hub.onrender.com/api/announcements/${announcementId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete event');
      fetchAnnouncements();
    } catch (error) {
      console.error("Error deleting announcement", error);
    }
  };

  const handleAddClose = () => {
    setShowAddModal(false);
    setAnnouncementDetails({ title: "", content: "", date: "", images: [] });
  };

  const handleUpdateClose = () => {
    setShowUpdateModal(false);
    setAnnouncementDetails({ title: "", content: "", date: "", images: [] });
  };

  const openUpdateModal = (announcement) => {
    setAnnouncementDetails({
      title: announcement.title,
      content: announcement.content,
      date: announcement.date.split("T")[0],
      images: [],
    });
    setCurrentAnnouncementId(announcement._id);
    setShowUpdateModal(true);
  };

  return (
    <div className="announcements-page">
      {isAdmin && isAuthenticated && (
        <button
          onClick={() => setShowAddModal(true)}
          className="add-announcement-btn"
        >
          Add New Announcement
        </button>
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
              
            />
            <input
              type="file"
              name="images"
              onChange={handleFileChange}
              multiple
              required
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
              {announcement.AnImages.map((url, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={`https://knuth-hub.onrender.com/${url}`} alt={`Announcement-image ${index + 1}`} />
                </Carousel.Item>
              ))}
            </Carousel>
            {isAdmin && isAuthenticated && (
              <div>
                <button onClick={() => openUpdateModal(announcement)}>
                  Update
                </button>
                <button onClick={() => handleDelete(announcement._id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
