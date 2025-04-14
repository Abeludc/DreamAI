// Configuración del servidor y variables de entorno
require('dotenv').config();

module.exports = {
  // Configuración del servidor
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Configuración de Supabase
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_KEY: process.env.SUPABASE_KEY,
  
  // Configuración de JWT
  JWT_SECRET: process.env.JWT_SECRET || 'dreamai_secret_key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  
  // Configuración de API de IA
  AI_API_KEY: process.env.AI_API_KEY,
  AI_API_URL: process.env.AI_API_URL,
  
  // Configuración de Stripe
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  
  // Planes de suscripción
  SUBSCRIPTION_PLANS: {
    FREE: 'free',
    PREMIUM: 'premium'
  }
};
