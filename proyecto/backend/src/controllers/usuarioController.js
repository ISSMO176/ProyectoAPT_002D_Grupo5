import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();


export const login = async (req, res) => {
  const { rut, contrasena } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { rut },
      include: { rol: true },
    });

    if (!usuario || !usuario.activo) {
      return res.status(401).json({ error: 'Usuario no habilitado o no encontrado' });
    }

    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!contrasenaValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { rut: usuario.rut, rol: usuario.rol.nombre_rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error en el login' });
  }
};

export const cambiarEstadoUsuario = async (req, res) => {
  const { rut } = req.params;
  const { activo } = req.body;

  try {
    const usuarioModificado = await prisma.usuario.update({
      where: { rut },
      data: { activo },
    });
    res.status(200).json({ message: `Usuario ${activo ? 'habilitado' : 'deshabilitado'} correctamente.` });
  } catch (error) {
    console.error('Error al cambiar el estado del usuario:', error);
    res.status(500).json({ error: 'Error al cambiar el estado del usuario' });
  }
};


export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: {
        rol: true, 
        Area: true, 
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
  if (!rut || !nombre || !apellido_paterno || !correo || !contrasena || !rolId || !areaId_area) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
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
  const { rut } = req.params; // El RUT proviene de los parámetros de la ruta
  const { nombre, apellido_paterno, apellido_materno, correo, contrasena } = req.body;

  // Validar que los campos requeridos estén presentes
  if (!nombre || !apellido_paterno || !correo) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    // Crear un objeto con los datos a actualizar
    const data = {
      nombre,
      apellido_paterno,
      apellido_materno,
      correo,
    };

    // Si se envía una nueva contraseña, encriptarla y añadirla
    if (contrasena) {
      const nuevaContrasenaEncriptada = await bcrypt.hash(contrasena, 10);
      data.contrasena = nuevaContrasenaEncriptada;
    }

    // Actualizar los datos del usuario
    const usuarioModificado = await prisma.usuario.update({
      where: { rut },
      data,
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
      where: { rut: req.user.rut }, // Usamos el RUT desde el token
      select: {
        rut: true,
        nombre: true,
        apellido_paterno: true,
        apellido_materno: true,
        correo: true,
        rol: {
          select: {
            nombre_rol: true,
          },
        },
        Area: {
          select: {
            nombre_area: true,
          },
        },
      },
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    res.status(500).json({ error: 'Error al obtener el perfil', details: error.message });
  }
};

// Actualizar perfil del usuario
export const actualizarPerfil = async (req, res) => {
  const { nombre, apellido_paterno, apellido_materno, correo, contrasenaNueva } = req.body;
  
  // Validar que los campos requeridos estén presentes
  if (!nombre || !apellido_paterno || !correo) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    // Crea el objeto de datos que será actualizado
    const data = {
      nombre,
      apellido_paterno,
      apellido_materno,
      correo,
    };

    // Si se envía una nueva contraseña, encriptarla y añadirla
    if (contrasenaNueva) {
      const nuevaContrasenaEncriptada = await bcrypt.hash(contrasenaNueva, 10);
      data.contrasena = nuevaContrasenaEncriptada;
    }

    // Actualiza el usuario en la base de datos usando el RUT del token
    const usuarioModificado = await prisma.usuario.update({
      where: { rut: req.user.rut },
      data,
    });

    res.status(200).json(usuarioModificado);
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    res.status(500).json({ error: 'Error al actualizar el perfil', details: error.message });
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