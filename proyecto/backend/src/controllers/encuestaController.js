import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Obtener todas las encuestas
export const obtenerEncuestas = async (req, res) => {
  try {
    const encuestas = await prisma.encuesta.findMany(); // Esto obtiene todas las encuestas
    res.status(200).json(encuestas);
  } catch (error) {
    console.error('Error al obtener las encuestas:', error);
    res.status(500).json({ error: 'Error al obtener las encuestas', details: error.message });
  }
};

// Crear una nueva encuesta
export const crearEncuesta = async (req, res) => {
  const { titulo, estado_encuesta, fecha_creacion } = req.body;

  // Validar que todos los campos estén presentes
  if (!titulo || !estado_encuesta || !fecha_creacion) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  // Asegúrate de que la fecha esté en un formato correcto
  const fechaValida = new Date(fecha_creacion + 'T00:00:00Z');

  try {
    const nuevaEncuesta = await prisma.encuesta.create({
      data: { 
        titulo, 
        estado_encuesta, 
        fecha_creacion: fechaValida // Usa la fecha validada
      },
    });
    res.status(201).json(nuevaEncuesta);
  } catch (error) {
    console.error('Error al crear la encuesta:', error); // Imprimir error en consola
    res.status(500).json({ error: 'Error al crear la encuesta', details: error.message, stack: error.stack });
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
