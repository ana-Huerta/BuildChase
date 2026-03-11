module.exports = function roleMiddleware(requiredRole) {
  return function (req, res, next) {
    if (!req.user) return res.status(401).json({ success: false, message: 'No autenticado' });
    if (requiredRole === 'admin' && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Requiere rol de administrador' });
    }
    return next();
  };
};
