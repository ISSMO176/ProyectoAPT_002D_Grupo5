// src/controllers/usuariosController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: {
        rol: true, // Incluir el rol si lo deseas
        Area: true, // Incluir área si lo deseas
      },
    });
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios', details: error.message });
  }
};

// Crear nuevo usuario
export const crearUsuario = async (req, res) => {
  const { rut, nombre, apellido_paterno, apellido_materno, correo, contrasena, rolId, areaId_area } = req.body;
  
  // Validar que todos los campos estén presentes
  if (!rut || !nombre || !apellido_paterno || !apellido_materno || !correo || !contrasena || !rolId || !areaId_area) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        rut,
        nombre,
        apellido_paterno,
        apellido_materno,
        correo,
        contrasena,
        rolId,
        areaId_area,
      },
    });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: 'Error al crear el usuario', details: error.message });
  }
};

// Modificar usuario
export const modificarUsuario = async (req, res) => {
  const { rut } = req.params;
  const { nombre, apellido_paterno, apellido_materno, correo, contrasena, rolId, areaId_area } = req.body;
  
  // Validar que todos los campos estén presentes
  if (!nombre || !apellido_paterno || !apellido_materno || !correo || !contrasena || !rolId || !areaId_area) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    const usuarioModificado = await prisma.usuario.update({
      where: { rut },
      data: {
        nombre,
        apellido_paterno,
        apellido_materno,
        correo,
        contrasena,
        rolId,
        areaId_area,
      },
    });
    res.status(200).json(usuarioModificado);
  } catch (error) {
    console.error('Error al modificar el usuario:', error);
    res.status(500).json({ error: 'Error al modificar el usuario', details: error.message });
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  const { rut } = req.params;
  
  try {
    await prisma.usuario.delete({
      where: { rut },
    });
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ error: 'Error al eliminar el usuario', details: error.message });
  }
};
