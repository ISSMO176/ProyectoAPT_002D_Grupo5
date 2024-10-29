// src/routes/encuestaAsignadaRoutes.js
import express from 'express';
import { asignarEncuesta, obtenerEncuestasAsignadas } from '../controllers/encuestaAsignadaController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/asignar', asignarEncuesta);
router.get('/misEncuestas', authMiddleware, obtenerEncuestasAsignadas);

export default router;
