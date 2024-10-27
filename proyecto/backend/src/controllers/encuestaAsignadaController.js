// src/controllers/encuestaAsignadaController.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Asignar encuesta a un usuario específico
export const asignarEncuestaAUsuario = async (req, res) => {
  const { encuestaId, usuarioId } = req.body;

  try {
    const nuevaAsignacion = await prisma.encuestaAsignada.create({
      data: {
        estado: 'Pendiente',
        fecha_asignacion: new Date(),
        encuestaId: parseInt(encuestaId),
        usuarioId: usuarioId,
        areaId: null,
      },
    });
    res.status(201).json(nuevaAsignacion);
  } catch (error) {
    console.error('Error al asignar la encuesta al usuario:', error);
    res.status(500).json({ error: 'Error al asignar la encuesta', details: error.message });
  }
};

// Asignar encuesta a todos los usuarios de un área
export const asignarEncuestaAArea = async (req, res) => {
  const { encuestaId, areaId } = req.body;

  try {
    const nuevaAsignacion = await prisma.encuestaAsignada.create({
      data: {
        estado: 'Pendiente',
        fecha_asignacion: new Date(),
        encuestaId: parseInt(encuestaId),
        areaId: parseInt(areaId),
        usuarioId: null,
      },
    });
    res.status(201).json({ message: 'Encuesta asignada a todos los usuarios del área' });
  } catch (error) {
    console.error('Error al asignar la encuesta al área:', error);
    res.status(500).json({ error: 'Error al asignar la encuesta al área', details: error.message });
  }
};

// Obtener encuestas asignadas a un usuario
export const obtenerEncuestasAsignadasParaUsuario = async (req, res) => {
    try {
      const encuestasAsignadas = await prisma.encuestaAsignada.findMany({
        where: {
          usuarioId: req.usuarioId, // Filtrar por el usuario autenticado
          estado: 'Pendiente',
        },
        include: {
          encuesta: {
            include: {
              preguntas: {
                include: { opciones: true },
              },
            },
          },
        },
      });
  
      res.status(200).json(encuestasAsignadas);
    } catch (error) {
      console.error('Error al obtener encuestas asignadas:', error);
      res.status(500).json({ error: 'Error al obtener encuestas asignadas' });
    }
  };
