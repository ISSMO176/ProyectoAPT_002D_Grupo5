import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Areas = () => {
  const [areas, setAreas] = useState([]);
  const [nombreArea, setNombreArea] = useState('');
  const [editingArea, setEditingArea] = useState(null);

  // Fetch areas from backend
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/areas');
        setAreas(response.data);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchAreas();
  }, []);

  // Handle delete area
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/areas/${id}`);
      setAreas(areas.filter((area) => area.id_area !== id));
    } catch (error) {
      console.error('Error deleting area:', error);
    }
  };

  // Handle create or update area
  const handleCreateOrUpdateArea = async (e) => {
    e.preventDefault();
    try {
      if (editingArea) {
        const response = await axios.put(`http://localhost:4000/api/areas/${editingArea.id_area}`, {
          nombre_area: nombreArea,
        });
        setAreas(areas.map((area) => (area.id_area === editingArea.id_area ? response.data : area)));
      } else {
        const response = await axios.post('http://localhost:4000/api/areas', { nombre_area: nombreArea });
        setAreas([...areas, response.data]);
      }
      setNombreArea('');
      setEditingArea(null);
    } catch (error) {
      console.error('Error creating/updating area:', error);
    }
  };

  // Handle edit area
  const handleEdit = (area) => {
    setNombreArea(area.nombre_area);
    setEditingArea(area);
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Áreas</h1>

      <form onSubmit={handleCreateOrUpdateArea} className="mb-4 d-flex align-items-center">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Nombre del área"
          value={nombreArea}
          onChange={(e) => setNombreArea(e.target.value)}
          required
        />
        <button className="btn btn-success" type="submit">
          {editingArea ? 'Actualizar Área' : 'Agregar Área'}
        </button>
      </form>

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
            {areas.map((area) => (
              <tr key={area.id_area} className="hover:bg-gray-100">
                <td>{area.id_area}</td>
                <td>{area.nombre_area}</td>
                <td>
                  <div className="d-flex justify-content-between">
                    <button onClick={() => handleEdit(area)} className="btn btn-warning me-2">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(area.id_area)} className="btn btn-danger">
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

export default Areas;
