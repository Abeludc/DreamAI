// Configuración de la conexión a Supabase
const { createClient } = require('@supabase/supabase-js');
const config = require('../config/config');

// Crear cliente de Supabase
const supabase = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_KEY
);

module.exports = supabase;
