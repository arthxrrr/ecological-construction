import { CategoryCard } from '@/components/CategoryCard';
import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';
import { ThemedText } from '@/components/themed-text';
import { getAllCategories, getAllProducts, searchProducts } from '@/services/productService';
import { Product } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

interface CategoriesExploreScreenProps {
  onProductPress?: (product: Product) => void;
  onFavorite?: (product: Product) => void;
  favoriteIds?: Set<number>;
}

export const CategoriesExploreScreen = ({
  onProductPress,
  onFavorite,
  favoriteIds = new Set(),
}: CategoriesExploreScreenProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mapa de categorias com ícones
  const categoryIconsMap: Record<string, string> = {
    'Alvenaria': 'cube-outline',
    'Ferramentas': 'hammer-outline',
    'Tintas': 'color-palette-outline',
    'Hidráulica': 'water-outline',
    'Cimentos e Argamassas': 'albums-outline',
    'Revestimentos': 'grid-outline',
    'Esquadrias': 'square-outline',
  };

  useEffect(() => {
    // Carregar produtos e categorias
    const allProducts = getAllProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);

    const allCategories = getAllCategories();
    setCategories(allCategories);
  }, []);

  useEffect(() => {
    // Aplicar filtros
    let filtered = products;

    if (searchQuery) {
      filtered = searchProducts(searchQuery);
    } else if (selectedCategory) {
      filtered = products.filter((p) => p.categoria === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory(null);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setSearchQuery('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Explorar Categorias</ThemedText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* SearchBar */}
        <View style={styles.searchContainer}>
          <SearchBar onSearch={handleSearch} placeholder="Buscar produtos..." />
        </View>

        {/* Categorias */}
        <View style={styles.categoriesSection}>
          <ThemedText style={styles.sectionTitle}>Categorias Disponíveis</ThemedText>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <CategoryCard
                key={category}
                name={category}
                icon={categoryIconsMap[category] || 'cube-outline'}
                isSelected={selectedCategory === category}
                onPress={() => handleCategorySelect(category)}
              />
            ))}
          </View>
        </View>

        {/* Título de Resultados */}
        <View style={styles.resultsHeader}>
          <ThemedText style={styles.sectionTitle}>
            {selectedCategory ? selectedCategory : searchQuery ? 'Resultados da busca' : 'Todos os produtos'}
          </ThemedText>
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
            <Ionicons name="search" size={64} color="#d1d5db" />
            <ThemedText style={styles.emptyText}>Nenhum produto encontrado</ThemedText>
            <ThemedText style={styles.emptySubText}>
              Tente ajustar sua busca ou selecionar outra categoria
            </ThemedText>
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
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F57C00',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoriesSection: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
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
  emptySubText: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
  },
});