import React from 'react';

const Dashboard = ({ respuestas }) => {
  // Simulando respuestas para visualizar en el dashboard
  const respuestasEjemplo = [
    { pregunta: '¿Cómo calificaría su satisfacción con el trabajo?', respuesta: '5' },
    { pregunta: '¿Se siente cómodo en su área de trabajo?', respuesta: 'Sí' },
  ];

  return (

    <div>
      {}
      <div className="header d-flex justify-content-between align-items-center p-3  text-light fixed-top shadow">
        <img src="/logo.png" alt="Logo" className="logo" style={{ width: '100px' }} />
        <div>
          <button className="btn btn-outline-light me-2">ENCUESTAS</button>
          <button className="btn btn-light">Perfil</button>
        </div>
      </div>

      {}
      <div className="container mx-auto mt-5 pt-5 p-4">
        <h2 className="text-3xl font-bold text-center mb-6">Dashboard de Encuestas</h2>

        {}
        <div className="row">
          <div className="col-md-4">
            <div className="bg-danger text-white rounded-lg p-4 shadow-lg text-center mb-4">
              <h5 className="text-xl font-semibold">Total de Encuestas</h5>
              <p className="text-3xl">5</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-primary text-white rounded-lg p-4 shadow-lg text-center mb-4">
              <h5 className="text-xl font-semibold">Total de Respuestas</h5>
              <p className="text-3xl">{respuestasEjemplo.length}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-success text-white rounded-lg p-4 shadow-lg text-center mb-4">
              <h5 className="text-xl font-semibold">Encuestas Habilitadas</h5>
              <p className="text-3xl">3</p>
            </div>
          </div>
        </div>

        {}
        <h3 className="text-2xl font-semibold mb-4">Respuestas de Usuarios:</h3>
        <div className="bg-white rounded-lg shadow-lg p-4">
          {respuestasEjemplo.map((respuesta, index) => (
            <div key={index} className="p-3 border-bottom">
              <strong className="text-lg">{respuesta.pregunta}</strong>: 
              <span className="text-gray-600"> {respuesta.respuesta}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
