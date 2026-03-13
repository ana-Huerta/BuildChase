const Character = require('../models/character');

exports.getAll = async (req, res) => {
  try {
    const q = req.query || {};
    const filters = {};
    if (q.rarity) filters.rarity = Number(q.rarity);
    if (q.element) filters.element = q.element;
    if (q.path) filters.path = q.path;
    // allow filtering by principalRole or name if provided
    if (q.principalRole) filters.principalRole = q.principalRole;
    if (q.name) filters.name = { $regex: q.name, $options: 'i' };

    const characters = await Character.find(filters).populate('recommendedLightcones teammates artifactSets');
    return res.json({ success: true, data: characters });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id).populate('recommendedLightcones teammates artifactSets');
    if (!character) return res.status(404).json({ success: false, message: 'Character not found' });
    return res.json({ success: true, data: character });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newChar = new Character(req.body);
    const saved = await newChar.save();
    return res.status(201).json({ success: true, data: saved });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Character not found' });
    return res.json({ success: true, data: updated });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const removed = await Character.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ success: false, message: 'Character not found' });
    return res.json({ success: true, data: removed });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
