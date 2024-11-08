// src/routes/respuestaRoutes.js
import express from 'express';
import { guardarRespuestas, obtenerEstadisticasRespuestas } from '../controllers/respuestaController.js';
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', authMiddleware, guardarRespuestas);
router.get('/:encuestaId/pregunta/:preguntaId/estadisticas', authMiddleware, obtenerEstadisticasRespuestas);
export default router;
