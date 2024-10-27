import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AsignarEncuestas = () => {
  const [encuestas, setEncuestas] = useState([]);
  const [areas, setAreas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [encuestaId, setEncuestaId] = useState('');
  const [tipoAsignacion, setTipoAsignacion] = useState('usuario'); // 'usuario' o 'area'
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState([]); // Array para múltiples usuarios
  const [areaId, setAreaId] = useState('');
  const [message, setMessage] = useState('');

  // Cargar encuestas disponibles
  useEffect(() => {
    const fetchEncuestas = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/encuestas');
        setEncuestas(response.data);
      } catch (error) {
        console.error('Error al cargar encuestas:', error);
      }
    };

    fetchEncuestas();
  }, []);

  // Cargar áreas disponibles
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/areas');
        setAreas(response.data);
      } catch (error) {
        console.error('Error al cargar áreas:', error);
      }
    };

    fetchAreas();
  }, []);

  // Cargar usuarios disponibles
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Limpiar mensajes previos

    try {
      if (tipoAsignacion === 'usuario') {
        // Asignar encuesta a múltiples usuarios
        await Promise.all(
          usuariosSeleccionados.map(usuarioId =>
            axios.post('http://localhost:4000/api/encuestas-asignadas/usuario', {
              encuestaId,
              usuarioId,
            })
          )
        );
        setMessage(`Encuesta asignada a los usuarios seleccionados`);
      } else {
        // Asignar encuesta a área
        await axios.post('http://localhost:4000/api/encuestas-asignadas/area', {
          encuestaId,
          areaId,
        });
        setMessage(`Encuesta asignada al área ${areaId}`);
      }

      // Limpiar los campos de entrada
      setEncuestaId('');
      setUsuariosSeleccionados([]);
      setAreaId('');
    } catch (error) {
      console.error('Error al asignar encuesta:', error);
      setMessage('Error al asignar encuesta. Por favor, inténtalo nuevamente.');
    }
  };

  // Manejar selección de múltiples usuarios
  const handleUsuarioChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedValues = selectedOptions.map(option => option.value);
    setUsuariosSeleccionados(selectedValues);
  };

  return (
    <div className="container mt-4">
      <h2>Asignar Encuesta</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="encuestaId" className="form-label">Seleccionar Encuesta:</label>
          <select
            id="encuestaId"
            value={encuestaId}
            onChange={(e) => setEncuestaId(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Selecciona una encuesta</option>
            {encuestas.map((encuesta) => (
              <option key={encuesta.id_encuesta} value={encuesta.id_encuesta}>
                {encuesta.titulo}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="tipoAsignacion" className="form-label">Asignar a:</label>
          <select
            id="tipoAsignacion"
            value={tipoAsignacion}
            onChange={(e) => setTipoAsignacion(e.target.value)}
            className="form-select"
          >
            <option value="usuario">Usuarios específicos</option>
            <option value="area">Todos los usuarios del área</option>
          </select>
        </div>

        {tipoAsignacion === 'usuario' ? (
          <div className="mb-3">
            <label htmlFor="usuarioId" className="form-label">Seleccionar Usuarios:</label>
            <select
              id="usuarioId"
              multiple
              value={usuariosSeleccionados}
              onChange={handleUsuarioChange}
              className="form-select"
              required
            >
              {usuarios.map((usuario) => (
                <option key={usuario.rut} value={usuario.rut}>
                  {usuario.nombre} {usuario.apellido_paterno} - {usuario.rut}
                </option>
              ))}
            </select>
            <small className="form-text text-muted">Mantén presionado Ctrl (Windows) o Cmd (Mac) para seleccionar varios usuarios.</small>
          </div>
        ) : (
          <div className="mb-3">
            <label htmlFor="areaId" className="form-label">Seleccionar Área:</label>
            <select
              id="areaId"
              value={areaId}
              onChange={(e) => setAreaId(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Selecciona un área</option>
              {areas.map((area) => (
                <option key={area.id_area} value={area.id_area}>
                  {area.nombre_area}
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Asignar Encuesta
        </button>
      </form>
    </div>
  );
};

export default AsignarEncuestas;
