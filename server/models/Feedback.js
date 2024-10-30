// models/Feedback.js
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  username: { type: String, required: true },  // Name of the user providing feedback
  email: { type: String, required: true },     // Contact email of the user
  category: {
    type: String,
    enum: ['Suggestion', 'Appraisal', 'Bug Report', 'Other'],
    required: true,
  },
  message: { type: String, required: true },    // Feedback message
  date: { type: Date, default: Date.now }       // Date of feedback submission
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
