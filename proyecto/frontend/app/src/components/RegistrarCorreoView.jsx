import React from 'react';
import axios from 'axios';
import RegistrarCorreoForm from '../components/RegistrarCorreoForm'; // Importamos el formulario

const RegistrarCorreoView = () => {
  // Función que manejará el envío del correo al backend
  const handleSave = async (data) => {
    try {
      // Enviamos el correo al backend mediante una solicitud POST
      await axios.post('http://localhost:4000/api/usuarios/registrarCorreo', data); // Enviar correo al backend
      alert('Correo registrado correctamente y se ha enviado la invitación.');
    } catch (error) {
      console.error('Error al registrar el correo:', error);
      alert('Hubo un error al registrar el correo.');
    }
  };

  // Función que maneja la cancelación del registro
  const handleCancel = () => {
    // Aquí puedes implementar la lógica de cancelación, como redirigir o limpiar
    console.log('Registro cancelado');
  };

  return (
    <div>
      <h2>Registro de Correo para Usuarios</h2>
      <RegistrarCorreoForm onSave={handleSave} onCancel={handleCancel} /> {/* Usamos el formulario */}
    </div>
  );
};

export default RegistrarCorreoView;
