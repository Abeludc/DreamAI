// Rutas de sueños
const express = require('express');
const router = express.Router();
const dreamController = require('../controllers/dreamController');
const { authenticate, requirePremium } = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(authenticate);

// Rutas para gestión de sueños
router.post('/', dreamController.createDream);
router.get('/', dreamController.getUserDreams);
router.get('/date/:date', dreamController.getDreamsByDate);
router.get('/:dreamId', dreamController.getDreamById);
router.put('/:dreamId', dreamController.updateDream);
router.delete('/:dreamId', dreamController.deleteDream);

// Rutas para análisis de sueños
router.post('/:dreamId/analysis', dreamController.saveDreamAnalysis);
router.post('/:dreamId/emotions', dreamController.saveDreamEmotions);
router.post('/:dreamId/tags', dreamController.saveDreamTags);

// Rutas para estadísticas (algunas requieren premium)
router.get('/stats/emotions', dreamController.getEmotionStats);
router.get('/stats/tags', dreamController.getFrequentTags);

module.exports = router;
