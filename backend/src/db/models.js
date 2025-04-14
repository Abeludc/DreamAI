// Modelos para interactuar con la base de datos Supabase
const supabase = require('./supabase');

// Modelo de Usuario
const User = {
  // Crear un nuevo usuario
  async create(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  // Obtener usuario por ID
  async getById(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Obtener usuario por email
  async getByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },
  
  // Actualizar usuario
  async update(userId, userData) {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', userId)
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  // Actualizar estado de suscripción
  async updateSubscription(userId, subscriptionStatus, endDate = null) {
    const { data, error } = await supabase
      .from('users')
      .update({
        subscription_status: subscriptionStatus,
        subscription_end_date: endDate,
        updated_at: new Date()
      })
      .eq('id', userId)
      .select();
    
    if (error) throw error;
    return data[0];
  }
};

// Modelo de Sueño
const Dream = {
  // Crear un nuevo sueño
  async create(dreamData) {
    const { data, error } = await supabase
      .from('dreams')
      .insert([dreamData])
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  // Obtener sueño por ID
  async getById(dreamId) {
    const { data, error } = await supabase
      .from('dreams')
      .select(`
        *,
        dream_analyses(*),
        dream_emotions(*),
        dream_tags(*)
      `)
      .eq('id', dreamId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Obtener sueños de un usuario
  async getByUserId(userId, limit = 10, offset = 0) {
    const { data, error } = await supabase
      .from('dreams')
      .select(`
        *,
        dream_analyses(id, interpretation, main_symbol, is_premium),
        dream_emotions(emotion, intensity),
        dream_tags(tag)
      `)
      .eq('user_id', userId)
      .order('dream_date', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) throw error;
    return data;
  },
  
  // Obtener sueños por fecha
  async getByDate(userId, date) {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    
    const { data, error } = await supabase
      .from('dreams')
      .select(`
        *,
        dream_analyses(id, interpretation, main_symbol, is_premium),
        dream_emotions(emotion, intensity),
        dream_tags(tag)
      `)
      .eq('user_id', userId)
      .gte('dream_date', startDate.toISOString())
      .lte('dream_date', endDate.toISOString());
    
    if (error) throw error;
    return data;
  },
  
  // Actualizar sueño
  async update(dreamId, dreamData) {
    const { data, error } = await supabase
      .from('dreams')
      .update({
        ...dreamData,
        updated_at: new Date()
      })
      .eq('id', dreamId)
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  // Eliminar sueño
  async delete(dreamId) {
    const { error } = await supabase
      .from('dreams')
      .delete()
      .eq('id', dreamId);
    
    if (error) throw error;
    return true;
  }
};

// Modelo de Análisis de Sueño
const DreamAnalysis = {
  // Crear un nuevo análisis
  async create(analysisData) {
    const { data, error } = await supabase
      .from('dream_analyses')
      .insert([analysisData])
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  // Obtener análisis por ID de sueño
  async getByDreamId(dreamId) {
    const { data, error } = await supabase
      .from('dream_analyses')
      .select('*')
      .eq('dream_id', dreamId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Actualizar análisis
  async update(analysisId, analysisData) {
    const { data, error } = await supabase
      .from('dream_analyses')
      .update({
        ...analysisData,
        updated_at: new Date()
      })
      .eq('id', analysisId)
      .select();
    
    if (error) throw error;
    return data[0];
  }
};

// Modelo de Emociones de Sueño
const DreamEmotion = {
  // Crear nuevas emociones
  async create(emotions) {
    const { data, error } = await supabase
      .from('dream_emotions')
      .insert(emotions)
      .select();
    
    if (error) throw error;
    return data;
  },
  
  // Obtener emociones por ID de sueño
  async getByDreamId(dreamId) {
    const { data, error } = await supabase
      .from('dream_emotions')
      .select('*')
      .eq('dream_id', dreamId);
    
    if (error) throw error;
    return data;
  },
  
  // Obtener estadísticas de emociones para un usuario
  async getStatsByUserId(userId, period = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - period);
    
    const { data, error } = await supabase
      .from('dream_emotions')
      .select(`
        emotion,
        intensity,
        dreams!inner(user_id, dream_date)
      `)
      .eq('dreams.user_id', userId)
      .gte('dreams.dream_date', startDate.toISOString());
    
    if (error) throw error;
    return data;
  }
};

// Modelo de Etiquetas de Sueño
const DreamTag = {
  // Crear nuevas etiquetas
  async create(tags) {
    const { data, error } = await supabase
      .from('dream_tags')
      .insert(tags)
      .select();
    
    if (error) throw error;
    return data;
  },
  
  // Obtener etiquetas por ID de sueño
  async getByDreamId(dreamId) {
    const { data, error } = await supabase
      .from('dream_tags')
      .select('*')
      .eq('dream_id', dreamId);
    
    if (error) throw error;
    return data;
  },
  
  // Obtener etiquetas frecuentes para un usuario
  async getFrequentByUserId(userId, limit = 10) {
    const { data, error } = await supabase
      .from('dream_tags')
      .select(`
        tag,
        dreams!inner(user_id)
      `)
      .eq('dreams.user_id', userId)
      .order('count', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  }
};

// Modelo de Conversación de Chat
const ChatConversation = {
  // Crear nueva conversación
  async create(userId) {
    const { data, error } = await supabase
      .from('chat_conversations')
      .insert([{ user_id: userId }])
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  // Obtener conversación por ID
  async getById(conversationId) {
    const { data, error } = await supabase
      .from('chat_conversations')
      .select(`
        *,
        chat_messages(*)
      `)
      .eq('id', conversationId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Obtener conversaciones de un usuario
  async getByUserId(userId) {
    const { data, error } = await supabase
      .from('chat_conversations')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

// Modelo de Mensaje de Chat
const ChatMessage = {
  // Crear nuevo mensaje
  async create(messageData) {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([messageData])
      .select();
    
    if (error) throw error;
    
    // Actualizar la fecha de actualización de la conversación
    await supabase
      .from('chat_conversations')
      .update({ updated_at: new Date() })
      .eq('id', messageData.conversation_id);
    
    return data[0];
  },
  
  // Obtener mensajes por ID de conversación
  async getByConversationId(conversationId, limit = 50) {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
      .limit(limit);
    
    if (error) throw error;
    return data;
  }
};

// Modelo de Suscripción
const Subscription = {
  // Crear nueva suscripción
  async create(subscriptionData) {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert([subscriptionData])
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  // Obtener suscripción por ID de usuario
  async getByUserId(userId) {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },
  
  // Actualizar suscripción
  async update(subscriptionId, subscriptionData) {
    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        ...subscriptionData,
        updated_at: new Date()
      })
      .eq('id', subscriptionId)
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  // Cancelar suscripción
  async cancel(subscriptionId) {
    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        status: 'canceled',
        updated_at: new Date()
      })
      .eq('id', subscriptionId)
      .select();
    
    if (error) throw error;
    return data[0];
  }
};

module.exports = {
  User,
  Dream,
  DreamAnalysis,
  DreamEmotion,
  DreamTag,
  ChatConversation,
  ChatMessage,
  Subscription
};
