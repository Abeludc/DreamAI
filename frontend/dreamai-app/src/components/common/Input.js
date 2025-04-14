// Componente de entrada de texto personalizado para DreamAI
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  error,
  style,
  inputStyle,
  labelStyle,
  autoCapitalize = 'none',
  keyboardType = 'default',
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          error && styles.inputError,
          inputStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.secondary}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    width: '100%',
  },
  label: {
    ...typography.styles.body2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  input: {
    height: spacing.height.input,
    backgroundColor: colors.ui.card,
    borderRadius: spacing.card.borderRadius,
    paddingHorizontal: spacing.md,
    color: colors.text.primary,
    ...typography.styles.body1,
    borderWidth: 1,
    borderColor: colors.ui.divider,
  },
  multilineInput: {
    height: undefined,
    minHeight: spacing.height.input * 3,
    paddingTop: spacing.sm,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: colors.status.error,
  },
  errorText: {
    ...typography.styles.caption,
    color: colors.status.error,
    marginTop: spacing.xs,
  },
});

export default Input;
