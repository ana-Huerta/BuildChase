const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) return res.status(401).json({ success: false, message: 'Token no proporcionado' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2) return res.status(401).json({ success: false, message: 'Formato de token inválido' });

  const token = parts[1];
  try {
    const secret = process.env.JWT_SECRET || 'changeme';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token inválido' });
  }
};
