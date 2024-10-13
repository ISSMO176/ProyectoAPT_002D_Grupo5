import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Encuestas = () => {
  const [encuestas, setEncuestas] = useState([]);
  const navigate = useNavigate();

  // Función para redirigir a la página de creación de encuestas
  const handleCrearEncuesta = () => {
    navigate('/crear-encuesta');
  };

  // Función para redirigir a la página de modificación de encuestas
  const handleModificarEncuesta = (idEncuesta) => {
    navigate(`/modificar-encuesta/${idEncuesta}`);
  };

  // Función para habilitar o deshabilitar una encuesta
  const handleToggleEncuesta = async (idEncuesta, estadoActual) => {
    const nuevoEstado = estadoActual === 'Activa' ? 'Deshabilitada' : 'Activa';
    try {
      await axios.put(`http://localhost:4000/api/encuestas/deshabilitar/${idEncuesta}`);
      fetchEncuestas();
    } catch (error) {
      console.error(`Error al ${nuevoEstado === 'Deshabilitada' ? 'deshabilitar' : 'habilitar'} la encuesta:`, error);
    }
  };

  
  const fetchEncuestas = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/encuestas');
      setEncuestas(response.data);
    } catch (error) {
      console.error('Error al obtener las encuestas:', error);
    }
  };

  useEffect(() => {
    fetchEncuestas();
  }, []);

  return (
    <div>
      <div className="header">
        <img src="/logo.png" alt="Logo" />
        <div>
          <button className="btn btn-outline-light me-2">ENCUESTAS</button>
          <button className="btn btn-dark">Perfil</button>
        </div>
      </div>

      <div className="encuestas-container">
        <button className="btn btn-success mb-3" onClick={handleCrearEncuesta}>
          Crear Encuesta
        </button>

        {encuestas.length > 0 ? (
          encuestas.map(encuesta => (
            <div className="encuesta-card" key={encuesta.id_encuesta}>
              <div>
                <div className="encuesta-titulo">{encuesta.titulo}</div>
                <div className="encuesta-area">Estado: {encuesta.estado_encuesta}</div>
                <div className="encuesta-fecha">Fecha de Creación: {new Date(encuesta.fecha_creacion).toLocaleDateString()}</div>
              </div>
              <div>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleModificarEncuesta(encuesta.id_encuesta)}
                >
                  Modificar
                </button>
                <button
                  className={`btn ${encuesta.estado_encuesta === 'Activa' ? 'btn-danger' : 'btn-success'}`}
                  onClick={() => handleToggleEncuesta(encuesta.id_encuesta, encuesta.estado_encuesta)}
                >
                  {encuesta.estado_encuesta === 'Activa' ? 'Deshabilitar' : 'Habilitar'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-info">No hay encuestas disponibles.</div>
        )}
      </div>
    </div>
  );
};

export default Encuestas;
