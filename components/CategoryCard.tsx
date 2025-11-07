import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';

interface CategoryCardProps {
  name: string;
  icon: string;
  isSelected?: boolean;
  onPress?: () => void;
}

export const CategoryCard = ({
  name,
  icon,
  isSelected = false,
  onPress,
}: CategoryCardProps) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, isSelected && styles.iconContainerActive]}>
        <Ionicons
          name={icon as any}
          size={28}
          color={isSelected ? '#FFFFFF' : '#F57C00'}
        />
      </View>
      <ThemedText
        style={[styles.text, isSelected && styles.textActive]}
        numberOfLines={2}
      >
        {name}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '23%',
    aspectRatio: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    marginRight: '2.3%',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  cardActive: {
    backgroundColor: '#F57C00',
    borderColor: '#F57C00',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(245, 124, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainerActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    color: '#424242',
    textAlign: 'center',
    lineHeight: 13,
  },
  textActive: {
    color: '#FFFFFF',
  },
});