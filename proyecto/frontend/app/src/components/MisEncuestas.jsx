// src/components/MisEncuestas.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MisEncuestas = () => {
    const [encuestas, setEncuestas] = useState([]);

    useEffect(() => {
        const fetchEncuestasPendientes = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:4000/api/encuestasAsignada/misEncuestas', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEncuestas(response.data);
            } catch (error) {
                console.error('Error al obtener encuestas:', error);
                alert('Error al obtener encuestas asignadas.');
            }
        };

        fetchEncuestasPendientes();
    }, []);

    if (encuestas.length === 0) {
        return <p>No tienes encuestas pendientes para responder.</p>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center">Mis Encuestas Pendientes</h2>
            <ul className="list-group">
                {encuestas.map((encuestaAsignada) => (
                    <li key={encuestaAsignada.id_asignacion} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{encuestaAsignada.encuesta.titulo}</span>
                        <Link to={`/responderEncuesta/${encuestaAsignada.encuestaId}`} className="btn btn-primary btn-sm">
                            Responder
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MisEncuestas;
