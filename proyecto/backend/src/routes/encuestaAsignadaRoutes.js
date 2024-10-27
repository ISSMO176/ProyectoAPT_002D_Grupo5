// src/routes/encuestaAsignadaRoutes.js
import { Router } from 'express';
import {
  asignarEncuestaAUsuario,
  asignarEncuestaAArea,
  obtenerEncuestasAsignadasParaUsuario,
} from '../controllers/encuestaAsignadaController.js';
import verificarToken from '../middleware/verificarToken.js';;

const router = Router();

router.post('/usuario', verificarToken, asignarEncuestaAUsuario); // Asignar a usuario específico
router.post('/area', verificarToken, asignarEncuestaAArea); // Asignar a área completa
router.get('/mis-encuestas', verificarToken, obtenerEncuestasAsignadasParaUsuario); // Obtener encuestas asignadas a usuario autenticado

export default router;
