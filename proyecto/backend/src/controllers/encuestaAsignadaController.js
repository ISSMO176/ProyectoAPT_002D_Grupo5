// src/controllers/encuestaAsignadaController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Asignar una encuesta a múltiples usuarios
export const asignarEncuestaAUsuarios = async (req, res) => {
  const { encuestaId, usuariosIds } = req.body; // `usuariosIds` debe ser un array de IDs de usuario

  try {
    const asignaciones = await Promise.all(
      usuariosIds.map(usuarioId =>
        prisma.encuestaAsignada.create({
          data: {
            encuestaId: parseInt(encuestaId),
            usuarioId,
            estado: 'Asignada',
            fecha_asignacion: new Date(),
          },
        })
      )
    );

    res.status(201).json({ message: 'Encuesta asignada a los usuarios seleccionados', asignaciones });
  } catch (error) {
    console.error('Error al asignar encuesta a usuarios:', error);
    res.status(500).json({ error: 'Error al asignar encuesta a usuarios', details: error.message });
  }
};

// Asignar una encuesta a todos los usuarios de un área
export const asignarEncuestaAArea = async (req, res) => {
  const { encuestaId, areaId } = req.body;

  try {
    // Obtener todos los usuarios del área
    const usuarios = await prisma.usuario.findMany({
      where: { areaId_area: parseInt(areaId) },
    });

    if (usuarios.length === 0) {
      return res.status(404).json({ error: 'No se encontraron usuarios en el área especificada' });
    }

    const asignaciones = await Promise.all(
      usuarios.map((usuario) =>
        prisma.encuestaAsignada.create({
          data: {
            encuestaId: parseInt(encuestaId),
            usuarioId: usuario.rut,
            estado: 'Asignada',
            fecha_asignacion: new Date(),
          },
        })
      )
    );

    res.status(201).json({ message: 'Encuesta asignada al área seleccionada', asignaciones });
  } catch (error) {
    console.error('Error al asignar encuesta a área:', error);
    res.status(500).json({ error: 'Error al asignar encuesta a área', details: error.message });
  }
};
