import { Router } from 'express';
import { crearUsuario, obtenerUsuarios, actualizarUsuario, eliminarUsuario } from '../controllers/usuarioController.js';

const router = Router();

// Rutas para el CRUD de usuarios
router.get('/usuarios', obtenerUsuarios); // Obtener todos los usuarios
router.post('/usuarios', crearUsuario); // Crear un nuevo usuario
router.put('/usuarios/:id', actualizarUsuario); // Actualizar un usuario existente
router.delete('/usuarios/:id', eliminarUsuario); // Eliminar un usuario

export default router;
