// src/components/Unauthorized.jsx
import React from 'react';

const Unauthorized = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="text-danger">403 - Acceso Denegado</h1>
      <p>No tienes permisos para acceder a esta página.</p>
      <a href="/login" className="btn btn-primary mt-3">Volver al Inicio</a>
    </div>
  );
};

export default Unauthorized;
