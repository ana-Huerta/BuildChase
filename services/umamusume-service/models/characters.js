const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },

  rarity: { type: Number, enum: [1, 2, 3], required: true },

  imageFull: { type: String, required: true },

  iconImage: { type: String, required: true },

  tracks: [{ 
    dirt: String,
    turf: String
  }],

  distances: [{
    sprint: String,
    mile: String,
    medium: String,
    long: String
  }],

  styles: [{
    frontRunner: String,
    paceChaser: String,
    lateSurger: String,
    endCloser: String
  }],

  cardSet: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card'
  }],

  legacyParents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character'
  }],

  legacySparks: {
    type: String,
    enum: ['18 Speed', '18 Stamina', '18 Power', '18 Wit', '9 Speed 9 Stamina', '9 Speed 9 Power', '9 Speed 9 Wit', '9 Stamina 9 Power', '9 Stamina 9 Wit', '9 Power 9 Wit']
  },

  stats: {
    speed: Number,
    stamina: Number,
    power: Number,
    guts: Number,
    wit: Number
  },

  grownStatRate: {
    speed: Number,
    stamina: Number,
    power: Number,
    guts: Number,
    wit: Number
  },

  skills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill'
  }],

  secretEvent: {
    Name: String,
    Description: String,
    Reward: String
  },

  statsSearched: [String]

}, { timestamps: true });

module.exports = mongoose.model('Character', characterSchema);