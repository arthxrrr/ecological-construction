import { ProductCard } from '@/components/ProductCard';
import { PromoBanner } from '@/components/PromoBanner';
import { ThemedText } from '@/components/themed-text';
import { getAllProducts } from '@/services/productService';
import { Product } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

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
        <ThemedText style={styles.logoText}> Ecological Construction</ThemedText>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F57C00',
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