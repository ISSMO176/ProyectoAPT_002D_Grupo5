import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MisEncuestas = () => {
  const [encuestas, setEncuestas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEncuestasAsignadas = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token de localStorage
        const response = await axios.get('http://localhost:4000/api/encuestas-asignadas/mis-encuestas', {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token con prefijo Bearer
          },
        });
        setEncuestas(response.data); // Guardar las encuestas en el estado
      } catch (error) {
        console.error('Error al obtener encuestas asignadas:', error); // Mostrar error si ocurre
      } finally {
        setLoading(false);
      }
    };

    fetchEncuestasAsignadas();
  }, []);

  if (loading) {
    return <p>Cargando encuestas...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Mis Encuestas Asignadas</h2>
      {encuestas.length > 0 ? (
        <ul className="list-group mt-3">
          {encuestas.map((encuestaAsignada) => (
            <li key={encuestaAsignada.id_asignacion} className="list-group-item">
              <h4>{encuestaAsignada.encuesta.titulo}</h4>
              <p>Fecha de Asignación: {new Date(encuestaAsignada.fecha_asignacion).toLocaleDateString()}</p>
              <p>Estado: {encuestaAsignada.estado}</p>
              <p>Preguntas:</p>
              <ul>
                {encuestaAsignada.encuesta.preguntas.map((pregunta) => (
                  <li key={pregunta.id_pregunta}>{pregunta.texto_pregunta}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes encuestas asignadas.</p>
      )}
    </div>
  );
};

export default MisEncuestas;
