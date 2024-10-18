import React, { useState } from 'react';

const RegistrarCorreoForm = ({ onSave, onCancel }) => {
  const [correo, setCorreo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!correo) {
      alert("Por favor ingrese un correo válido");
      return;
    }
    onSave({ correo });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Registrar Correo del Usuario</h3>
      <div className="mb-3">
        <label className="form-label">Correo Electrónico</label>
        <input
          type="email"
          className="form-control"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Registrar Correo</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default RegistrarCorreoForm;
