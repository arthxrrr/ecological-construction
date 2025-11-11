import { ProductCard } from '@/components/ProductCard';
import { PromoBanner } from '@/components/PromoBanner';
import { ThemedText } from '@/components/themed-text';
import { getAllProducts } from '@/services/productService';
import { Product } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

interface HomeScreenProps {
  onProductPress?: (product: Product) => void;
  onFavorite?: (product: Product) => void;
  favoriteIds?: Set<number>;
}

export const HomeScreen = ({ onProductPress, onFavorite, favoriteIds = new Set() }: HomeScreenProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Produtos em destaque para o banner
  const bannerProducts = useMemo(() => {
    return products.filter((p) => p.destaque).slice(0, 5);
  }, [products]);

  useEffect(() => {
    // Carregar produtos
    const allProducts = getAllProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.titleWrapper}>
            <Text style={styles.titlePart1}>Ecological</Text>
            <Text style={styles.titlePart2}>Construction</Text>
          </View>
          <View style={styles.accentLine} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner Rotativo */}
        {bannerProducts.length > 0 && (
          <PromoBanner
            products={bannerProducts}
            onProductPress={onProductPress}
          />
        )}

        {/* Título Destaque */}
        <View style={styles.highlightTitleContainer}>
          <ThemedText style={styles.sectionTitle}>Em Destaque</ThemedText>
        </View>

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <View style={styles.productList}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={onProductPress}
                onFavorite={onFavorite}
                isFavorited={favoriteIds.has(product.id)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="cube" size={64} color="#d1d5db" />
            <ThemedText style={styles.emptyText}>Nenhum produto encontrado</ThemedText>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#2ECC71',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2ECC71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  titleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titlePart1: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2ECC71',
    letterSpacing: 0.6,
    lineHeight: 22,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  titlePart2: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1f2937',
    letterSpacing: 1,
    lineHeight: 38,
  },
  accentLine: {
    width: 60,
    height: 3,
    backgroundColor: '#2ECC71',
    borderRadius: 2,
    shadowColor: '#2ECC71',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#F57C00',
    letterSpacing: 1.2,
    textAlign: 'center',
    lineHeight: 36,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6b7280',
    letterSpacing: 0.3,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },
  highlightTitleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  productList: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 16,
  },
});