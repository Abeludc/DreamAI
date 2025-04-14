// Rutas de IA para interpretación de sueños
const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { authenticate } = require('../middleware/auth');
const { premiumFeatureMiddleware, requirePremium, limitFreeUsage } = require('../middleware/subscription');

// Todas las rutas requieren autenticación
router.use(authenticate);
router.use(premiumFeatureMiddleware);

// Rutas para interpretación de sueños
router.post('/dreams/:dreamId/interpret', limitFreeUsage({ type: 'interpretations', limit: 3 }), aiController.interpretDream);
router.post('/dreams/:dreamId/emotions', limitFreeUsage({ type: 'emotions', limit: 3 }), aiController.analyzeDreamEmotions);
router.post('/dreams/patterns', requirePremium, aiController.analyzeDreamPatterns);

// Rutas para procesamiento de entrada
router.post('/process/audio', aiController.processDreamAudio);
router.post('/process/image', aiController.processDreamImage);

// Ruta para chat con analista onírico
router.post('/analyst/response', limitFreeUsage({ type: 'chat_messages', limit: 3 }), aiController.generateAnalystResponse);

module.exports = router;
