// src/middleware/verificarToken.js
import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extraer el token del encabezado

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. No se encontró el token.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token con la clave secreta
    req.usuarioId = verified.id; // Guardar el ID del usuario en la solicitud
    next(); // Continuar con la siguiente función middleware
  } catch (error) {
    res.status(400).json({ error: 'Token no válido.' });
  }
};

export default verificarToken;
