const express = require('express');
const Event = require('../models/Event');
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

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });  // Sorting by date in descending order
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new event
router.post('/', admin, upload.array('images', 10), async (req, res) => {
  const { title, description } = req.body;
  let { date } = req.body;

  // Set the current date if date is not provided
  if (!date) {
    date = new Date();
  }

  // Check if the request contains all required fields
  if (!title || !description || !req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  // Extract file paths for MongoDB
  const imageUrl = req.files.map(file => `uploads/${file.filename}`);

  try {
    const newEvent = new Event({ title, description, date, imageUrl });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an event by ID
router.delete('/:id', admin,async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an event by ID
router.put('/:id', admin,upload.array('images', 10),async (req, res) => {
  const { title, description } = req.body;
  let { date } = req.body;

  // Set the current date if date is not provided
  if (!date) {
    date = new Date();
  }

  // Check if all fields are provided
  if (!title || !description  || !req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const imageUrl = req.files.map(file => `uploads/${file.filename}`);

  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, date, imageUrl },
      { new: true }  // Return the updated document
    );
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
