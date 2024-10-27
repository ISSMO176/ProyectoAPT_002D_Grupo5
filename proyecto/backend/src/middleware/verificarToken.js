// src/middleware/verificarToken.js
import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized!' });
    }
    req.usuarioId = decoded.id;
    req.areaId = decoded.areaId;
    next();
  });
};

export default verificarToken;
