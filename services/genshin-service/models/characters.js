const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },

  element: {
    type: String,
    enum: ["Hydro","Anemo","Electro","Geo","Dendro","Cryo","Pyro"],
    required: true
  },

  weapon: {
    type: String,
    enum: ["Lanza","Arco","Espada Ligera","Mandoble","Catalizador"],
    required: true
  },

  principalRole: {
    type: String,
    enum: ["DPS","Sub DPS","Support", "Healer", "Shield"],
    required: true
  },

  rarity: { type: Number, enum: [4,5], required: true },

  imageFull: { type: String, required: true },

  iconImage: { type: String, required: true },

  artifactSets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArtifactSet'
  }],

  recommendedWeapons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Weapon'
  }],

  teammates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character'
  }],

  stats: {
    hp: Number,
    attack: Number,
    defense: Number,
    critRate: Number,
    critDamage: Number,
    energyRecharge: Number,
    dmgBoost: Number,
    healingBonus: Number,
    elementalMastery: Number
  },

  relicAttributes: {
    reloj: String,
    caliz: String,
    tiara: String
  },

  statsSearched: [String],

  recommendedConstellations: [String],

  talents: [{
    name: String,
    description: String,
    level: Number
  }]

}, { timestamps: true });

module.exports = mongoose.model('Character', characterSchema);