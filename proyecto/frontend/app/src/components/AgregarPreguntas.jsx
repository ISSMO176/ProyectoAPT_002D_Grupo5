import React from 'react';

const AgregarPreguntas = () => {
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
        <h2 className="text-center mb-4" style={{ color: '#dc3545', fontWeight: 'bold' }}>
          Agregar Preguntas a la Encuesta
        </h2>
        <div className="card p-4" style={{ borderRadius: '10px', backgroundColor: '#f8f9fa' }}>
          
          <div className="mb-4">
            <label htmlFor="encuesta" className="form-label">Seleccionar Encuesta:</label>
            <select className="form-select" id="encuesta" style={{ borderRadius: '10px' }}>
              <option value="">Seleccione una encuesta</option>
              <option value="encuesta1">Encuesta 1</option>
              <option value="encuesta2">Encuesta 2</option>
              <option value="encuesta3">Encuesta 3</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="pregunta" className="form-label">Pregunta:</label>
            <input type="text" className="form-control" id="pregunta" placeholder="Escriba la pregunta aquí" style={{ borderRadius: '10px' }} />
          </div>

          <div className="mb-4">
            <label className="form-label">Tipo de Respuesta:</label>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="tipoRespuesta" id="opcionMultiple" />
              <label className="form-check-label" htmlFor="opcionMultiple">
                Opción Múltiple
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="tipoRespuesta" id="texto" />
              <label className="form-check-label" htmlFor="texto">
                Texto Libre
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-danger" style={{ borderRadius: '20px', padding: '10px 20px' }}>
              Agregar Pregunta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarPreguntas;
