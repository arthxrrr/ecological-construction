import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  onRightPress?: () => void;
  rightIcon?: string;
  rightBadge?: number;
}

export const Header = ({
  title,
  onBackPress,
  onRightPress,
  rightIcon,
  rightBadge,
}: HeaderProps) => {
  return (
    <View style={styles.container}>
      {/* Botão voltar */}
      <TouchableOpacity
        onPress={onBackPress}
        style={styles.leftButton}
        disabled={!onBackPress}
      >
        {onBackPress && (
          <Ionicons
            name="chevron-back"
            size={24}
            color="#10b981"
          />
        )}
      </TouchableOpacity>

      {/* Título */}
      <ThemedText style={styles.title}>{title}</ThemedText>

      {/* Botão direito */}
      <TouchableOpacity
        onPress={onRightPress}
        style={styles.rightButton}
        disabled={!onRightPress}
      >
        {rightIcon && (
          <>
            <Ionicons
              name={rightIcon as any}
              size={24}
              color="#10b981"
            />
            {rightBadge !== undefined && rightBadge > 0 && (
              <View style={styles.badge}>
                <ThemedText style={styles.badgeText}>
                  {rightBadge > 99 ? '99+' : rightBadge}
                </ThemedText>
              </View>
            )}
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  leftButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
  },
  rightButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
  },
});