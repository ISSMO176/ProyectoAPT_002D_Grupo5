import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsuarioForm from './Usuarioform.jsx';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditado, setUsuarioEditado] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [roles, setRoles] = useState([]);
  const [areas, setAreas] = useState([]);
  const [archivoExcel, setArchivoExcel] = useState(null);

  useEffect(() => {
    obtenerUsuarios();
    obtenerRoles();
    obtenerAreas();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios', error);
    }
  };

  const obtenerRoles = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error al obtener roles', error);
    }
  };

  const obtenerAreas = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/areas');
      setAreas(response.data);
    } catch (error) {
      console.error('Error al obtener áreas', error);
    }
  };

  const handleCrearUsuario = () => {
    setUsuarioEditado(null);
    setFormVisible(true);
  };

  const handleModificarUsuario = (usuario) => {
    setUsuarioEditado(usuario);
    setFormVisible(true);
  };

  const handleGuardarUsuario = async (usuario) => {
    try {
      if (usuarioEditado) {
        await axios.put(`http://localhost:4000/api/usuarios/${usuarioEditado.rut}`, usuario);
      } else {
        await axios.post('http://localhost:4000/api/usuarios', usuario);
      }
      setFormVisible(false);
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al guardar el usuario', error);
    }
  };

  const handleCambiarEstadoUsuario = async (usuario) => {
    const nuevoEstado = !usuario.activo; // Cambia el estado actual
  
    try {
      await axios.patch(`http://localhost:4000/api/usuarios/${usuario.rut}/cambiar-estado`, { activo: nuevoEstado });
      obtenerUsuarios(); // Refresca la lista de usuarios después de cambiar el estado
    } catch (error) {
      console.error('Error al cambiar el estado del usuario', error);
    }
  };
  

  const handleCancelar = () => {
    setFormVisible(false);
  };

  const handleArchivoExcelChange = (e) => {
    setArchivoExcel(e.target.files[0]);
  };

  const handleCargarUsuariosDesdeExcel = async () => {
    if (!archivoExcel) {
      alert('Por favor seleccione un archivo Excel');
      return;
    }

    const formData = new FormData();
    formData.append('file', archivoExcel);

    try {
      const response = await axios.post('http://localhost:4000/api/usuarios/cargar-excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Usuarios cargados correctamente');
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al cargar usuarios desde Excel', error);
      alert('Error al cargar usuarios desde Excel');
    }
  };

  return (
    <div>
      <div className="header d-flex justify-content-between align-items-center p-3 text-light shadow">
        <img src="/logo.png" alt="Logo" className="logo" style={{ width: '100px' }} />
        <div>
          <button className="btn btn-outline-light me-2">ENCUESTAS</button>
          <button className="btn btn-dark">Perfil</button>
        </div>
      </div>

      <div className="container mt-5 pt-5">
        {!formVisible ? (
          <>
            <h2 className="text-center">Usuarios</h2>
            <button className="btn btn-danger mb-4" onClick={handleCrearUsuario}>
              Crear Usuario
            </button>
            <div className="list-group">
              {usuarios.map((usuario) => {
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
                      <button className={`btn ${usuario.activo ? 'btn-warning' : 'btn-success'}`} onClick={() => handleCambiarEstadoUsuario(usuario)}>{usuario.activo ? 'Deshabilitar' : 'Habilitar'}</button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5">
              <h5>Formato de archivo Excel para cargar usuarios</h5>
              <p>El archivo debe contener las siguientes columnas en la primera fila:</p>
              <ul>
                <li><strong>rut</strong>: El RUT del usuario en formato "12345678-9".</li>
                <li><strong>nombre</strong>: Nombre del usuario.</li>
                <li><strong>apellido_paterno</strong>: Apellido paterno del usuario.</li>
                <li><strong>apellido_materno</strong>: Apellido materno del usuario.</li>
                <li><strong>correo</strong>: Dirección de correo electrónico.</li>
                <li><strong>contrasena</strong>: Contraseña del usuario.</li>
                <li><strong>rolId</strong>: ID del rol.</li>
                <li><strong>areaId_area</strong>: ID del área (opcional).</li>
              </ul>
              <input type="file" accept=".xlsx, .xls" onChange={handleArchivoExcelChange} />
              <button className="btn btn-primary ms-2" onClick={handleCargarUsuariosDesdeExcel}>Cargar Usuarios desde Excel</button>
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
