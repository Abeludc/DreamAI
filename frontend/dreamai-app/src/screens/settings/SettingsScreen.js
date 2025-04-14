// Pantalla de configuración y perfil para DreamAI
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch } from 'react-native';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

const SettingsScreen = ({ navigation }) => {
  // Estados para las configuraciones
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [privateMode, setPrivateMode] = useState(false);
  
  // Datos de usuario de ejemplo (se reemplazarán con datos reales)
  const user = {
    name: 'Ana García',
    email: 'ana.garcia@ejemplo.com',
    subscription: 'Gratuito',
    dreamCount: 12,
  };
  
  // Manejar cierre de sesión
  const handleLogout = () => {
    // Implementación futura: cerrar sesión y navegar a la pantalla de autenticación
    // navigation.navigate('Auth');
  };
  
  // Manejar navegación a gestión de suscripción
  const handleSubscription = () => {
    // navigation.navigate('Subscription');
  };
  
  // Manejar exportación de datos
  const handleExportData = () => {
    // Implementación futura: exportar datos del usuario
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.title}>Perfil</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>
        
        {/* Perfil del usuario */}
        <Card style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
            </View>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.dreamCount}</Text>
              <Text style={styles.statLabel}>Sueños</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.subscription}</Text>
              <Text style={styles.statLabel}>Plan</Text>
            </View>
          </View>
        </Card>
        
        {/* Suscripción */}
        <Card style={styles.subscriptionCard}>
          <Text style={styles.sectionTitle}>Tu suscripción</Text>
          <Text style={styles.subscriptionType}>Plan {user.subscription}</Text>
          <Text style={styles.subscriptionDescription}>
            {user.subscription === 'Premium' 
              ? 'Tienes acceso a todas las funciones premium de DreamAI.' 
              : 'Actualiza a Premium para desbloquear todas las funciones.'}
          </Text>
          <Button
            title={user.subscription === 'Premium' ? 'Gestionar suscripción' : 'Actualizar a Premium'}
            variant={user.subscription === 'Premium' ? 'outline' : 'secondary'}
            onPress={handleSubscription}
            style={styles.subscriptionButton}
          />
        </Card>
        
        {/* Configuración */}
        <Card style={styles.settingsCard}>
          <Text style={styles.sectionTitle}>Configuración</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Modo oscuro</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: colors.ui.divider, true: colors.primary }}
              thumbColor={colors.text.primary}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Notificaciones</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.ui.divider, true: colors.primary }}
              thumbColor={colors.text.primary}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Modo privado (Premium)</Text>
            <Switch
              value={privateMode}
              onValueChange={setPrivateMode}
              trackColor={{ false: colors.ui.divider, true: colors.primary }}
              thumbColor={colors.text.primary}
              disabled={user.subscription !== 'Premium'}
            />
          </View>
          
          <TouchableOpacity style={styles.settingButton} onPress={handleExportData}>
            <Text style={styles.settingButtonText}>Exportar datos</Text>
          </TouchableOpacity>
        </Card>
        
        {/* Información */}
        <Card style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Información</Text>
          
          <TouchableOpacity style={styles.infoItem}>
            <Text style={styles.infoItemText}>Términos y condiciones</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.infoItem}>
            <Text style={styles.infoItemText}>Política de privacidad</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.infoItem}>
            <Text style={styles.infoItemText}>Acerca de DreamAI</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.infoItem}>
            <Text style={styles.infoItemText}>Contacto y soporte</Text>
          </TouchableOpacity>
        </Card>
        
        {/* Botón de cerrar sesión */}
        <Button
          title="Cerrar sesión"
          variant="outline"
          onPress={handleLogout}
          style={styles.logoutButton}
        />
        
        {/* Versión de la aplicación */}
        <Text style={styles.versionText}>DreamAI v1.0.0</Text>
      </ScrollView>
      
      {/* Barra de navegación inferior (placeholder) */}
      <View style={styles.tabBar}>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Inicio</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Calendario</Text>
        </View>
        <View style={styles.tabItemCenter} />
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Análisis</Text>
        </View>
        <View style={[styles.tabItem, styles.tabItemActive]}>
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
  editButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.xs,
    backgroundColor: colors.ui.card,
  },
  editButtonText: {
    ...typography.styles.button,
    color: colors.accent,
  },
  profileCard: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...typography.styles.h1,
    color: colors.text.primary,
  },
  userName: {
    ...typography.styles.h3,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...typography.styles.body2,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
    marginTop: spacing.sm,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...typography.styles.h3,
    color: colors.accent,
  },
  statLabel: {
    ...typography.styles.caption,
    color: colors.text.secondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.ui.divider,
  },
  subscriptionCard: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.styles.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  subscriptionType: {
    ...typography.styles.h3,
    color: colors.accent,
    marginBottom: spacing.xs,
  },
  subscriptionDescription: {
    ...typography.styles.body2,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  subscriptionButton: {
    marginTop: spacing.sm,
  },
  settingsCard: {
    marginBottom: spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  settingLabel: {
    ...typography.styles.body1,
    color: colors.text.primary,
  },
  settingButton: {
    paddingVertical: spacing.sm,
  },
  settingButtonText: {
    ...typography.styles.body1,
    color: colors.accent,
  },
  infoCard: {
    marginBottom: spacing.lg,
  },
  infoItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.divider,
  },
  infoItemText: {
    ...typography.styles.body1,
    color: colors.text.primary,
  },
  logoutButton: {
    marginBottom: spacing.lg,
  },
  versionText: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
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

export default SettingsScreen;
