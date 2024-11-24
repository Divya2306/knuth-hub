// routes/announcements.js
const express = require('express');
const Announcement = require('../models/Announcement');
const router = express.Router();
const {admin} = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));  // Set your upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Initialize multer with storage and file filter
const upload = multer({ storage });

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
router.post('/', admin,upload.array('images', 10),async (req, res) => {
  const { title, content } = req.body;
  let { date } = req.body;

  // Set the current date if date is not provided
  if (!date) {
    date = new Date();
  }

  // Check if the request contains all required fields
  if (!title || !content || !req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'All fields are required' });
  }
    // Extract file paths for MongoDB
    const AnImages = req.files.map(file => `uploads/${file.filename}`);
  try {
    const newAnnouncement = new Announcement({ title, content, date, AnImages });
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
router.put('/:id',admin, upload.array('images', 10),async (req, res) => {
  const { title, content } = req.body;
  let { date } = req.body;

  // Set the current date if date is not provided
  if (!date) {
    date = new Date();
  }

  // Check if all fields are provided
  if (!title || !content  || !req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const AnImages = req.files.map(file => `uploads/${file.filename}`);

  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, content, date, AnImages },
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
