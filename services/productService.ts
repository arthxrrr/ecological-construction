import productsData from '@/data/products.json';
import { Product } from '@/types';

/**
 * Obter todos os produtos
 */
export const getAllProducts = (): Product[] => {
  return productsData;
};

/**
 * Obter produto por ID
 */
export const getProductById = (id: number): Product | undefined => {
  return productsData.find((product) => product.id === id);
};

/**
 * Buscar produtos por categoria
 */
export const getProductsByCategory = (category: string): Product[] => {
  return productsData.filter((product) => product.categoria === category);
};

/**
 * Obter todas as categorias
 */
export const getAllCategories = (): string[] => {
  const categories = new Set(productsData.map((product) => product.categoria));
  return Array.from(categories);
};

/**
 * Pesquisar produtos por nome ou descrição
 */
export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return productsData.filter(
    (product) =>
      product.nome.toLowerCase().includes(lowerQuery) ||
      product.descricao?.toLowerCase().includes(lowerQuery),
  );
};

/**
 * Filtrar produtos por faixa de preço
 */
export const filterProductsByPrice = (minPrice: number, maxPrice: number): Product[] => {
  return productsData.filter((product) => product.preco >= minPrice && product.preco <= maxPrice);
};

/**
 * Ordenar produtos
 */
export const sortProducts = (
  products: Product[],
  sortBy: 'preco-asc' | 'preco-desc' | 'nome',
): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case 'preco-asc':
      return sorted.sort((a, b) => a.preco - b.preco);
    case 'preco-desc':
      return sorted.sort((a, b) => b.preco - a.preco);
    case 'nome':
      return sorted.sort((a, b) => a.nome.localeCompare(b.nome));
    default:
      return sorted;
  }
};