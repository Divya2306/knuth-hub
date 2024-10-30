const mongoose = require('mongoose');

const PODSchema = new mongoose.Schema({
  image: { type: String, required: true },
  rating: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  name: { type: String, required: true },
  link: { type: String, required: true },
  date: { type: Date, default: Date.now }  // Automatically sets to the current date if not provided
});

module.exports = mongoose.model('POD', PODSchema);
