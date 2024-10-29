// src/routes/respuestaRoutes.js
import express from 'express';
import { guardarRespuestas } from '../controllers/respuestaController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, guardarRespuestas);

export default router;
