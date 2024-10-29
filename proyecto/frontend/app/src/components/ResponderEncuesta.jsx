// src/components/ResponderEncuesta.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResponderEncuesta = () => {
    const { encuestaId } = useParams();
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPreguntas = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:4000/api/encuestasAsignada/${encuestaId}/preguntas`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPreguntas(response.data);
            } catch (error) {
                console.error('Error al obtener preguntas:', error);
                alert('No se pudieron cargar las preguntas de la encuesta.');
            }
        };

        fetchPreguntas();
    }, [encuestaId]);

    const handleChange = (preguntaId, value) => {
        setRespuestas({ ...respuestas, [preguntaId]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        // Debug: Mostrar los datos que se van a enviar
        console.log("Datos enviados:", { encuestaId, respuestas });

        try {
            const response = await axios.post(`http://localhost:4000/api/respuestas`, {
                encuestaId: parseInt(encuestaId),
                respuestas
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Respuestas enviadas correctamente');
            navigate('/misEncuestas');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.error || 'Error al enviar respuestas');
            } else {
                console.error('Error al enviar respuestas:', error);
                alert('Error al enviar respuestas');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Responder Encuesta</h2>
            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '600px' }}>
                {preguntas.map((pregunta) => (
                    <div key={pregunta.id_pregunta} className="mb-4">
                        <label className="form-label">{pregunta.texto_pregunta}</label>
                        {pregunta.tipo_respuesta === 'texto' ? (
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => handleChange(pregunta.id_pregunta, e.target.value)}
                            />
                        ) : (
                            <select
                                className="form-select"
                                onChange={(e) => handleChange(pregunta.id_pregunta, parseInt(e.target.value))}
                            >
                                <option value="">Seleccione una opción</option>
                                {pregunta.opciones.map((opcion) => (
                                    <option key={opcion.id_opcion} value={opcion.id_opcion}>
                                        {opcion.texto_opcion}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                ))}
                <button type="submit" className="btn btn-primary w-100">Enviar Respuestas</button>
            </form>
        </div>
    );
};

export default ResponderEncuesta;
