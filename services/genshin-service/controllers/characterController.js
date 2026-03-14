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

// Devuelve id, name e iconImage de todos los personajes
exports.getSimpleList = async (req, res) => {
  try {
    const chars = await Character.find({}, '_id name iconImage');
    return res.json({ success: true, data: chars });
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

// Agrega un teammate al personaje (usa $push según requerimiento; se puede cambiar a $addToSet para prevenir duplicados)
exports.addTeammate = async (req, res) => {
	try {
		const { teammateId } = req.body;
		if (!teammateId) return res.status(400).json({ success: false, message: 'teammateId required' });

		const updated = await Character.findByIdAndUpdate(
			req.params.id,
			{ $push: { teammates: teammateId } },
			{ new: true }
		).populate('recommendedWeapons teammates artifactSets');

		if (!updated) return res.status(404).json({ success: false, message: 'Character not found' });
		return res.json({ success: true, data: updated });
	} catch (err) {
		return res.status(500).json({ success: false, message: err.message });
	}
};

// Add recommended weapon
exports.addRecommendedWeapon = async (req, res) => {
	try {
		const { relatedId } = req.body;
		if (!relatedId) return res.status(400).json({ success: false, message: 'relatedId required' });
		const updated = await Character.findByIdAndUpdate(
			req.params.id,
			{ $push: { recommendedWeapons: relatedId } },
			{ new: true }
		).populate('recommendedWeapons teammates artifactSets');
		if (!updated) return res.status(404).json({ success: false, message: 'Character not found' });
		return res.json({ success: true, data: updated });
	} catch (err) {
		return res.status(500).json({ success: false, message: err.message });
	}
};

// Add recommended artifact
exports.addRecommendedArtifact = async (req, res) => {
	try {
		const { relatedId } = req.body;
		if (!relatedId) return res.status(400).json({ success: false, message: 'relatedId required' });
		const updated = await Character.findByIdAndUpdate(
			req.params.id,
			{ $push: { artifactSets: relatedId } },
			{ new: true }
		).populate('recommendedWeapons teammates artifactSets');
		if (!updated) return res.status(404).json({ success: false, message: 'Character not found' });
		return res.json({ success: true, data: updated });
	} catch (err) {
		return res.status(500).json({ success: false, message: err.message });
	}
};

// Remove relation helper endpoints
exports.removeRelation = async (req, res) => {
	try {
		const { field, relatedId } = req.params;
		if (!field || !relatedId) return res.status(400).json({ success: false, message: 'field and relatedId required' });
		const update = { $pull: {} };
		update.$pull[field] = relatedId;
		const updated = await Character.findByIdAndUpdate(req.params.id, update, { new: true }).populate('recommendedWeapons teammates artifactSets');
		if (!updated) return res.status(404).json({ success: false, message: 'Character not found' });
		return res.json({ success: true, data: updated });
	} catch (err) {
		return res.status(500).json({ success: false, message: err.message });
	}
};

