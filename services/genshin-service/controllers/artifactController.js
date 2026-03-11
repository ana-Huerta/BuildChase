const Artifact = require('../models/artifact');

exports.getAll = async (req, res) => {
	try {
		const filters = { ...req.query };
		const items = await Artifact.find(filters).populate('recommendedCharacters');
		return res.json({ success: true, data: items });
	} catch (err) {
		return res.status(500).json({ success: false, message: err.message });
	}
};

exports.getById = async (req, res) => {
	try {
		const item = await Artifact.findById(req.params.id).populate('recommendedCharacters');
		if (!item) return res.status(404).json({ success: false, message: 'Artifact not found' });
		return res.json({ success: true, data: item });
	} catch (err) {
		return res.status(500).json({ success: false, message: err.message });
	}
};

exports.create = async (req, res) => {
	try {
		const newItem = new Artifact(req.body);
		const saved = await newItem.save();
		return res.status(201).json({ success: true, data: saved });
	} catch (err) {
		return res.status(400).json({ success: false, message: err.message });
	}
};

exports.update = async (req, res) => {
	try {
		const updated = await Artifact.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!updated) return res.status(404).json({ success: false, message: 'Artifact not found' });
		return res.json({ success: true, data: updated });
	} catch (err) {
		return res.status(400).json({ success: false, message: err.message });
	}
};

exports.remove = async (req, res) => {
	try {
		const removed = await Artifact.findByIdAndDelete(req.params.id);
		if (!removed) return res.status(404).json({ success: false, message: 'Artifact not found' });
		return res.json({ success: true, data: removed });
	} catch (err) {
		return res.status(500).json({ success: false, message: err.message });
	}
};

