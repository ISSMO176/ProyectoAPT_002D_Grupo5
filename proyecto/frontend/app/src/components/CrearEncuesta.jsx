import React, { useState } from 'react';
import axios from 'axios';

const CrearEncuesta = () => {
  const [titulo, setTitulo] = useState('');
  const [estadoEncuesta, setEstadoEncuesta] = useState('Habilitada');
  const [fechaCreacion, setFechaCreacion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    // Validar que el título no esté vacío
    if (!titulo) {
      setError('El título es obligatorio.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/encuestas', {
        titulo,
        estado_encuesta: estadoEncuesta,
        fecha_creacion: fechaCreacion || new Date().toISOString(), // Usar fecha seleccionada o actual
      });
      setMensaje('Encuesta creada con éxito.');
      setTitulo('');
      setFechaCreacion(''); // Limpiar el campo de fecha
    } catch (error) {
      console.error('Error al crear la encuesta:', error);
      setError('Error al crear la encuesta. Intente nuevamente.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Crear Encuesta</h2>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <div className="form-group">
          <label>Título:</label>
          <input 
            type="text" 
            className="form-control" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Estado:</label>
          <select 
            className="form-control" 
            value={estadoEncuesta} 
            onChange={(e) => setEstadoEncuesta(e.target.value)}
          >
            <option value="Habilitada">Habilitada</option>
            <option value="Deshabilitada">Deshabilitada</option>
          </select>
        </div>
        <div className="form-group">
          <label>Fecha de Creación:</label>
          <input 
            type="date" 
            className="form-control" 
            value={fechaCreacion} 
            onChange={(e) => setFechaCreacion(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Crear</button>
      </form>
      {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default CrearEncuesta;
