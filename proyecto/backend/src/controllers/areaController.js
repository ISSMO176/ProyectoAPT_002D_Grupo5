import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Obtener todas las áreas
export const obtenerAreas = async (req, res) => {
  try {
    const areas = await prisma.area.findMany(); // Obtener todas las áreas
    res.status(200).json(areas);
  } catch (error) {
    console.error('Error al obtener las áreas:', error);
    res.status(500).json({ error: 'Error al obtener las áreas', details: error.message });
  }
};

// Crear una nueva área
export const crearArea = async (req, res) => {
  const { nombre_area } = req.body;


  if (!nombre_area) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    const nuevaArea = await prisma.area.create({
      data: { 
        nombre_area 
      },
    });
    res.status(201).json(nuevaArea);
  } catch (error) {
    console.error('Error al crear el área:', error);
    res.status(500).json({ error: 'Error al crear el área', details: error.message });
  }
};

// Actualizar un área existente
export const actualizarArea = async (req, res) => {
  const { id } = req.params; 
  const { nombre_area } = req.body; 


  if (!nombre_area) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    const areaActualizada = await prisma.area.update({
      where: { id_area: parseInt(id) }, 
      data: { nombre_area }, 
    });
    res.json(areaActualizada); 
  } catch (error) {
    console.error('Error al actualizar el área:', error);
    res.status(500).json({ error: 'Error al actualizar el área' });
  }
};
