import { Router } from 'express';
import { crearEncuesta, obtenerEncuestas, actualizarEncuesta, deshabilitarEncuesta } from '../controllers/encuestaController.js';

const router = Router();

// Rutas
router.get('/encuestas', obtenerEncuestas); // Esta línea debe estar presente
router.post('/encuestas', crearEncuesta);
router.put('/encuestas/:id', actualizarEncuesta);
router.put('/encuestas/deshabilitar/:id', deshabilitarEncuesta);

export default router;