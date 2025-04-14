// Servicio de IA para interpretación de sueños usando DeepSeek
const axios = require('axios');
const config = require('../config/config');

// Cliente para la API de DeepSeek
const deepseekClient = axios.create({
  baseURL: 'https://api.deepseek.com',
  headers: {
    'Authorization': `Bearer sk-c81d028a38364949b0735f1059eedd15`,
    'Content-Type': 'application/json'
  }
});

// Prompts para diferentes tipos de análisis
const PROMPTS = {
  // Prompt para interpretación básica de sueños
  BASIC_INTERPRETATION: `
    Eres un experto analista de sueños con amplio conocimiento en psicología, simbolismo y análisis onírico.
    Analiza el siguiente sueño y proporciona una interpretación que incluya:
    1. Un resumen breve del significado general
    2. Los símbolos principales y su posible interpretación
    3. Las emociones subyacentes que podrían estar relacionadas
    4. Posibles conexiones con la vida diaria
    
    Sueño: "{{dreamContent}}"
    
    Formato de respuesta:
    {
      "summary": "Interpretación general en 2-3 frases",
      "mainSymbol": "El símbolo más relevante del sueño",
      "symbols": [
        {"symbol": "Símbolo 1", "meaning": "Interpretación del símbolo 1"},
        {"symbol": "Símbolo 2", "meaning": "Interpretación del símbolo 2"}
      ],
      "emotions": ["emoción1", "emoción2", "emoción3"],
      "lifeConnections": "Posibles conexiones con la vida diaria",
      "advice": "Consejo o reflexión basado en el sueño"
    }
  `,
  
  // Prompt para análisis emocional
  EMOTION_ANALYSIS: `
    Eres un experto en análisis emocional de sueños.
    Analiza el siguiente sueño y extrae las emociones principales presentes, 
    asignando un nivel de intensidad a cada una (1-10).
    
    Sueño: "{{dreamContent}}"
    
    Formato de respuesta:
    {
      "emotions": [
        {"name": "emoción1", "intensity": 7, "description": "Breve explicación de por qué esta emoción está presente"},
        {"name": "emoción2", "intensity": 5, "description": "Breve explicación de por qué esta emoción está presente"}
      ],
      "dominantEmotion": "La emoción más intensa o relevante",
      "emotionalTone": "Tono emocional general del sueño (positivo, negativo, neutro, mixto)"
    }
  `,
  
  // Prompt para análisis de patrones
  PATTERN_ANALYSIS: `
    Eres un experto en análisis de patrones en sueños recurrentes.
    Analiza los siguientes sueños y identifica patrones, temas recurrentes, 
    símbolos repetidos y posibles significados.
    
    Sueños:
    {{dreamsList}}
    
    Formato de respuesta:
    {
      "recurringSymbols": ["símbolo1", "símbolo2", "símbolo3"],
      "recurringThemes": ["tema1", "tema2"],
      "patterns": [
        {"pattern": "Descripción del patrón 1", "significance": "Posible significado"},
        {"pattern": "Descripción del patrón 2", "significance": "Posible significado"}
      ],
      "insights": "Reflexiones generales sobre los patrones identificados"
    }
  `,
  
  // Prompt para chat con analista onírico
  DREAM_ANALYST_CHAT: `
    Eres un analista onírico experto llamado DreamAI que ayuda a las personas a entender sus sueños.
    Tu tono es empático, reflexivo y ligeramente poético, pero siempre basado en conocimientos de psicología y simbolismo.
    
    Historial de conversación:
    {{chatHistory}}
    
    Usuario: {{userMessage}}
    
    Responde de manera conversacional, haciendo preguntas cuando sea necesario para profundizar en el análisis.
    Evita respuestas excesivamente largas, manteniéndolas entre 2-4 frases.
    No uses emojis ni caracteres especiales.
  `
};

// Interpretar un sueño (versión básica)
const interpretDream = async (dreamContent) => {
  try {
    const prompt = PROMPTS.BASIC_INTERPRETATION.replace('{{dreamContent}}', dreamContent);
    
    const response = await deepseekClient.post('/v1/chat/completions', {
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: 'Por favor, interpreta este sueño siguiendo el formato especificado.' }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });
    
    // Extraer y parsear la respuesta
    const content = response.data.choices[0].message.content;
    
    // Intentar parsear el JSON, si falla, extraer la parte JSON de la respuesta
    try {
      return JSON.parse(content);
    } catch (parseError) {
      // Buscar contenido JSON en la respuesta
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No se pudo extraer un JSON válido de la respuesta');
    }
  } catch (error) {
    console.error('Error al interpretar sueño:', error);
    if (error.response) {
      console.error('Respuesta de error:', error.response.data);
    }
    throw new Error('No se pudo interpretar el sueño');
  }
};

