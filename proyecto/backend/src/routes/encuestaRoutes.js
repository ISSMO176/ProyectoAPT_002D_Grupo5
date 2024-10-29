import { Router } from 'express';
import { crearEncuesta, obtenerEncuestas, actualizarEncuesta, deshabilitarEncuesta, obtenerEncuestaPorId, obtenerDetallesEncuesta } from '../controllers/encuestaController.js';

const router = Router();

// Rutas
router.get('/', obtenerEncuestas); 
router.post('/', crearEncuesta);
router.put('/:id', actualizarEncuesta);
router.put('/deshabilitar/:id', deshabilitarEncuesta);
router.get('/:id', obtenerEncuestaPorId);
router.get('/:encuestaId/detalles', obtenerDetallesEncuesta);
export default router;