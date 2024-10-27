// src/routes/encuestaAsignadaRoutes.js
import { Router } from 'express';
import { asignarEncuestaAUsuarios, asignarEncuestaAArea } from '../controllers/encuestaAsignadaController.js';

const router = Router();

router.post('/usuarios', asignarEncuestaAUsuarios); // Asignar encuesta a varios usuarios
router.post('/area', asignarEncuestaAArea); // Asignar encuesta a un área completa

export default router;
