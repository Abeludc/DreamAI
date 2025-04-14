// Componente para visualizar estadísticas generales de sueños
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import { Card } from '../common/Card';
import { theme } from '../../theme';

const { width } = Dimensions.get('window');

const DreamStatistics = ({ dreams, timeframe = 'month' }) => {
  const [statsData, setStatsData] = useState({
    dreamCount: 0,
    dreamsByDay: { labels: [], datasets: [{ data: [] }] },
    completionRate: 0,
    emotionDistribution: { labels: [], data: [] },
    averageDuration: 0
  });

  useEffect(() => {
    if (dreams && dreams.length > 0) {
      processStatsData(dreams, timeframe);
    }
  }, [dreams, timeframe]);

  const processStatsData = (dreams, timeframe) => {
    // Calcular estadísticas básicas
    const dreamCount = dreams.length;
    
    // Calcular tasa de registro (días con sueños registrados / días totales)
    const daysInPeriod = timeframe === 'week' ? 7 : 30;
    const uniqueDays = new Set(dreams.map(dream => new Date(dream.dream_date).toDateString())).size;
    const completionRate = uniqueDays / daysInPeriod;
    
    // Calcular duración promedio (si está disponible en los datos)
    const dreamsWithDuration = dreams.filter(dream => dream.duration);
    const averageDuration = dreamsWithDuration.length > 0 
      ? dreamsWithDuration.reduce((sum, dream) => sum + dream.duration, 0) / dreamsWithDuration.length
      : 0;
    
    // Preparar datos para gráfico de línea (sueños por día)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date;
    });
    
    const dreamsByDay = {
      labels: last7Days.map(date => date.toLocaleDateString('es-ES', { weekday: 'short' })),
      datasets: [{
        data: last7Days.map(date => {
          const dateString = date.toDateString();
          return dreams.filter(dream => new Date(dream.dream_date).toDateString() === dateString).length;
        })
      }]
    };
    
    // Preparar datos para gráfico de progreso (distribución de emociones)
    // Simplificado para este ejemplo
    const emotionDistribution = {
      labels: ['Positivas', 'Negativas', 'Neutras'],
      data: [0.6, 0.3, 0.1] // Valores de ejemplo
    };
    
    setStatsData({
      dreamCount,
      dreamsByDay,
      completionRate,
      emotionDistribution,
      averageDuration
    });
  };

  const chartConfig = {
    backgroundGradientFrom: theme.colors.background,
    backgroundGradientTo: theme.colors.background,
    color: (opacity = 1) => `rgba(81, 92, 230, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Resumen de Sueños</Text>
        <Text style={styles.subtitle}>Estadísticas generales de tus sueños</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{statsData.dreamCount}</Text>
            <Text style={styles.statLabel}>Sueños Registrados</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{Math.round(statsData.completionRate * 100)}%</Text>
            <Text style={styles.statLabel}>Tasa de Registro</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{statsData.averageDuration.toFixed(1)} min</Text>
            <Text style={styles.statLabel}>Duración Promedio</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.title}>Frecuencia de Sueños</Text>
        <Text style={styles.subtitle}>Sueños registrados en los últimos 7 días</Text>
        
        {statsData.dreamsByDay.labels.length > 0 ? (
          <View style={styles.chartContainer}>
            <LineChart
              data={statsData.dreamsByDay}
              width={width - 60}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        ) : (
          <Text style={styles.noDataText}>No hay suficientes datos para mostrar</Text>
        )}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.title}>Distribución Emocional</Text>
        <Text style={styles.subtitle}>Balance de emociones en tus sueños</Text>
        
        <View style={styles.chartContainer}>
          <ProgressChart
            data={statsData.emotionDistribution}
            width={width - 60}
            height={220}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(65, 105, 225, ${opacity})`,
            }}
            style={styles.chart}
          />
        </View>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.text,
    marginTop: 5,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  chart: {
    borderRadius: 16,
  },
  noDataText: {
    textAlign: 'center',
    color: theme.colors.text,
    marginVertical: 20,
    fontStyle: 'italic',
  },
});

export default DreamStatistics;
