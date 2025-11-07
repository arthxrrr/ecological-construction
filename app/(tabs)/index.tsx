import React, { useState } from 'react';
import { Alert } from 'react-native';

import { ProductDetailModal } from '@/components/ProductDetailModal';
import { HomeScreen } from '@/screens/HomeScreen';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import { Product } from '@/types';

export default function HomePage() {
  const { user } = useAuthStore();
  const { addItem } = useCartStore();
  const { addFavorite, removeFavorite, isFavorited, favorites } = useFavoriteStore();
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Criar um Set de IDs de favoritos do usuário atual para melhor performance
  const favoriteIds = new Set<number>(
    user ? favorites
      .filter(fav => fav.user_id === user.id)
      .map(fav => fav.product_id) : []
  );

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    addItem(product, quantity);
  };

  const handleFavorite = (product: Product) => {
    if (!user) {
      Alert.alert('Atenção', 'Você precisa estar logado para adicionar favoritos');
      return;
    }

    if (isFavorited(product.id, user.id)) {
      removeFavorite(product.id, user.id);
    } else {
      addFavorite({
        id: Date.now() + Math.floor(Math.random() * 1000),
        user_id: user.id,
        product_id: product.id,
        created_at: new Date().toISOString(),
      });
    }
  };

  return (
    <>
      <HomeScreen
        onProductPress={handleProductPress}
        onFavorite={handleFavorite}
        favoriteIds={favoriteIds}
      />
      <ProductDetailModal
        visible={modalVisible}
        product={selectedProduct}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}
