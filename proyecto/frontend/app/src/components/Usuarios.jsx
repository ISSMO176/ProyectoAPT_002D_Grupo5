import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Pencil, Trash2, Upload } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import UsuarioForm from './Usuarioform';

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
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Usuarios</CardTitle>
          <CardDescription>Administre los usuarios del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
          <Dialog open={formVisible} onOpenChange={setFormVisible}>
  <DialogTrigger asChild>
    <Button onClick={handleCrearUsuario}>
      <Plus className="mr-2 h-4 w-4" /> Crear Usuario
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>{usuarioEditado ? 'Modificar Usuario' : 'Crear Usuario'}</DialogTitle>
      <DialogDescription>
        Complete los detalles del usuario y haga clic en guardar cuando termine.
      </DialogDescription>
    </DialogHeader>
    <UsuarioForm
      usuarioEditado={usuarioEditado}
      onSave={handleGuardarUsuario}
      onCancel={() => setFormVisible(false)}
      roles={roles}
      areas={areas}
    />
  </DialogContent>
</Dialog> 
            <div className="flex items-center space-x-2">
              <Input type="file" accept=".xlsx, .xls" onChange={handleArchivoExcelChange} />
              <Button onClick={handleCargarUsuariosDesdeExcel}>
                <Upload className="mr-2 h-4 w-4" /> Cargar Excel
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>RUT</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Área</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuarios.map((usuario) => {
                const rol = roles.find((r) => r.id_rol === usuario.rolId)
                const area = areas.find((a) => a.id_area === usuario.areaId_area)
                return (
                  <TableRow key={usuario.rut}>
                    <TableCell>{`${usuario.nombre} ${usuario.apellido_paterno} ${usuario.apellido_materno}`}</TableCell>
                    <TableCell>{usuario.rut}</TableCell>
                    <TableCell>{usuario.correo}</TableCell>
                    <TableCell>{rol ? rol.nombre_rol : 'Sin rol'}</TableCell>
                    <TableCell>{area ? area.nombre_area : 'Sin área'}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="icon" className="mr-2" onClick={() => handleModificarUsuario(usuario)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleEliminarUsuario(usuario.rut)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Usuarios;