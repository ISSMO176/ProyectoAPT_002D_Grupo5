import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import Encuestas from '../components/Encuestas';
import Perfil from '../components/Perfil';
import Usuarios from '../components/Usuarios';
import Preguntas from '../components/Preguntas';
import Respuestas from '../components/Respuestas';
import Dashboard from '../components/Dashboard';
import MisEncuestas from '../components/MisEncuestas';
import Encuestasignada from '../components/Encuestasignada';
import AsignarEncuestas from '../components/AsignarEncuestas';
import AgregarPreguntas from '../components/AgregarPreguntasVista';
import CrearEncuesta from '../components/CrearEncuesta';
import ModificarEncuesta from '../components/ModificarEncuesta';
import Roles from '../components/Roles';
import AgregarPreguntasVista from '../components/AgregarPreguntasVista';
import Areas from '../components/Areas';
import { isAuthenticated } from '../services/authService';

// Rutas privadas
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Rutas públicas
const PublicRoute = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to="/dashboard" />;
};

const AppRouter = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/login') {
      document.body.className = 'light-theme login-page';
    } else {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/encuestas" element={<Encuestas />} />
      <Route path="/misencuestas" element={<MisEncuestas />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/preguntas" element={<Preguntas />} />
      <Route path="/respuestas" element={<Respuestas />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/encuestasignada" element={<Encuestasignada />} />
      <Route path="/asignarencuestas" element={<AsignarEncuestas />} />
      <Route path="/agregarpreguntas" element={<AgregarPreguntas />} />
      <Route path="/crear-encuesta" element={<CrearEncuesta />} />
      <Route path="/modificar-encuesta/:idEncuesta" element={<ModificarEncuesta />} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/areas" element={<Areas />} />
      <Route path="/login" element={<Login />} />
      <Route path="/agregar-preguntas/:id" element={<AgregarPreguntasVista />} />
    </Routes>
  );
};

export default AppRouter;
