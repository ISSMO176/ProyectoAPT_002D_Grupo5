import React, { useState } from 'react';

const Preguntas = () => {
  const [preguntas, setPreguntas] = useState([
    { id: 1, texto: '¿Cómo calificaría su satisfacción con el trabajo?' },
    { id: 2, texto: '¿Se siente cómodo en su área de trabajo?' },
  ]);

  const handleCrear = () => {
    
    console.log('Crear nueva pregunta');
  };

  const handleModificar = (id) => {
    
    console.log(`Modificar pregunta con id: ${id}`);
  };

  const handleEliminar = (id) => {
    setPreguntas(preguntas.filter(pregunta => pregunta.id !== id));
  };

  return (
    <div>
      {}
      <div className="header d-flex justify-content-between align-items-center p-3  text-light shadow">
        <img src="/logo.png" alt="Logo" className="logo" style={{ width: '100px' }} />
        <div>
          <button className="btn btn-outline-light me-2">ENCUESTAS</button>
          <button className="btn btn-dark">Perfil</button>
        </div>
      </div>

      {}
      <div className="container mt-5 pt-5">
        <h2 className="text-center">Preguntas</h2>
        <button className="btn btn-danger mb-4" onClick={handleCrear}>
          Crear Pregunta
        </button>
        <div className="list-group">
          {preguntas.map(pregunta => (
            <div key={pregunta.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{pregunta.texto}</strong>
              </div>
              <div>
                <button className="btn btn-warning btn-sm mx-2" onClick={() => handleModificar(pregunta.id)}>
                  Modificar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(pregunta.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preguntas;
