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
        fecha_creacion: fechaValida 
      },
    });
    res.status(201).json(nuevaEncuesta);
  } catch (error) {
    console.error('Error al crear la encuesta:', error); 
    res.status(500).json({ error: 'Error al crear la encuesta', details: error.message, stack: error.stack });
  }
};

// Actualizar una encuesta existente
export const actualizarEncuesta = async (req, res) => {
  const { id } = req.params; 
  const { titulo, estado_encuesta } = req.body; 

  try {
    const encuestaActualizada = await prisma.encuesta.update({
      where: { id_encuesta: parseInt(id) }, 
      data: { titulo, estado_encuesta }, 
    });
    res.json(encuestaActualizada); 
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la encuesta' });
  }
};

// Deshabilitar una encuesta
export const deshabilitarEncuesta = async (req, res) => {
  const { id } = req.params;
  try {
    const encuesta = await prisma.encuesta.findUnique({
      where: { id_encuesta: Number(id) },
    });

    const nuevoEstado = encuesta.estado_encuesta === 'Activa' ? 'Deshabilitada' : 'Activa';

    const encuestaActualizada = await prisma.encuesta.update({
      where: { id_encuesta: Number(id) },
      data: { estado_encuesta: nuevoEstado },
    });
    res.status(200).json(encuestaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al cambiar el estado de la encuesta' });
  }
};

export const obtenerEncuestaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const encuesta = await prisma.encuesta.findUnique({
      where: { id_encuesta: parseInt(id) },
      include: { preguntas: true }, // Incluye las preguntas si deseas obtenerlas junto con la encuesta
    });

    if (!encuesta) {
      return res.status(404).json({ error: 'Encuesta no encontrada' });
    }

    res.status(200).json(encuesta);
  } catch (error) {
    console.error('Error al obtener la encuesta:', error);
    res.status(500).json({ error: 'Error al obtener la encuesta', details: error.message });
  }
};