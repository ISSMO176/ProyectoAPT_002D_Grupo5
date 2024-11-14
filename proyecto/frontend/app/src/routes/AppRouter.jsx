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

  return (
    <Routes>
      {/* Ruta de login con Navbar solo cuando sea necesario */}
      <Route path="/login" element={<Login />} />
      
      {/* Ruta por defecto que redirige al login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Rutas con Navbar y Footer */}
      <Route path="/encuestas" element={<><Navbar /><Encuestas /></>} />
      <Route path="/misencuestas" element={<><Navbar /><MisEncuestas /></>} />
      <Route path="/perfil" element={<><Navbar /><Perfil /></>} />
      <Route path="/usuarios" element={<><Navbar /><Usuarios /></>} />
      <Route path="/preguntas" element={<><Navbar /><Preguntas /></>} />
      <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
      <Route path="/encuestasignada" element={<><Navbar /><Encuestasignada /></>} />
      <Route path="/asignarencuestas" element={<><Navbar /><AsignarEncuestas /></>} />
      <Route path="/agregarpreguntas" element={<><Navbar /><AgregarPreguntas /></>} />
      <Route path="/crear-encuesta" element={<><Navbar /><CrearEncuesta /></>} />
      <Route path="/modificar-encuesta/:idEncuesta" element={<><Navbar /><ModificarEncuesta /></>} />
      <Route path="/roles" element={<><Navbar /><Roles /></>} />
      <Route path="/areas" element={<><Navbar /><Areas /></>} />
      <Route path="/agregar-preguntas/:id" element={<><Navbar /><AgregarPreguntasVista /></>} />
      <Route path="/responderEncuesta/:encuestaId" element={<><Navbar /><ResponderEncuesta /></>} />
      <Route path="/estadisticas-encuesta/:encuestaId" element={<><Navbar /><EstadisticasEncuesta /></>} />
    </Routes>
  );
};

export default AppRouter;
