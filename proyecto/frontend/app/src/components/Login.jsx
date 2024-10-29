import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/api/usuarios/login', {
        correo,
        contrasena,
      });

      localStorage.setItem('token', response.data.token);

      navigate('/misencuestas');
    } catch (err) {
      setError('Credenciales inválidas. Intenta nuevamente.');
      console.error('Error en el login:', err.response ? err.response.data : err);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} className="w-100">
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