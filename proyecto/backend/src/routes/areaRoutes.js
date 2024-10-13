import { Router } from 'express';
import { 
    obtenerAreas, 
    crearArea, 
    actualizarArea 
} from '../controllers/areaController.js';

const router = Router();

// Rutas
router.get('/', obtenerAreas); // Obtener todas las áreas
router.post('/', crearArea); // Crear una nueva área
router.put('/:id', actualizarArea); // Actualizar un área existente

export default router;
