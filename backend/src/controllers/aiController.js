// Controlador de IA para interpretación de sueños
const aiService = require('../services/aiService');
const { Dream, DreamAnalysis, DreamEmotion, DreamTag } = require('../db/models');
const config = require('../config/config');

// Interpretar un sueño
const interpretDream = async (req, res) => {
  try {
    const { dreamId } = req.params;
    
    // Obtener sueño
    const dream = await Dream.getById(dreamId);
    
    // Verificar que el sueño exista
    if (!dream) {
      return res.status(404).json({ error: 'Sueño no encontrado' });
    }
    
    // Verificar que el sueño pertenezca al usuario
    if (dream.user_id !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permiso para interpretar este sueño' });
    }
    
    // Interpretar sueño con IA
    const interpretation = await aiService.interpretDream(dream.content);
    
    // Guardar interpretación en la base de datos
    const analysis = await DreamAnalysis.create({
      dream_id: dreamId,
      interpretation: interpretation.summary,
      main_symbol: interpretation.mainSymbol,
      is_premium: false
    });
    
    // Guardar emociones detectadas
    if (interpretation.emotions && interpretation.emotions.length > 0) {
      const emotionsData = interpretation.emotions.map(emotion => ({
        dream_id: dreamId,
        emotion,
        intensity: 5 // Valor por defecto
      }));
      
      await DreamEmotion.create(emotionsData);
    }
    
    // Guardar símbolos como etiquetas
    if (interpretation.symbols && interpretation.symbols.length > 0) {
      const tagsData = interpretation.symbols.map(symbol => ({
        dream_id: dreamId,
        tag: symbol.symbol
      }));
      
      await DreamTag.create(tagsData);
    }
    
    res.json({ 
      interpretation,
      analysis
    });
  } catch (error) {
    console.error('Error al interpretar sueño:', error);
    res.status(500).json({ error: 'Error al interpretar el sueño' });
  }
};

// Analizar emociones de un sueño
const analyzeDreamEmotions = async (req, res) => {
  try {
    const { dreamId } = req.params;
    
    // Obtener sueño
    const dream = await Dream.getById(dreamId);
    
    // Verificar que el sueño exista
    if (!dream) {
      return res.status(404).json({ error: 'Sueño no encontrado' });
    }
    
    // Verificar que el sueño pertenezca al usuario
    if (dream.user_id !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permiso para analizar este sueño' });
    }
    
    // Analizar emociones con IA
    const emotionAnalysis = await aiService.analyzeDreamEmotions(dream.content);
    
    // Guardar emociones en la base de datos
    if (emotionAnalysis.emotions && emotionAnalysis.emotions.length > 0) {
      const emotionsData = emotionAnalysis.emotions.map(emotion => ({
        dream_id: dreamId,
        emotion: emotion.name,
        intensity: emotion.intensity
      }));
      
      await DreamEmotion.create(emotionsData);
    }
    
    res.json({ emotionAnalysis });
  } catch (error) {
    console.error('Error al analizar emociones:', error);
    res.status(500).json({ error: 'Error al analizar las emociones del sueño' });
  }
};

// Analizar patrones en los sueños del usuario
const analyzeDreamPatterns = async (req, res) => {
  try {
    const { period = 30 } = req.query;
    
    // Verificar si el usuario tiene suscripción premium
    if (req.user.subscription_status !== config.SUBSCRIPTION_PLANS.PREMIUM) {
      return res.status(403).json({ 
        error: 'Se requiere suscripción premium para acceder a esta funcionalidad',
        isPremiumRequired: true
      });
    }
    
    // Obtener sueños recientes del usuario
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));
    
    // Obtener sueños
    const dreams = await Dream.getByUserId(req.user.id, 50, 0);
    
    // Verificar que haya suficientes sueños para analizar
    if (dreams.length < 3) {
      return res.status(400).json({ 
        error: 'Se necesitan al menos 3 sueños registrados para analizar patrones',
        insufficientData: true
      });
    }
    
    // Analizar patrones con IA
    const patternAnalysis = await aiService.analyzeDreamPatterns(dreams);
    
    res.json({ patternAnalysis });
  } catch (error) {
    console.error('Error al analizar patrones:', error);
    res.status(500).json({ error: 'Error al analizar los patrones de sueños' });
  }
};

// Procesar entrada de audio para registro de sueño
const processDreamAudio = async (req, res) => {
  try {
    const { audioUrl } = req.body;
    
    // Validar datos
    if (!audioUrl) {
      return res.status(400).json({ error: 'La URL del audio es requerida' });
    }
    
    // Procesar audio a texto
    const dreamContent = await aiService.processAudioToText(audioUrl);
    
    res.json({ dreamContent });
  } catch (error) {
    console.error('Error al procesar audio:', error);
    res.status(500).json({ error: 'Error al procesar el audio del sueño' });
  }
};

// Procesar entrada de imagen para registro de sueño
const processDreamImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    
    // Validar datos
    if (!imageUrl) {
      return res.status(400).json({ error: 'La URL de la imagen es requerida' });
    }
    
    // Procesar imagen a texto
    const dreamContent = await aiService.processImageToText(imageUrl);
    
    res.json({ dreamContent });
  } catch (error) {
    console.error('Error al procesar imagen:', error);
    res.status(500).json({ error: 'Error al procesar la imagen del sueño' });
  }
};

// Generar respuesta del analista onírico
const generateAnalystResponse = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { message } = req.body;
    
    // Validar datos
    if (!message) {
      return res.status(400).json({ error: 'El mensaje es requerido' });
    }
    
    // Obtener historial de chat
    const chatMessages = await req.chatMessages || [];
    
    // Generar respuesta con IA
    const response = await aiService.generateDreamAnalystResponse(chatMessages, message);
    
    res.json({ response });
  } catch (error) {
    console.error('Error al generar respuesta del analista:', error);
    res.status(500).json({ error: 'Error al generar respuesta del analista onírico' });
  }
};

module.exports = {
  interpretDream,
  analyzeDreamEmotions,
  analyzeDreamPatterns,
  processDreamAudio,
  processDreamImage,
  generateAnalystResponse
};
