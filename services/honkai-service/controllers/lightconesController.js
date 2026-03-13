const Lightcone = require('../models/lightcones');

exports.getAll = async (req, res) => {
  try {
    const q = req.query || {};
    const filters = {};
    if (q.rarity) filters.rarity = Number(q.rarity);
    if (q.path) filters.path = q.path;
    if (q.name) filters.name = { $regex: q.name, $options: 'i' };

    const items = await Lightcone.find(filters).populate('recommendedCharacters');
    return res.json({ success: true, data: items });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Lightcone.findById(req.params.id).populate('recommendedCharacters');
    if (!item) return res.status(404).json({ success: false, message: 'Lightcone not found' });
    return res.json({ success: true, data: item });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newItem = new Lightcone(req.body);
    const saved = await newItem.save();
    return res.status(201).json({ success: true, data: saved });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Lightcone.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Lightcone not found' });
    return res.json({ success: true, data: updated });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const removed = await Lightcone.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ success: false, message: 'Lightcone not found' });
    return res.json({ success: true, data: removed });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
