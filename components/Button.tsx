import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  rightIcon?: string;
  style?: any;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  rightIcon,
  style,
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        styles[`variant_${variant}`],
        styles[`size_${size}`],
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? BrandColors.primary : '#ffffff'}
          size="small"
        />
      ) : (
        <View style={styles.content}>
          {icon && (
            <Ionicons
              name={icon as any}
              size={18}
              color={variant === 'outline' ? BrandColors.primary : '#ffffff'}
              style={styles.icon}
            />
          )}
          <ThemedText
            style={[
              styles.text,
              styles[`textColor_${variant}`],
              styles[`textSize_${size}`],
            ]}
          >
            {title}
          </ThemedText>
          {rightIcon && (
            <Ionicons
              name={rightIcon as any}
              size={18}
              color={variant === 'outline' ? BrandColors.primary : '#ffffff'}
              style={styles.rightIcon}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 48,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
  },
  icon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },

  // Variantes
  variant_primary: {
    backgroundColor: BrandColors.primary,
  },
  variant_secondary: {
    backgroundColor: BrandColors.secondary,
  },
  variant_danger: {
    backgroundColor: BrandColors.danger,
  },
  variant_outline: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: BrandColors.primary,
  },

  // Cores do texto
  textColor_primary: {
    color: '#ffffff',
  },
  textColor_secondary: {
    color: '#ffffff',
  },
  textColor_danger: {
    color: '#ffffff',
  },
  textColor_outline: {
    color: BrandColors.primary,
  },

  // Tamanhos
  size_small: {
    paddingHorizontal: 12,
    minHeight: 36,
  },
  size_medium: {
    paddingHorizontal: 24,
    minHeight: 44,
  },
  size_large: {
    paddingHorizontal: 32,
    minHeight: 52,
  },

  textSize_small: {
    fontSize: 12,
  },
  textSize_medium: {
    fontSize: 14,
  },
  textSize_large: {
    fontSize: 16,
  },

  // Estado desabilitado
  disabled: {
    opacity: 0.5,
  },
});