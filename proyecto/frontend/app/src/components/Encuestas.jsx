import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Encuestas = () => {
  const [encuestas, setEncuestas] = useState([]);

  // Función para obtener las encuestas
  const fetchEncuestas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/encuestas');
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
        <button className="btn btn-success mb-3">Crear</button>
        
        {encuestas.map((encuesta) => (
          <div className="encuesta-card" key={encuesta.id_encuesta}>
            <div>
              <div className="encuesta-titulo">{encuesta.titulo}</div>
              <div className="encuesta-area">Área: {/* Aquí podrías añadir el área correspondiente */}</div>
            </div>
            <div>
              <button className="btn btn-warning me-2">Modificar</button>
              <button className="btn btn-danger">Deshabilitar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Encuestas;
