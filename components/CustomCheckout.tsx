import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface CustomCheckoutProps {
  total: number;
  frete: number;
  onPaymentSuccess: () => void;
  onPaymentFailure: (error: string) => void;
  onClose: () => void;
  isLoading?: boolean;
  onProcessPayment: () => Promise<void>;
}

export const CustomCheckout: React.FC<CustomCheckoutProps> = ({
  total,
  frete,
  onPaymentSuccess,
  onPaymentFailure,
  onClose,
  isLoading = false,
  onProcessPayment,
}) => {
  const [email, setEmail] = useState('');

  const handlePayment = async () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      Alert.alert('Erro', 'Email inválido');
      return;
    }

    try {
      await onProcessPayment();
    } catch (error: any) {
      onPaymentFailure(error.message);
    }
  };

  const subtotal = total;
  const finalTotal = subtotal + frete;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Pagamento</Text>
        <View style={{ width: 24 }} />
      </View>



      {/* Resumo do Pedido */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal:</Text>
          <Text style={styles.summaryValue}>R$ {subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Frete:</Text>
          <Text style={styles.summaryValue}>R$ {frete.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>R$ {finalTotal.toFixed(2)}</Text>
        </View>
      </View>

      {/* Formulário Simplificado */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Confirmação de Compra</Text>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email para Confirmação *</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            editable={!isLoading}
          />
        </View>
      </View>

      {/* Botão de Pagamento */}
      <TouchableOpacity
        style={[styles.paymentButton, isLoading && styles.paymentButtonDisabled]}
        onPress={handlePayment}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.paymentButtonText}>Confirmar Pagamento</Text>
        )}
      </TouchableOpacity>

      {/* Botão Cancelar */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={onClose}
        disabled={isLoading}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  closeButton: {
    padding: 4,
  },
  summaryContainer: {
    margin: 16,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  totalRow: {
    marginBottom: 0,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#d1d5db',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F57C00',
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1f2937',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  installmentsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  installmentButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    alignItems: 'center',
  },
  installmentButtonActive: {
    borderColor: '#F57C00',
    backgroundColor: '#fff3e0',
  },
  installmentText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  installmentTextActive: {
    color: '#F57C00',
  },
  testCardNotice: {
    flexDirection: 'row',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 16,
  },
  testCardText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#92400e',
    flex: 1,
  },
  paymentButton: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
    backgroundColor: '#F57C00',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  paymentButtonDisabled: {
    opacity: 0.6,
  },
  paymentButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  cancelButton: {
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
});