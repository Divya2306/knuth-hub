// routes/websites.js
const express = require('express');
const Website = require('../models/Website');
const router = express.Router();
const {admin} = require('../middleware/auth');

// Get all websites
router.get('/', async (req, res) => {
  try {
    const websites = await Website.find();
    res.json(websites);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new website
router.post('/',admin, async (req, res) => {
  const { logo, name, info, link } = req.body;  // Include link in destructuring

  try {
    const newWebsite = new Website({ logo, name, info, link });  // Pass link to model
    await newWebsite.save();
    res.status(201).json(newWebsite);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
