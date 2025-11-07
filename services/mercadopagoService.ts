import { MERCADOPAGO_CONFIG } from '@/config/mercadopago';
import { Order } from '@/types';
import axios from 'axios';

const mp = axios.create({
  baseURL: MERCADOPAGO_CONFIG.API_BASE_URL,
  headers: {
    Authorization: `Bearer ${MERCADOPAGO_CONFIG.ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

/**
 * Criar preferência de pagamento no MercadoPago
 */
export const createPaymentPreference = async (order: Order) => {
  try {
    // Preparar itens para o MercadoPago
    const items = order.items.map((item) => ({
      title: item.product.nome,
      unit_price: item.product.preco,
      quantity: item.quantidade,
      currency_id: 'BRL',
    }));

    // Adicionar frete como item
    if (order.frete > 0) {
      items.push({
        title: 'Frete',
        unit_price: order.frete,
        quantity: 1,
        currency_id: 'BRL',
      });
    }

    const preference = {
      items,
      payer: {
        email: 'cliente@example.com', // Será substituído pelo email real do usuário
      },
      back_urls: {
        success: 'ecologicalconstruction://payment-success',
        failure: 'ecologicalconstruction://payment-failure',
        pending: 'ecologicalconstruction://payment-pending',
      },
      auto_return: 'approved',
      external_reference: order.id,
      notification_url: MERCADOPAGO_CONFIG.WEBHOOK_URL,
      payment_methods: {
        default_payment_method_id: 'account_money',
        default_installments: 1,
      },
    };

    const response = await mp.post('/checkout/preferences', preference);

    return {
      success: true,
      preferenceId: response.data.id,
      initPoint: response.data.init_point,
      paymentLink: response.data.init_point,
    };
  } catch (error: any) {
    console.error('Erro ao criar preferência de pagamento:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

/**
 * Obter status do pagamento
 */
export const getPaymentStatus = async (paymentId: string) => {
  try {
    const response = await mp.get(`/v1/payments/${paymentId}`);

    return {
      success: true,
      status: response.data.status,
      statusDetail: response.data.status_detail,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Erro ao obter status do pagamento:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

/**
 * Criar token do cartão (para usar na API de pagamentos)
 * NOTA: Em produção, isso deve ser feito no backend seguro
 */
export const createCardToken = async (
  cardNumber: string,
  cardholderName: string,
  expirationMonth: string,
  expirationYear: string,
  securityCode: string,
) => {
  try {
    // Dados do cartão formatados para MP
    const cardData = {
      number: cardNumber,
      holder_name: cardholderName,
      expiration_month: parseInt(expirationMonth),
      expiration_year: parseInt(expirationYear),
      security_code: securityCode,
    };

    // Usar endpoint de tokenização do MP
    const response = await mp.post('/v1/card_tokens', cardData);

    return {
      success: true,
      token: response.data.id,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Erro ao criar token do cartão:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Erro ao processar cartão',
    };
  }
};

/**
 * Processar pagamento com cartão tokenizado
 * NOTA: Em produção, isso deve ser feito no backend seguro
 */
export const processCardPayment = async (
  token: string,
  amount: number,
  installments: number,
  email: string,
  externalReference: string,
  description: string,
) => {
  try {
    const payment = {
      token: token,
      transaction_amount: amount,
      installments: installments,
      payment_method_id: 'credit_card',
      payer: {
        email: email,
      },
      external_reference: externalReference,
      description: description,
    };

    const response = await mp.post('/v1/payments', payment);

    return {
      success: true,
      paymentId: response.data.id,
      status: response.data.status,
      statusDetail: response.data.status_detail,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Erro ao processar pagamento:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Erro ao processar pagamento',
    };
  }
};

/**
 * Criar pagamento com cartão (para testes)
 * NOTA: Em produção, isso deve ser feito no backend seguro
 */
export const createTestPayment = async (
  amount: number,
  externalReference: string,
) => {
  try {
    const payment = {
      transaction_amount: amount,
      payment_method_id: 'account_money',
      external_reference: externalReference,
      description: 'Pagamento de compra na Ecological Construction',
      payer: {
        email: 'test@mercadopago.com',
      },
    };

    const response = await mp.post('/v1/payments', payment);

    return {
      success: true,
      paymentId: response.data.id,
      status: response.data.status,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Erro ao criar pagamento de teste:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

/**
 * Processar webhook do MercadoPago
 */
export const processPaymentWebhook = async (data: any) => {
  try {
    // Validar assinatura do webhook
    const { id, type, action } = data;

    if (type === 'payment' && action === 'payment.created') {
      // Buscar detalhes do pagamento
      const paymentDetails = await getPaymentStatus(id);

      if (paymentDetails.success) {
        // Atualizar status do pedido no banco de dados
        const { external_reference, status, status_detail } = paymentDetails.data;

        return {
          success: true,
          orderId: external_reference,
          paymentStatus: status,
          paymentDetail: status_detail,
        };
      }
    }

    return { success: false, error: 'Webhook inválido' };
  } catch (error: any) {
    console.error('Erro ao processar webhook:', error);
    return { success: false, error: error.message };
  }
};

/**
 * ⏳ PIX - EM BREVE
 * As funções abaixo serão ativadas quando a integração PIX for necessária
 */

// export const createPixPayment = async (
//   amount: number,
//   email: string,
//   externalReference: string,
//   description: string,
// ) => {
//   try {
//     const payment = {
//       transaction_amount: amount,
//       payment_method_id: 'pix',
//       payer: {
//         email: email,
//       },
//       external_reference: externalReference,
//       description: description,
//     };
//
//     const response = await mp.post('/v1/payments', payment);
//
//     return {
//       success: true,
//       paymentId: response.data.id,
//       status: response.data.status,
//       point_of_interaction: response.data.point_of_interaction,
//       qrCode: response.data.point_of_interaction?.qr_code,
//       qrCodeUrl: response.data.point_of_interaction?.qr_code_url,
//       expiresIn: response.data.point_of_interaction?.transaction_data?.expiration_date,
//       data: response.data,
//     };
//   } catch (error: any) {
//     console.error('Erro ao criar pagamento PIX:', error);
//     return {
//       success: false,
//       error: error.response?.data?.message || error.message || 'Erro ao gerar PIX',
//     };
//   }
// };
//
// /**
//  * Verificar status do PIX
//  */
// export const checkPixStatus = async (paymentId: string) => {
//   try {
//     const response = await mp.get(`/v1/payments/${paymentId}`);
//
//     return {
//       success: true,
//       status: response.data.status,
//       statusDetail: response.data.status_detail,
//       isPaid: response.data.status === 'approved',
//       data: response.data,
//     };
//   } catch (error: any) {
//     console.error('Erro ao verificar PIX:', error);
//     return {
//       success: false,
//       error: error.response?.data?.message || error.message,
//     };
//   }
// };

/**
 * Formatar valores monetários
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};