const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },

  uniquePerk: { type: String, required: true },

  character: { type: mongoose.Schema.Types.ObjectId, ref: 'Character', required: true },

  rarity: { type: String, enum: ['R', 'SR', 'SSR'], required: true },

  imageFull: { type: String, required: true },

  iconImage: { type: String, required: true },

  type: { type: String, enum: ['Speed', 'Stamina', 'Power', 'Guts', 'Wit'], required: true },

  styles: [{
    frontRunner: String,
    paceChaser: String,
    lateSurger: String,
    endCloser: String
  }],

  skills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill'
  }],

  effects: [{
    type: String,
    description: String,
    value: Number,
    unlockLevel: Number
  }],

}, { timestamps: true });

module.exports = mongoose.model('Card', cardSchema);