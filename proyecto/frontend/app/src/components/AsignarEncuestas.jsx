// src/components/AsignarEncuestas.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AsignarEncuestas = () => {
    const [encuestaId, setEncuestaId] = useState('');
    const [usuarioIds, setUsuarioIds] = useState([]);
    const [areaId, setAreaId] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [areas, setAreas] = useState([]);
    const [encuestas, setEncuestas] = useState([]); // Nueva variable para almacenar encuestas

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/usuarios');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        };

        const fetchAreas = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/areas');
                setAreas(response.data);
            } catch (error) {
                console.error('Error al obtener áreas:', error);
            }
        };

        const fetchEncuestas = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/encuestas');
                setEncuestas(response.data);
            } catch (error) {
                console.error('Error al obtener encuestas:', error);
            }
        };

        fetchUsuarios();
        fetchAreas();
        fetchEncuestas();
    }, []);

    const handleAsignar = async () => {
        if (!encuestaId) {
            alert("Seleccione una encuesta para asignar.");
            return;
        }

        try {
            await axios.post('http://localhost:4000/api/encuestasAsignada/asignar', {
                encuestaId: parseInt(encuestaId), // Asegúrate de enviar encuestaId como un número
                usuarioIds: usuarioIds.length > 0 ? usuarioIds : null,
                areaId: areaId || null,
            });
            alert('Encuesta asignada con éxito');
        } catch (error) {
            console.error('Error al asignar encuesta', error);
            alert('Error al asignar encuesta');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Asignar Encuesta</h2>
            <form className="mx-auto" style={{ maxWidth: '500px' }}>
                <div className="form-group mb-3">
                    <label htmlFor="encuestaId">Seleccionar Encuesta</label>
                    <select
                        className="form-select"
                        id="encuestaId"
                        value={encuestaId}
                        onChange={(e) => setEncuestaId(e.target.value)}
                    >
                        <option value="">Seleccione una encuesta</option>
                        {encuestas.map((encuesta) => (
                            <option key={encuesta.id_encuesta} value={encuesta.id_encuesta}>
                                {encuesta.titulo}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label>Seleccionar Usuarios</label>
                    {usuarios.map((usuario) => (
                        <div key={usuario.rut} className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                value={usuario.rut}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setUsuarioIds([...usuarioIds, usuario.rut]);
                                    } else {
                                        setUsuarioIds(usuarioIds.filter(id => id !== usuario.rut));
                                    }
                                }}
                            />
                            <label className="form-check-label">
                                {usuario.nombre} {usuario.apellido_paterno}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="form-group mb-3">
                    <label>O Seleccionar Área</label>
                    <select className="form-select" onChange={(e) => setAreaId(e.target.value)}>
                        <option value="">Seleccionar Área</option>
                        {areas.map((area) => (
                            <option key={area.id_area} value={area.id_area}>
                                {area.nombre_area}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="button" className="btn btn-primary w-100" onClick={handleAsignar}>
                    Asignar Encuesta
                </button>
            </form>
        </div>
    );
};

export default AsignarEncuestas;
