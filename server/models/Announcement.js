const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  AnImages: [{ type: String }]  // Array of image URLs or file paths
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);
