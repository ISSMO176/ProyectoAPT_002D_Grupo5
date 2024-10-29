// src/controllers/respuestaController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const guardarRespuestas = async (req, res) => {
    const { encuestaId, respuestas } = req.body;
    const usuarioId = req.user.rut; // Usar el ID del usuario autenticado

    try {
        const respuestasGuardadas = await Promise.all(
            Object.entries(respuestas).map(([preguntaId, respuesta]) => {
                return prisma.respuesta.create({
                    data: {
                        texto_respuesta: typeof respuesta === 'string' ? respuesta : null,
                        fecha_respuesta: new Date(),
                        usuarioId,
                        opcionId: typeof respuesta === 'number' ? respuesta : null,
                        preguntaId_pregunta: parseInt(preguntaId)
                    }
                });
            })
        );

        res.json({ message: 'Respuestas guardadas correctamente', respuestas: respuestasGuardadas });
    } catch (error) {
        console.error('Error al guardar respuestas:', error);
        res.status(500).json({ error: 'Error al guardar respuestas' });
    }
};
