const Character = require('../models/characters');

exports.getAll = async (req, res) => {
	try {
		const filters = { ...req.query };
		const characters = await Character.find(filters).populate('recommendedWeapons teammates artifactSets');
		return res.json({ success: true, data: characters });
	} catch (err) {
		return res.status(500).json({ success: false, message: err.message });
	}
};

exports.getById = async (req, res) => {
	try {
		const character = await Character.findById(req.params.id).populate('recommendedWeapons teammates artifactSets');
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

