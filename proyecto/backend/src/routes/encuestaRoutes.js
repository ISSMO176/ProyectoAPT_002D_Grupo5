// src/routes/encuestaRoutes.js
import express from 'express';
import {
  obtenerEncuestas,
  crearEncuesta,
  modificarEncuesta,
  deshabilitarEncuesta
} from '../controllers/encuestaController.js';

const router = express.Router();

router.get('/encuestas', obtenerEncuestas);
router.post('/encuestas', crearEncuesta);
router.put('/encuestas/:id', modificarEncuesta);
router.patch('/encuestas/:id/deshabilitar', deshabilitarEncuesta);

export default router;
