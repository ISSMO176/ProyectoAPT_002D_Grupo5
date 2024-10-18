import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Función para enviar el correo con el enlace de creación de cuenta
const enviarCorreoDeInvitacion = async (correo, link) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,  // Usar el correo desde el archivo .env
      pass: process.env.GMAIL_PASS,  // Usar la contraseña de aplicación desde el archivo .env
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,  // Usar el correo del remitente desde el archivo .env
    to: correo,  // El destinatario será el correo del usuario que se está registrando
    subject: 'Completa tu registro en nuestra plataforma',
    text: `Haz clic en el siguiente enlace para completar tu registro: ${link}`,  // El enlace de activación
  };

  // Enviar el correo
  await transporter.sendMail(mailOptions);
};

export default enviarCorreoDeInvitacion;
