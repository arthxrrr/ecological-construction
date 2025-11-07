import { BrandColors } from '@/constants/theme';
import { CartItem } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export const CartItemCard = ({ item, onUpdateQuantity, onRemove }: CartItemCardProps) => {
  const subtotal = item.product.preco * item.quantidade;

  return (
    <View style={styles.container}>
      {/* Imagem */}
      <Image
        source={{ uri: item.product.imagem }}
        style={styles.image}
        contentFit="cover"
      />

      {/* Informações */}
      <View style={styles.content}>
        <ThemedText style={styles.name} numberOfLines={2}>
          {item.product.nome}
        </ThemedText>

        <ThemedText style={styles.price}>
          R$ {item.product.preco.toFixed(2).replace('.', ',')}
        </ThemedText>

        {/* Controle de Quantidade */}
        <View style={styles.quantityControl}>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(Math.max(1, item.quantidade - 1))}
            style={styles.quantityButton}
          >
            <Ionicons name="remove" size={16} color={BrandColors.primary} />
          </TouchableOpacity>

          <ThemedText style={styles.quantity}>{item.quantidade}</ThemedText>

          <TouchableOpacity
            onPress={() => onUpdateQuantity(item.quantidade + 1)}
            style={styles.quantityButton}
          >
            <Ionicons name="add" size={16} color={BrandColors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Subtotal e Remover */}
      <View style={styles.rightSection}>
        <ThemedText style={styles.subtotal}>
          R$ {subtotal.toFixed(2).replace('.', ',')}
        </ThemedText>

        <TouchableOpacity
          onPress={onRemove}
          style={styles.removeButton}
        >
          <Ionicons name="trash" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: BrandColors.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BrandColors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: BrandColors.lightBg,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: BrandColors.secondary,
    marginBottom: 3,
  },
  price: {
    fontSize: 13,
    color: BrandColors.primary,
    fontWeight: '700',
    marginBottom: 6,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.lightBg,
    borderRadius: 6,
    width: 80,
    justifyContent: 'space-around',
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: BrandColors.border,
  },
  quantityButton: {
    padding: 3,
  },
  quantity: {
    fontSize: 11,
    fontWeight: '700',
    color: BrandColors.secondary,
  },
  rightSection: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  subtotal: {
    fontSize: 13,
    fontWeight: '800',
    color: BrandColors.primary,
    marginBottom: 8,
  },
  removeButton: {
    padding: 4,
  },
});