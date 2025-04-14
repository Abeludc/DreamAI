// Rutas para gestión de características
const express = require('express');
const router = express.Router();
const featureController = require('../controllers/featureController');
const { authenticate } = require('../middleware/auth');
const { premiumFeatureMiddleware } = require('../middleware/subscription');

// Todas las rutas requieren autenticación
router.use(authenticate);
router.use(premiumFeatureMiddleware);

// Rutas para gestión de características
router.get('/', featureController.getAvailableFeatures);
router.get('/:featureKey', featureController.checkFeatureAvailability);

module.exports = router;
