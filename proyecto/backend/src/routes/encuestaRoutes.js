import { Router } from 'express';
import {
  crearEncuesta,
  obtenerEncuestas,
  actualizarEncuesta,
  deshabilitarEncuesta,
  obtenerEncuestaPorId,
} from '../controllers/encuestaController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import verificarToken from '../middleware/verificarToken.js';

const router = Router();

// Rutas protegidas con autenticación general
router.use(authMiddleware); 
router.post('/', verificarToken(['administrador']), crearEncuesta);
router.put('/:id', verificarToken(['administrador']), actualizarEncuesta);
router.put('/deshabilitar/:id', verificarToken(['administrador']), deshabilitarEncuesta);
router.get('/', verificarToken(['administrador', 'usuario']), obtenerEncuestas);
router.get('/:id', verificarToken(['administrador', 'usuario']), obtenerEncuestaPorId);

export default router;
