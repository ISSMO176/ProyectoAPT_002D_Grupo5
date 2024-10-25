const verificarRol = (rolId) => (req, res, next) => {
    if (req.user && req.user.rolId === rolId) {
      return next();
    } else {
      return res.status(403).json({ error: 'Acceso denegado' });
    }
  };
  
  module.exports = verificarRol;
  