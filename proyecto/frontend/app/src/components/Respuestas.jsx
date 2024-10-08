import React, { useState } from 'react';

const Respuestas = () => {
  const [respuestas, setRespuestas] = useState([]);
  const [textoRespuesta, setTextoRespuesta] = useState('');

  const preguntas = [
    { id: 1, texto: '¿Cómo calificaría su satisfacción con el trabajo?' },
    { id: 2, texto: '¿Se siente cómodo en su área de trabajo?' },
  ];

  const handleEnviarRespuesta = (preguntaId) => {
    const nuevaRespuesta = { preguntaId, texto: textoRespuesta };
    setRespuestas([...respuestas, nuevaRespuesta]);
    setTextoRespuesta('');
  };

  return (
    <div>
      {/* Encabezado */}
      <div className="header d-flex justify-content-between align-items-center p-3  text-light shadow">
        <img src="/logo.png" alt="Logo" className="logo" style={{ width: '100px' }} />
        <div>
          <button className="btn btn-outline-light me-2">ENCUESTAS</button>
          <button className="btn btn-dark">Perfil</button>
        </div>
      </div>

      {/* Contenido de Respuestas */}
      <div className="container mt-5 pt-5">
        <h2 className="text-center">Respuestas</h2>
        <div className="list-group">
          {preguntas.map(pregunta => (
            <div key={pregunta.id} className="list-group-item">
              <strong>{pregunta.texto}</strong>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Escribe tu respuesta"
                value={textoRespuesta}
                onChange={(e) => setTextoRespuesta(e.target.value)}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={() => handleEnviarRespuesta(pregunta.id)}
              >
                Enviar Respuesta
              </button>
            </div>
          ))}
        </div>
        <h3 className="mt-4">Respuestas Ingresadas:</h3>
        <ul className="list-group">
          {respuestas.map((respuesta, index) => (
            <li key={index} className="list-group-item">
              Pregunta ID {respuesta.preguntaId}: {respuesta.texto}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Respuestas;
