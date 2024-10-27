import express from 'express';
import cors from 'cors';
import encuestaRoutes from './routes/encuestaRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js'; // Asegúrate de tener estas rutas
import rolRoutes from './routes/rolRoutes.js';
import areaRoutes from './routes/areaRoutes.js';
import preguntaRoutes from './routes/preguntaRoutes.js';
import encuestaAsignadaRoutes from './routes/encuestaAsignadaRoutes.js';
const app = express();

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5173', // Cambia esto si tu frontend está en otro dominio o puerto
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Rutas para encuestas
app.use('/api/encuestas', encuestaRoutes); // Prefijo específico para encuestas
// Rutas para usuarios
app.use('/api/usuarios', usuarioRoutes); // Prefijo específico para usuarios
// Rutas para roles
app.use('/api/roles', rolRoutes);

app.use('/api/areas', areaRoutes);

app.use('/api/preguntas', preguntaRoutes);

//app.use('/api/auth', usuarioRoutes);
app.use('/api/encuestas-asignadas', encuestaAsignadaRoutes);

const PORT = process.env.PORT || 4000; // Cambia esto a 4000
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});