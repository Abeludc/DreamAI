// Pantalla principal/Dashboard para DreamAI
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Card from '../../components/common/Card';
import DreamCard from '../../components/dreams/DreamCard';
import EmotionIndicator from '../../components/dreams/EmotionIndicator';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

const HomeScreen = ({ navigation }) => {
  // Datos de ejemplo (se reemplazarán con datos reales del backend)
  const recentDream = {
    id: '1',
    date: new Date().toISOString(),
    content: 'Soñé que volaba sobre una ciudad desconocida. Las calles brillaban con luces de colores y podía sentir el viento en mi rostro.',
    emotions: ['Alegría', 'Paz'],
    mainSymbol: 'Vuelo',
  };

  const symbolOfDay = {
    symbol: 'Agua',
    meaning: 'Representa tus emociones profundas y tu conexión con tu intuición',
  };

  const detectedPatterns = [
    'Símbolos de libertad aparecen frecuentemente',
    'Emociones positivas dominan tus sueños recientes',
  ];

  // Navegar a la pantalla de registro de sueños
  const handleAddDream = () => {
    // navigation.navigate('DreamForm');
  };

  // Navegar a la pantalla de detalle de sueño
  const handleDreamPress = (dreamId) => {
    // navigation.navigate('DreamDetail', { dreamId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.title}>DreamAI</Text>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileIcon} />
          </TouchableOpacity>
        </View>

        {/* Tarjeta del día */}
        <Card style={styles.symbolCard}>
          <Text style={styles.cardTitle}>Tu símbolo de hoy</Text>
          <Text style={styles.symbolText}>{symbolOfDay.symbol}</Text>
          <Text style={styles.symbolMeaning}>{symbolOfDay.meaning}</Text>
        </Card>

        {/* Gráfico de emociones recientes (placeholder) */}
        <Card style={styles.emotionsCard}>
          <Text style={styles.cardTitle}>Emociones recientes</Text>
          <View style={styles.emotionsContainer}>
            <View style={styles.emotionBar}>
              <EmotionIndicator emotion="Alegría" />
              <View style={[styles.emotionBarFill, { width: '70%', backgroundColor: colors.emotions.joy }]} />
            </View>
            <View style={styles.emotionBar}>
              <EmotionIndicator emotion="Miedo" />
              <View style={[styles.emotionBarFill, { width: '30%', backgroundColor: colors.emotions.fear }]} />
            </View>
            <View style={styles.emotionBar}>
              <EmotionIndicator emotion="Tristeza" />
              <View style={[styles.emotionBarFill, { width: '20%', backgroundColor: colors.emotions.sadness }]} />
            </View>
            <View style={styles.emotionBar}>
              <EmotionIndicator emotion="Paz" />
              <View style={[styles.emotionBarFill, { width: '50%', backgroundColor: colors.emotions.peace }]} />
            </View>
          </View>
        </Card>

        {/* Último sueño registrado */}
        <Text style={styles.sectionTitle}>Último sueño</Text>
        <DreamCard 
          dream={recentDream} 
          onPress={() => handleDreamPress(recentDream.id)} 
        />

        {/* Patrones detectados */}
        <Card style={styles.patternsCard}>
          <Text style={styles.cardTitle}>Patrones detectados</Text>
          {detectedPatterns.map((pattern, index) => (
            <View key={index} style={styles.patternItem}>
              <View style={styles.patternDot} />
              <Text style={styles.patternText}>{pattern}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>Ver análisis completo</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>

      {/* Botón flotante para agregar sueño */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddDream}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Barra de navegación inferior (placeholder) */}
      <View style={styles.tabBar}>
        <View style={[styles.tabItem, styles.tabItemActive]}>
          <Text style={styles.tabText}>Inicio</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Calendario</Text>
        </View>
        <View style={styles.tabItemCenter} />
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Análisis</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Perfil</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  scrollContent: {
    paddingHorizontal: spacing.container,
    paddingTop: spacing.lg,
    paddingBottom: spacing.height.tabBar + spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.styles.h2,
    color: colors.accent,
    fontWeight: 'bold',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.ui.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.secondary,
  },
  symbolCard: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  cardTitle: {
    ...typography.styles.h4,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  symbolText: {
    ...typography.styles.h2,
    color: colors.accent,
    marginVertical: spacing.sm,
  },
  symbolMeaning: {
    ...typography.styles.body1,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  emotionsCard: {
    marginBottom: spacing.lg,
  },
  emotionsContainer: {
    marginTop: spacing.sm,
  },
  emotionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  emotionBarFill: {
    height: 8,
    borderRadius: 4,
    marginLeft: spacing.sm,
    flex: 1,
  },
  sectionTitle: {
    ...typography.styles.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  patternsCard: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  patternItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  patternDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    marginRight: spacing.sm,
  },
  patternText: {
    ...typography.styles.body1,
    color: colors.text.primary,
  },
  viewMoreButton: {
    alignSelf: 'center',
    marginTop: spacing.md,
  },
  viewMoreText: {
    ...typography.styles.button,
    color: colors.accent,
  },
  addButton: {
    position: 'absolute',
    bottom: spacing.height.tabBar + spacing.lg,
    right: spacing.container,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: colors.ui.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addButtonText: {
    fontSize: 30,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: spacing.height.tabBar,
    backgroundColor: colors.ui.card,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.ui.divider,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemCenter: {
    width: 56,
  },
  tabItemActive: {
    borderTopWidth: 2,
    borderTopColor: colors.accent,
  },
  tabText: {
    ...typography.styles.caption,
    color: colors.text.secondary,
  },
});

export default HomeScreen;
