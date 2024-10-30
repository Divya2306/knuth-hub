// models/Coordinator.js
const mongoose = require('mongoose');

const CoordinatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  linkedin: { type: String, required: true },
  year: { type: Number, required: true },  // Ensure year is an integer
});

module.exports = mongoose.model('Coordinator', CoordinatorSchema);
