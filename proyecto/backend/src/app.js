import express from 'express';
import cors from 'cors'; // Importar cors
import encuestaRoutes from './routes/encuestaRoutes.js';

const app = express();

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5173', // Cambia esto si tu frontend está en otro dominio o puerto
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));

app.use(express.json());

// Rutas para encuestas
app.use('/api', encuestaRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});