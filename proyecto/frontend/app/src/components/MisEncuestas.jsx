// src/components/MisEncuestas.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MisEncuestas = () => {
    const [encuestas, setEncuestas] = useState([]);

    useEffect(() => {
        const fetchEncuestas = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:4000/api/encuestasAsignada/misEncuestas', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEncuestas(response.data);
            } catch (error) {
                console.error('Error al cargar encuestas', error);
            }
        };
        fetchEncuestas();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Mis Encuestas Asignadas</h2>
            <ul className="list-group">
                {encuestas.map(encuesta => (
                    <li key={encuesta.id_asignacion} className="list-group-item d-flex justify-content-between align-items-center">
                        {encuesta.encuesta.titulo}
                        <span className="badge bg-primary">{encuesta.estado}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MisEncuestas;
