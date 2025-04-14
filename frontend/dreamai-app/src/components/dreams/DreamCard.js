// Componente de tarjeta de sueño para DreamAI
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from '../common/Card';
import EmotionIndicator from './EmotionIndicator';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

const DreamCard = ({ 
  dream, 
  onPress, 
  style 
}) => {
  // Extraer datos del sueño
  const { 
    date, 
    content, 
    emotions = [], 
    mainSymbol = '',
  } = dream;

  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Truncar contenido si es muy largo
  const truncateContent = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={[styles.card, style]}>
        <View style={styles.header}>
          <Text style={styles.date}>{formatDate(date)}</Text>
          <View style={styles.emotionsContainer}>
            {emotions.map((emotion, index) => (
              <EmotionIndicator 
                key={index} 
                emotion={emotion} 
                size="small" 
                showLabel={false} 
              />
            ))}
          </View>
        </View>
        
        <Text style={styles.content}>
          {truncateContent(content)}
        </Text>
        
        {mainSymbol && (
          <View style={styles.symbolContainer}>
            <Text style={styles.symbolLabel}>Símbolo principal:</Text>
            <Text style={styles.symbolText}>{mainSymbol}</Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  date: {
    ...typography.styles.caption,
    color: colors.text.secondary,
  },
  emotionsContainer: {
    flexDirection: 'row',
  },
  content: {
    ...typography.styles.body1,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  symbolContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  symbolLabel: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    marginRight: spacing.xs,
  },
  symbolText: {
    ...typography.styles.body2,
    color: colors.accent,
    fontWeight: '500',
  },
});

export default DreamCard;
