const express = require('express');
const Event = require('../models/Event');
const router = express.Router();
const {admin} = require('../middleware/auth');

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
router.post('/', admin,async (req, res) => {
  const { title, description, imageUrl } = req.body;
  let { date } = req.body;

  // Set the current date if date is not provided
  if (!date) {
    date = new Date();
  }

  // Check if the request contains all required fields
  if (!title || !description || !imageUrl || !Array.isArray(imageUrl)) {
    return res.status(400).json({ message: 'All fields are required, and imageUrl should be an array' });
  }

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
router.put('/:id', admin,async (req, res) => {
  const { title, description,  imageUrl } = req.body;
  let { date } = req.body;

  // Set the current date if date is not provided
  if (!date) {
    date = new Date();
  }

  // Check if all fields are provided
  if (!title || !description  || !imageUrl || !Array.isArray(imageUrl)) {
    return res.status(400).json({ message: 'All fields are required, and imageUrl should be an array' });
  }

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
