const Card = require('../models/cards');

exports.getAll = async (req, res) => {
	try {
		const filters = { ...req.query };
		const items = await Card.find(filters).populate('character skills');
		return res.json({ success: true, data: items });
	} catch (err) {
		return res.status(500).json({ success: false, message: err.message });
	}
};

exports.getById = async (req, res) => {
	try {
		const item = await Card.findById(req.params.id).populate('character skills');
		if (!item) return res.status(404).json({ success: false, message: 'Card not found' });
		return res.json({ success: true, data: item });
	} catch (err) {
		return res.status(500).json({ success: false, message: err.message });
	}
};

exports.create = async (req, res) => {
	try {
		const newItem = new Card(req.body);
		const saved = await newItem.save();
		return res.status(201).json({ success: true, data: saved });
	} catch (err) {
		return res.status(400).json({ success: false, message: err.message });
	}
};

exports.update = async (req, res) => {
	try {
		const updated = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!updated) return res.status(404).json({ success: false, message: 'Card not found' });
		return res.json({ success: true, data: updated });
	} catch (err) {
		return res.status(400).json({ success: false, message: err.message });
	}
};

exports.remove = async (req, res) => {
	try {
		const removed = await Card.findByIdAndDelete(req.params.id);
		if (!removed) return res.status(404).json({ success: false, message: 'Card not found' });
		return res.json({ success: true, data: removed });
	} catch (err) {
		return res.status(500).json({ success: false, message: err.message });
	}
};

// Simple list for relation modal
exports.getSimpleList = async (req, res) => {
  try {
    const items = await Card.find({}, '_id name iconImage');
    return res.json({ success: true, data: items });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

