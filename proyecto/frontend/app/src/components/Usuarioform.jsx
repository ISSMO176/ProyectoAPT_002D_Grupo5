import React, { useState, useEffect } from 'react';

const UsuarioForm = ({ usuarioEditado, onSave, onCancel, roles, areas }) => {
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido_paterno, setApellidoPaterno] = useState('');
  const [apellido_materno, setApellidoMaterno] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rolId, setRolId] = useState(1); // Cambia el valor predeterminado según tus roles
  const [areaId_area, setAreaIdArea] = useState(null); // Cambia el valor predeterminado según tus áreas

  useEffect(() => {
    if (usuarioEditado) {
      setRut(usuarioEditado.rut);
      setNombre(usuarioEditado.nombre);
      setApellidoPaterno(usuarioEditado.apellido_paterno);
      setApellidoMaterno(usuarioEditado.apellido_materno);
      setCorreo(usuarioEditado.correo);
      setContrasena(usuarioEditado.contrasena);
      setRolId(usuarioEditado.rolId);
      setAreaIdArea(usuarioEditado.areaId_area);
    }
  }, [usuarioEditado]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuario = { rut, nombre, apellido_paterno, apellido_materno, correo, contrasena, rolId, areaId_area };
    onSave(usuario);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{usuarioEditado ? 'Modificar Usuario' : 'Crear Usuario'}</h3>
      <div className="mb-3">
        <label className="form-label">RUT</label>
        <input type="text" className="form-control" value={rut} onChange={(e) => setRut(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Apellido Paterno</label>
        <input type="text" className="form-control" value={apellido_paterno} onChange={(e) => setApellidoPaterno(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Apellido Materno</label>
        <input type="text" className="form-control" value={apellido_materno} onChange={(e) => setApellidoMaterno(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Correo</label>
        <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input type="password" className="form-control" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Rol</label>
        <select className="form-select" value={rolId} onChange={(e) => setRolId(Number(e.target.value))} required>
          {roles.map((rol) => (
            <option key={rol.id_rol} value={rol.id_rol}>
              {rol.nombre_rol}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Área</label>
        <select className="form-select" value={areaId_area || ''} onChange={(e) => setAreaIdArea(e.target.value ? Number(e.target.value) : null)}>
          <option value="">Seleccione un área (opcional)</option>
          {areas.map((area) => (
            <option key={area.id_area} value={area.id_area}>
              {area.nombre_area}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">{usuarioEditado ? 'Actualizar' : 'Crear'}</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default UsuarioForm;
