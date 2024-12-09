import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [rut, setRut] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Validar RUT
    const validarRUT = (rut) => {
        const rutRegex = /^[0-9]{7,8}-[0-9Kk]$/;
        if (!rutRegex.test(rut)) return false;

        const [numeros, dv] = rut.split('-');
        let suma = 0;
        let multiplicador = 2;

        for (let i = numeros.length - 1; i >= 0; i--) {
            suma += parseInt(numeros[i]) * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }
        const resto = suma % 11;
        const dvCalculado = resto === 0 ? '0' : resto === 1 ? 'K' : (11 - resto).toString();
        return dvCalculado.toUpperCase() === dv.toUpperCase();
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!validarRUT(rut)) {
            setError('El RUT ingresado es inválido');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/usuarios/login', { rut, contrasena });
            localStorage.setItem('token', response.data.token);
            navigate('/misEncuestas');
        } catch (error) {
            const mensajeError = error.response?.data?.error || 'Credenciales incorrectas';
            setError(mensajeError);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Lado de la imagen */}
            <div className="relative w-1/2 overflow-hidden hidden md:block">
                <img
                    src="/bg_salfacorp.jpg"
                    alt="Fondo"
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 w-full">
                    <svg
                        className="w-full"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320"
                    >
                        <path
                            fill="#b80000"
                            fillOpacity="1"
                            d="M0,224L48,197.3C96,171,192,117,288,106.7C384,96,480,128,576,154.7C672,181,768,203,864,218.7C960,235,1056,245,1152,245.3C1248,245,1344,235,1392,229.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </div>

            {/* Lado del formulario */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6">
                <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
                    <img
                        src="/logo_1.jpg"
                        alt="Logo"
                        className="mx-auto mb-6 w-64"
                    />
                    <h3 className="text-center text-2xl font-semibold text-gray-800 mb-4">
                        Iniciar Sesión
                    </h3>
                    {error && (
                        <div className="text-red-600 text-center mb-4">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label
                                htmlFor="rut"
                                className="block text-gray-600 mb-1"
                            >
                                RUT
                            </label>
                            <input
                                type="text"
                                id="rut"
                                value={rut}
                                onChange={(e) => setRut(e.target.value)}
                                className="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring focus:ring-red-300"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="contrasena"
                                className="block text-gray-600 mb-1"
                            >
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="contrasena"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                className="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring focus:ring-red-300"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg font-semibold"
                        >
                            Iniciar sesión
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
