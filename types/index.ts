// Tipos do Produto
export interface Product {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  imagem: string;
  imagemBanner?: string; // URL da imagem para exibição no banner
  descricao?: string;
  destaque?: boolean;
  desconto?: number; // Percentual de desconto (ex: 10 para 10%)
  precoOriginal?: number;
  iconeCategoria?: string; // Nome do ícone ionicons para a categoria
}

// Tipos do Carrinho
export interface CartItem {
  product: Product;
  quantidade: number;
}

// Tipos do Usuário
export interface User {
  id: string;
  email: string;
  nome?: string;
  cpf?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  cidade?: string;
  estado?: string;
  telefone?: string;
  created_at?: string;
  updated_at?: string;
}

// Tipos de Autenticação
export interface AuthResponse {
  user: User | null;
  session: any;
  error?: string;
}

// Tipos de Pedido
export interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  total: number;
  frete: number;
  status: 'pendente' | 'pagamento_processando' | 'confirmado' | 'enviado' | 'entregue' | 'cancelado';
  created_at: string;
  mercadopago_id?: string;
}

// Tipos de Frete
export interface FreteResponse {
  cep: string;
  valor: number;
  dias_uteis: number;
  transportadora: string;
}

// Tipos de Favorito
export interface Favorite {
  id: number;
  user_id: string;
  product_id: number;
  created_at: string;
}