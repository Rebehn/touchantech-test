const mongoose = require('mongoose');

const schoolsSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('School', schoolsSchema);
