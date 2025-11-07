import { BrandColors } from '@/constants/theme';
import { Product } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';

interface ProductCardProps {
  product: Product;
  onPress?: (product: Product) => void;
  onFavorite?: (product: Product) => void;
  isFavorited?: boolean;
}

export const ProductCard = ({
  product,
  onPress,
  onFavorite,
  isFavorited = false,
}: ProductCardProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(product)}
      activeOpacity={0.7}
    >
      {/* Imagem do Produto */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.imagem }}
          style={styles.image}
          contentFit="cover"
        />

        {/* Badge de Desconto */}
        {product.desconto && product.desconto > 0 && (
          <View style={styles.discountBadge}>
            <ThemedText style={styles.discountText}>-{product.desconto}%</ThemedText>
          </View>
        )}

        {/* Botão de Favorito */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => onFavorite?.(product)}
        >
          <Ionicons
            name={isFavorited ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorited ? '#ef4444' : '#ffffff'}
          />
        </TouchableOpacity>

        {/* Badge de Categoria */}
        <View style={styles.categoryBadge}>
          <ThemedText style={styles.categoryText}>{product.categoria}</ThemedText>
        </View>
      </View>

      {/* Informações do Produto */}
      <View style={styles.info}>
        <ThemedText
          style={styles.name}
          numberOfLines={2}
        >
          {product.nome}
        </ThemedText>

        {product.descricao && (
          <ThemedText
            style={styles.description}
            numberOfLines={1}
          >
            {product.descricao}
          </ThemedText>
        )}

        {/* Preço */}
        <View style={styles.priceContainer}>
          <ThemedText style={styles.price}>
            R$ {product.preco.toFixed(2).replace('.', ',')}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BrandColors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    backgroundColor: BrandColors.lightBg,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#D32F2F',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '800',
    color: BrandColors.white,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 24,
    padding: 8,
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: BrandColors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: BrandColors.white,
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: BrandColors.secondary,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: BrandColors.darkGray,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: BrandColors.primary,
  },
});