const express = require('express');
const router = express.Router();
const Problem = require('../models/POD');
const {admin}=require('../middleware/auth');

// Get all problems
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find().sort({ date: -1 });  // Sorted by most recent first
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new problem
router.post('/', admin, async (req, res) => {
  const { image, rating, name, link, date } = req.body;

  // Check if all required fields are provided
  if (!image || !rating || !name || !link) {
    return res.status(400).json({ message: 'All fields except date are required' });
  }

  try {
    const newProblem = new Problem({ image, rating, name, link, date });
    await newProblem.save();
    res.status(201).json(newProblem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a problem by ID
router.delete('/:id',admin, async (req, res) => {
  try {
    await Problem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Problem deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

