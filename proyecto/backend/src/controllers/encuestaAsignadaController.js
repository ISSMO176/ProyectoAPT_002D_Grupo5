// src/controllers/encuestaAsignadaController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const asignarEncuesta = async (req, res) => {
  const { encuestaId, usuarioIds, areaId, estado = "pendiente", fecha_asignacion = new Date() } = req.body;

  try {
      let usuariosAsignar = [];

      // Si se proporciona areaId, obtener todos los usuarios de esa área
      if (areaId) {
          const usuariosEnArea = await prisma.usuario.findMany({
              where: { areaId_area: areaId },
              select: { rut: true }
          });
          usuariosAsignar = usuariosEnArea.map(usuario => usuario.rut);
      }

      // Si se proporciona usuarioIds, añadirlos a la lista
      if (usuarioIds && usuarioIds.length > 0) {
          usuariosAsignar = [...usuariosAsignar, ...usuarioIds];
      }

      // Verificar que al menos hay un usuario para asignar
      if (usuariosAsignar.length === 0) {
          return res.status(400).json({ error: 'No se seleccionaron usuarios ni área' });
      }

      // Crear las asignaciones de encuestas para cada usuario en la lista
      const asignaciones = await Promise.all(
          usuariosAsignar.map(usuarioId =>
              prisma.encuestaAsignada.create({
                  data: {
                      encuestaId: parseInt(encuestaId), // Asegúrate de que encuestaId sea un número
                      usuarioId,
                      estado,
                      fecha_asignacion
                  }
              })
          )
      );

      res.json(asignaciones);
  } catch (error) {
      console.error('Error al asignar la encuesta:', error);
      res.status(500).json({ error: 'Error al asignar la encuesta', details: error.message });
  }
};

export const obtenerEncuestasAsignadas = async (req, res) => {
    const { rut } = req.user;

    try {
        const encuestas = await prisma.encuestaAsignada.findMany({
            where: { usuarioId: rut },
            include: { encuesta: true }
        });
        res.json(encuestas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las encuestas asignadas' });
    }
};

export const obtenerPreguntasDeEncuestaAsignada = async (req, res) => {
  const { encuestaId } = req.params;

  try {
      const preguntas = await prisma.pregunta.findMany({
          where: { encuestaId: parseInt(encuestaId) },
          select: {
              id_pregunta: true,
              texto_pregunta: true,
              tipo_respuesta: true,
              opciones: {
                  select: {
                      id_opcion: true,
                      texto_opcion: true
                  }
              }
          }
      });

      if (!preguntas || preguntas.length === 0) {
          return res.status(404).json({ error: 'No se encontraron preguntas para esta encuesta' });
      }

      res.json(preguntas);
  } catch (error) {
      console.error('Error al obtener preguntas de la encuesta:', error);
      res.status(500).json({ error: 'Error al obtener preguntas de la encuesta', details: error.message });
  }
};