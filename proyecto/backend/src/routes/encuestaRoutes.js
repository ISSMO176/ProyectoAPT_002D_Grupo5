import { Router } from 'express';
import { crearEncuesta, obtenerEncuestas } from '../controllers/encuestaController.js';

const router = Router();

// Rutas
router.get('/encuestas', obtenerEncuestas); // Esta línea debe estar presente
router.post('/encuestas', crearEncuesta);

export default router;