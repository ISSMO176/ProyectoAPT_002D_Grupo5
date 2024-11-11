import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();


// Método de login

export const login = async (req, res) => {
  const { rut, contrasena } = req.body;

  try {
      const usuario = await prisma.usuario.findUnique({ where: { rut } });
      if (!usuario) return res.status(401).json({ error: 'Usuario no encontrado' });

      const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
      if (!contrasenaValida) return res.status(401).json({ error: 'Contraseña incorrecta' });

      const token = jwt.sign({ rut: usuario.rut }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
  } catch (error) {
      res.status(500).json({ error: 'Error en el login' });
  }
};

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
      where: { id: usuarioId }, 
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


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
export const upload = multer({ storage });

export const cargarUsuariosDesdeExcel = async (req, res) => {
  const filePath = req.file.path;

  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    const usuarios = data.map((row) => ({
      rut: row.rut,
      nombre: row.nombre,
      apellido_paterno: row.apellido_paterno,
      apellido_materno: row.apellido_materno,
      correo: row.correo,
      contrasena: row.contrasena,
      rolId: parseInt(row.rolId),
      areaId_area: row.areaId_area ? parseInt(row.areaId_area) : null,
    }));

    for (const usuario of usuarios) {
      usuario.contrasena = await bcrypt.hash(usuario.contrasena, 10);
    }

    const nuevosUsuarios = await prisma.usuario.createMany({
      data: usuarios,
      skipDuplicates: true,
    });

    res.status(201).json({ message: 'Usuarios creados correctamente', nuevosUsuarios });
  } catch (error) {
    console.error('Error al cargar usuarios desde Excel:', error);
    res.status(500).json({ error: 'Error al cargar usuarios desde Excel' });
  } finally {
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error al eliminar el archivo:', err);
    });
  }
};