const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SALT_ROUNDS = 10;

function generateToken(user) {
	const payload = { id: user._id, role: user.role };
	const secret = process.env.JWT_SECRET || 'changeme';
	const options = { expiresIn: '7d' };
	return jwt.sign(payload, secret, options);
}

async function registerUser(req, res) {
	try {
		const { username, email, password, role } = req.body;
		if (!username || !email || !password) {
			return res.status(400).json({ success: false, message: 'Faltan campos requeridos' });
		}

		const existing = await User.findOne({ email });
		if (existing) {
			return res.status(409).json({ success: false, message: 'Email ya registrado' });
		}

		const hashed = await bcrypt.hash(password, SALT_ROUNDS);
		const user = new User({ username, email, password: hashed, role });
		await user.save();

		const token = generateToken(user);
		const userData = { id: user._id, username: user.username, email: user.email, role: user.role };

		return res.status(201).json({ success: true, data: { user: userData, token } });
	} catch (err) {
		console.error('registerUser error:', err);
		return res.status(500).json({ success: false, message: 'Error al registrar usuario' });
	}
}

async function loginUser(req, res) {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ success: false, message: 'Faltan campos requeridos' });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
		}

		const token = generateToken(user);
		const userData = { id: user._id, username: user.username, email: user.email, role: user.role };

		return res.json({ success: true, data: { user: userData, token } });
	} catch (err) {
		console.error('loginUser error:', err);
		return res.status(500).json({ success: false, message: 'Error al iniciar sesión' });
	}
}

module.exports = {
	registerUser,
	loginUser,
	logoutUser: (req, res) => {
		// For stateless JWT, logout is handled on client by deleting token.
		// Optionally implement token blacklist here.
		return res.json({ success: true, message: 'Sesión cerrada' });
	},
	generateToken,
};

