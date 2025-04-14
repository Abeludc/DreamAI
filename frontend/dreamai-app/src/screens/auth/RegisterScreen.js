// Pantalla de registro para DreamAI
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Manejar registro
  const handleRegister = () => {
    // Validación básica
    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor, completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    setError('');

    // Simulación de registro (se reemplazará con la integración real)
    setTimeout(() => {
      setLoading(false);
      // Aquí iría la navegación a la pantalla principal cuando esté implementada
      // navigation.navigate('Main');
    }, 1500);
  };

  // Navegar a la pantalla de inicio de sesión
  const handleLogin = () => {
    // navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>DreamAI</Text>
          </View>

          <Text style={styles.title}>Crear Cuenta</Text>

          {/* Formulario */}
          <View style={styles.form}>
            <Input
              label="Nombre"
              value={name}
              onChangeText={setName}
              placeholder="Tu nombre"
              autoCapitalize="words"
            />

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

            <Input
              label="Confirmar contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirma tu contraseña"
              secureTextEntry
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Button
              title="Registrarse"
              onPress={handleRegister}
              loading={loading}
              style={styles.button}
            />

            {/* Opciones alternativas de registro */}
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
          <Text style={styles.footerText}>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.footerLink}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  scrollContent: {
    flexGrow: 1,
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

export default RegisterScreen;
