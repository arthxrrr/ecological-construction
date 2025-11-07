import { Product } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';

interface PromoBannerProps {
  products: Product[];
  onProductPress?: (product: Product) => void;
}

export const PromoBanner = ({ products, onProductPress }: PromoBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<any>(null);
  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (products.length === 0) return;

    autoScrollTimer.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000); // Rotaciona a cada 5 segundos

    return () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
      }
    };
  }, [products.length]);

  useEffect(() => {
    if (scrollViewRef.current && products.length > 0) {
      scrollViewRef.current?.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex, products.length]);

  if (products.length === 0) {
    return null;
  }

  const product = products[currentIndex];
  const discountPercent = product.desconto || 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.banner}
        onPress={() => onProductPress?.(product)}
        activeOpacity={0.9}
      >
        {/* Fundo do banner */}
        <View style={styles.bannerContent}>
          {/* Lado Esquerdo - Informações */}
          <View style={styles.infoSection}>
            <ThemedText style={styles.productName} numberOfLines={2}>
              {product.nome}
            </ThemedText>

            {discountPercent > 0 && (
              <View style={styles.discountContainer}>
                <ThemedText style={styles.discountText}>
                  {discountPercent}% OFF!
                </ThemedText>
              </View>
            )}

            {product.precoOriginal && product.precoOriginal > product.preco && (
              <View style={styles.priceSection}>
                <ThemedText style={styles.priceOriginal}>
                  R$ {product.precoOriginal.toFixed(2).replace('.', ',')}
                </ThemedText>
                <ThemedText style={styles.priceNew}>
                  R$ {product.preco.toFixed(2).replace('.', ',')}
                </ThemedText>
              </View>
            )}
          </View>

          {/* Lado Direito - Imagem */}
          <View style={styles.imageSection}>
            {product.imagemBanner ? (
              <Image
                source={{ uri: product.imagemBanner }}
                style={styles.productImage}
                contentFit="cover"
              />
            ) : product.imagem ? (
              <Image
                source={{ uri: product.imagem }}
                style={styles.productImage}
                contentFit="contain"
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Ionicons name="image-outline" size={48} color="#FFFFFF" />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>

      {/* Indicadores de página */}
      {products.length > 1 && (
        <View style={styles.indicatorsContainer}>
          {products.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.indicator,
                index === currentIndex && styles.indicatorActive,
              ]}
              onPress={() => setCurrentIndex(index)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  banner: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F57C00',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  bannerContent: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 140,
    gap: 12,
  },
  infoSection: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
    lineHeight: 22,
  },
  discountContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  discountText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  priceOriginal: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textDecorationLine: 'line-through',
    fontWeight: '600',
  },
  priceNew: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  imageSection: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(245, 124, 0, 0.3)',
  },
  indicatorActive: {
    backgroundColor: '#F57C00',
    width: 24,
  },
});