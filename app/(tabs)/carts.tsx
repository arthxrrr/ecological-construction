import React, { useState } from 'react';
import { Alert, Modal, View } from 'react-native';

import { CustomCheckout } from '@/components/CustomCheckout';
import { CartScreen } from '@/screens/CartScreen';
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

  const handleProcessPayment = async () => {
    setLoading(true);

    try {
      // Simular processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 1500));

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