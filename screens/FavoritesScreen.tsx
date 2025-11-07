import { ProductCard } from '@/components/ProductCard';
import { ThemedText } from '@/components/themed-text';
import { getAllProducts } from '@/services/productService';
import { useAuthStore } from '@/store/authStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import { Product } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface FavoritesScreenProps {
  onProductPress?: (product: Product) => void;
  onFavorite?: (product: Product) => void;
}

export const FavoritesScreen = ({ onProductPress, onFavorite }: FavoritesScreenProps) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { favorites, removeFavorite, isFavorited } = useFavoriteStore();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!user) return;

    // Buscar produtos que estão nos favoritos
    const allProducts = getAllProducts();
    const userFavoriteIds = favorites
      .filter((fav) => fav.user_id === user.id)
      .map((fav) => fav.product_id);

    const favorited = allProducts.filter((product) =>
      userFavoriteIds.includes(product.id)
    );

    setFavoriteProducts(favorited);
  }, [favorites, user]);

  const handleRemoveFavorite = (product: Product) => {
    if (user) {
      removeFavorite(product.id, user.id);
      onFavorite?.(product);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#10b981" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Meus Favoritos</ThemedText>
        <View style={styles.placeholder} />
      </View>

      {/* Lista de Favoritos */}
      {favoriteProducts.length > 0 ? (
        <FlatList
          data={favoriteProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={onProductPress}
              onFavorite={handleRemoveFavorite}
              isFavorited={user ? isFavorited(item.id, user.id) : false}
            />
          )}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="heart-outline" size={64} color="#d1d5db" />
          <ThemedText style={styles.emptyText}>Sem favoritos ainda</ThemedText>
          <ThemedText style={styles.emptySubText}>
            Clique no coração para adicionar produtos aos favoritos
          </ThemedText>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  placeholder: {
    width: 28,
  },
  productList: {
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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