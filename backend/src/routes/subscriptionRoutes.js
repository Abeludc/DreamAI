// Rutas de suscripción
const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const { authenticate } = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(authenticate);

// Rutas para gestión de suscripciones
router.get('/', subscriptionController.getUserSubscription);
router.post('/', subscriptionController.createSubscription);
router.post('/cancel', subscriptionController.cancelSubscription);
router.get('/plans', subscriptionController.getSubscriptionPlans);
router.post('/checkout', subscriptionController.createCheckoutSession);
router.get('/premium-access', subscriptionController.checkPremiumAccess);

module.exports = router;
