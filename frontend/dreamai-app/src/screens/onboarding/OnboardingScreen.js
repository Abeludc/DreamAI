// Pantalla de Onboarding para DreamAI
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import Button from '../../components/common/Button';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

const OnboardingScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Datos de las páginas de onboarding
  const pages = [
    {
      title: 'Bienvenido a DreamAI',
      description: 'Descubre el mundo de tus sueños a través de la inteligencia artificial',
      image: null, // Aquí iría la ruta de la imagen cuando esté disponible
    },
    {
      title: 'Registra tus sueños',
      description: 'Escribe, dicta o sube una foto de tus notas para guardar tus sueños',
      image: null,
    },
    {
      title: 'Descubre patrones',
      description: 'Analiza tus emociones y símbolos recurrentes para entender mejor tu mundo onírico',
      image: null,
    },
    {
      title: 'Comparte tus insights',
      description: 'Crea tarjetas compartibles con los símbolos y significados más importantes',
      image: null,
    },
  ];
  
  // Avanzar a la siguiente página
  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Navegar a la pantalla de registro cuando esté implementada
      // navigation.navigate('Register');
    }
  };
  
  // Ir a la pantalla de inicio de sesión
  const handleLogin = () => {
    // Navegar a la pantalla de inicio de sesión cuando esté implementada
    // navigation.navigate('Login');
  };
  
  // Obtener la página actual
  const currentPageData = pages[currentPage];
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>DreamAI</Text>
        </View>
        
        {/* Imagen de la página */}
        <View style={styles.imageContainer}>
          {currentPageData.image ? (
            <Image 
              source={currentPageData.image} 
              style={styles.image} 
              resizeMode="contain" 
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>Imagen</Text>
            </View>
          )}
        </View>
        
        {/* Texto de la página */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{currentPageData.title}</Text>
          <Text style={styles.description}>{currentPageData.description}</Text>
        </View>
        
        {/* Indicadores de página */}
        <View style={styles.paginationContainer}>
          {pages.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.paginationDot, 
                index === currentPage && styles.paginationDotActive
              ]} 
            />
          ))}
        </View>
      </View>
      
      {/* Botones */}
      <View style={styles.buttonContainer}>
        <Button 
          title={currentPage < pages.length - 1 ? "Siguiente" : "Comenzar"} 
          onPress={handleNext} 
          style={styles.button}
        />
        
        {currentPage === 0 && (
          <Button 
            title="Ya tengo una cuenta" 
            onPress={handleLogin} 
            variant="outline" 
            style={styles.secondaryButton}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.container,
  },
  logoContainer: {
    marginBottom: spacing.xl,
  },
  logo: {
    ...typography.styles.h1,
    color: colors.accent,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '80%',
    height: '100%',
    backgroundColor: colors.ui.card,
    borderRadius: spacing.card.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    ...typography.styles.body1,
    color: colors.text.secondary,
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.styles.h2,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    ...typography.styles.body1,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.ui.divider,
    marginHorizontal: spacing.xs,
  },
  paginationDotActive: {
    backgroundColor: colors.accent,
    width: 16,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: spacing.container,
    paddingBottom: spacing.xl,
  },
  button: {
    marginBottom: spacing.md,
  },
  secondaryButton: {
    marginBottom: spacing.xl,
  },
});

export default OnboardingScreen;
