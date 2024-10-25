// src/components/Perfil.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerPerfil = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No estás autenticado. Por favor inicia sesión.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/api/usuarios/perfil', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsuario(response.data); // Asigna los datos del usuario
      } catch (err) {
        setError('Error al obtener el perfil. Intenta nuevamente.');
        console.error('Error al obtener el perfil:', err.response ? err.response.data : err);
      }
    };

    obtenerPerfil();
  }, []); // Ejecutar solo una vez al montar el componente

  return (
    <div className="container">
      {error && <div className="alert alert-danger">{error}</div>}
      {usuario ? (
        <div>
          <h2>Perfil de Usuario</h2>
          <p><strong>Nombre:</strong> {usuario.nombre}</p>
          <p><strong>Correo:</strong> {usuario.correo}</p>
          {/* Agrega más información según sea necesario */}
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
};

export default Perfil;
