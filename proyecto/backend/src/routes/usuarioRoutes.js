// src/routes/usuarioRoutes.js
import express from 'express';
import {
  obtenerUsuarios,
  crearUsuario,
  modificarUsuario,
  eliminarUsuario,
} from '../controllers/usuarioController.js';

const router = express.Router();

// Obtener todos los usuarios
router.get('/', obtenerUsuarios);

// Crear un nuevo usuario
router.post('/', crearUsuario);

// Modificar un usuario existente
router.put('/:rut', modificarUsuario);

// Eliminar un usuario
router.delete('/:rut', eliminarUsuario);

export default router;
