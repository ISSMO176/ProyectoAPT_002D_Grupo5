import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Encuestas = () => {
  const [encuestas, setEncuestas] = useState([]);
  const navigate = useNavigate();

  const handleCrearEncuesta = () => {
    navigate('/crear-encuesta'); // Asegúrate de que esta ruta esté definida en tu router
  };

  useEffect(() => {
    const fetchEncuestas = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/encuestas');
        setEncuestas(response.data);
      } catch (error) {
        console.error('Error al obtener las encuestas:', error);
      }
    };
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

        {encuestas.length > 0 ? ( // Verificamos si hay encuestas
          encuestas.map(encuesta => (
            <div className="encuesta-card" key={encuesta.id_encuesta}>
              <div>
                <div className="encuesta-titulo">{encuesta.titulo}</div>
                <div className="encuesta-area">Estado: {encuesta.estado_encuesta}</div> {/* Asegúrate de que este campo existe */}
                <div className="encuesta-fecha">Fecha de Creación: {new Date(encuesta.fecha_creacion).toLocaleDateString()}</div> {/* Formateo de fecha */}
              </div>
              <div>
                <button className="btn btn-warning me-2">Modificar</button>
                <button className="btn btn-danger">Deshabilitar</button>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-info">No hay encuestas disponibles.</div> // Mensaje si no hay encuestas
        )}
      </div>
    </div>
  );
};

export default Encuestas;
