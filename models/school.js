const mongoose = require('mongoose');

const schoolsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.ObjectId, ref: 'Member' }]
});

module.exports = mongoose.model('School', schoolsSchema);
