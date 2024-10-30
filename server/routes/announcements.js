// routes/announcements.js
const express = require('express');
const Announcement = require('../models/Announcement');
const router = express.Router();
const {admin} = require('../middleware/auth');

// Get all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });  // Sorting by date in descending order
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new Announcement
router.post('/', admin,async (req, res) => {
  const { title, content, images } = req.body;
  let { date } = req.body;

  // Set the current date if date is not provided
  if (!date) {
    date = new Date();
  }

  // Check if the request contains all required fields
  if (!title || !content || !images || !Array.isArray(images)) {
    return res.status(400).json({ message: 'All fields are required, and images should be an array' });
  }

  try {
    const newAnnouncement = new Announcement({ title, content, date, images });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Delete an announcement by ID
router.delete('/:id', admin,async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an Announcement by ID
router.put('/:id',admin, async (req, res) => {
  const { title, content,  images } = req.body;
  let { date } = req.body;

  // Set the current date if date is not provided
  if (!date) {
    date = new Date();
  }

  // Check if all fields are provided
  if (!title || !content  || !images || !Array.isArray(images)) {
    return res.status(400).json({ message: 'All fields are required, and imageUrl should be an array' });
  }

  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, content, date, images },
      { new: true }  // Return the updated document
    );
    
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.json(announcement);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
