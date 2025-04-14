// Pantalla de inicio de sesión para DreamAI
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Manejar inicio de sesión
  const handleLogin = () => {
    // Validación básica
    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    // Simulación de inicio de sesión (se reemplazará con la integración real)
    setTimeout(() => {
      setLoading(false);
      // Aquí iría la navegación a la pantalla principal cuando esté implementada
      // navigation.navigate('Main');
    }, 1500);
  };

  // Navegar a la pantalla de registro
  const handleRegister = () => {
    // navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>DreamAI</Text>
        </View>

        <Text style={styles.title}>Iniciar Sesión</Text>

        {/* Formulario */}
        <View style={styles.form}>
          <Input
            label="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            placeholder="tu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            placeholder="Tu contraseña"
            secureTextEntry
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Button
            title="Iniciar Sesión"
            onPress={handleLogin}
            loading={loading}
            style={styles.button}
          />

          {/* Opciones alternativas de inicio de sesión */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>O continuar con</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <Button
              title="Apple"
              variant="outline"
              style={styles.socialButton}
            />
            <Button
              title="Google"
              variant="outline"
              style={styles.socialButton}
            />
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>¿No tienes una cuenta?</Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.footerLink}>Regístrate</Text>
        </TouchableOpacity>
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
    paddingHorizontal: spacing.container,
    paddingTop: spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    ...typography.styles.h1,
    color: colors.accent,
    fontWeight: 'bold',
  },
  title: {
    ...typography.styles.h2,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  form: {
    width: '100%',
  },
  errorText: {
    ...typography.styles.caption,
    color: colors.status.error,
    marginBottom: spacing.sm,
  },
  button: {
    marginTop: spacing.md,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.ui.divider,
  },
  dividerText: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    marginHorizontal: spacing.sm,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 0.48,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  footerText: {
    ...typography.styles.body2,
    color: colors.text.secondary,
    marginRight: spacing.xs,
  },
  footerLink: {
    ...typography.styles.body2,
    color: colors.accent,
    fontWeight: '600',
  },
});

export default LoginScreen;
