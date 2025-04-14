// Componente para visualizar patrones de sueños en un calendario
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card } from '../common/Card';
import { theme } from '../../theme';

// Simulación de un mapa de calor de calendario
// En una implementación real, usaríamos react-native-calendar-heatmap
const DreamCalendarHeatmap = ({ dreams, month }) => {
  // Simulación de visualización de calendario
  // Este es un placeholder para la visualización real
  
  const daysInMonth = 30; // Simplificado
  const daysWithDreams = dreams ? dreams.length : 0;
  const percentage = Math.round((daysWithDreams / daysInMonth) * 100);
  
  return (
    <View style={styles.calendarContainer}>
      <Text style={styles.calendarTitle}>
        Registro de Sueños - {month || 'Abril 2025'}
      </Text>
      <Text style={styles.calendarStats}>
        Has registrado sueños en {daysWithDreams} de {daysInMonth} días ({percentage}%)
      </Text>
      <View style={styles.calendarGrid}>
        {/* Aquí iría el mapa de calor real */}
        <Text style={styles.placeholderText}>
          Visualización de calendario con mapa de calor
        </Text>
      </View>
    </View>
  );
};

// Componente principal para visualización de patrones
const PatternVisualization = ({ dreams, timeframe = 'month' }) => {
  const [patternData, setPatternData] = useState({
    recurringSymbols: [],
    recurringThemes: [],
    dreamFrequency: { labels: [], data: [] }
  });

  useEffect(() => {
    if (dreams && dreams.length > 0) {
      processPatternData(dreams, timeframe);
    }
  }, [dreams, timeframe]);

  const processPatternData = (dreams, timeframe) => {
    // Procesar datos para identificar patrones
    // Esto sería alimentado por el análisis de IA en una implementación real
    
    // Ejemplo de datos procesados
    const processedData = {
      recurringSymbols: [
        { symbol: 'Agua', count: 8, percentage: 40 },
        { symbol: 'Caída', count: 6, percentage: 30 },
        { symbol: 'Vuelo', count: 5, percentage: 25 },
        { symbol: 'Persecución', count: 4, percentage: 20 },
        { symbol: 'Dientes', count: 3, percentage: 15 }
      ],
      recurringThemes: [
        { theme: 'Ansiedad', count: 7, percentage: 35 },
        { theme: 'Libertad', count: 5, percentage: 25 },
        { theme: 'Pérdida', count: 4, percentage: 20 },
        { theme: 'Transformación', count: 3, percentage: 15 }
      ],
      dreamFrequency: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        data: [2, 1, 3, 0, 1, 4, 2]
      }
    };
    
    setPatternData(processedData);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Frecuencia de Sueños</Text>
        <Text style={styles.subtitle}>Registro de sueños durante el último mes</Text>
        
        <DreamCalendarHeatmap dreams={dreams} />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.title}>Símbolos Recurrentes</Text>
        <Text style={styles.subtitle}>Elementos que aparecen con frecuencia en tus sueños</Text>
        
        {patternData.recurringSymbols.length > 0 ? (
          <View style={styles.patternList}>
            {patternData.recurringSymbols.map((item, index) => (
              <View key={index} style={styles.patternItem}>
                <View style={styles.patternBar}>
                  <View 
                    style={[
                      styles.patternBarFill, 
                      { width: `${item.percentage}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.patternText}>
                  {item.symbol} ({item.count} veces)
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noDataText}>No hay suficientes datos para mostrar</Text>
        )}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.title}>Temas Recurrentes</Text>
        <Text style={styles.subtitle}>Temas principales identificados en tus sueños</Text>
        
        {patternData.recurringThemes.length > 0 ? (
          <View style={styles.patternList}>
            {patternData.recurringThemes.map((item, index) => (
              <View key={index} style={styles.patternItem}>
                <View style={styles.patternBar}>
                  <View 
                    style={[
                      styles.patternBarFill, 
                      { 
                        width: `${item.percentage}%`,
                        backgroundColor: theme.colors.secondary 
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.patternText}>
                  {item.theme} ({item.count} veces)
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noDataText}>No hay suficientes datos para mostrar</Text>
        )}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 15,
  },
  calendarContainer: {
    marginVertical: 10,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calendarStats: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 10,
  },
  calendarGrid: {
    height: 150,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
    fontStyle: 'italic',
  },
  patternList: {
    marginTop: 10,
  },
  patternItem: {
    marginBottom: 12,
  },
  patternBar: {
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  patternBarFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
  },
  patternText: {
    marginTop: 4,
    fontSize: 14,
  },
  noDataText: {
    textAlign: 'center',
    color: theme.colors.text,
    marginVertical: 20,
    fontStyle: 'italic',
  },
});

export default PatternVisualization;
