import { Favorite } from '@/types';
import { create } from 'zustand';

interface FavoriteStore {
  favorites: Favorite[];
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (productId: number, userId: string) => void;
  isFavorited: (productId: number, userId: string) => boolean;
  getFavoritesByUser: (userId: string) => Favorite[];
  clearFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],

  addFavorite: (favorite) =>
    set((state) => {
      // Verificar se já existe
      const exists = state.favorites.find(
        (f) => f.product_id === favorite.product_id && f.user_id === favorite.user_id,
      );
      if (exists) return state;

      return { favorites: [...state.favorites, favorite] };
    }),

  removeFavorite: (productId, userId) =>
    set((state) => ({
      favorites: state.favorites.filter(
        (f) => !(f.product_id === productId && f.user_id === userId),
      ),
    })),

  isFavorited: (productId, userId) => {
    const state = get();
    return state.favorites.some((f) => f.product_id === productId && f.user_id === userId);
  },

  getFavoritesByUser: (userId) => {
    const state = get();
    return state.favorites.filter((f) => f.user_id === userId);
  },

  clearFavorites: () =>
    set({
      favorites: [],
    }),
}));