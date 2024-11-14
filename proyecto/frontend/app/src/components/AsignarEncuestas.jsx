import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AsignarEncuestas = () => {
    const [encuestaId, setEncuestaId] = useState('');
    const [areaId, setAreaId] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
    const [usuariosSeleccionados, setUsuariosSeleccionados] = useState({});
    const [areas, setAreas] = useState([]);
    const [encuestas, setEncuestas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [seleccionarTodos, setSeleccionarTodos] = useState(false);

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

    useEffect(() => {
        // Filtrar usuarios por área y búsqueda de nombre
        let usuariosEnArea = usuarios.filter(usuario => usuario.areaId_area === parseInt(areaId));

        if (searchTerm) {
            usuariosEnArea = usuariosEnArea.filter(usuario =>
                `${usuario.nombre} ${usuario.apellido_paterno}`
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        }

        setUsuariosFiltrados(usuariosEnArea);

        // Reiniciar selección de usuarios al cambiar el área o búsqueda
        const seleccionInicial = {};
        usuariosEnArea.forEach(usuario => {
            seleccionInicial[usuario.rut] = seleccionarTodos; // Actualiza según el estado de "Seleccionar todos"
        });
        setUsuariosSeleccionados(seleccionInicial);
    }, [areaId, searchTerm, usuarios, seleccionarTodos]);

    const handleCheckboxChange = (rut) => {
        setUsuariosSeleccionados((prevSeleccionados) => ({
            ...prevSeleccionados,
            [rut]: !prevSeleccionados[rut],
        }));
    };

    const handleSelectAll = () => {
        setSeleccionarTodos(prevState => !prevState); // Cambia el estado de "Seleccionar todos"
    };

    const handleAsignar = async () => {
        if (!encuestaId) {
            alert("Seleccione una encuesta para asignar.");
            return;
        }

        // Para filtrar solo los usuarios seleccionados manualmente
        const usuarioIdsSeleccionados = Object.keys(usuariosSeleccionados)
            .filter(rut => usuariosSeleccionados[rut]);

        if (usuarioIdsSeleccionados.length === 0) {
            alert("Seleccione al menos un usuario para asignar la encuesta.");
            return;
        }

        try {
            await axios.post('http://localhost:4000/api/encuestasAsignada/asignar', {
                encuestaId: parseInt(encuestaId),
                usuarioIds: usuarioIdsSeleccionados,
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
            <div className="row">
                {/* Columna izquierda para el formulario */}
                <div className="col-md-6">
                    <form>
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
                            <label>Seleccionar Área</label>
                            <select
                                className="form-select"
                                onChange={(e) => setAreaId(e.target.value)}
                            >
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

                {/* Columna derecha para el buscador y listado de usuarios */}
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label>Buscar Usuario</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por nombre"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Botón para seleccionar/deseleccionar todos los usuarios */}
                    <button
                        type="button"
                        className="btn btn-secondary w-100 mb-3"
                        onClick={handleSelectAll}
                    >
                        {seleccionarTodos ? "Desmarcar Todos" : "Seleccionar Todos"}
                    </button>

                    <div className="form-group">
                        <label>Usuarios en el área seleccionada</label>
                        {usuariosFiltrados.map((usuario) => (
                            <div key={usuario.rut} className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    value={usuario.rut}
                                    checked={usuariosSeleccionados[usuario.rut] || false}
                                    onChange={() => handleCheckboxChange(usuario.rut)}
                                />
                                <label className="form-check-label">
                                    {usuario.nombre} {usuario.apellido_paterno}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AsignarEncuestas;