// Analizar emociones en un sueño
const analyzeDreamEmotions = async (dreamContent) => {
  try {
    const prompt = PROMPTS.EMOTION_ANALYSIS.replace('{{dreamContent}}', dreamContent);
    
    const response = await deepseekClient.post('/v1/chat/completions', {
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: 'Por favor, analiza las emociones de este sueño siguiendo el formato especificado.' }
      ],
      temperature: 0.7,
      max_tokens: 500
    });
    
    // Extraer y parsear la respuesta
    const content = response.data.choices[0].message.content;
    
    // Intentar parsear el JSON, si falla, extraer la parte JSON de la respuesta
    try {
      return JSON.parse(content);
    } catch (parseError) {
      // Buscar contenido JSON en la respuesta
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No se pudo extraer un JSON válido de la respuesta');
    }
  } catch (error) {
    console.error('Error al analizar emociones:', error);
    if (error.response) {
      console.error('Respuesta de error:', error.response.data);
    }
    throw new Error('No se pudieron analizar las emociones del sueño');
  }
};

// Analizar patrones en múltiples sueños
const analyzeDreamPatterns = async (dreams) => {
  try {
    // Formatear lista de sueños
    const dreamsList = dreams.map(dream => 
      `Sueño ${dream.id}: "${dream.content}" (Fecha: ${new Date(dream.dream_date).toLocaleDateString()})`
    ).join('\n\n');
    
    const prompt = PROMPTS.PATTERN_ANALYSIS.replace('{{dreamsList}}', dreamsList);
    
    const response = await deepseekClient.post('/v1/chat/completions', {
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: 'Por favor, analiza los patrones en estos sueños siguiendo el formato especificado.' }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });
    
    // Extraer y parsear la respuesta
    const content = response.data.choices[0].message.content;
    
    // Intentar parsear el JSON, si falla, extraer la parte JSON de la respuesta
    try {
      return JSON.parse(content);
    } catch (parseError) {
      // Buscar contenido JSON en la respuesta
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No se pudo extraer un JSON válido de la respuesta');
    }
  } catch (error) {
    console.error('Error al analizar patrones:', error);
    if (error.response) {
      console.error('Respuesta de error:', error.response.data);
    }
    throw new Error('No se pudieron analizar los patrones de sueños');
  }
};

// Generar respuesta del analista onírico en el chat
const generateDreamAnalystResponse = async (chatHistory, userMessage) => {
  try {
    // Formatear historial de chat
    const formattedChatHistory = chatHistory.map(msg => 
      `${msg.sender === 'user' ? 'Usuario' : 'DreamAI'}: ${msg.content}`
    ).join('\n');
    
    const systemPrompt = PROMPTS.DREAM_ANALYST_CHAT
      .replace('{{chatHistory}}', formattedChatHistory)
      .replace('{{userMessage}}', userMessage);
    
    const response = await deepseekClient.post('/v1/chat/completions', {
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.8,
      max_tokens: 300
    });
    
    // Extraer respuesta
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error al generar respuesta del analista:', error);
    if (error.response) {
      console.error('Respuesta de error:', error.response.data);
    }
    throw new Error('No se pudo generar una respuesta del analista onírico');
  }
};

// Procesar audio a texto (simulado para desarrollo)
const processAudioToText = async (audioUrl) => {
  // En una implementación real, aquí se llamaría a una API de reconocimiento de voz
  // Por ahora, devolvemos un texto simulado
  return "Soñé que estaba volando sobre una ciudad desconocida. Las calles brillaban con luces de colores y podía sentir el viento en mi rostro. De repente, me encontré en una playa desierta con aguas cristalinas.";
};

// Procesar imagen a texto (simulado para desarrollo)
const processImageToText = async (imageUrl) => {
  // En una implementación real, aquí se llamaría a una API de OCR o descripción de imágenes
  // Por ahora, devolvemos un texto simulado
  return "La imagen muestra un dibujo de un laberinto oscuro con una figura humana en el centro, rodeada de símbolos como agua, fuego y estrellas.";
};

module.exports = {
  interpretDream,
  analyzeDreamEmotions,
  analyzeDreamPatterns,
  generateDreamAnalystResponse,
  processAudioToText,
  processImageToText
};
