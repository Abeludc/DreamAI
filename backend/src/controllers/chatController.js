// Controlador de chat con analista onírico
const { ChatConversation, ChatMessage } = require('../db/models');
const config = require('../config/config');

// Crear una nueva conversación
const createConversation = async (req, res) => {
  try {
    // Crear conversación
    const conversation = await ChatConversation.create(req.user.id);
    
    // Mensaje inicial del analista
    await ChatMessage.create({
      conversation_id: conversation.id,
      sender: 'analyst',
      content: 'Hola, soy tu analista onírico. Estoy aquí para ayudarte a explorar y entender tus sueños. ¿En qué puedo ayudarte hoy?'
    });
    
    // Obtener conversación con mensajes
    const conversationWithMessages = await ChatConversation.getById(conversation.id);
    
    res.status(201).json({ conversation: conversationWithMessages });
  } catch (error) {
    console.error('Error al crear conversación:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Obtener conversaciones del usuario
const getUserConversations = async (req, res) => {
  try {
    // Obtener conversaciones
    const conversations = await ChatConversation.getByUserId(req.user.id);
    
    res.json({ conversations });
  } catch (error) {
    console.error('Error al obtener conversaciones:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Obtener una conversación específica
const getConversationById = async (req, res) => {
  try {
    const { conversationId } = req.params;
    
    // Obtener conversación
    const conversation = await ChatConversation.getById(conversationId);
    
    // Verificar que la conversación exista
    if (!conversation) {
      return res.status(404).json({ error: 'Conversación no encontrada' });
    }
    
    // Verificar que la conversación pertenezca al usuario
    if (conversation.user_id !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permiso para acceder a esta conversación' });
    }
    
    res.json({ conversation });
  } catch (error) {
    console.error('Error al obtener conversación:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Enviar mensaje a una conversación
const sendMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { content } = req.body;
    
    // Validar datos
    if (!content) {
      return res.status(400).json({ error: 'El contenido del mensaje es requerido' });
    }
    
    // Obtener conversación
    const conversation = await ChatConversation.getById(conversationId);
    
    // Verificar que la conversación exista
    if (!conversation) {
      return res.status(404).json({ error: 'Conversación no encontrada' });
    }
    
    // Verificar que la conversación pertenezca al usuario
    if (conversation.user_id !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permiso para enviar mensajes a esta conversación' });
    }
    
    // Verificar límite de mensajes para usuarios gratuitos
    if (req.user.subscription_status !== config.SUBSCRIPTION_PLANS.PREMIUM) {
      const messages = await ChatMessage.getByConversationId(conversationId);
      const userMessages = messages.filter(msg => msg.sender === 'user');
      
      if (userMessages.length >= 3) {
        return res.status(403).json({ 
          error: 'Has alcanzado el límite de mensajes gratuitos',
          isPremiumRequired: true
        });
      }
    }
    
    // Crear mensaje del usuario
    const userMessage = await ChatMessage.create({
      conversation_id: conversationId,
      sender: 'user',
      content
    });
    
    // Simular respuesta del analista (en una implementación real, aquí se llamaría a la API de IA)
    const analyzerResponses = [
      'Los sueños sobre vuelo suelen representar libertad, superación de obstáculos o deseo de escapar de alguna situación. ¿Qué sentías mientras volabas en tu sueño?',
      'Interesante. Los símbolos acuáticos en los sueños generalmente se relacionan con tus emociones y tu inconsciente. El agua clara podría indicar claridad emocional.',
      'Los laberintos en los sueños pueden simbolizar confusión o búsqueda. Quizás estás tratando de encontrar una solución a un problema complejo en tu vida.',
      'Soñar con personas desconocidas a menudo representa aspectos de ti mismo que aún no has reconocido o integrado. ¿Recuerdas cómo te sentías hacia esas personas?',
      'Las casas en los sueños suelen representar el yo. Diferentes habitaciones pueden simbolizar diferentes aspectos de tu personalidad o vida.',
    ];
    
    const randomResponse = analyzerResponses[Math.floor(Math.random() * analyzerResponses.length)];
    
    // Crear mensaje del analista
    const analystMessage = await ChatMessage.create({
      conversation_id: conversationId,
      sender: 'analyst',
      content: randomResponse
    });
    
    res.json({ 
      userMessage,
      analystMessage
    });
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  createConversation,
  getUserConversations,
  getConversationById,
  sendMessage
};
