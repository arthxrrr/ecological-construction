import React, { useState } from 'react';
import { Alert, Modal, View } from 'react-native';

import { CardData, CustomCheckout } from '@/components/CustomCheckout';
import { CartScreen } from '@/screens/CartScreen';
import { createCardToken, processCardPayment } from '@/services/mercadopagoService';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

export default function CartsPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [currentFrete, setCurrentFrete] = useState(0);

  const handleCheckout = async (frete: number) => {
    if (!user) {
      Alert.alert('Erro', 'Você precisa estar logado para finalizar a compra');
      return;
    }

    if (items.length === 0) {
      Alert.alert('Erro', 'Seu carrinho está vazio');
      return;
    }

    setCurrentFrete(frete);
    setShowCheckout(true);
  };

  const handleProcessPayment = async (cardData: CardData) => {
    setLoading(true);

    try {
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      // Calcular total
      const totalSubtotal = items.reduce((sum, item) => sum + item.product.preco * item.quantidade, 0);
      const total = totalSubtotal + currentFrete;
      const orderId = `order-${Date.now()}`;

      // Passo 1: Criar token do cartão
      const tokenResult = await createCardToken(
        cardData.cardNumber,
        cardData.cardholderName,
        cardData.expirationMonth,
        cardData.expirationYear,
        cardData.securityCode,
      );

      if (!tokenResult.success) {
        throw new Error(tokenResult.error || 'Erro ao processar cartão');
      }

      // Passo 2: Processar pagamento com o token
      const paymentResult = await processCardPayment(
        tokenResult.token!,
        total,
        cardData.installments,
        cardData.email,
        orderId,
        `Compra #${orderId} - Ecological Construction`,
      );

      if (paymentResult.success) {
        // Pagamento aprovado
        if (paymentResult.status === 'approved') {
          Alert.alert(
            'Pagamento Aprovado ✅',
            'Seu pedido foi realizado com sucesso! Você receberá um email de confirmação.',
            [
              {
                text: 'OK',
                onPress: () => {
                  clearCart();
                  setShowCheckout(false);
                },
              },
            ],
          );
        } else if (paymentResult.status === 'pending') {
          Alert.alert(
            'Pagamento Pendente ⏳',
            'Seu pagamento está sendo processado. Você receberá uma confirmação em breve.',
            [
              {
                text: 'OK',
                onPress: () => {
                  setShowCheckout(false);
                },
              },
            ],
          );
        } else {
          Alert.alert(
            'Pagamento não aprovado',
            `Status: ${paymentResult.statusDetail || paymentResult.status}`,
          );
        }
      } else {
        throw new Error(paymentResult.error || 'Erro ao processar pagamento');
      }
    } catch (error: any) {
      Alert.alert(
        'Erro no Pagamento',
        error.message || 'Ocorreu um erro ao processar seu pagamento. Tente novamente.',
      );
    } finally {
      setLoading(false);
    }
  };

  const totalSubtotal = items.reduce((sum, item) => sum + item.product.preco * item.quantidade, 0);

  return (
    <>
      <CartScreen
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
        checkoutLoading={loading}
      />

      <Modal
        visible={showCheckout}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => !loading && setShowCheckout(false)}
      >
        <View style={{ flex: 1 }}>
          <CustomCheckout
            total={totalSubtotal}
            frete={currentFrete}
            isLoading={loading}
            onProcessPayment={handleProcessPayment}
            onPaymentSuccess={() => {
              clearCart();
              setShowCheckout(false);
            }}
            onPaymentFailure={(error) => {
              Alert.alert('Erro', error);
            }}
            onClose={() => {
              if (!loading) {
                setShowCheckout(false);
              }
            }}
          />
        </View>
      </Modal>
    </>
  );
}