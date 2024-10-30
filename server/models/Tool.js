// models/Tool.js
const mongoose = require('mongoose');

const ToolSchema = new mongoose.Schema({
  logo: { type: String, required: true },
  name: { type: String, required: true },
  info: { type: String, required: true },
  link: { type: String, required: true }
});

module.exports = mongoose.model('Tool', ToolSchema);

