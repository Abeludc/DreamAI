// Componente de navegación principal para DreamAI
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importar pantallas cuando estén disponibles
// import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
// import LoginScreen from '../screens/auth/LoginScreen';
// import RegisterScreen from '../screens/auth/RegisterScreen';
// import HomeScreen from '../screens/dreams/HomeScreen';
// import DreamFormScreen from '../screens/dreams/DreamFormScreen';
// import CalendarScreen from '../screens/dreams/CalendarScreen';
// import AnalysisScreen from '../screens/analysis/AnalysisScreen';
// import ChatScreen from '../screens/chat/ChatScreen';
// import SettingsScreen from '../screens/settings/SettingsScreen';

// Crear navegadores
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegador de autenticación
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} /> */}
    </Stack.Navigator>
  );
};

// Navegador de pestañas principal
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Analysis" component={AnalysisScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
};

// Navegador principal
const AppNavigator = () => {
  // Estado de autenticación (simulado por ahora)
  const isAuthenticated = false;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            {/* <Stack.Screen name="DreamForm" component={DreamFormScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} /> */}
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
