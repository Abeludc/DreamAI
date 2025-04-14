// Controlador de suscripciones
const { User, Subscription } = require('../db/models');
const config = require('../config/config');
const subscriptionService = require('../services/subscriptionService');

// Obtener información de suscripción del usuario
const getUserSubscription = async (req, res) => {
  try {
    // Obtener suscripción
    const subscription = await Subscription.getByUserId(req.user.id);
    
    // Verificar acceso premium
    const premiumAccess = await subscriptionService.checkPremiumAccess(req.user.id);
    
    // Información de suscripción del usuario
    const subscriptionInfo = {
      status: req.user.subscription_status,
      endDate: req.user.subscription_end_date,
      isPremium: premiumAccess.isPremium,
      details: subscription || null
    };
    
    res.json({ subscription: subscriptionInfo });
  } catch (error) {
    console.error('Error al obtener suscripción:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Crear una nueva suscripción
const createSubscription = async (req, res) => {
  try {
    const { planId } = req.body;
    
    // Validar datos
    if (!planId) {
      return res.status(400).json({ error: 'ID del plan es requerido' });
    }
    
    // Crear suscripción usando el servicio
    const result = await subscriptionService.createSubscription(req.user, planId);
    
    res.status(201).json({ 
      subscription: result.subscription,
      message: 'Suscripción creada correctamente'
    });
  } catch (error) {
    console.error('Error al crear suscripción:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Cancelar suscripción
const cancelSubscription = async (req, res) => {
  try {
    // Cancelar suscripción usando el servicio
    const result = await subscriptionService.cancelSubscription(req.user);
    
    res.json({ 
      message: 'Suscripción cancelada correctamente',
      subscription: result.subscription
    });
  } catch (error) {
    console.error('Error al cancelar suscripción:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Obtener planes de suscripción disponibles
const getSubscriptionPlans = async (req, res) => {
  try {
    // Obtener planes usando el servicio
    const plans = await subscriptionService.getAvailablePlans();
    
    res.json({ plans });
  } catch (error) {
    console.error('Error al obtener planes de suscripción:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Generar sesión de checkout para pago
const createCheckoutSession = async (req, res) => {
  try {
    const { planId } = req.body;
    
    // Validar datos
    if (!planId) {
      return res.status(400).json({ error: 'ID del plan es requerido' });
    }
    
    // Generar sesión de checkout
    const checkoutSession = await subscriptionService.generateCheckoutSession(req.user.id, planId);
    
    res.json({ 
      checkoutUrl: checkoutSession.url,
      sessionId: checkoutSession.id
    });
  } catch (error) {
    console.error('Error al crear sesión de checkout:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Verificar acceso premium
const checkPremiumAccess = async (req, res) => {
  try {
    // Verificar acceso premium usando el servicio
    const premiumAccess = await subscriptionService.checkPremiumAccess(req.user.id);
    
    res.json({ premiumAccess });
  } catch (error) {
    console.error('Error al verificar acceso premium:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  getUserSubscription,
  createSubscription,
  cancelSubscription,
  getSubscriptionPlans,
  createCheckoutSession,
  checkPremiumAccess
};
