import { FavoritesScreen } from '@/screens/FavoritesScreen';
import { useAuthStore } from '@/store/authStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import { Product } from '@/types';
import React from 'react';

export default function FavoritesPage() {
  const { user } = useAuthStore();
  const { removeFavorite, addFavorite, getFavoritesByUser } = useFavoriteStore();

  const handleFavoriteToggle = (product: Product) => {
    if (!user) return;

    const userFavorites = getFavoritesByUser(user.id);
    const isFavorited = userFavorites.some((fav) => fav.product_id === product.id);

    if (isFavorited) {
      removeFavorite(product.id, user.id);
    } else {
      addFavorite({
        id: Date.now(),
        user_id: user.id,
        product_id: product.id,
        created_at: new Date().toISOString(),
      });
    }
  };

  return (
    <FavoritesScreen
      onProductPress={(product) => {
        console.log('Produto clicado:', product);
      }}
      onFavorite={handleFavoriteToggle}
    />
  );
}