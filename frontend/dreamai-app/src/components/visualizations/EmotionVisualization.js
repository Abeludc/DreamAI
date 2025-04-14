// Componente para visualizar emociones en gráficos
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart, PieChart, BarChart } from 'react-native-chart-kit';
import { Card } from '../common/Card';
import { theme } from '../../theme';

const { width } = Dimensions.get('window');

const EmotionVisualization = ({ emotions, timeframe = 'week' }) => {
  const [emotionData, setEmotionData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [distributionData, setDistributionData] = useState([]);
  const [intensityData, setIntensityData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  useEffect(() => {
    if (emotions && emotions.length > 0) {
      processEmotionData(emotions, timeframe);
    }
  }, [emotions, timeframe]);

  const processEmotionData = (emotions, timeframe) => {
    // Procesar datos para gráfico de línea (tendencia emocional)
    const emotionCounts = {};
    const emotionIntensities = {};
    let totalEmotions = 0;

    emotions.forEach(emotion => {
      // Contar ocurrencias de cada emoción
      if (!emotionCounts[emotion.name]) {
        emotionCounts[emotion.name] = 0;
      }
      emotionCounts[emotion.name]++;
      totalEmotions++;

      // Sumar intensidades para calcular promedio
      if (!emotionIntensities[emotion.name]) {
        emotionIntensities[emotion.name] = [];
      }
      emotionIntensities[emotion.name].push(emotion.intensity);
    });

    // Preparar datos para gráfico de distribución (pie chart)
    const pieData = Object.keys(emotionCounts).map((emotion, index) => {
      const count = emotionCounts[emotion];
      const percentage = (count / totalEmotions) * 100;
      
      // Colores para diferentes emociones
      const colors = [
        '#FF6384', // rojo - miedo/ansiedad
        '#36A2EB', // azul - tristeza
        '#FFCE56', // amarillo - alegría
        '#4BC0C0', // turquesa - calma
        '#9966FF', // morado - confusión
        '#FF9F40', // naranja - ira
        '#C9CBCF', // gris - neutralidad
        '#7CFC00', // verde - esperanza
      ];
      
      return {
        name: emotion,
        population: count,
        percentage: percentage.toFixed(1),
        color: colors[index % colors.length],
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      };
    });

    // Ordenar por frecuencia para mostrar las emociones más comunes
    pieData.sort((a, b) => b.population - a.population);
    
    // Limitar a las 5 emociones más comunes para mejor visualización
    const topEmotions = pieData.slice(0, 5);
    
    // Preparar datos para gráfico de intensidad (bar chart)
    const intensityLabels = [];
    const intensityValues = [];
    
    Object.keys(emotionIntensities).forEach(emotion => {
      const intensities = emotionIntensities[emotion];
      const avgIntensity = intensities.reduce((sum, val) => sum + val, 0) / intensities.length;
      
      intensityLabels.push(emotion);
      intensityValues.push(avgIntensity);
    });
    
    // Limitar a las 5 emociones más intensas
    const intensityData = {
      labels: intensityLabels.slice(0, 5),
      datasets: [{ data: intensityValues.slice(0, 5) }],
    };

    setDistributionData(topEmotions);
    setIntensityData(intensityData);
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
        <Text style={styles.title}>Distribución Emocional</Text>
        <Text style={styles.subtitle}>Emociones más frecuentes en tus sueños</Text>
        
        {distributionData.length > 0 ? (
          <View style={styles.chartContainer}>
            <PieChart
              data={distributionData}
              width={width - 60}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        ) : (
          <Text style={styles.noDataText}>No hay suficientes datos para mostrar</Text>
        )}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.title}>Intensidad Emocional</Text>
        <Text style={styles.subtitle}>Nivel promedio de intensidad por emoción</Text>
        
        {intensityData.labels.length > 0 ? (
          <View style={styles.chartContainer}>
            <BarChart
              data={intensityData}
              width={width - 60}
              height={220}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              }}
              verticalLabelRotation={30}
              fromZero
            />
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
  chartContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  noDataText: {
    textAlign: 'center',
    color: theme.colors.text,
    marginVertical: 20,
    fontStyle: 'italic',
  },
});

export default EmotionVisualization;
