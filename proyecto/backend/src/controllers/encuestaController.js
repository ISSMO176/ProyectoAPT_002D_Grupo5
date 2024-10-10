// src/controllers/encuestaController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Obtener todas las encuestas
export const obtenerEncuestas = async (req, res) => {
  try {
    const encuestas = await prisma.encuesta.findMany();
    res.status(200).json(encuestas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las encuestas' });
  }
};

// Crear una nueva encuesta
export const crearEncuesta = async (req, res) => {
  const { titulo, estado_encuesta, fecha_creacion } = req.body;
  try {
    const nuevaEncuesta = await prisma.encuesta.create({
      data: { titulo, estado_encuesta, fecha_creacion },
    });
    res.status(201).json(nuevaEncuesta);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la encuesta' });
  }
};

// Modificar una encuesta existente
export const modificarEncuesta = async (req, res) => {
  const { id } = req.params;
  const { titulo, estado_encuesta } = req.body;
  try {
    const encuestaActualizada = await prisma.encuesta.update({
      where: { id_encuesta: Number(id) },
      data: { titulo, estado_encuesta },
    });
    res.status(200).json(encuestaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la encuesta' });
  }
};

// Deshabilitar una encuesta
export const deshabilitarEncuesta = async (req, res) => {
  const { id } = req.params;
  try {
    const encuestaDeshabilitada = await prisma.encuesta.update({
      where: { id_encuesta: Number(id) },
      data: { estado_encuesta: 'Deshabilitada' },
    });
    res.status(200).json(encuestaDeshabilitada);
  } catch (error) {
    res.status(500).json({ error: 'Error al deshabilitar la encuesta' });
  }
};