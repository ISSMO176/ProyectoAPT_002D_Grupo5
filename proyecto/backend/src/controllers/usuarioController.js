import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_aqui'; // Cambia esto por un secreto más seguro

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
    // Encriptar la contraseña antes de almacenarla
    const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        rut,
        nombre,
        apellido_paterno,
        apellido_materno,
        correo,
        contrasena: contrasenaEncriptada, // Usar la contraseña encriptada
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
    const contrasenaEncriptada = await bcrypt.hash(contrasena, 10); // Encriptar nueva contraseña
    const usuarioModificado = await prisma.usuario.update({
      where: { rut },
      data: {
        nombre,
        apellido_paterno,
        apellido_materno,
        correo,
        contrasena: contrasenaEncriptada, // Usar la contraseña encriptada
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

// src/controllers/usuarioController.js
export const login = async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { correo },
      include: { rol: true }, // Incluye el rol en la consulta
    });

    if (!usuario || !(await bcrypt.compare(contrasena, usuario.contrasena))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar el token JWT incluyendo el rol del usuario
    const token = jwt.sign(
      { id: usuario.rut, rol: usuario.rol.nombre_rol, areaId: usuario.areaId_area },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, usuario: { ...usuario, contrasena: undefined } });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error en el login', details: error.message });
  }
};


export const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { correo: req.usuario.correo }, // O el identificador que uses
      select: {
        nombre: true,
        correo: true,
      },
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    res.status(500).json({ error: 'Error al obtener el perfil', details: error.message });
  }
};

// Actualizar perfil del usuario
export const actualizarPerfil = async (req, res) => {
  const { usuarioId } = req; // Suponiendo que el ID del usuario se obtiene del token
  const { nombre, correo, telefono, direccion } = req.body;

  try {
    const usuarioActualizado = await prisma.usuario.update({
      where: { id: usuarioId }, // Asegúrate de que 'id' es la clave primaria de usuario
      data: {
        nombre,
        correo,
      },
    });

    res.status(200).json(usuarioActualizado);
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ error: 'Error al actualizar perfil', details: error.message });
  }
};