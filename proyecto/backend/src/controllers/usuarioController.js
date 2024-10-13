import prisma from '../prismaClient.js'; // Asegúrate de que la ruta sea correcta

// Crear un nuevo usuario
export const crearUsuario = async (req, res) => {
  const { rut, nombre, apellido_paterno, apellido_materno, correo, contrasena, rolId } = req.body;
  try {
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        rut,
        nombre,
        apellido_paterno,
        apellido_materno,
        correo,
        contrasena, // Considera encriptar la contraseña
        rolId,
      },
    });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Actualizar un usuario
export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido_paterno, apellido_materno, correo, rolId } = req.body;
  try {
    const usuarioActualizado = await prisma.usuario.update({
      where: { rut: id }, // Asegúrate de que estás usando el identificador correcto
      data: {
        nombre,
        apellido_paterno,
        apellido_materno,
        correo,
        rolId,
      },
    });
    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Eliminar un usuario
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.usuario.delete({
      where: { rut: id }, // Asegúrate de que estás usando el identificador correcto
    });
    res.status(204).send(); // Respuesta sin contenido
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};
