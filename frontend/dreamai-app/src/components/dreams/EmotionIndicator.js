// Componente de indicador de emoción para DreamAI
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

const EmotionIndicator = ({ emotion, size = 'medium', showLabel = true, style }) => {
  // Mapeo de emociones a colores
  const getEmotionColor = () => {
    switch (emotion.toLowerCase()) {
      case 'alegría':
      case 'alegria':
      case 'joy':
        return colors.emotions.joy;
      case 'miedo':
      case 'fear':
        return colors.emotions.fear;
      case 'tristeza':
      case 'sadness':
        return colors.emotions.sadness;
      case 'confusión':
      case 'confusion':
        return colors.emotions.confusion;
      case 'paz':
      case 'peace':
        return colors.emotions.peace;
      default:
        return colors.primary;
    }
  };

  // Tamaño del indicador
  const getSize = () => {
    switch (size) {
      case 'small':
        return 8;
      case 'large':
        return 16;
      default: // medium
        return 12;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View 
        style={[
          styles.indicator, 
          { 
            backgroundColor: getEmotionColor(),
            width: getSize(),
            height: getSize(),
            borderRadius: getSize() / 2
          }
        ]} 
      />
      {showLabel && (
        <Text style={[styles.label, { color: getEmotionColor() }]}>
          {emotion}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  indicator: {
    marginRight: spacing.xs,
  },
  label: {
    ...typography.styles.caption,
    fontWeight: '500',
  },
});

export default EmotionIndicator;
