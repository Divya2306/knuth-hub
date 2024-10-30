// routes/feedbacks.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { admin, auth } = require('../middleware/auth');

// Get all feedbacks
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ date: -1 });  // Sort by date in descending order
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Post a new feedback
router.post('/',auth, async (req, res) => {
  const { username, email, category, message } = req.body;

  // Validate fields
  if (!username || !email || !category || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newFeedback = new Feedback({ username, email, category, message });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a feedback by ID
router.delete('/:id',admin, async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json({ message: 'Feedback deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
