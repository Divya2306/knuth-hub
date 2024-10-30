const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  imageUrl: [{ type: String, required: true }],  // Change here to an array of strings
});

module.exports = mongoose.model('Event', EventSchema);
