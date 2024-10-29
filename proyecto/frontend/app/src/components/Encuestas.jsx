import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../context/ThemeContext'; // Importar el contexto del tema

const Encuestas = () => {
  const { isDarkMode } = useContext(ThemeContext); // Obtener el estado del tema
  const [encuestas, setEncuestas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const encuestasPerPage = 6;
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
      const sortedEncuestas = response.data.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
      setEncuestas(sortedEncuestas);
    } catch (error) {
      console.error('Error al obtener las encuestas:', error);
    }
  };

  useEffect(() => {
    fetchEncuestas();
  }, []);

  const indexOfLastEncuesta = currentPage * encuestasPerPage;
  const indexOfFirstEncuesta = indexOfLastEncuesta - encuestasPerPage;
  const currentEncuestas = encuestas.slice(indexOfFirstEncuesta, indexOfLastEncuesta);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(encuestas.length / encuestasPerPage)) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className={`container mt-4 bg-${isDarkMode ? 'dark' : 'light'} text-${isDarkMode ? 'light' : 'dark'}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Encuestas</h2>
        <button className="btn btn-success" onClick={handleCrearEncuesta}>
          Crear Nueva Encuesta
        </button>
      </div>

      <div className="row">
        {currentEncuestas.length > 0 ? (
          currentEncuestas.map(encuesta => (
            <div className="col-md-6 mb-4" key={encuesta.id_encuesta}>
              <div className={`card shadow-sm bg-${isDarkMode ? 'secondary' : 'light'} text-${isDarkMode ? 'light' : 'dark'}`} style={{ height: '200px' }}>
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

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-secondary" onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage} de {Math.ceil(encuestas.length / encuestasPerPage)}</span>
        <button className="btn btn-secondary" onClick={handleNextPage} disabled={currentPage === Math.ceil(encuestas.length / encuestasPerPage)}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Encuestas;
