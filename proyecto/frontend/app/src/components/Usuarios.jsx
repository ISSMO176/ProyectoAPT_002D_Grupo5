import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsuarioForm from './Usuarioform.jsx'; // Asegúrate de que el nombre del archivo sea correcto

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditado, setUsuarioEditado] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [roles, setRoles] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    obtenerUsuarios();
    obtenerRoles();
    obtenerAreas();
  }, []);

  // Obtener todos los usuarios
  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios', error);
    }
  };

  // Obtener todos los roles
  const obtenerRoles = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/roles');
      setRoles(response.data);
      console.log("Roles obtenidos:", response.data);
    } catch (error) {
      console.error('Error al obtener roles', error);
    }
  };

  // Obtener todas las áreas
  const obtenerAreas = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/areas');
      setAreas(response.data);
    } catch (error) {
      console.error('Error al obtener áreas', error);
    }
  };

  // Crear nuevo usuario
  const handleCrearUsuario = () => {
    setUsuarioEditado(null);
    setFormVisible(true);
  };

  // Editar usuario
  const handleModificarUsuario = (usuario) => {
    setUsuarioEditado(usuario);
    setFormVisible(true);
  };

  // Guardar usuario (crear o modificar)
  const handleGuardarUsuario = async (usuario) => {
    try {
      if (usuarioEditado) {
        await axios.put(`http://localhost:4000/api/usuarios/${usuarioEditado.rut}`, usuario);
      } else {
        await axios.post('http://localhost:4000/api/usuarios', usuario);
      }
      setFormVisible(false);
      obtenerUsuarios(); // Refrescar la lista de usuarios
    } catch (error) {
      console.error('Error al guardar el usuario', error);
    }
  };

  // Eliminar usuario
  const handleEliminarUsuario = async (rut) => {
    try {
      await axios.delete(`http://localhost:4000/api/usuarios/${rut}`);
      obtenerUsuarios(); // Refrescar la lista de usuarios
    } catch (error) {
      console.error('Error al eliminar el usuario', error);
    }
  };

  // Cancelar acción
  const handleCancelar = () => {
    setFormVisible(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="header d-flex justify-content-between align-items-center p-3 text-light shadow">
        <img src="/logo.png" alt="Logo" className="logo" style={{ width: '100px' }} />
        <div>
          <button className="btn btn-outline-light me-2">ENCUESTAS</button>
          <button className="btn btn-dark">Perfil</button>
        </div>
      </div>

      {/* Contenido */}
      <div className="container mt-5 pt-5">
        {!formVisible ? (
          <>
            <h2 className="text-center">Usuarios</h2>
            <button className="btn btn-danger mb-4" onClick={handleCrearUsuario}>
              Crear Usuario
            </button>
            <div className="list-group">
              {usuarios.map((usuario) => {
                // Encuentra el rol y área del usuario
                const rol = roles.find((r) => r.id_rol === usuario.rolId);
                const area = areas.find((a) => a.id_area === usuario.areaId_area);

                return (
                  <div key={usuario.rut} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{usuario.nombre} {usuario.apellido_paterno} {usuario.apellido_materno}</strong><br />
                      <small>RUT: {usuario.rut}</small><br />
                      <small>Correo: {usuario.correo}</small><br />
                      <small>Rol: {rol ? rol.nombre_rol : 'Sin rol'}</small><br />
                      <small>Área: {area ? area.nombre_area : 'Sin área'}</small>
                    </div>
                    <div>
                      <button className="btn btn-primary me-2" onClick={() => handleModificarUsuario(usuario)}>Modificar</button>
                      <button className="btn btn-danger" onClick={() => handleEliminarUsuario(usuario.rut)}>Eliminar</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <UsuarioForm usuarioEditado={usuarioEditado} onSave={handleGuardarUsuario} onCancel={handleCancelar} roles={roles} areas={areas} />
        )}
      </div>
    </div>
  );
};

export default Usuarios;
