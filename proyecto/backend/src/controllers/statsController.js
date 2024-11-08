import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const getStatistics = async (req, res) => {
    const { encuestaId, preguntaId } = req.params;

    try {
        console.log("preguntaId:", preguntaId);
        // Obtiene las opciones
        const opciones = await prisma.opcionRespuesta.findMany({
            where: {
                preguntaId: parseInt(preguntaId),
            },
            select: {
                id_opcion: true,
                texto_opcion: true,
            },
        });
        console.log('Opciones:', opciones); // Verifica el resultado de la consulta.
        // Obtiene los conteos de respuestas agrupados por opción
        const conteos = await prisma.respuesta.groupBy({
            by: ['opcionId'],
            where: {
                preguntaId_pregunta: parseInt(preguntaId),
                Pregunta: {
                    encuestaId: parseInt(encuestaId),
                },
            },
            _count: {
                opcionId: true,
            },
        });

        // Devuelve las estadísticas (opciones + conteos)
        res.json({ opciones, conteos });

    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
