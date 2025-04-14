// Rutas de chat
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { authenticate } = require('../middleware/auth');
const { premiumFeatureMiddleware, limitFreeUsage } = require('../middleware/subscription');

// Todas las rutas requieren autenticación
router.use(authenticate);
router.use(premiumFeatureMiddleware);

// Rutas para gestión de conversaciones
router.post('/', chatController.createConversation);
router.get('/', chatController.getUserConversations);
router.get('/:conversationId', chatController.getConversationById);
router.post('/:conversationId/messages', limitFreeUsage({ type: 'chat_messages', limit: 3 }), chatController.sendMessage);

module.exports = router;
