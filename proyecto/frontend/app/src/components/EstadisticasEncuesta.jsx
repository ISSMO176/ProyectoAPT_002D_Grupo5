import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

const EstadisticasEncuesta = () => {
    const { encuestaId, preguntaId } = useParams(); // Obteniendo los parámetros de la URL
    const [estadisticas, setEstadisticas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("encuestaId:", encuestaId, "preguntaId:", preguntaId);

        if (!encuestaId || !preguntaId) {
            console.error("Faltan los parámetros de encuestaId o preguntaId.");
            setLoading(false);
            return;
        }

        const fetchEstadisticas = async () => {
            try {
                const token = localStorage.getItem('token');
                const encuestaIdNum = parseInt(encuestaId);
                const preguntaIdNum = parseInt(preguntaId);

                if (!encuestaIdNum || !preguntaIdNum) {
                    console.error("Los parámetros de encuestaId o preguntaId no son válidos.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`http://localhost:4000/api/respuestas/${encuestaIdNum}/pregunta/${preguntaIdNum}/estadisticas`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEstadisticas(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener estadísticas:', error);
                setLoading(false);
                alert("No se pudieron cargar las estadísticas. Revisa los parámetros e inténtalo de nuevo.");
            }
        };

        fetchEstadisticas();
    }, [encuestaId, preguntaId]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!estadisticas || estadisticas.length === 0) {
        return <div>No hay datos para mostrar</div>;
    }

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5733'];
    const data = estadisticas.map((stat, index) => ({
        name: stat.opcion,
        value: stat.respuestas,
        color: COLORS[index % COLORS.length],
    }));

    return (
        <div style={{ width: '50%', margin: '0 auto' }}>
            <h2>Estadísticas de la Pregunta {preguntaId}</h2>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};
export default EstadisticasEncuesta;
