import React from 'react';

const MisEncuestas = () => {
  return (
    
    <div className="">
            {}
      <div className="header d-flex justify-content-between align-items-center p-3  text-light shadow">
        <img src="/logo.png" alt="Logo" className="logo" style={{ width: '100px' }} />
        <div>
          <button className="btn btn-outline-light me-2">ENCUESTAS</button>
          <button className="btn btn-dark">Perfil</button>
        </div>
      </div>
      <h2 className="text-center mb-4" style={{ color: '#dc3545', fontWeight: 'bold' }}>
        Mis Encuestas
      </h2>
      <div className="d-flex justify-content-center">
        <div className="card" style={{ width: '80%', border: 'none', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
          <div className="card-body">
            <div className="list-group">
              {}
              <div className="list-group-item" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dc3545', borderRadius: '10px', marginBottom: '10px', color: '#dc3545', fontWeight: 'bold', padding: '15px' }}>
                Encuesta de Satisfacción Laboral
              </div>
              {}
              <div className="list-group-item" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dc3545', borderRadius: '10px', marginBottom: '10px', color: '#dc3545', fontWeight: 'bold', padding: '15px' }}>
                Encuesta de Clima Laboral
              </div>
              {}
              <div className="list-group-item" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dc3545', borderRadius: '10px', marginBottom: '10px', color: '#dc3545', fontWeight: 'bold', padding: '15px' }}>
                Encuesta de Salud y Bienestar
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisEncuestas;
