import React from 'react';

const Encuestas = () => {
  return (
    <div>
      {}
      <div className="header">
        <img src="/logo.png" alt="Logo" />
        <div>
          <button className="btn btn-outline-light me-2">ENCUESTAS</button>
          <button className="btn btn-dark">Perfil</button>
        </div>
      </div>

      {}
      <div className="encuestas-container">
        {}
        <button className="btn btn-success mb-3">Crear</button>

        {}
        <div className="encuesta-card">
          <div>
            <div className="encuesta-titulo">Satisfacción Laboral</div>
            <div className="encuesta-area">Área: Mantención</div>
          </div>
          <div>
            <button className="btn btn-warning me-2">Modificar</button>
            <button className="btn btn-danger">Deshabilitar</button>
          </div>
        </div>

        <div className="encuesta-card">
          <div>
            <div className="encuesta-titulo">Acoso en el área de trabajo</div>
            <div className="encuesta-area">Especialidad: Electricista</div>
          </div>
          <div>
            <button className="btn btn-warning me-2">Modificar</button>
            <button className="btn btn-danger">Deshabilitar</button>
          </div>
        </div>

        <div className="encuesta-card disabled">
          <div>
            <div className="encuesta-titulo">Satisfacción Salarial</div>
            <div className="encuesta-area">Especialidad: Montaje</div>
          </div>
          <div>
            <button className="btn btn-warning me-2">Modificar</button>
            <button className="btn btn-secondary">Habilitar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Encuestas;
