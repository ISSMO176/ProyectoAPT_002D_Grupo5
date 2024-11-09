import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [encuestas, setEncuestas] = useState([]);
    const [selectedEncuesta, setSelectedEncuesta] = useState(null);
    const [detallesEncuesta, setDetallesEncuesta] = useState(null);
    const [porcentajeRespondidas, setPorcentajeRespondidas] = useState(0);
    const navigate = useNavigate();

    const handleVerEstadisticas = (encuestaId) => {
        navigate(`/estadisticas-encuesta/${encuestaId}`);
    };

    useEffect(() => {
        const fetchEncuestas = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:4000/api/encuestas', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEncuestas(response.data);
            } catch (error) {
                console.error('Error al obtener encuestas:', error);
                alert('Error al obtener encuestas');
            }
        };

        fetchEncuestas();
    }, []);

    const handleEncuestaSelect = async (encuestaId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`http://localhost:4000/api/encuestas/${encuestaId}/detalles`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDetallesEncuesta(response.data);
            setSelectedEncuesta(encuestaId);
            calcularPorcentajeRespondidas(response.data);
        } catch (error) {
            console.error('Error al obtener detalles de la encuesta:', error);
            alert('Error al obtener detalles de la encuesta');
        }
    };

    const calcularPorcentajeRespondidas = (encuestaDetalles) => {
        if (!encuestaDetalles || !encuestaDetalles.preguntas.length) {
            setPorcentajeRespondidas(0);
            return;
        }

        // Contamos el número total de usuarios asignados a la encuesta
        const totalUsuariosAsignados = encuestaDetalles.preguntas[0].respuestas.map(r => r.usuario.rut).filter((value, index, self) => self.indexOf(value) === index).length;

        // Contamos los usuarios que han respondido al menos una pregunta
        const usuariosConRespuestas = new Set();

        encuestaDetalles.preguntas.forEach((pregunta) => {
            pregunta.respuestas.forEach((respuesta) => {
                if (respuesta.texto_respuesta || respuesta.opcion) {
                    usuariosConRespuestas.add(respuesta.usuario.rut);
                }
            });
        });

        // Calculamos el porcentaje basado en los usuarios únicos que han respondido al menos una pregunta
        const porcentaje = totalUsuariosAsignados > 0 ? (usuariosConRespuestas.size / totalUsuariosAsignados) * 100 : 0;
        setPorcentajeRespondidas(porcentaje.toFixed(1));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Dashboard de Encuestas</h2>
            <div className="mb-4">
                <label htmlFor="encuestaSelect" className="form-label">Selecciona una Encuesta:</label>
                <select
                    id="encuestaSelect"
                    className="form-select"
                    onChange={(e) => handleEncuestaSelect(e.target.value)}
                >
                    <option value="">Seleccione una encuesta</option>
                    {encuestas.map((encuesta) => (
                        <option key={encuesta.id_encuesta} value={encuesta.id_encuesta}>
                            {encuesta.titulo}
                        </option>
                    ))}
                </select>
            </div>
            {detallesEncuesta && (
                <div className="mt-4">
                    <h4>Detalles de la Encuesta: {detallesEncuesta.titulo}</h4>
                    <p><strong>Porcentaje de encuestas respondidas:</strong> {porcentajeRespondidas}%</p>
                    <button
                        className="btn btn-primary mb-3"
                        onClick={() => handleVerEstadisticas(selectedEncuesta)}
                    >
                        Ver Estadísticas
                    </button>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>RUT del Usuario</th>
                                <th>Nombre del Usuario</th>
                                {detallesEncuesta.preguntas.map((pregunta) => (
                                    <th key={pregunta.id_pregunta}>{pregunta.texto_pregunta}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Iterar sobre cada usuario que haya respondido */}
                            {detallesEncuesta.preguntas[0]?.respuestas.map((_, index) => {
                                const usuario = detallesEncuesta.preguntas[0].respuestas[index].usuario;

                                return (
                                    <tr key={usuario.rut}>
                                        {/* RUT del usuario en la primera columna */}
                                        <td>{usuario.rut}</td>
                                        {/* Nombre del usuario en la segunda columna */}
                                        <td>
                                            {usuario.nombre} {usuario.apellido_paterno} {usuario.apellido_materno}
                                        </td>
                                        {/* Respuestas del usuario para cada pregunta */}
                                        {detallesEncuesta.preguntas.map((pregunta) => {
                                            const respuesta = pregunta.respuestas.find(
                                                (resp) => resp.usuarioId === usuario.rut
                                            );

                                            return (
                                                <td key={pregunta.id_pregunta}>
                                                    {respuesta
                                                        ? respuesta.texto_respuesta || respuesta.opcion?.texto_opcion
                                                        : 'Sin respuesta'}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
