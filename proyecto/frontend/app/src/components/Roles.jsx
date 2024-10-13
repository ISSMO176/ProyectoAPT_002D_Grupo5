import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [nombreRol, setNombreRol] = useState(''); // Para almacenar el nombre del nuevo rol
  const [editingRol, setEditingRol] = useState(null); // Para manejar el rol que se está editando
  const [error, setError] = useState(null); // Para manejar errores
  const [successMessage, setSuccessMessage] = useState(null); // Para manejar mensajes de éxito

  useEffect(() => {
    fetchRoles(); // Cargar roles al inicio
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
      setError('Error al obtener los roles');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este rol?')) {
      try {
        await axios.delete(`http://localhost:4000/api/roles/${id}`);
        setSuccessMessage('Rol eliminado con éxito!');
        fetchRoles(); // Refrescar la lista de roles después de eliminar
      } catch (error) {
        console.error('Error deleting role:', error);
        setError('Error al eliminar el rol');
      }
    }
  };

  const handleCreateOrUpdateRole = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    try {
      if (editingRol) {
        const response = await axios.put(`http://localhost:4000/api/roles/${editingRol.id_rol}`, { nombre_rol: nombreRol });
        setRoles(roles.map((rol) => (rol.id_rol === editingRol.id_rol ? response.data : rol)));
      } else {
        const response = await axios.post('http://localhost:4000/api/roles', { nombre_rol: nombreRol });
        setRoles([...roles, response.data]); // Agregar el nuevo rol a la lista
      }
      setNombreRol(''); // Limpiar el input después de crear o editar
      setEditingRol(null); // Resetear el rol que se está editando
      setSuccessMessage(editingRol ? 'Rol actualizado con éxito!' : 'Rol creado con éxito!'); // Mensaje de éxito
    } catch (error) {
      console.error('Error creating/updating role:', error);
      setError('Error al crear/actualizar el rol');
    }
  };

  const handleEdit = (rol) => {
    setNombreRol(rol.nombre_rol);
    setEditingRol(rol); // Establecer el rol que se está editando
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Roles</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {/* Formulario para crear o editar un rol */}
      <form onSubmit={handleCreateOrUpdateRole} className="mb-4 d-flex align-items-center">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Nombre del rol"
          value={nombreRol}
          onChange={(e) => setNombreRol(e.target.value)}
          required
        />
        <button className="btn btn-success" type="submit">
          {editingRol ? 'Actualizar Rol' : 'Agregar Rol'}
        </button>
      </form>

      {/* Tabla para mostrar los roles */}
      <div className="overflow-x-auto">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((rol) => (
              <tr key={rol.id_rol} className="hover:bg-gray-100">
                <td>{rol.id_rol}</td>
                <td>{rol.nombre_rol}</td>
                <td>
                  <div className="d-flex justify-content-between">
                    <button onClick={() => handleEdit(rol)} className="btn btn-warning me-2">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(rol.id_rol)} className="btn btn-danger">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Roles;
