const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },

  description: { type: String, required: true },

  iconImage: { type: String, required: true },

  type: { type: String, enum: ['Unique Skill', 'Passive', 'Early Race', 'Mid Race', 'Late Race', 'Any Time'], required: true },

  cost: { type: Number, required: true },

}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);