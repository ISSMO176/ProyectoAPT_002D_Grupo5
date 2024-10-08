import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Encuestas from './components/Encuestas';
import Perfil from './components/Perfil';
import Usuarios from './components/Usuarios';
import Preguntas from './components/Preguntas';
import Respuestas from './components/Respuestas';
import Dashboard from './components/Dashboard';
import MisEncuestas from './components/MisEncuestas';
import Encuestasignada from './components/Encuestasignada';
import AsignarEncuestas from './components/AsignarEncuestas';
import AgregarPreguntas from './components/AgregarPreguntas';

function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;