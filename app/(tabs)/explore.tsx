import { CategoriesExploreScreen } from '@/screens/CategoriesExploreScreen';
import { useFavoriteStore } from '@/store/favoriteStore';
import React from 'react';

export default function ExplorePage() {
  const { favoriteIds } = useFavoriteStore();

  const handleProductPress = (product: any) => {
    // Navegar para detalhes do produto se houver rota
    console.log('Produto selecionado:', product);
  };

  const handleFavorite = (product: any) => {
    // Lógica de favoritos seria implementada aqui
    console.log('Favorito toggled:', product.id);
  };

  return (
    <CategoriesExploreScreen
      onProductPress={handleProductPress}
      onFavorite={handleFavorite}
      favoriteIds={favoriteIds}
    />
  );
}
