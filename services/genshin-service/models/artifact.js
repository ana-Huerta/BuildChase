const mongoose = require('mongoose');

const artifactSchema = new mongoose.Schema({
  name: { type: String, required: true },

  description1: { type: String, required: true },

  description2: { type: String, required: true },

  imageFull: { type: String, required: true },

  recommendedCharacters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character'
  }]

}, { timestamps: true });

module.exports = mongoose.model('Artifact', artifactSchema);