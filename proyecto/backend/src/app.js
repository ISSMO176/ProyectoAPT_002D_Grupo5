import express from 'express';
import cors from 'cors';
import encuestaRoutes from './routes/encuestaRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js'; // Asegúrate de tener estas rutas
import rolRoutes from './routes/rolRoutes.js';
import areaRoutes from './routes/areaRoutes.js';
import preguntaRoutes from './routes/preguntaRoutes.js';
import encuestaAsignadaRoutes from './routes/encuestaAsignadaRoutes.js';
import respuestaRoutes from './routes/respuestaRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

const app = express();

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: true, 
  optionsSuccessStatus: 200,
}));
app.options('*', cors());

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
app.use('/api/encuestasAsignada', encuestaAsignadaRoutes);
app.use('/api/respuestas', respuestaRoutes);
app.use('/api/stats', statsRoutes); // Nueva ruta para estadísticas
const PORT = process.env.PORT || 4000; // Cambia esto a 4000
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});