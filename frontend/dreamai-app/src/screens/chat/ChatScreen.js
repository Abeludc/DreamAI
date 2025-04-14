// Pantalla de chat con analista onírico para DreamAI
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Card from '../../components/common/Card';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = React.useRef();
  
  // Mensajes iniciales del analista onírico
  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: 'Hola, soy tu analista onírico. Estoy aquí para ayudarte a explorar y entender tus sueños. ¿En qué puedo ayudarte hoy?',
        sender: 'analyst',
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);
  
  // Enviar mensaje
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Agregar mensaje del usuario
    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, userMessage]);
    setMessage('');
    setLoading(true);
    
    // Simular respuesta del analista (se reemplazará con la integración real con IA)
    setTimeout(() => {
      const responses = [
        'Los sueños sobre vuelo suelen representar libertad, superación de obstáculos o deseo de escapar de alguna situación. ¿Qué sentías mientras volabas en tu sueño?',
        'Interesante. Los símbolos acuáticos en los sueños generalmente se relacionan con tus emociones y tu inconsciente. El agua clara podría indicar claridad emocional.',
        'Los laberintos en los sueños pueden simbolizar confusión o búsqueda. Quizás estás tratando de encontrar una solución a un problema complejo en tu vida.',
        'Soñar con personas desconocidas a menudo representa aspectos de ti mismo que aún no has reconocido o integrado. ¿Recuerdas cómo te sentías hacia esas personas?',
        'Las casas en los sueños suelen representar el yo. Diferentes habitaciones pueden simbolizar diferentes aspectos de tu personalidad o vida.',
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const analystMessage = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'analyst',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prevMessages => [...prevMessages, analystMessage]);
      setLoading(false);
    }, 1500);
  };
  
  // Formatear hora
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };
  
  // Renderizar burbuja de mensaje
  const renderMessageBubble = (message) => {
    const isUser = message.sender === 'user';
    
    return (
      <View 
        key={message.id} 
        style={[
          styles.messageBubbleContainer,
          isUser ? styles.userMessageContainer : styles.analystMessageContainer,
        ]}
      >
        <View 
          style={[
            styles.messageBubble,
            isUser ? styles.userMessageBubble : styles.analystMessageBubble,
          ]}
        >
          <Text style={styles.messageText}>{message.text}</Text>
        </View>
        <Text style={styles.messageTime}>{formatTime(message.timestamp)}</Text>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Analista Onírico</Text>
          <View style={styles.headerSpacer} />
        </View>
        
        {/* Mensajes */}
        <ScrollView 
          style={styles.messagesContainer}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          {messages.map(renderMessageBubble)}
          
          {loading && (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingBubble}>
                <Text style={styles.loadingText}>...</Text>
              </View>
            </View>
          )}
        </ScrollView>
        
        {/* Entrada de mensaje */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Escribe un mensaje..."
            placeholderTextColor={colors.text.secondary}
            multiline
          />
          <TouchableOpacity 
            style={[
              styles.sendButton,
              !message.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={!message.trim() || loading}
          >
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
        
        {/* Banner de función premium */}
        <Card style={styles.premiumBanner}>
          <Text style={styles.premiumBannerText}>
            Esta es una función premium. Actualiza para continuar la conversación después de 3 mensajes.
          </Text>
        </Card>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.container,
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.divider,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.ui.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: colors.text.primary,
  },
  title: {
    ...typography.styles.h2,
    color: colors.text.primary,
  },
  headerSpacer: {
    width: 40,
  },
  messagesContainer: {
    flex: 1,
    padding: spacing.container,
  },
  messageBubbleContainer: {
    marginBottom: spacing.md,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  analystMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: spacing.card.borderRadius,
    padding: spacing.sm,
  },
  userMessageBubble: {
    backgroundColor: colors.primary,
  },
  analystMessageBubble: {
    backgroundColor: colors.ui.card,
  },
  messageText: {
    ...typography.styles.body1,
    color: colors.text.primary,
  },
  messageTime: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    alignSelf: 'flex-end',
  },
  loadingContainer: {
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  loadingBubble: {
    backgroundColor: colors.ui.card,
    borderRadius: spacing.card.borderRadius,
    padding: spacing.sm,
    width: 60,
  },
  loadingText: {
    ...typography.styles.body1,
    color: colors.text.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: spacing.container,
    borderTopWidth: 1,
    borderTopColor: colors.ui.divider,
  },
  input: {
    flex: 1,
    backgroundColor: colors.ui.card,
    borderRadius: spacing.card.borderRadius,
    padding: spacing.sm,
    maxHeight: 100,
    color: colors.text.primary,
    ...typography.styles.body1,
  },
  sendButton: {
    marginLeft: spacing.sm,
    backgroundColor: colors.accent,
    borderRadius: spacing.card.borderRadius,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.ui.card,
  },
  sendButtonText: {
    ...typography.styles.button,
    color: colors.background.dark,
  },
  premiumBanner: {
    margin: spacing.container,
    backgroundColor: colors.secondary,
    padding: spacing.sm,
  },
  premiumBannerText: {
    ...typography.styles.caption,
    color: colors.text.primary,
    textAlign: 'center',
  },
});

export default ChatScreen;
