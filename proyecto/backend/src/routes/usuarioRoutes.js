// src/routes/usuarioRoutes.js
import express from 'express';
import {
  obtenerUsuarios,
  crearUsuario,
  modificarUsuario,
  eliminarUsuario,
  login, 
  cargarUsuariosDesdeExcel,
   upload
  // obtenerPerfil,
  // actualizarPerfil,
} from '../controllers/usuarioController.js';
import verificarToken from '../middleware/verificarToken.js';
const router = express.Router();

// Obtener todos los usuarios
router.get('/', obtenerUsuarios);

// Crear un nuevo usuario
router.post('/', crearUsuario);

// Modificar un usuario existente
router.put('/:rut', modificarUsuario);

// Eliminar un usuario
router.delete('/:rut', eliminarUsuario);

router.post('/login', login); // Agregar la ruta de login

router.post('/cargar-excel', upload.single('file'), cargarUsuariosDesdeExcel);
// router.get('/perfil', verificarToken, obtenerPerfil);

// Actualizar perfil del usuario autenticado
// router.put('/perfil', verificarToken, actualizarPerfil);

export default router;


