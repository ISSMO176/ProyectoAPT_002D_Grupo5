import express from 'express';
import encuestaRoutes from './routes/encuestaRoutes.js';

const app = express();

app.use(express.json());

// Rutas para encuestas
app.use('/api', encuestaRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
