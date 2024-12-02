import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Login from '../components/Login';
import Encuestas from '../components/Encuestas';
import Perfil from '../components/Perfil';
import Usuarios from '../components/Usuarios';
import Dashboard from '../components/Dashboard';
import MisEncuestas from '../components/MisEncuestas';
import AsignarEncuestas from '../components/AsignarEncuestas';
import AgregarPreguntasVista from '../components/AgregarPreguntasVista';
import CrearEncuesta from '../components/CrearEncuesta';
import ModificarEncuesta from '../components/ModificarEncuesta';
import Roles from '../components/Roles';
import Areas from '../components/Areas';
import ResponderEncuesta from '../components/ResponderEncuesta';
import EstadisticasEncuesta from '../components/EstadisticasEncuesta';
import Unauthorized from '../components/Unauthorized'; // Página de acceso denegado
import ProtectedRoute from '../components/ProtectedRoute'; // Componente para proteger rutas

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Rutas protegidas con roles */}
      <Route
        path="/encuestas"
        element={
          <ProtectedRoute allowedRoles={['administrador', 'usuario']}>
            <><Navbar /><Encuestas /></>
          </ProtectedRoute>
        }
      />
      <Route
        path="/misencuestas"
        element={
          <ProtectedRoute allowedRoles={['administrador','usuario']}>
            <><Navbar /><MisEncuestas /></>
          </ProtectedRoute>
        }
      />
      <Route
        path="/usuarios"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <><Navbar /><Usuarios /></>
          </ProtectedRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <ProtectedRoute allowedRoles={['administrador', 'usuario']}>
            <><Navbar /><Perfil /></>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <><Navbar /><Dashboard /></>
          </ProtectedRoute>
        }
      />
      <Route
        path="/asignarencuestas"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <><Navbar /><AsignarEncuestas /></>
          </ProtectedRoute>
        }
      />
      <Route
        path="/agregar-preguntas/:id"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>a
            <><Navbar /><AgregarPreguntasVista /></>
          </ProtectedRoute>
        }
      />
      <Route
        path="/crear-encuesta"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <><Navbar /><CrearEncuesta /></>
          </ProtectedRoute>
        }
      />
      <Route
        path="/modificar-encuesta/:idEncuesta"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <><Navbar /><ModificarEncuesta /></>
          </ProtectedRoute>
        }
      />
      <Route
        path="/roles"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <><Navbar /><Roles /></>
          </ProtectedRoute>
        }
      />
      <Route
        path="/areas"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <><Navbar /><Areas /></>
          </ProtectedRoute>
        }
      />
      <Route
        path="/responderEncuesta/:encuestaId"
        element={
          <ProtectedRoute allowedRoles={['usuario','administrador']}>
            <><Navbar /><ResponderEncuesta /></>
          </ProtectedRoute>
        }
      />
      <Route
        path="/estadisticas-encuesta/:encuestaId"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <><Navbar /><EstadisticasEncuesta /></>
          </ProtectedRoute>
        }
      />

      {/* Ruta por defecto */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
