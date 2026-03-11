const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },

  element: {
    type: String,
    enum: ["Físico","Fuego","Hielo","Rayo","Viento","Cuántico","Imaginario"],
    required: true
  },

  path: {
    type: String,
    enum: ["Destrucción","Cacería","Erudición","Armonía","Nihilidad","Preservación","Abundancia", "Reminiscencia", "Exultación"],
    required: true
  },

  principalRole: {
    type: String,
    enum: ["DPS","Sub-DPS","Support","Debuffer", "Healer", "Shielder"],
    required: true
  },

  rarity: { type: Number, enum: [4,5], required: true },

  imageFull: { type: String, required: true },
  iconImage: { type: String, required: true },

  artifactSets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artifact'
  }],

  recommendedLightcones: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lightcone'
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
    speed: Number,
    dmgBoost: Number,
    effectHitRate: Number,
    energyRecharge: Number,
    breakEffect: Number,
    healingBonus: Number,
  },

  relicAttributes: {
    body: String,
    feet: String,
    planarSphere: String,
    linkRope: String
  },

  statsSearched: [String],

  recommendedEidolons: [String],

  traces: [{
    name: String,
    description: String,
    level: Number,
    image: String
  }],

}, { timestamps: true });

module.exports = mongoose.model('Character', characterSchema);