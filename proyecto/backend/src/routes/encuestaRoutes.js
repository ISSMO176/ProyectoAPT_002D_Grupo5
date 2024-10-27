import { Router } from 'express';
import { crearEncuesta, obtenerEncuestas, actualizarEncuesta, deshabilitarEncuesta, obtenerEncuestaPorId } from '../controllers/encuestaController.js';

const router = Router();

// Rutas
router.get('/', obtenerEncuestas); // Esta línea debe estar presente
router.post('/', crearEncuesta);
router.put('/:id', actualizarEncuesta);
router.put('/deshabilitar/:id', deshabilitarEncuesta);
router.get('/:id', obtenerEncuestaPorId);
export default router;