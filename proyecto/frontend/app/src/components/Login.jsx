// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [rut, setRut] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/usuarios/login', { rut, contrasena });
            localStorage.setItem('token', response.data.token);
            navigate('/misEncuestas');
        } catch (error) {
            console.error('Error en el login', error);
            alert('Credenciales incorrectas');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className="mx-auto" style={{ maxWidth: '400px' }}>
                <div className="form-group mb-3">
                    <label htmlFor="rut">RUT</label>
                    <input
                        type="text"
                        className="form-control"
                        id="rut"
                        value={rut}
                        onChange={(e) => setRut(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="contrasena">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="contrasena"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;
