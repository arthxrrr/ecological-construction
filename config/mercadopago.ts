// Configuração do MercadoPago
// Usa variáveis de ambiente do .env
export const MERCADOPAGO_CONFIG = {
  ACCESS_TOKEN: process.env.EXPO_PUBLIC_MERCADOPAGO_ACCESS_TOKEN || '',
  PUBLIC_KEY: process.env.EXPO_PUBLIC_MERCADOPAGO_PUBLIC_KEY || '',
  WEBHOOK_SIGNATURE: process.env.EXPO_PUBLIC_MERCADOPAGO_WEBHOOK_SIGNATURE || '',
  API_BASE_URL: 'https://api.mercadopago.com',
  WEBHOOK_URL: process.env.EXPO_PUBLIC_WEBHOOK_URL || 'http://localhost:3000/api/webhook/mercadopago',
};

export const initMercadoPago = () => {
  // Inicializar MercadoPago SDK aqui se necessário
  console.log('MercadoPago iniciado');
  console.log('Webhook URL:', MERCADOPAGO_CONFIG.WEBHOOK_URL);
};