// Archivo principal del servidor
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Importar configuración
const config = require('./config/config');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const dreamRoutes = require('./routes/dreamRoutes');
const chatRoutes = require('./routes/chatRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const aiRoutes = require('./routes/aiRoutes');
const featureRoutes = require('./routes/featureRoutes');

// Inicializar app
const app = express();

// Middlewares
app.use(helmet()); // Seguridad
app.use(cors()); // Habilitar CORS
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parseo de JSON

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/dreams', dreamRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/features', featureRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de DreamAI funcionando correctamente' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error en el servidor' });
});

// Iniciar servidor
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

module.exports = app;
