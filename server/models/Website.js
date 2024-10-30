// models/Website.js
const mongoose = require('mongoose');

const WebsiteSchema = new mongoose.Schema({
  logo: { type: String, required: true },
  name: { type: String, required: true },
  info: { type: String, required: true },
  link: { type: String, required: true }  // New field to store the website link
});

module.exports = mongoose.model('Website', WebsiteSchema);
