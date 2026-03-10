const mongoose = require('mongoose');

const armSchema = new mongoose.Schema({
  name: { type: String, required: true },

  armType: {
    type: String,
    enum: ["Lanza","Arco","Espada Ligera","Mandoble","Catalizador"],
    required: true
  },

  description: { type: String, required: true },

  rarity: { type: Number, enum: [1, 2, 3, 4, 5], required: true },

  imageFull: { type: String, required: true },

  iconImage: { type: String, required: true },

  recommendedCharacters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character'
  }],

  stats: {
    principalStat: String,
    secondaryStat: String
  },

  refinement: {
    level1: String,
    level2: String,
    level3: String,
    level4: String,
    level5: String
  }

}, { timestamps: true });

module.exports = mongoose.model('Arm', armSchema);