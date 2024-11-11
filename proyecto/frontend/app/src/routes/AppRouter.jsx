import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';  // Asegúrate de tener el Footer importado
import Login from '../components/Login';
import Encuestas from '../components/Encuestas';
import Perfil from '../components/Perfil';
import Usuarios from '../components/Usuarios';
import Preguntas from '../components/Preguntas';
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
import ResponderEncuesta from '../components/ResponderEncuesta';
import EstadisticasEncuesta from '../components/EstadisticasEncuesta';

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
      {/* Ruta de login con Navbar solo cuando sea necesario */}
      <Route path="/login" element={<Login />} />
      
      {/* Ruta por defecto que redirige al login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Rutas con Navbar y Footer */}
      <Route path="/encuestas" element={<><Navbar /><Encuestas /><Footer /></>} />
      <Route path="/misencuestas" element={<><Navbar /><MisEncuestas /><Footer /></>} />
      <Route path="/perfil" element={<><Navbar /><Perfil /><Footer /></>} />
      <Route path="/usuarios" element={<><Navbar /><Usuarios /><Footer /></>} />
      <Route path="/preguntas" element={<><Navbar /><Preguntas /><Footer /></>} />
      <Route path="/dashboard" element={<><Navbar /><Dashboard /><Footer /></>} />
      <Route path="/encuestasignada" element={<><Navbar /><Encuestasignada /><Footer /></>} />
      <Route path="/asignarencuestas" element={<><Navbar /><AsignarEncuestas /><Footer /></>} />
      <Route path="/agregarpreguntas" element={<><Navbar /><AgregarPreguntas /><Footer /></>} />
      <Route path="/crear-encuesta" element={<><Navbar /><CrearEncuesta /><Footer /></>} />
      <Route path="/modificar-encuesta/:idEncuesta" element={<><Navbar /><ModificarEncuesta /><Footer /></>} />
      <Route path="/roles" element={<><Navbar /><Roles /><Footer /></>} />
      <Route path="/areas" element={<><Navbar /><Areas /><Footer /></>} />
      <Route path="/agregar-preguntas/:id" element={<><Navbar /><AgregarPreguntasVista /><Footer /></>} />
      <Route path="/responderEncuesta/:encuestaId" element={<><Navbar /><ResponderEncuesta /><Footer /></>} />
      <Route path="/estadisticas-encuesta/:encuestaId" element={<><Navbar /><EstadisticasEncuesta /><Footer /></>} />
    </Routes>
  );
};

export default AppRouter;
