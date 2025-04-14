// Definición de características premium y gratuitas para el modelo freemium
const config = require('../config/config');

// Características disponibles en la aplicación
const FEATURES = {
  // Características básicas (gratuitas)
  BASIC: {
    // Registro de sueños
    DREAM_RECORDING: {
      limit: 100, // Número máximo de sueños que se pueden registrar
      available: true
    },
    // Interpretación básica de sueños
    BASIC_INTERPRETATION: {
      limit: 3, // Número de interpretaciones gratuitas por mes
      available: true
    },
    // Análisis emocional básico
    BASIC_EMOTION_ANALYSIS: {
      limit: 3, // Número de análisis emocionales gratuitos por mes
      available: true
    },
    // Chat con analista onírico
    DREAM_ANALYST_CHAT: {
      limit: 3, // Número de mensajes gratuitos por conversación
      available: true
    },
    // Calendario de sueños
    DREAM_CALENDAR: {
      available: true
    }
  },
  
  // Características premium
  PREMIUM: {
    // Interpretación extendida de sueños
    EXTENDED_INTERPRETATION: {
      available: true
    },
    // Análisis emocional detallado
    DETAILED_EMOTION_ANALYSIS: {
      available: true
    },
    // Análisis de patrones recurrentes
    PATTERN_ANALYSIS: {
      available: true
    },
    // Chat ilimitado con analista onírico
    UNLIMITED_DREAM_ANALYST: {
      available: true
    },
    // Visualizaciones y gráficas avanzadas
    ADVANCED_VISUALIZATIONS: {
      available: true
    },
    // Exportación de informes
    REPORT_EXPORT: {
      available: true
    },
    // Modo privado (protección con PIN/FaceID)
    PRIVATE_MODE: {
      available: true
    },
    // Simbología personalizada
    CUSTOM_SYMBOLISM: {
      available: true
    }
  }
};

// Verificar si una característica está disponible para un usuario
const isFeatureAvailable = (featureKey, userSubscriptionStatus, usageCount = 0) => {
  // Dividir la clave de característica en categoría y nombre
  const [category, featureName] = featureKey.split('.');
  
  // Verificar si es una característica premium
  const isPremiumFeature = category === 'PREMIUM';
  
  // Si es una característica premium, verificar si el usuario tiene suscripción premium
  if (isPremiumFeature) {
    return userSubscriptionStatus === config.SUBSCRIPTION_PLANS.PREMIUM;
  }
  
  // Si es una característica básica, verificar si está disponible y si no ha excedido el límite
  const feature = FEATURES.BASIC[featureName];
  if (!feature || !feature.available) {
    return false;
  }
  
  // Si la característica tiene límite, verificar si no se ha excedido
  if (feature.limit !== undefined) {
    return usageCount < feature.limit;
  }
  
  return true;
};

// Obtener información sobre todas las características disponibles
const getAllFeatures = (userSubscriptionStatus) => {
  const features = {
    basic: {},
    premium: {}
  };
  
  // Procesar características básicas
  Object.entries(FEATURES.BASIC).forEach(([key, value]) => {
    features.basic[key] = {
      ...value,
      available: isFeatureAvailable(`BASIC.${key}`, userSubscriptionStatus)
    };
  });
  
  // Procesar características premium
  Object.entries(FEATURES.PREMIUM).forEach(([key, value]) => {
    features.premium[key] = {
      ...value,
      available: isFeatureAvailable(`PREMIUM.${key}`, userSubscriptionStatus)
    };
  });
  
  return features;
};

module.exports = {
  FEATURES,
  isFeatureAvailable,
  getAllFeatures
};
