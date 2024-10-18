import express from 'express';
import {
  obtenerUsuarios,
  crearUsuario,
  modificarUsuario,
  eliminarUsuario,
  iniciarSesion,
  registrarCorreoUsuario, // Importar la función para registrar correos
} from '../controllers/usuarioController.js';

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', obtenerUsuarios);

// Ruta para crear un nuevo usuario
router.post('/', crearUsuario);

// Ruta para modificar un usuario existente
router.put('/:rut', modificarUsuario);

// Ruta para eliminar un usuario
router.delete('/:rut', eliminarUsuario);

// Ruta para iniciar sesión
router.post('/login', iniciarSesion); // Nueva ruta para iniciar sesión

// Ruta para registrar un correo (Nueva)
router.post('/registrarCorreo', registrarCorreoUsuario);  // Ruta para manejar el registro de correos

export default router;
