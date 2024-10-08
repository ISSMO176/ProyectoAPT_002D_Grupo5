import React from 'react';

const AsignarEncuestas = () => {
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

      {/* Contenido de Asignar Encuestas */}
      <div className="container mt-5 pt-5">
        <h2 className="text-center mb-4" style={{ color: '#dc3545', fontWeight: 'bold' }}>
          Asignar Encuestas
        </h2>
        <div className="card p-4" style={{ borderRadius: '10px', backgroundColor: '#f8f9fa' }}>
          
          <div className="mb-4">
            <label htmlFor="area" className="form-label">Seleccionar Área de Trabajo:</label>
            <select className="form-select" id="area" style={{ borderRadius: '10px' }}>
              <option value="">Seleccione un área</option>
              <option value="ventas">Ventas</option>
              <option value="desarrollo">Desarrollo</option>
              <option value="recursos_humanos">Recursos Humanos</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="trabajador" className="form-label">Seleccionar Trabajador:</label>
            <select className="form-select" id="trabajador" style={{ borderRadius: '10px' }}>
              <option value="">Seleccione un trabajador</option>
              <option value="trabajador1">Trabajador 1</option>
              <option value="trabajador2">Trabajador 2</option>
              <option value="trabajador3">Trabajador 3</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="encuesta" className="form-label">Seleccionar Encuesta:</label>
            <select className="form-select" id="encuesta" style={{ borderRadius: '10px' }}>
              <option value="">Seleccione una encuesta</option>
              <option value="encuesta1">Encuesta 1</option>
              <option value="encuesta2">Encuesta 2</option>
              <option value="encuesta3">Encuesta 3</option>
            </select>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-danger" style={{ borderRadius: '20px', padding: '10px 20px' }}>
              Asignar Encuesta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsignarEncuestas;
