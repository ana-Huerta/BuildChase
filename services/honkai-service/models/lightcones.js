const mongoose = require('mongoose');

const lightconeSchema = new mongoose.Schema({
  name: { type: String, required: true },

  description: { type: String, required: true },

  path: {
    type: String,
    enum: ["Destrucción","Cacería","Erudición","Armonía","Nihilidad","Preservación","Abundancia", "Reminiscencia", "Exultación"],
    required: true
  },

  rarity: { type: Number, enum: [4, 5, 3], required: true },

  imageFull: { type: String, required: true },

  iconImage: { type: String, required: true },

  recommendedCharacters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character'
  }],

  stats: {
    hp: Number,
    attack: Number,
    defense: Number
  },

  superpositionEffects: {
    effect1: String,
    effect2: String,
    effect3: String,
    effect4: String,
    effect5: String
  }

}, { timestamps: true });

module.exports = mongoose.model('Lightcone', lightconeSchema);