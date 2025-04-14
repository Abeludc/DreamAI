// Middleware para autenticación y autorización
const { verifyToken } = require('../utils/auth');
const { User } = require('../db/models');
const config = require('../config/config');

// Middleware para verificar autenticación
const authenticate = async (req, res, next) => {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    const token = authHeader.split(' ')[1];
    
    // Verificar token
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }
    
    // Obtener usuario
    const user = await User.getById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }
    
    // Añadir usuario a la request
    req.user = user;
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Middleware para verificar suscripción premium
const requirePremium = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }
    
    if (req.user.subscription_status !== config.SUBSCRIPTION_PLANS.PREMIUM) {
      return res.status(403).json({ 
        error: 'Se requiere suscripción premium para acceder a esta funcionalidad',
        isPremiumRequired: true
      });
    }
    
    next();
  } catch (error) {
    console.error('Error al verificar suscripción:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  authenticate,
  requirePremium
};
