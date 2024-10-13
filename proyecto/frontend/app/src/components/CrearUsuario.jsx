// CrearUsuario.jsx (actualizado)
import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../firebaseConfig'; // Importa la configuración de Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';

const CrearUsuario = () => {
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido_paterno, setApellidoPaterno] = useState('');
  const [apellido_materno, setApellidoMaterno] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rolId, setRolId] = useState(1);
  const [areaId_area, setAreaId_area] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Primero, registra al usuario en Firebase
      await createUserWithEmailAndPassword(auth, correo, contrasena);
      
      // Luego, registra el usuario en tu base de datos
      await axios.post('/api/usuarios', { rut, nombre, apellido_paterno, apellido_materno, correo, contrasena, rolId, areaId_area });
      alert('Usuario creado exitosamente');
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos del formulario */}
      <input type="text" value={rut} onChange={(e) => setRut(e.target.value)} placeholder="RUT" required />
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />
      <input type="text" value={apellido_paterno} onChange={(e) => setApellidoPaterno(e.target.value)} placeholder="Apellido Paterno" required />
      <input type="text" value={apellido_materno} onChange={(e) => setApellidoMaterno(e.target.value)} placeholder="Apellido Materno" required />
      <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo" required />
      <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} placeholder="Contraseña" required />
      <select value={rolId} onChange={(e) => setRolId(e.target.value)}>
        {/* Opciones de rol */}
        <option value="1">Rol 1</option>
        <option value="2">Rol 2</option>
      </select>
      <select value={areaId_area} onChange={(e) => setAreaId_area(e.target.value)}>
        {/* Opciones de área */}
        <option value={null}>Seleccionar Área</option>
      </select>
      <button type="submit">Crear Usuario</button>
    </form>
  );
};

export default CrearUsuario;
