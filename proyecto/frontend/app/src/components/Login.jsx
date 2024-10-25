// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reiniciar el error

    try {
      const response = await axios.post('http://localhost:4000/api/usuarios/login', {
        correo,
        contrasena,
      });

      // Almacenar el token en el almacenamiento local
      localStorage.setItem('token', response.data.token);

      // Redirigir o actualizar el estado del usuario
      console.log('Usuario autenticado:', response.data.usuario);
    } catch (err) {
      setError('Credenciales inválidas. Intenta nuevamente.');
      console.error('Error en el login:', err.response ? err.response.data : err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-1/3">
        <h2 className="text-2xl mb-4">Iniciar Sesión</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2">Correo:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Contraseña:</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
