// Punto de entrada del servidor
const app = require('./src/app');
const config = require('./src/config/config');

// Iniciar servidor
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Servidor DreamAI ejecutándose en el puerto ${PORT}`);
  console.log(`Entorno: ${config.NODE_ENV}`);
});
