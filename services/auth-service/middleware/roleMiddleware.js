// Role-based authorization middleware
// Usage:
// const requireRole = require('./roleMiddleware');
// app.get('/admin', protect, requireRole('admin'), handler)

// Accepts one or more roles and allows access only if user's role matches
module.exports = function requireRole(...roles) {
	return (req, res, next) => {
		if (!req.user) {
			return res.status(401).json({ success: false, message: 'Not authenticated' });
		}

		const userRole = req.user.role;
		if (!roles.includes(userRole)) {
			return res.status(403).json({ success: false, message: 'Access denied: insufficient permissions' });
		}

		next();
	};
};

