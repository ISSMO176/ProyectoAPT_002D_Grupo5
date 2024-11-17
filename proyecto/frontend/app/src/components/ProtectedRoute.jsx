import React from 'react';
import { Navigate } from 'react-router-dom';

const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1]; // Obtiene la segunda parte del token (payload)
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64)); // Decodifica el payload y lo convierte en objeto
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Si no hay token, redirige al login
    return <Navigate to="/login" />;
  }

  const decodedToken = decodeToken(token);
  console.log('Token decodificado:', decodedToken);
  
  if (!decodedToken) {
    return <Navigate to="/login" />;
  }
  
  const userRole = decodedToken.rol; 
  console.log('Rol del usuario:', userRole);
  
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children; 
};

export default ProtectedRoute;
