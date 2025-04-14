// Pantalla de análisis y visualizaciones
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import EmotionVisualization from '../../components/visualizations/EmotionVisualization';
import PatternVisualization from '../../components/visualizations/PatternVisualization';
import DreamStatistics from '../../components/visualizations/DreamStatistics';

// Datos de ejemplo para desarrollo
const mockDreams = [
  {
    id: 1,
    content: "Soñé que volaba sobre una ciudad desconocida",
    dream_date: "2025-04-10T08:30:00.000Z",
    duration: 25
  },
  {
    id: 2,
    content: "Estaba en una playa con aguas cristalinas",
    dream_date: "2025-04-11T07:45:00.000Z",
    duration: 30
  },
  {
    id: 3,
    content: "Me perseguía un animal extraño en un bosque oscuro",
    dream_date: "2025-04-12T06:15:00.000Z",
    duration: 15
  },
  {
    id: 4,
    content: "Encontré una puerta secreta en mi casa que llevaba a un mundo mágico",
    dream_date: "2025-04-13T09:00:00.000Z",
    duration: 40
  },
  {
    id: 5,
    content: "Mis dientes se caían uno a uno mientras hablaba con alguien importante",
    dream_date: "2025-04-14T07:30:00.000Z",
    duration: 20
  }
];

// Datos de emociones de ejemplo
const mockEmotions = [
  { name: "Alegría", intensity: 8, description: "Sensación de libertad al volar" },
  { name: "Asombro", intensity: 7, description: "Descubrimiento de lugares nuevos" },
  { name: "Miedo", intensity: 9, description: "Persecución por un ser desconocido" },
  { name: "Ansiedad", intensity: 6, description: "Pérdida de dientes" },
  { name: "Curiosidad", intensity: 8, description: "Exploración de lugares nuevos" },
  { name: "Confusión", intensity: 5, description: "No reconocer el entorno" },
  { name: "Miedo", intensity: 7, description: "Sensación de caída" },
  { name: "Alegría", intensity: 6, description: "Encuentro con seres queridos" },
  { name: "Paz", intensity: 9, description: "Estar en la playa" },
  { name: "Ansiedad", intensity: 7, description: "No poder comunicarse" }
];

const AnalysisScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('statistics');
  const [timeframe, setTimeframe] = useState('month');
  const [dreams, setDreams] = useState([]);
  const [emotions, setEmotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(true); // Para desarrollo, en producción verificar con API

  useEffect(() => {
    // En una implementación real, aquí se cargarían los datos desde la API
    // Simulamos una carga de datos
    const loadData = async () => {
      setLoading(true);
      
      // Simular llamada a API
      setTimeout(() => {
        setDreams(mockDreams);
        setEmotions(mockEmotions);
        setLoading(false);
      }, 1000);
    };
    
    loadData();
  }, [timeframe]);

  const renderTabContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando visualizaciones...</Text>
        </View>
      );
    }

    if (!isPremium) {
      return (
        <View style={styles.premiumContainer}>
          <Text style={styles.premiumTitle}>Función Premium</Text>
          <Text style={styles.premiumText}>
            Las visualizaciones avanzadas y análisis de patrones están disponibles
            exclusivamente para usuarios premium.
          </Text>
          <TouchableOpacity 
            style={styles.premiumButton}
            onPress={() => navigation.navigate('Subscription')}
          >
            <Text style={styles.premiumButtonText}>Actualizar a Premium</Text>
          </TouchableOpacity>
        </View>
      );
    }

    switch (activeTab) {
      case 'statistics':
        return <DreamStatistics dreams={dreams} timeframe={timeframe} />;
      case 'emotions':
        return <EmotionVisualization emotions={emotions} timeframe={timeframe} />;
      case 'patterns':
        return <PatternVisualization dreams={dreams} timeframe={timeframe} />;
      default:
        return <DreamStatistics dreams={dreams} timeframe={timeframe} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Análisis de Sueños</Text>
        
        <View style={styles.timeframeSelector}>
          <TouchableOpacity
            style={[
              styles.timeframeButton,
              timeframe === 'week' && styles.activeTimeframe
            ]}
            onPress={() => setTimeframe('week')}
          >
            <Text style={[
              styles.timeframeText,
              timeframe === 'week' && styles.activeTimeframeText
            ]}>Semana</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.timeframeButton,
              timeframe === 'month' && styles.activeTimeframe
            ]}
            onPress={() => setTimeframe('month')}
          >
            <Text style={[
              styles.timeframeText,
              timeframe === 'month' && styles.activeTimeframeText
            ]}>Mes</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'statistics' && styles.activeTab
          ]}
          onPress={() => setActiveTab('statistics')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'statistics' && styles.activeTabText
          ]}>Estadísticas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'emotions' && styles.activeTab
          ]}
          onPress={() => setActiveTab('emotions')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'emotions' && styles.activeTabText
          ]}>Emociones</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'patterns' && styles.activeTab
          ]}
          onPress={() => setActiveTab('patterns')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'patterns' && styles.activeTabText
          ]}>Patrones</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        {renderTabContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 15,
    backgroundColor: theme.colors.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  timeframeSelector: {
    flexDirection: 'row',
    marginTop: 5,
  },
  timeframeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeTimeframe: {
    backgroundColor: 'white',
  },
  timeframeText: {
    color: 'white',
    fontSize: 14,
  },
  activeTimeframeText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  premiumContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  premiumTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 15,
  },
  premiumText: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 25,
  },
  premiumButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  premiumButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AnalysisScreen;
