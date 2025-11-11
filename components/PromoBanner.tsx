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
        activeOpacity={0.85}
      >
        {/* Fundo Gradiente */}
        <View style={styles.gradientOverlay} />

        {/* Conteúdo do banner */}
        <View style={styles.bannerContent}>
          {/* Lado Esquerdo - Informações */}
          <View style={styles.infoSection}>
            {/* Badge "Em Promoção" */}
            <View style={styles.promoBadge}>
              <Ionicons name="flash" size={14} color="#FFFFFF" />
              <ThemedText style={styles.promoBadgeText}>Promoção</ThemedText>
            </View>

            {/* Nome do Produto */}
            <ThemedText style={styles.productName} numberOfLines={2}>
              {product.nome}
            </ThemedText>

            {/* Desconto e Preços - Row responsiva */}
            <View style={styles.detailsRow}>
              {/* Desconto */}
              {discountPercent > 0 && (
                <View style={styles.discountContainer}>
                  <ThemedText style={styles.discountSymbol}>%</ThemedText>
                  <View style={styles.discountContent}>
                    <ThemedText style={styles.discountValue}>
                      {discountPercent}
                    </ThemedText>
                    <ThemedText style={styles.discountLabel}>DESC</ThemedText>
                  </View>
                </View>
              )}

              {/* Preços */}
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

            {/* CTA */}
            <View style={styles.ctaContainer}>
              <ThemedText style={styles.ctaText}>Ver Oferta</ThemedText>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </View>
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
                <Ionicons name="cube-outline" size={52} color="#FFFFFF" />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>

      {/* Indicadores de página - Melhorados */}
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
          {/* Contador */}
          <View style={styles.counter}>
            <ThemedText style={styles.counterText}>
              {currentIndex + 1}/{products.length}
            </ThemedText>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  banner: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#F57C00',
    elevation: 8,
    shadowColor: '#F57C00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  bannerContent: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 180,
    gap: 16,
  },
  infoSection: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 6,
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  promoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  promoBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  productName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 24,
    letterSpacing: -0.5,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  discountSymbol: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  discountContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  discountValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  discountLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 0.5,
  },
  priceSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2,
  },
  priceOriginal: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    textDecorationLine: 'line-through',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  priceNew: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  ctaText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  imageSection: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  productImage: {
    width: '90%',
    height: '90%',
    borderRadius: 12,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  indicator: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: 'rgba(245, 124, 0, 0.25)',
    borderWidth: 1.5,
    borderColor: 'rgba(245, 124, 0, 0.4)',
  },
  indicatorActive: {
    backgroundColor: '#F57C00',
    borderColor: '#E67E00',
    width: 28,
    borderRadius: 4,
  },
  counter: {
    marginLeft: 'auto',
    backgroundColor: 'rgba(245, 124, 0, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 124, 0, 0.3)',
  },
  counterText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#F57C00',
    letterSpacing: 0.3,
  },
});