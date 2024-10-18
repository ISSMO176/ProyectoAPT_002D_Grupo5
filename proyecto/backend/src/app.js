import express from 'express';
import cors from 'cors';
import encuestaRoutes from './routes/encuestaRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js'; // Rutas para usuarios
import rolRoutes from './routes/rolRoutes.js';
import areaRoutes from './routes/areaRoutes.js';

const app = express();

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5173', // Cambia esto si tu frontend está en otro dominio o puerto
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas para encuestas
app.use('/api/encuestas', encuestaRoutes); // Prefijo específico para encuestas

// Rutas para usuarios (incluye la ruta /login)
app.use('/api/usuarios', usuarioRoutes); // Prefijo específico para usuarios

// Rutas para roles
app.use('/api/roles', rolRoutes);

// Rutas para áreas
app.use('/api/areas', areaRoutes);

// Puerto donde se escucha
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
