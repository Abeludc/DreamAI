// Configuración de tipografía para DreamAI

import { Platform } from 'react-native';

// Utilizamos SF Pro en iOS (sistema) y Roboto en Android
const fontFamily = Platform.OS === 'ios' 
  ? undefined // En iOS usamos la fuente del sistema (SF Pro)
  : 'Roboto'; // En Android usamos Roboto

export const typography = {
  // Familias de fuentes
  fontFamily: {
    base: fontFamily,
    bold: Platform.OS === 'ios' ? undefined : 'Roboto-Bold',
    light: Platform.OS === 'ios' ? undefined : 'Roboto-Light',
    italic: Platform.OS === 'ios' ? undefined : 'Roboto-Italic',
  },
  
  // Tamaños de fuente
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  
  // Estilos predefinidos
  styles: {
    // Títulos
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      letterSpacing: 0.25,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
      letterSpacing: 0,
    },
    h3: {
      fontSize: 20,
      fontWeight: 'bold',
      letterSpacing: 0.15,
    },
    h4: {
      fontSize: 18,
      fontWeight: 'bold',
      letterSpacing: 0.15,
    },
    
    // Cuerpo de texto
    body1: {
      fontSize: 16,
      fontWeight: 'normal',
      letterSpacing: 0.5,
    },
    body2: {
      fontSize: 14,
      fontWeight: 'normal',
      letterSpacing: 0.25,
    },
    
    // Otros estilos
    button: {
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: 1.25,
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: 12,
      fontWeight: 'normal',
      letterSpacing: 0.4,
    },
    overline: {
      fontSize: 10,
      fontWeight: '500',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
    },
  },
};

export default typography;
