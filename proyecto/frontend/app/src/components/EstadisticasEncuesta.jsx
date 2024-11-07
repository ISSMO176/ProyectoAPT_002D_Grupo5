import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const EstadisticasEncuesta = ({ encuestaId }) => {
    const [estadisticas, setEstadisticas] = useState(null);

    useEffect(() => {
        const fetchEstadisticas = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:4000/api/encuestas/${encuestaId}/estadisticas`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEstadisticas(response.data);
            } catch (error) {
                console.error('Error al obtener estadísticas:', error);
                alert('Error al obtener estadísticas');
            }
        };

        fetchEstadisticas();
    }, [encuestaId]);

    if (!estadisticas) return <p>Cargando estadísticas...</p>;

    // Configuración del gráfico de barras
    const data = {
        labels: estadisticas.preguntas.map((pregunta) => pregunta.texto_pregunta),
        datasets: estadisticas.preguntas.map((pregunta, index) => ({
            label: `Pregunta ${index + 1}`,
            data: pregunta.opciones.map((opcion) => opcion.porcentaje),
            backgroundColor: `rgba(${(index + 1) * 40}, 99, 132, 0.6)`,
        })),
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Estadísticas de la Encuesta</h2>
            <Bar data={data} />
        </div>
    );
};

export default EstadisticasEncuesta;
