import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Áreas</CardTitle>
          <CardDescription>Administre las áreas de la organización</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateOrUpdateArea} className="mb-6 flex items-center gap-4">
            <Input
              type="text"
              placeholder="Nombre del área"
              value={nombreArea}
              onChange={(e) => setNombreArea(e.target.value)}
              required
            />
            <Button type="submit">
              {editingArea ? (
                <>
                  <Pencil className="mr-2 h-4 w-4" />
                  Actualizar Área
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Área
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
              {areas.map((area) => (
                <TableRow key={area.id_area}>
                  <TableCell>{area.id_area}</TableCell>
                  <TableCell>{area.nombre_area}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="icon" className="mr-2" onClick={() => handleEdit(area)}>
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

export default Areas;