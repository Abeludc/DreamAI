// Pantalla de registro de sueños para DreamAI
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

const DreamFormScreen = ({ navigation }) => {
  const [dreamContent, setDreamContent] = useState('');
  const [inputMethod, setInputMethod] = useState('text'); // 'text', 'audio', 'photo'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cambiar método de entrada
  const handleInputMethodChange = (method) => {
    setInputMethod(method);
  };

  // Manejar guardado del sueño
  const handleSaveDream = () => {
    // Validación básica
    if (!dreamContent) {
      setError('Por favor, describe tu sueño');
      return;
    }

    setLoading(true);
    setError('');

    // Simulación de guardado (se reemplazará con la integración real)
    setTimeout(() => {
      setLoading(false);
      // Aquí iría la navegación a la pantalla de interpretación cuando esté implementada
      // navigation.navigate('DreamInterpretation', { dreamId: 'new-dream-id' });
      
      // Por ahora, simplemente volvemos a la pantalla anterior
      navigation.goBack();
    }, 1500);
  };

  // Cerrar la pantalla
  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.title}>Nuevo Sueño</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>

        {/* Fecha */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>Fecha:</Text>
          <Text style={styles.dateValue}>
            {new Date().toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>

        {/* Opciones de entrada */}
        <View style={styles.inputMethodContainer}>
          <TouchableOpacity 
            style={[
              styles.inputMethodButton, 
              inputMethod === 'text' && styles.inputMethodButtonActive
            ]}
            onPress={() => handleInputMethodChange('text')}
          >
            <Text style={[
              styles.inputMethodText,
              inputMethod === 'text' && styles.inputMethodTextActive
            ]}>Texto</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.inputMethodButton, 
              inputMethod === 'audio' && styles.inputMethodButtonActive
            ]}
            onPress={() => handleInputMethodChange('audio')}
          >
            <Text style={[
              styles.inputMethodText,
              inputMethod === 'audio' && styles.inputMethodTextActive
            ]}>Audio</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.inputMethodButton, 
              inputMethod === 'photo' && styles.inputMethodButtonActive
            ]}
            onPress={() => handleInputMethodChange('photo')}
          >
            <Text style={[
              styles.inputMethodText,
              inputMethod === 'photo' && styles.inputMethodTextActive
            ]}>Foto</Text>
          </TouchableOpacity>
        </View>

        {/* Campo de entrada según el método seleccionado */}
        {inputMethod === 'text' ? (
          <Input
            multiline
            numberOfLines={10}
            placeholder="Describe tu sueño..."
            value={dreamContent}
            onChangeText={setDreamContent}
            style={styles.dreamInput}
            inputStyle={styles.dreamInputText}
          />
        ) : inputMethod === 'audio' ? (
          <View style={styles.audioContainer}>
            <Text style={styles.audioPlaceholder}>
              Funcionalidad de grabación de audio en desarrollo
            </Text>
            <Button 
              title="Grabar audio" 
              variant="outline"
              style={styles.audioButton}
            />
          </View>
        ) : (
          <View style={styles.photoContainer}>
            <Text style={styles.photoPlaceholder}>
              Funcionalidad de captura de foto en desarrollo
            </Text>
            <Button 
              title="Tomar foto" 
              variant="outline"
              style={styles.photoButton}
            />
          </View>
        )}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Botón de guardar */}
        <Button
          title="Guardar sueño"
          onPress={handleSaveDream}
          loading={loading}
          style={styles.saveButton}
        />
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
    padding: spacing.container,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.styles.h2,
    color: colors.text.primary,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.ui.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: colors.text.primary,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  dateLabel: {
    ...typography.styles.body1,
    color: colors.text.secondary,
    marginRight: spacing.sm,
  },
  dateValue: {
    ...typography.styles.body1,
    color: colors.text.primary,
    fontWeight: '500',
  },
  inputMethodContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  inputMethodButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  inputMethodButtonActive: {
    borderBottomColor: colors.accent,
  },
  inputMethodText: {
    ...typography.styles.button,
    color: colors.text.secondary,
  },
  inputMethodTextActive: {
    color: colors.accent,
  },
  dreamInput: {
    flex: 1,
    marginBottom: spacing.lg,
  },
  dreamInputText: {
    height: 200,
  },
  audioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.ui.card,
    borderRadius: spacing.card.borderRadius,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  audioPlaceholder: {
    ...typography.styles.body1,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  audioButton: {
    width: '80%',
  },
  photoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.ui.card,
    borderRadius: spacing.card.borderRadius,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  photoPlaceholder: {
    ...typography.styles.body1,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  photoButton: {
    width: '80%',
  },
  errorText: {
    ...typography.styles.caption,
    color: colors.status.error,
    marginBottom: spacing.sm,
  },
  saveButton: {
    marginTop: 'auto',
  },
});

export default DreamFormScreen;
