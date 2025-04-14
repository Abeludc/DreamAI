// Controlador de sueños
const { Dream, DreamAnalysis, DreamEmotion, DreamTag } = require('../db/models');
const config = require('../config/config');

// Crear un nuevo sueño
const createDream = async (req, res) => {
  try {
    const { content, dreamDate, inputType = 'text', isPrivate = false } = req.body;
    
    // Validar datos
    if (!content) {
      return res.status(400).json({ error: 'El contenido del sueño es requerido' });
    }
    
    // Crear sueño
    const dream = await Dream.create({
      user_id: req.user.id,
      content,
      dream_date: dreamDate || new Date(),
      input_type: inputType,
      is_private: isPrivate && req.user.subscription_status === config.SUBSCRIPTION_PLANS.PREMIUM
    });
    
    res.status(201).json({ dream });
  } catch (error) {
    console.error('Error al crear sueño:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Obtener todos los sueños de un usuario
const getUserDreams = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    
    // Obtener sueños
    const dreams = await Dream.getByUserId(req.user.id, parseInt(limit), parseInt(offset));
    
    res.json({ dreams });
  } catch (error) {
    console.error('Error al obtener sueños:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Obtener sueños por fecha
const getDreamsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    
    // Validar fecha
    if (!date) {
      return res.status(400).json({ error: 'La fecha es requerida' });
    }
    
    // Obtener sueños
    const dreams = await Dream.getByDate(req.user.id, date);
    
    res.json({ dreams });
  } catch (error) {
    console.error('Error al obtener sueños por fecha:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Obtener un sueño específico
const getDreamById = async (req, res) => {
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
      return res.status(403).json({ error: 'No tienes permiso para acceder a este sueño' });
    }
    
    res.json({ dream });
  } catch (error) {
    console.error('Error al obtener sueño:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Actualizar un sueño
const updateDream = async (req, res) => {
  try {
    const { dreamId } = req.params;
    const { content, dreamDate, isPrivate } = req.body;
    
    // Obtener sueño
    const dream = await Dream.getById(dreamId);
    
    // Verificar que el sueño exista
    if (!dream) {
      return res.status(404).json({ error: 'Sueño no encontrado' });
    }
    
    // Verificar que el sueño pertenezca al usuario
    if (dream.user_id !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permiso para modificar este sueño' });
    }
    
    // Actualizar sueño
    const updatedDream = await Dream.update(dreamId, {
      content: content || dream.content,
      dream_date: dreamDate || dream.dream_date,
      is_private: isPrivate !== undefined ? 
        (isPrivate && req.user.subscription_status === config.SUBSCRIPTION_PLANS.PREMIUM) : 
        dream.is_private
    });
    
    res.json({ dream: updatedDream });
  } catch (error) {
    console.error('Error al actualizar sueño:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Eliminar un sueño
const deleteDream = async (req, res) => {
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
      return res.status(403).json({ error: 'No tienes permiso para eliminar este sueño' });
    }
    
    // Eliminar sueño
    await Dream.delete(dreamId);
    
    res.json({ message: 'Sueño eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar sueño:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Guardar análisis de un sueño
const saveDreamAnalysis = async (req, res) => {
  try {
    const { dreamId } = req.params;
    const { interpretation, mainSymbol, isPremium = false } = req.body;
    
    // Validar datos
    if (!interpretation) {
      return res.status(400).json({ error: 'La interpretación es requerida' });
    }
    
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
    
    // Verificar si ya existe un análisis
    const existingAnalysis = await DreamAnalysis.getByDreamId(dreamId);
    
    let analysis;
    
    if (existingAnalysis) {
      // Actualizar análisis existente
      analysis = await DreamAnalysis.update(existingAnalysis.id, {
        interpretation,
        main_symbol: mainSymbol,
        is_premium: isPremium
      });
    } else {
      // Crear nuevo análisis
      analysis = await DreamAnalysis.create({
        dream_id: dreamId,
        interpretation,
        main_symbol: mainSymbol,
        is_premium: isPremium
      });
    }
    
    res.json({ analysis });
  } catch (error) {
    console.error('Error al guardar análisis:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Guardar emociones de un sueño
const saveDreamEmotions = async (req, res) => {
  try {
    const { dreamId } = req.params;
    const { emotions } = req.body;
    
    // Validar datos
    if (!emotions || !Array.isArray(emotions) || emotions.length === 0) {
      return res.status(400).json({ error: 'Las emociones son requeridas' });
    }
    
    // Obtener sueño
    const dream = await Dream.getById(dreamId);
    
    // Verificar que el sueño exista
    if (!dream) {
      return res.status(404).json({ error: 'Sueño no encontrado' });
    }
    
    // Verificar que el sueño pertenezca al usuario
    if (dream.user_id !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permiso para modificar este sueño' });
    }
    
    // Preparar datos de emociones
    const emotionsData = emotions.map(emotion => ({
      dream_id: dreamId,
      emotion: emotion.name,
      intensity: emotion.intensity || 5
    }));
    
    // Guardar emociones
    const savedEmotions = await DreamEmotion.create(emotionsData);
    
    res.json({ emotions: savedEmotions });
  } catch (error) {
    console.error('Error al guardar emociones:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Guardar etiquetas de un sueño
const saveDreamTags = async (req, res) => {
  try {
    const { dreamId } = req.params;
    const { tags } = req.body;
    
    // Validar datos
    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({ error: 'Las etiquetas son requeridas' });
    }
    
    // Obtener sueño
    const dream = await Dream.getById(dreamId);
    
    // Verificar que el sueño exista
    if (!dream) {
      return res.status(404).json({ error: 'Sueño no encontrado' });
    }
    
    // Verificar que el sueño pertenezca al usuario
    if (dream.user_id !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permiso para modificar este sueño' });
    }
    
    // Preparar datos de etiquetas
    const tagsData = tags.map(tag => ({
      dream_id: dreamId,
      tag
    }));
    
    // Guardar etiquetas
    const savedTags = await DreamTag.create(tagsData);
    
    res.json({ tags: savedTags });
  } catch (error) {
    console.error('Error al guardar etiquetas:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Obtener estadísticas de emociones
const getEmotionStats = async (req, res) => {
  try {
    const { period = 30 } = req.query;
    
    // Obtener estadísticas
    const emotionStats = await DreamEmotion.getStatsByUserId(req.user.id, parseInt(period));
    
    // Procesar estadísticas
    const processedStats = {};
    
    emotionStats.forEach(stat => {
      const emotion = stat.emotion;
      
      if (!processedStats[emotion]) {
        processedStats[emotion] = {
          count: 0,
          totalIntensity: 0,
          averageIntensity: 0
        };
      }
      
      processedStats[emotion].count += 1;
      processedStats[emotion].totalIntensity += stat.intensity;
    });
    
    // Calcular promedios
    Object.keys(processedStats).forEach(emotion => {
      processedStats[emotion].averageIntensity = 
        processedStats[emotion].totalIntensity / processedStats[emotion].count;
    });
    
    res.json({ emotionStats: processedStats });
  } catch (error) {
    console.error('Error al obtener estadísticas de emociones:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Obtener etiquetas frecuentes
const getFrequentTags = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    // Obtener etiquetas frecuentes
    const frequentTags = await DreamTag.getFrequentByUserId(req.user.id, parseInt(limit));
    
    res.json({ tags: frequentTags });
  } catch (error) {
    console.error('Error al obtener etiquetas frecuentes:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  createDream,
  getUserDreams,
  getDreamsByDate,
  getDreamById,
  updateDream,
  deleteDream,
  saveDreamAnalysis,
  saveDreamEmotions,
  saveDreamTags,
  getEmotionStats,
  getFrequentTags
};
