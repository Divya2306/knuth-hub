// routes/tools.js
const express = require('express');
const Tool = require('../models/Tool');
const router = express.Router();
const { admin } = require('../middleware/auth');

// Get all tools
router.get('/', async (req, res) => {
  try {
    const tools = await Tool.find();
    res.json(tools);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new tool
router.post('/',admin, async (req, res) => {
  const { logo, name, info , link} = req.body;

  try {
    const newTool = new Tool({ logo, name, info, link });
    await newTool.save();
    res.status(201).json(newTool);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
