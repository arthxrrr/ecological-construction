import { CartItem, Product } from '@/types';
import { create } from 'zustand';

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (product: Product, quantidade: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantidade: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,

  addItem: (product, quantidade) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.product.id === product.id);

      let newItems;
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item,
        );
      } else {
        newItems = [...state.items, { product, quantidade }];
      }

      const newTotal = newItems.reduce((sum, item) => sum + item.product.preco * item.quantidade, 0);

      return { items: newItems, total: newTotal };
    }),

  removeItem: (productId) =>
    set((state) => {
      const newItems = state.items.filter((item) => item.product.id !== productId);
      const newTotal = newItems.reduce((sum, item) => sum + item.product.preco * item.quantidade, 0);
      return { items: newItems, total: newTotal };
    }),

  updateQuantity: (productId, quantidade) =>
    set((state) => {
      let newItems;
      if (quantidade <= 0) {
        newItems = state.items.filter((item) => item.product.id !== productId);
      } else {
        newItems = state.items.map((item) =>
          item.product.id === productId ? { ...item, quantidade } : item,
        );
      }
      const newTotal = newItems.reduce((sum, item) => sum + item.product.preco * item.quantidade, 0);
      return { items: newItems, total: newTotal };
    }),

  clearCart: () =>
    set({
      items: [],
      total: 0,
    }),

  getTotal: () => {
    const state = get();
    return state.items.reduce((sum, item) => sum + item.product.preco * item.quantidade, 0);
  },

  getItemCount: () => {
    const state = get();
    return state.items.reduce((count, item) => count + item.quantidade, 0);
  },
}));