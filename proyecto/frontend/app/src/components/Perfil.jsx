import React, { useState } from 'react';

const Perfil = () => {
  const [nombre, setNombre] = useState('Juan Pérez');
  const [correo, setCorreo] = useState('juan.perez@email.com');
  const [telefono, setTelefono] = useState('123-456-7890');
  const [direccion, setDireccion] = useState('Calle Falsa 123, Ciudad');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Información guardada', { nombre, correo, telefono, direccion });
    
  };

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
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4" style={{ width: '500px' }}>
          <h3 className="text-center mb-4">Mi Perfil</h3>
          <form onSubmit={handleSubmit}>
            {}
            <div className="form-group mb-3">
              <label htmlFor="nombre">Nombre Completo</label>
              <input
                type="text"
                id="nombre"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            {}
            <div className="form-group mb-3">
              <label htmlFor="correo">Correo Electrónico</label>
              <input
                type="email"
                id="correo"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            {}
            <div className="form-group mb-3">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="text"
                id="telefono"
                className="form-control"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>

            {}
            <div className="form-group mb-3">
              <label htmlFor="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                className="form-control"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-danger w-100">
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
