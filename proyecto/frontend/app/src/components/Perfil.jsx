import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { showAlert } from "../lib/sweetalAlert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { User, Mail, Briefcase, Building2, Key } from 'lucide-react'


const Perfil = () => {
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    correo: '',
    rol: '',
    area: '',
    contrasena: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // Obtener datos del perfil del usuario
  useEffect(() => {
    const obtenerPerfil = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No estás autenticado. Por favor inicia sesión.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/api/usuarios/perfil', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData({
          rut: response.data.rut,
          nombre: response.data.nombre,
          apellido_paterno: response.data.apellido_paterno,
          apellido_materno: response.data.apellido_materno,
          correo: response.data.correo,
          rol: response.data.rol.nombre_rol,
          area: response.data.Area.nombre_area,
          contrasena: '',
        });
      } catch (err) {
        setError('Error al obtener el perfil. Intenta nuevamente.');
        console.error('Error al obtener el perfil:', err.response?.data || err);
      }
    };

    obtenerPerfil();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar la actualización del perfil
  const handleActualizarPerfil = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      await showAlert('Error', 'No estás autenticado. Por favor inicia sesión.', 'error');
      return;
    }

    try {
      const { rut, rol, area, ...actualizable } = formData;

      const response = await axios.put(
        `http://localhost:4000/api/usuarios/${rut}`,
        actualizable,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await showAlert('Éxito', 'Perfil actualizado correctamente.', 'success');
      setFormData({ ...formData, contrasena: '' });
    } catch (err) {
      console.error('Error al actualizar el perfil:', err.response?.data || err);
      await showAlert('Error', err.response?.data?.error || 'Error al actualizar el perfil.', 'error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Perfil de Usuario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
              <img
                src="/Equipo_salfa.png"
                alt="Equipo Salfa"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-4 mt-6">
              <p className="text-muted-foreground">
                Gracias por ser parte de nuestro equipo. Tu perfil es importante para nosotros.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-1">
          <CardContent>
            {mensaje && (
              <Alert className="mb-6">
                <AlertTitle>Éxito</AlertTitle>
                <AlertDescription>{mensaje}</AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

              <form onSubmit={handleActualizarPerfil} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2 mb-4">
                  <Label htmlFor="rut" className="mt-4" >RUT</Label>
                  <Input id="rut" value={formData.rut} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido_paterno">Apellido Paterno</Label>
                  <Input
                    id="apellido_paterno"
                    name="apellido_paterno"
                    value={formData.apellido_paterno}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido_materno">Apellido Materno</Label>
                  <Input
                    id="apellido_materno"
                    name="apellido_materno"
                    value={formData.apellido_materno}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="correo">Correo</Label>
                  <div className="relative">
                    <Mail className="absolute right-4 top-3 h-4 w-4" />
                    <Input
                      id="correo"
                      name="correo"
                      type="email"
                      value={formData.correo}
                      onChange={handleInputChange}
                      required
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rol">Rol</Label>
                  <div className="relative">
                    <Briefcase className="absolute Right-4 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="rol" value={formData.rol} disabled className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Área</Label>
                  <div className="relative">
                    <Building2 className="absolute Right-4 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="area" value={formData.area} disabled className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contrasena">Nueva Contraseña</Label>
                  <div className="relative">
                    <Key className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="contrasena"
                      name="contrasena"
                      type="password"
                      value={formData.contrasena}
                      onChange={handleInputChange}
                      className="pl-8"
                    />
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Actualizar Perfil
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Perfil;

