import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Instancia el hook useNavigate

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

      // Redirigir a la página de MisEncuestas
      navigate('/misencuestas'); // Usa navigate para redirigir
    } catch (err) {
      setError('Credenciales inválidas. Intenta nuevamente.');
      console.error('Error en el login:', err.response ? err.response.data : err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} className="bg-light p-5 rounded shadow w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group mb-3">
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-danger w-100">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
