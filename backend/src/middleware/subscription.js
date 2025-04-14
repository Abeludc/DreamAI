// Middleware para verificar y gestionar acceso premium
const { checkPremiumAccess } = require('../services/subscriptionService');
const config = require('../config/config');

// Middleware para verificar si una ruta requiere acceso premium
const premiumFeatureMiddleware = async (req, res, next) => {
  try {
    // Verificar si el usuario tiene acceso premium
    const premiumAccess = await checkPremiumAccess(req.user.id);
    
    // Almacenar información de acceso premium en la request para uso posterior
    req.premiumAccess = premiumAccess;
    
    // Si la ruta requiere acceso premium y el usuario no lo tiene, devolver error
    if (req.requiresPremium && !premiumAccess.isPremium) {
      return res.status(403).json({
        error: 'Esta funcionalidad requiere una suscripción premium',
        isPremiumRequired: true,
        subscriptionStatus: premiumAccess.subscriptionStatus
      });
    }
    
    next();
  } catch (error) {
    console.error('Error al verificar acceso premium:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Middleware para marcar una ruta como premium
const requirePremium = (req, res, next) => {
  req.requiresPremium = true;
  next();
};

// Middleware para limitar funcionalidades en el plan gratuito
const limitFreeUsage = (limitConfig) => {
  return async (req, res, next) => {
    try {
      // Si el usuario tiene premium, no aplicar límites
      if (req.premiumAccess && req.premiumAccess.isPremium) {
        return next();
      }
      
      // Implementar lógica de límites según el tipo
      // Por ejemplo, limitar número de interpretaciones, análisis, etc.
      // Esta es una implementación simplificada para desarrollo
      
      // Ejemplo: Limitar número de sueños interpretados por día
      if (limitConfig.type === 'interpretations') {
        // En una implementación real, aquí se verificaría el número de interpretaciones
        // realizadas por el usuario en el período especificado
        const usageCount = 0; // Simulado
        
        if (usageCount >= limitConfig.limit) {
          return res.status(403).json({
            error: `Has alcanzado el límite de ${limitConfig.limit} ${limitConfig.type} en tu plan gratuito`,
            isPremiumRequired: true,
            limitReached: true
          });
        }
      }
      
      next();
    } catch (error) {
      console.error('Error al aplicar límites de uso:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  };
};

module.exports = {
  premiumFeatureMiddleware,
  requirePremium,
  limitFreeUsage
};
