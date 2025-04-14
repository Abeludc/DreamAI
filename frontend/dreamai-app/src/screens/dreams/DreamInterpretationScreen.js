// Pantalla de interpretación de sueños para DreamAI
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import EmotionIndicator from '../../components/dreams/EmotionIndicator';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

const DreamInterpretationScreen = ({ navigation, route }) => {
  // En una implementación real, obtendríamos el ID del sueño de route.params
  // const { dreamId } = route.params || {};
  
  const [loading, setLoading] = useState(true);
  const [dream, setDream] = useState(null);
  
  // Datos de ejemplo (se reemplazarán con datos reales del backend)
  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setDream({
        id: 'dream-123',
        date: new Date().toISOString(),
        content: 'Soñé que volaba sobre una ciudad desconocida. Las calles brillaban con luces de colores y podía sentir el viento en mi rostro. En un momento, me detuve sobre un edificio alto y observé a las personas caminando abajo.',
        interpretation: 'Este sueño refleja un deseo de libertad y una perspectiva elevada sobre tu vida actual. Volar simboliza la superación de obstáculos y la capacidad de ver las cosas desde un punto de vista más amplio. Las luces de colores representan la diversidad de experiencias y emociones que estás viviendo.',
        emotions: ['Alegría', 'Paz', 'Asombro'],
        symbols: [
          { name: 'Vuelo', meaning: 'Libertad, superación, perspectiva' },
          { name: 'Ciudad', meaning: 'Tu vida social, comunidad' },
          { name: 'Luces', meaning: 'Claridad, inspiración, guía' }
        ],
        isPremium: false,
      });
      setLoading(false);
    }, 1500);
  }, []);
  
  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  // Volver a la pantalla anterior
  const handleBack = () => {
    navigation.goBack();
  };
  
  // Compartir interpretación
  const handleShare = () => {
    // Implementación futura: compartir en redes sociales
  };
  
  // Ver análisis completo (premium)
  const handleFullAnalysis = () => {
    // Implementación futura: mostrar modal de suscripción o navegar a análisis completo
  };
  
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Interpretando tu sueño...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Encabezado */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Interpretación</Text>
          <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Compartir</Text>
          </TouchableOpacity>
        </View>
        
        {/* Fecha */}
        <Text style={styles.date}>{formatDate(dream.date)}</Text>
        
        {/* Contenido del sueño */}
        <Card style={styles.dreamCard}>
          <Text style={styles.sectionTitle}>Tu sueño:</Text>
          <Text style={styles.dreamContent}>{dream.content}</Text>
        </Card>
        
        {/* Interpretación básica */}
        <Card style={styles.interpretationCard}>
          <Text style={styles.sectionTitle}>Interpretación:</Text>
          <Text style={styles.interpretationContent}>{dream.interpretation}</Text>
        </Card>
        
        {/* Emociones detectadas */}
        <Card style={styles.emotionsCard}>
          <Text style={styles.sectionTitle}>Emociones detectadas:</Text>
          <View style={styles.emotionsContainer}>
            {dream.emotions.map((emotion, index) => (
              <View key={index} style={styles.emotionTag}>
                <EmotionIndicator emotion={emotion} size="small" />
                <Text style={styles.emotionText}>{emotion}</Text>
              </View>
            ))}
          </View>
        </Card>
        
        {/* Símbolos principales */}
        <Card style={styles.symbolsCard}>
          <Text style={styles.sectionTitle}>Símbolos principales:</Text>
          {dream.symbols.map((symbol, index) => (
            <View key={index} style={styles.symbolItem}>
              <Text style={styles.symbolName}>{symbol.name}:</Text>
              <Text style={styles.symbolMeaning}>{symbol.meaning}</Text>
            </View>
          ))}
        </Card>
        
        {/* Botón de análisis completo (Premium) */}
        <Button
          title="Ver análisis completo (Premium)"
          onPress={handleFullAnalysis}
          variant="secondary"
          style={styles.premiumButton}
        />
        
        {/* Nota de descargo de responsabilidad */}
        <Text style={styles.disclaimer}>
          Nota: Esta interpretación es simbólica y no constituye un diagnóstico médico o psicológico.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.styles.h3,
    color: colors.text.primary,
  },
  scrollContent: {
    padding: spacing.container,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
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
  shareButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.xs,
    backgroundColor: colors.ui.card,
  },
  shareButtonText: {
    ...typography.styles.button,
    color: colors.accent,
  },
  date: {
    ...typography.styles.body2,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  dreamCard: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.styles.h4,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  dreamContent: {
    ...typography.styles.body1,
    color: colors.text.primary,
  },
  interpretationCard: {
    marginBottom: spacing.md,
  },
  interpretationContent: {
    ...typography.styles.body1,
    color: colors.text.primary,
  },
  emotionsCard: {
    marginBottom: spacing.md,
  },
  emotionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emotionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ui.card,
    borderRadius: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  emotionText: {
    ...typography.styles.body2,
    color: colors.text.primary,
    marginLeft: spacing.xs,
  },
  symbolsCard: {
    marginBottom: spacing.lg,
  },
  symbolItem: {
    marginBottom: spacing.sm,
  },
  symbolName: {
    ...typography.styles.body1,
    color: colors.accent,
    fontWeight: '600',
  },
  symbolMeaning: {
    ...typography.styles.body2,
    color: colors.text.primary,
  },
  premiumButton: {
    marginBottom: spacing.lg,
  },
  disclaimer: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
});

export default DreamInterpretationScreen;
