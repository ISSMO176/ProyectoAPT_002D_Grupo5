import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute'; // Componente para proteger rutas
import Navbar from '../components/navbar';
import Login from '../components/Login';
import Encuestas from '../components/Encuestas';
import Perfil from '../components/Perfil';
import Usuarios from '../components/Usuarios';
import Dashboard from '../components/Dashboard';
import MisEncuestas from '../components/MisEncuestas';
import ResponderEncuesta from '../components/ResponderEncuesta';
import CrearEncuesta from '../components/CrearEncuesta';
import ModificarEncuesta from '../components/ModificarEncuesta';
import Roles from '../components/Roles';
import Areas from '../components/Areas';
import Unauthorized from '../components/Unauthorized'; // Página para acceso no autorizado

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Rutas protegidas */}
      <Route
        path="/encuestas"
        element={
          <ProtectedRoute allowedRoles={['administrador', 'Usuario']}>
            <>
              <Navbar />
              <Encuestas />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/misencuestas"
        element={
          <ProtectedRoute allowedRoles={['Usuario','administrador']}>
            <>
              <Navbar />
              <MisEncuestas />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/usuarios"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <>
              <Navbar />
              <Usuarios />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <ProtectedRoute allowedRoles={['administrador', 'Usuario']}>
            <>
              <Navbar />
              <Perfil />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <>
              <Navbar />
              <Dashboard />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/crear-encuesta"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <>
              <Navbar />
              <CrearEncuesta />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/responderEncuesta/:encuestaId"
        element={
          <ProtectedRoute allowedRoles={['usuario']}>
            <>
              <Navbar />
              <ResponderEncuesta />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/roles"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <>
              <Navbar />
              <Roles />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/areas"
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <>
              <Navbar />
              <Areas />
            </>
          </ProtectedRoute>
        }
      />

      {/* Ruta por defecto */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
