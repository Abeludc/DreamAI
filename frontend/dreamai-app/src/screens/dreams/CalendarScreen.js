// Pantalla de calendario y historial de sueños para DreamAI
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Card from '../../components/common/Card';
import DreamCard from '../../components/dreams/DreamCard';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Datos de ejemplo (se reemplazarán con datos reales del backend)
  const dreamsByDate = {
    '2025-04-10': [
      {
        id: '1',
        date: '2025-04-10T08:30:00Z',
        content: 'Soñé que estaba en una playa desierta con aguas cristalinas. El cielo era de un azul intenso y me sentía completamente en paz.',
        emotions: ['Paz', 'Alegría'],
        mainSymbol: 'Agua',
      }
    ],
    '2025-04-12': [
      {
        id: '2',
        date: '2025-04-12T07:15:00Z',
        content: 'Estaba en un laberinto oscuro, buscando la salida. Sentía ansiedad pero también determinación por encontrar el camino.',
        emotions: ['Miedo', 'Confusión'],
        mainSymbol: 'Laberinto',
      }
    ],
    '2025-04-14': [
      {
        id: '3',
        date: '2025-04-14T06:45:00Z',
        content: 'Soñé que volaba sobre una ciudad desconocida. Las calles brillaban con luces de colores y podía sentir el viento en mi rostro.',
        emotions: ['Alegría', 'Paz'],
        mainSymbol: 'Vuelo',
      }
    ],
  };
  
  // Generar días del mes actual
  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    
    // Obtener el día de la semana del primer día del mes (0 = Domingo, 1 = Lunes, etc.)
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Agregar días vacíos para alinear el primer día del mes con el día de la semana correcto
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: '', isEmpty: true });
    }
    
    // Agregar todos los días del mes
    while (date.getMonth() === month) {
      const day = date.getDate();
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasDream = dreamsByDate[dateString] !== undefined;
      
      days.push({
        day,
        dateString,
        hasDream,
        isToday: date.toDateString() === new Date().toDateString(),
        isSelected: date.toDateString() === selectedDate.toDateString(),
      });
      
      date.setDate(date.getDate() + 1);
    }
    
    return days;
  };
  
  // Obtener nombre del mes
  const getMonthName = (month) => {
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return monthNames[month];
  };
  
  // Cambiar mes
  const changeMonth = (increment) => {
    let newMonth = selectedMonth + increment;
    let newYear = selectedYear;
    
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };
  
  // Seleccionar día
  const selectDay = (day) => {
    if (day.day === '' || !day.dateString) return;
    
    const newDate = new Date(day.dateString);
    setSelectedDate(newDate);
  };
  
  // Navegar a la pantalla de detalle de sueño
  const handleDreamPress = (dreamId) => {
    // navigation.navigate('DreamInterpretation', { dreamId });
  };
  
  // Obtener sueños del día seleccionado
  const getSelectedDayDreams = () => {
    const dateString = selectedDate.toISOString().split('T')[0];
    return dreamsByDate[dateString] || [];
  };
  
  // Obtener todos los sueños para la lista
  const getAllDreams = () => {
    const allDreams = [];
    Object.keys(dreamsByDate).forEach(date => {
      dreamsByDate[date].forEach(dream => {
        allDreams.push(dream);
      });
    });
    
    // Ordenar por fecha, más reciente primero
    return allDreams.sort((a, b) => new Date(b.date) - new Date(a.date));
  };
  
  const days = getDaysInMonth(selectedMonth, selectedYear);
  const selectedDayDreams = getSelectedDayDreams();
  const allDreams = getAllDreams();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.title}>Calendario</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Filtrar</Text>
          </TouchableOpacity>
        </View>
        
        {/* Calendario */}
        <Card style={styles.calendarCard}>
          {/* Navegación de mes */}
          <View style={styles.monthNavigation}>
            <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.monthButton}>
              <Text style={styles.monthButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.monthYear}>{getMonthName(selectedMonth)} {selectedYear}</Text>
            <TouchableOpacity onPress={() => changeMonth(1)} style={styles.monthButton}>
              <Text style={styles.monthButtonText}>→</Text>
            </TouchableOpacity>
          </View>
          
          {/* Días de la semana */}
          <View style={styles.weekDaysContainer}>
            {['D', 'L', 'M', 'X', 'J', 'V', 'S'].map((day, index) => (
              <Text key={index} style={styles.weekDay}>{day}</Text>
            ))}
          </View>
          
          {/* Días del mes */}
          <View style={styles.daysContainer}>
            {days.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayButton,
                  day.isEmpty && styles.emptyDay,
                  day.isToday && styles.todayButton,
                  day.isSelected && styles.selectedDayButton,
                ]}
                onPress={() => selectDay(day)}
                disabled={day.isEmpty}
              >
                <Text
                  style={[
                    styles.dayText,
                    day.isToday && styles.todayText,
                    day.isSelected && styles.selectedDayText,
                  ]}
                >
                  {day.day}
                </Text>
                {day.hasDream && <View style={styles.dreamIndicator} />}
              </TouchableOpacity>
            ))}
          </View>
        </Card>
        
        {/* Sueños del día seleccionado */}
        {selectedDayDreams.length > 0 && (
          <View style={styles.selectedDayDreamsContainer}>
            <Text style={styles.sectionTitle}>
              Sueños del {selectedDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
            </Text>
            {selectedDayDreams.map((dream) => (
              <DreamCard
                key={dream.id}
                dream={dream}
                onPress={() => handleDreamPress(dream.id)}
              />
            ))}
          </View>
        )}
        
        {/* Lista de sueños recientes */}
        <Text style={styles.sectionTitle}>Historial de sueños</Text>
        {allDreams.map((dream) => (
          <DreamCard
            key={dream.id}
            dream={dream}
            onPress={() => handleDreamPress(dream.id)}
          />
        ))}
      </ScrollView>
      
      {/* Barra de navegación inferior (placeholder) */}
      <View style={styles.tabBar}>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Inicio</Text>
        </View>
        <View style={[styles.tabItem, styles.tabItemActive]}>
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
    color: colors.text.primary,
  },
  filterButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.xs,
    backgroundColor: colors.ui.card,
  },
  filterButtonText: {
    ...typography.styles.button,
    color: colors.accent,
  },
  calendarCard: {
    marginBottom: spacing.lg,
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  monthButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.ui.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthButtonText: {
    fontSize: 18,
    color: colors.text.primary,
  },
  monthYear: {
    ...typography.styles.h3,
    color: colors.text.primary,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    ...typography.styles.body2,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayButton: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  emptyDay: {
    opacity: 0,
  },
  todayButton: {
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 20,
  },
  selectedDayButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  dayText: {
    ...typography.styles.body1,
    color: colors.text.primary,
  },
  todayText: {
    color: colors.accent,
    fontWeight: '600',
  },
  selectedDayText: {
    color: colors.text.primary,
    fontWeight: '600',
  },
  dreamIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accent,
    position: 'absolute',
    bottom: 6,
  },
  selectedDayDreamsContainer: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.styles.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
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

export default CalendarScreen;
