const mongoose = require('mongoose');

const membersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  schools: [{ type: mongoose.Schema.ObjectId, ref: 'School' }]
});

module.exports = mongoose.model('Member', membersSchema);
