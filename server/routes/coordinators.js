const express = require('express');
const router = express.Router();
const Coordinator = require('../models/Coordinator');
const {admin}= require('../middleware/auth');

// Get coordinators by year in descending order with pagination
router.get('/:page', async (req, res) => {
  const page = parseInt(req.params.page) || 1;
  const limit = 1;  // One year per page
  const skip = (page - 1) * limit;

  try {
    // Find distinct years and sort in descending order
    const years = await Coordinator.find().distinct('year');
    years.sort((a, b) => b - a);

    // Get coordinators for the specific year
    const year = years[skip];
    const coordinators = await Coordinator.find({ year }).sort({ name: 1 });

    res.json({ coordinators, year, totalYears: years.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new coordinator
router.post('/', admin,async (req, res) => {
  const { name, linkedin, year } = req.body;

  // Validate required fields
  if (!name || !linkedin || !year) {
    return res.status(400).json({ message: 'Name, LinkedIn, and year are required' });
  }

  try {
    const newCoordinator = new Coordinator({ name, linkedin, year });
    await newCoordinator.save();
    res.status(201).json(newCoordinator);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
