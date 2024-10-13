import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrearUsuario = ({ onSave, onCancel }) => {
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rolId, setRolId] = useState('');
  const [areaId, setAreaId] = useState('');

  const [roles, setRoles] = useState([]);
  const [areas, setAreas] = useState([]);

  // Obtener roles y áreas al cargar el componente
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/roles');
        console.log('Roles:', response.data); // Verifica que los datos de roles se reciban correctamente
        setRoles(response.data);
      } catch (error) {
        console.error('Error al obtener roles:', error);
      }
    };

    const fetchAreas = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/areas');
        console.log('Áreas:', response.data); // Verifica que los datos de áreas se reciban correctamente
        setAreas(response.data);
      } catch (error) {
        console.error('Error al obtener áreas:', error);
      }
    };

    fetchRoles();
    fetchAreas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const usuario = {
        rut,
        nombre,
        apellido_paterno: apellidoPaterno,
        apellido_materno: apellidoMaterno,
        correo,
        contrasena,
        rolId,
        areaId,
      };

      await axios.post('http://localhost:4000/api/usuarios', usuario);
      alert('Usuario creado exitosamente');
      onSave(usuario); // Llama a la función onSave proporcionada desde Usuarios
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Usuario</h2>
      <div>
        <label>RUT:</label>
        <input
          type="text"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          placeholder="RUT"
          required
        />
      </div>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          required
        />
      </div>
      <div>
        <label>Apellido Paterno:</label>
        <input
          type="text"
          value={apellidoPaterno}
          onChange={(e) => setApellidoPaterno(e.target.value)}
          placeholder="Apellido Paterno"
          required
        />
      </div>
      <div>
        <label>Apellido Materno:</label>
        <input
          type="text"
          value={apellidoMaterno}
          onChange={(e) => setApellidoMaterno(e.target.value)}
          placeholder="Apellido Materno"
          required
        />
      </div>
      <div>
        <label>Correo:</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Correo"
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="Contraseña"
          required
        />
      </div>

      {/* Select de Roles */}
      <div>
        <label>Rol:</label>
        <select value={rolId} onChange={(e) => setRolId(e.target.value)} required>
          <option value="">Seleccionar Rol</option>
          {roles.map((rol) => (
            <option key={rol.id_rol} value={rol.id_rol}>
              {rol.nombre_rol} {/* Mostrar el nombre del rol */}
            </option>
          ))}
        </select>
      </div>

      {/* Select de Áreas */}
      <div>
        <label>Área:</label>
        <select value={areaId} onChange={(e) => setAreaId(e.target.value)} required>
          <option value="">Seleccionar Área</option>
          {areas.map((area) => (
            <option key={area.id_area} value={area.id_area}>
              {area.nombre_area} {/* Mostrar el nombre del área */}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Crear Usuario</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default CrearUsuario;
