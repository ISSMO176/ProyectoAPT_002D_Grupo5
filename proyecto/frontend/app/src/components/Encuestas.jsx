import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Encuestas = () => {
  const [encuestas, setEncuestas] = useState([]);
  const navigate = useNavigate();

  const handleCrearEncuesta = () => {
    navigate('/crear-encuesta');
  };

  const handleModificarEncuesta = (idEncuesta) => {
    navigate(`/modificar-encuesta/${idEncuesta}`);
  };

  const handleAgregarPreguntas = (idEncuesta) => {
    navigate(`/agregar-preguntas/${idEncuesta}`);
  };

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
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Encuestas</h2>
        <button className="btn btn-success" onClick={handleCrearEncuesta}>
          Crear Nueva Encuesta
        </button>
      </div>

      <div className="row">
        {encuestas.length > 0 ? (
          encuestas.map(encuesta => (
            <div className="col-md-6 mb-4" key={encuesta.id_encuesta}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{encuesta.titulo}</h5>
                  <p className="card-text">Estado: <strong>{encuesta.estado_encuesta}</strong></p>
                  <p className="card-text">Fecha de Creación: {new Date(encuesta.fecha_creacion).toLocaleDateString()}</p>
                  <div className="d-flex justify-content-between mt-4">
                    <button
                      className="btn btn-warning"
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
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAgregarPreguntas(encuesta.id_encuesta)}
                    >
                      Agregar Preguntas
                    </button>
                  </div>
                </div>
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