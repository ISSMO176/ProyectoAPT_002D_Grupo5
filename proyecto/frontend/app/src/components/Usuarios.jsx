import React, { useState } from 'react';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([
    { id: 1, rut: '12345678-9', nombre: 'Juan Pérez', area: 'Mantenimiento' },
    { id: 2, rut: '87654321-0', nombre: 'María López', area: 'Recursos Humanos' },
  ]);

  const handleCrear = () => {
    
    console.log('Crear nuevo usuario');
  };

  const handleModificar = (id) => {
    
    console.log(`Modificar usuario con id: ${id}`);
  };

  const handleEliminar = (id) => {
    setUsuarios(usuarios.filter(usuario => usuario.id !== id));
  };

  return (
    <div>
      {}
      <div className="header d-flex justify-content-between align-items-center p-3 text-light shadow">
        <img src="/logo.png" alt="Logo" className="logo" style={{ width: '100px' }} />
        <div>
          <button className="btn btn-outline-light me-2">ENCUESTAS</button>
          <button className="btn btn-dark">Perfil</button>
        </div>
      </div>

      {}
      <div className="container mt-5 pt-5">
        <h2 className="text-center">Usuarios</h2>
        <button className="btn btn-danger mb-4" onClick={handleCrear}>
          Crear Usuario
        </button>
        <div className="list-group">
          {usuarios.map(usuario => (
            <div key={usuario.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{usuario.nombre}</strong><br />
                <small>RUT: {usuario.rut}</small><br />
                <small>Área: {usuario.area}</small>
              </div>
              <div>
                <button className="btn btn-warning btn-sm mx-2" onClick={() => handleModificar(usuario.id)}>
                  Modificar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(usuario.id)}>
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

export default Usuarios;
