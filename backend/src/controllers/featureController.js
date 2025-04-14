// Controlador para gestionar las características de la aplicación
const featureService = require('../services/featureService');
const { User } = require('../db/models');

// Obtener todas las características disponibles para el usuario
const getAvailableFeatures = async (req, res) => {
  try {
    // Obtener características según el estado de suscripción del usuario
    const features = featureService.getAllFeatures(req.user.subscription_status);
    
    res.json({ features });
  } catch (error) {
    console.error('Error al obtener características disponibles:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Verificar si una característica específica está disponible
const checkFeatureAvailability = async (req, res) => {
  try {
    const { featureKey } = req.params;
    const { usageCount } = req.query;
    
    // Verificar disponibilidad de la característica
    const isAvailable = featureService.isFeatureAvailable(
      featureKey, 
      req.user.subscription_status,
      usageCount ? parseInt(usageCount) : 0
    );
    
    res.json({ 
      feature: featureKey,
      available: isAvailable,
      subscriptionStatus: req.user.subscription_status
    });
  } catch (error) {
    console.error('Error al verificar disponibilidad de característica:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  getAvailableFeatures,
  checkFeatureAvailability
};
