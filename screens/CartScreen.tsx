import { Button } from '@/components/Button';
import { CartItemCard } from '@/components/CartItemCard';
import { ThemedText } from '@/components/themed-text';
import { BrandColors } from '@/constants/theme';
import { calculateFreight, validateCEP } from '@/services/freightService';
import { CartItem } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';

interface CartScreenProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout?: (frete: number) => void;
  checkoutLoading?: boolean;
}

export const CartScreen = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  checkoutLoading = false,
}: CartScreenProps) => {
  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState<number | null>(null);
  const [freteError, setFreteError] = useState('');
  const [loadingFrete, setLoadingFrete] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.product.preco * item.quantidade, 0);
  const total = subtotal + (frete || 0);

  const handleCalculateFrete = async () => {
    setFreteError('');
    setLoadingFrete(true);

    try {
      if (!validateCEP(cep)) {
        setFreteError('CEP inválido. Use o formato XXXXX-XXX');
        setLoadingFrete(false);
        return;
      }

      const freightInfo = calculateFreight(cep);
      setFrete(freightInfo.valor);
    } catch (error: any) {
      setFreteError(error.message || 'Erro ao calcular frete');
    }

    setLoadingFrete(false);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      setFreteError('Carrinho vazio');
      return;
    }

    if (frete === null) {
      setFreteError('Calcule o frete antes de finalizar');
      return;
    }

    onCheckout?.(frete);
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>Carrinho de Compras</ThemedText>
        </View>

        <View style={styles.emptyState}>
          <Ionicons name="cart" size={64} color="#d1d5db" />
          <ThemedText style={styles.emptyText}>Seu carrinho está vazio</ThemedText>
          <ThemedText style={styles.emptySubText}>
            Volte ao catálogo e adicione produtos!
          </ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={styles.title}>Carrinho de Compras</ThemedText>
      </View>

      {/* Content com FlatList scrollável */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={({ item }) => (
          <CartItemCard
            item={item}
            onUpdateQuantity={(qty) => onUpdateQuantity(item.product.id, qty)}
            onRemove={() => onRemoveItem(item.product.id)}
          />
        )}
        contentContainerStyle={styles.itemsList}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <>
            {/* Cálculo de Frete */}
            <View style={styles.freightSection}>
              <ThemedText style={styles.sectionTitle}>Calcular Frete</ThemedText>

              <View style={styles.freightInput}>
                <Ionicons name="location" size={20} color={BrandColors.primary} />
                <TextInput
                  style={styles.input}
                  placeholder="CEP (ex: 12345-678)"
                  placeholderTextColor="#d1d5db"
                  value={cep}
                  onChangeText={(text) => {
                    const formatted = text.replace(/\D/g, '');
                    if (formatted.length <= 8) {
                      setCep(formatted);
                    }
                  }}
                  maxLength={8}
                />
              </View>

              <Button
                title="Calcular Frete"
                onPress={handleCalculateFrete}
                loading={loadingFrete}
                size="medium"
                style={styles.freteButton}
              />

              {freteError && (
                <ThemedText style={styles.errorText}>{freteError}</ThemedText>
              )}

              {frete !== null && (
                <View style={styles.freteResult}>
                  <ThemedText style={styles.freteLabel}>Frete calculado:</ThemedText>
                  <ThemedText style={styles.freteValue}>
                    R$ {frete.toFixed(2).replace('.', ',')}
                  </ThemedText>
                </View>
              )}
            </View>

            {/* Resumo */}
            <View style={styles.summary}>
              <View style={styles.summaryRow}>
                <ThemedText style={styles.summaryLabel}>Subtotal:</ThemedText>
                <ThemedText style={styles.summaryValue}>
                  R$ {subtotal.toFixed(2).replace('.', ',')}
                </ThemedText>
              </View>

              {frete !== null && (
                <View style={styles.summaryRow}>
                  <ThemedText style={styles.summaryLabel}>Frete:</ThemedText>
                  <ThemedText style={styles.summaryValue}>
                    R$ {frete.toFixed(2).replace('.', ',')}
                  </ThemedText>
                </View>
              )}

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <ThemedText style={styles.totalLabel}>Total:</ThemedText>
                <ThemedText style={styles.totalValue}>
                  R$ {total.toFixed(2).replace('.', ',')}
                </ThemedText>
              </View>
            </View>

            {/* Botão de Checkout */}
            <Button
              title={checkoutLoading ? 'Processando...' : 'Finalizar Compra'}
              onPress={handleCheckout}
              variant="primary"
              size="large"
              icon="card"
              style={styles.checkoutButton}
              disabled={items.length === 0 || frete === null || checkoutLoading}
              loading={checkoutLoading}
            />
          </>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.lightBg,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.border,
    backgroundColor: BrandColors.white,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: BrandColors.secondary,
  },
  itemsList: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
  },
  freightSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: BrandColors.border,
    backgroundColor: BrandColors.white,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: BrandColors.secondary,
    marginBottom: 12,
  },
  freightInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.lightBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: BrandColors.border,
  },
  input: {
    flex: 1,
    height: 44,
    marginLeft: 8,
    fontSize: 14,
    color: BrandColors.secondary,
  },
  freteButton: {
    marginBottom: 8,
  },
  errorText: {
    fontSize: 12,
    color: BrandColors.danger,
    marginVertical: 8,
  },
  freteResult: {
    backgroundColor: '#EBF5EB',
    borderRadius: 8,
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: BrandColors.success,
    marginTop: 8,
  },
  freteLabel: {
    fontSize: 12,
    color: BrandColors.darkGray,
    marginBottom: 2,
  },
  freteValue: {
    fontSize: 14,
    fontWeight: '800',
    color: BrandColors.success,
  },
  summary: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: BrandColors.border,
    backgroundColor: BrandColors.white,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 13,
    color: BrandColors.darkGray,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '700',
    color: BrandColors.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: BrandColors.border,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: BrandColors.secondary,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: BrandColors.primary,
  },
  checkoutButton: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '700',
    color: BrandColors.secondary,
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: BrandColors.darkGray,
    marginTop: 8,
  },
});