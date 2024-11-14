import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Text, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { CircularProgress, IconButton, Tooltip as MuiTooltip, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { BarChart as BarChartIcon, PieChart as PieChartIcon } from '@mui/icons-material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const EstadisticasEncuesta = () => {
    const { encuestaId } = useParams();
    const [estadisticas, setEstadisticas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPieChart, setIsPieChart] = useState(true);

    const chartRefs = useRef([]);

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

                const estadisticasFiltradas = response.data.filter(
                    pregunta => pregunta.opciones && pregunta.opciones.length > 0
                );
                setEstadisticas(estadisticasFiltradas);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener estadísticas:', error);
                setLoading(false);
                alert("No se pudieron cargar las estadísticas.");
            }
        };

        fetchEstadisticas();
    }, [encuestaId]);

    const handleToggleChart = () => {
        setIsPieChart(!isPieChart);
    };

    const generateChartImage = (chartRef) => {
        return new Promise((resolve, reject) => {
            html2canvas(chartRef, { scale: 2 })
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    resolve(imgData);
                })
                .catch(reject);
        });
    };

    const handleDownloadPDF = async () => {
        const doc = new jsPDF();
        let yOffset = 10;
        for (let index = 0; index < estadisticas.length; index++) {
            const pregunta = estadisticas[index];
            const chartRef = chartRefs.current[index];
            try {
                const imgData = await generateChartImage(chartRef);
                doc.setFontSize(12);
                doc.text(pregunta.texto_pregunta, 10, yOffset);
                doc.addImage(imgData, 'PNG', 10, yOffset + 5, 200, 120); // Ajusta la posición y el tamaño
                yOffset += 110; // Ajusta el desplazamiento para el siguiente gráfico

                if (yOffset > 270) {
                    doc.addPage();
                    yOffset = 10;
                }

            } catch (error) {
                console.error('Error al generar la imagen del gráfico:', error);
            }
        }

        // Guarda el documento PDF
        doc.save('reporte_estadisticas.pdf');
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (!estadisticas || estadisticas.length === 0) {
        return <div>No hay datos para mostrar</div>;
    }

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5733'];

    const renderCustomizedLabel = ({ x, y, name, percent }) => {
        const fontSize = name.length > 10 ? 12 : 14;
        return (
            <Text x={x} y={y} fontSize={fontSize} fill="#333" textAnchor="middle" dominantBaseline="central">
                {`${name}: ${(percent * 100).toFixed(0)}%`}
            </Text>
        );
    };

    return (
        <div style={{ width: '90%', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
            <h2>Estadísticas de la Encuesta {encuestaId}</h2>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <MuiTooltip title={isPieChart ? "Cambiar a gráfico de barras" : "Cambiar a gráfico circular"}>
                    <IconButton onClick={handleToggleChart} color="primary">
                        {isPieChart ? <BarChartIcon /> : <PieChartIcon />}
                    </IconButton>
                </MuiTooltip>
                <span style={{ fontSize: '0.9rem', color: '#333', marginLeft: '8px' }}>
                    {isPieChart ? "Cambiar a gráfico de barras" : "Cambiar a gráfico circular"}
                </span>
            </div>

            {estadisticas.map((pregunta, index) => (
                <div key={index} style={{ marginBottom: '2rem', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} ref={(el) => chartRefs.current[index] = el}>
                    <h3 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '1rem' }}>{pregunta.texto_pregunta}</h3>

                    <ResponsiveContainer width="100%" height={505}>
                        {isPieChart ? (
                            <PieChart>
                                <Pie
                                    data={pregunta.opciones.map((opcion, idx) => ({
                                        name: opcion.texto_opcion,
                                        value: opcion.respuestas,
                                        color: COLORS[idx % COLORS.length],
                                    }))}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={200} 
                                    innerRadius={80}
                                    dataKey="value"
                                    isAnimationActive={true}
                                >
                                    {pregunta.opciones.map((_, idx) => (
                                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        ) : (
                            <BarChart
                                data={pregunta.opciones.map((opcion) => ({
                                    name: opcion.texto_opcion,
                                    value: opcion.respuestas,
                                }))}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        )}
                    </ResponsiveContainer>
                </div>
            ))}
            <Button onClick={handleDownloadPDF} variant="contained" color="primary">
                Descargar Reporte PDF
            </Button>
        </div>
    );
};

export default EstadisticasEncuesta;
