import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos
    console.log('Logging in with', { email, password });
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuario autenticado:', userCredential.user);
      // Aquí puedes redirigir al usuario a otra página o hacer otra acción
  } catch (error) {
      let errorMessage;

      // Verificar el código de error
      switch (error.code) {
          case 'auth/invalid-email':
              errorMessage = 'El correo electrónico no es válido.';
              break;
          case 'auth/user-disabled':
              errorMessage = 'La cuenta de usuario ha sido desactivada.';
              break;
          case 'auth/user-not-found':
              errorMessage = 'No se encontró un usuario con ese correo electrónico.';
              break;
          case 'auth/wrong-password':
              errorMessage = 'La contraseña es incorrecta.';
              break;
          case 'auth/invalid-credential':
              errorMessage = 'Las credenciales proporcionadas no son válidas. Intenta de nuevo.';
              break;
          default:
              errorMessage = 'Error al iniciar sesión. Intenta de nuevo más tarde.';
              break;
      }

      setError(errorMessage); // Mostrar el mensaje de error
      console.error('Error al iniciar sesión:', error);
  }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-3">Iniciar sesión</h3>
        {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar errores */}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger w-100">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;

