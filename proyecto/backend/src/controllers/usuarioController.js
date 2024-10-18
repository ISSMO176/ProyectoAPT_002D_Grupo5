import { db, admin } from '../controllers/firebase.js';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

// Función de inicio de sesión
export const iniciarSesion = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    // Buscar al usuario por su correo
    const usuario = await prisma.usuario.findUnique({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Comparar la contraseña ingresada con la contraseña hasheada almacenada en la base de datos
    const esContrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!esContrasenaValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Si la contraseña es válida, devuelve un mensaje exitoso
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión', details: error.message });
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
    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(contrasena, 10);  // 10 es el "cost" o nivel de seguridad

    // Crear usuario en Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: correo,
      password: contrasena,  // Se debe pasar la contraseña sin hash a Firebase
      displayName: `${nombre} ${apellido_paterno} ${apellido_materno || ''}`,
    });

    // Crear usuario en PostgreSQL (Prisma)
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        rut,
        nombre,
        apellido_paterno,
        apellido_materno: apellido_materno || null,
        correo,
        contrasena: hashedPassword,  // Guardar la contraseña encriptada
        rolId,
        areaId_area,
      },
    });
    res.status(201).json({ usuario: nuevoUsuario, firebaseUser: userRecord });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: 'Error al crear el usuario', details: error.message });
  }
};
export const modificarUsuario = async (req, res) => {
  const { rut } = req.params;
  const { nombre, apellido_paterno, apellido_materno, correo, contrasena, rolId, areaId_area } = req.body;
  // Validar que los campos requeridos estén presentes
  if (!nombre || !apellido_paterno || !correo || !contrasena || !rolId || !areaId_area) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  try {
    // Buscar el usuario actual
    const usuarioActual = await prisma.usuario.findUnique({ where: { rut } });
    if (!usuarioActual) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    // Hashear la nueva contraseña si es proporcionada
    let hashedPassword = usuarioActual.contrasena;  // Usar la contraseña actual por defecto
    if (contrasena) {
      hashedPassword = await bcrypt.hash(contrasena, 10);  // Encriptar la nueva contraseña
    }
    // Actualizar usuario en Firebase
    const firebaseUser = await admin.auth().getUserByEmail(usuarioActual.correo);
    await admin.auth().updateUser(firebaseUser.uid, {
      email: correo,
      password: contrasena,  // Firebase necesita la contraseña sin hash
      displayName: `${nombre} ${apellido_paterno} ${apellido_materno || ''}`,
    });
    // Actualizar usuario en PostgreSQL
    const usuarioModificado = await prisma.usuario.update({
      where: { rut },
      data: {
        nombre,
        apellido_paterno,
        apellido_materno: apellido_materno || null,
        correo,
        contrasena: hashedPassword,  // Guardar la contraseña encriptada
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
    // Buscar el correo del usuario a eliminar
    const usuario = await prisma.usuario.findUnique({ where: { rut } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Eliminar el usuario de Firebase Authentication
    const firebaseUser = await admin.auth().getUserByEmail(usuario.correo);
    await admin.auth().deleteUser(firebaseUser.uid);

    // Eliminar usuario en PostgreSQL (Prisma)
    await prisma.usuario.delete({ where: { rut } });

    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ error: 'Error al eliminar el usuario', details: error.message });
  }
};