import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [nombreRol, setNombreRol] = useState('');
  const [editingRol, setEditingRol] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchRoles();
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
        fetchRoles();
      } catch (error) {
        console.error('Error deleting role:', error);
        setError('Error al eliminar el rol');
      }
    }
  };

  const handleCreateOrUpdateRole = async (e) => {
    e.preventDefault();
    try {
      if (editingRol) {
        const response = await axios.put(`http://localhost:4000/api/roles/${editingRol.id_rol}`, { nombre_rol: nombreRol });
        setRoles(roles.map((rol) => (rol.id_rol === editingRol.id_rol ? response.data : rol)));
      } else {
        const response = await axios.post('http://localhost:4000/api/roles', { nombre_rol: nombreRol });
        setRoles([...roles, response.data]);
      }
      setNombreRol('');
      setEditingRol(null);
      setSuccessMessage(editingRol ? 'Rol actualizado con éxito!' : 'Rol creado con éxito!');
    } catch (error) {
      console.error('Error creating/updating role:', error);
      setError('Error al crear/actualizar el rol');
    }
  };

  const handleEdit = (rol) => {
    setNombreRol(rol.nombre_rol);
    setEditingRol(rol);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Roles</CardTitle>
          <CardDescription>Administre los roles del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {successMessage && (
            <Alert className="mb-4">
              <AlertTitle>Éxito</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleCreateOrUpdateRole} className="mb-6 flex items-center gap-4">
            <Input
              type="text"
              placeholder="Nombre del rol"
              value={nombreRol}
              onChange={(e) => setNombreRol(e.target.value)}
              required
            />
            <Button type="submit">
              {editingRol ? (
                <>
                  <Pencil className="mr-2 h-4 w-4" />
                  Actualizar Rol
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Rol
                </>
              )}
            </Button>
          </form>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((rol) => (
                <TableRow key={rol.id_rol}>
                  <TableCell>{rol.id_rol}</TableCell>
                  <TableCell>{rol.nombre_rol}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="icon" className="mr-2" onClick={() => handleEdit(rol)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Roles;