import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

const EstadisticasEncuesta = () => {
    const { encuestaId } = useParams();
    const [estadisticas, setEstadisticas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!encuestaId) {
            console.error("Falta el parámetro de encuestaId.");
            setLoading(false);
            return;
        }

        const fetchEstadisticas = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:4000/api/stats/${encuestaId}/estadisticas`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                setEstadisticas(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener estadísticas:', error);
                setLoading(false);
                alert("No se pudieron cargar las estadísticas.");
            }
        };

        fetchEstadisticas();
    }, [encuestaId]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!estadisticas || estadisticas.length === 0) {
        return <div>No hay datos para mostrar</div>;
    }

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5733'];

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <h2>Estadísticas de la Encuesta {encuestaId}</h2>
            {estadisticas.map((pregunta, index) => (
                <div key={index} style={{ marginBottom: '2rem' }}>
                    <h3>{pregunta.texto_pregunta}</h3>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pregunta.opciones.map((opcion, idx) => ({
                                name: opcion.texto_opcion,
                                value: opcion.respuestas,
                                color: COLORS[idx % COLORS.length],
                            }))}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={150}
                            dataKey="value"
                        >
                            {pregunta.opciones.map((_, idx) => (
                                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            ))}
        </div>
    );
};
export default EstadisticasEncuesta;
