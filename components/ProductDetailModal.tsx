import { BrandColors } from '@/constants/theme';
import { Product } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { ThemedText } from './themed-text';

interface ProductDetailModalProps {
  visible: boolean;
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal = ({
  visible,
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    Alert.alert(
      'Sucesso',
      `${quantity}x ${product.nome} adicionado(s) ao carrinho!`,
      [
        {
          text: 'Continuar Comprando',
          onPress: () => {
            setQuantity(1);
            onClose();
          },
        },
        {
          text: 'Ir para Carrinho',
          onPress: () => {
            setQuantity(1);
            onClose();
            // O componente pai pode lidar com navegação
          },
        },
      ]
    );
  };

  const handleClose = () => {
    setQuantity(1);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="chevron-back" size={28} color={BrandColors.secondary} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Detalhes do Produto</ThemedText>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Imagem do Produto */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.imagem }}
              style={styles.image}
              contentFit="cover"
            />
            {/* Badge de Categoria */}
            <View style={styles.categoryBadge}>
              <ThemedText style={styles.categoryText}>{product.categoria}</ThemedText>
            </View>
          </View>

          {/* Informações do Produto */}
          <View style={styles.infoContainer}>
            {/* Nome */}
            <ThemedText style={styles.name}>{product.nome}</ThemedText>

            {/* Preço */}
            <ThemedText style={styles.price}>
              R$ {product.preco.toFixed(2).replace('.', ',')}
            </ThemedText>

            {/* Descrição */}
            {product.descricao && (
              <View style={styles.descriptionContainer}>
                <ThemedText style={styles.descriptionLabel}>Descrição</ThemedText>
                <ThemedText style={styles.description}>{product.descricao}</ThemedText>
              </View>
            )}

            {/* Quantidade */}
            <View style={styles.quantityContainer}>
              <ThemedText style={styles.quantityLabel}>Quantidade</ThemedText>
              <View style={styles.quantityControl}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Ionicons name="remove" size={20} color={BrandColors.primary} />
                </TouchableOpacity>

                <View style={styles.quantityDisplay}>
                  <ThemedText style={styles.quantityValue}>{quantity}</ThemedText>
                </View>

                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Ionicons name="add" size={20} color={BrandColors.primary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Subtotal */}
            <View style={styles.subtotalContainer}>
              <ThemedText style={styles.subtotalLabel}>Subtotal</ThemedText>
              <ThemedText style={styles.subtotalValue}>
                R$ {(product.preco * quantity).toFixed(2).replace('.', ',')}
              </ThemedText>
            </View>
          </View>
        </ScrollView>

        {/* Footer com Botões */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <Ionicons name="cart" size={20} color="#ffffff" style={styles.cartIcon} />
            <ThemedText style={styles.addToCartText}>Adicionar ao Carrinho</ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.lightBg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.border,
    backgroundColor: BrandColors.white,
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: BrandColors.secondary,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    backgroundColor: BrandColors.white,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
    backgroundColor: BrandColors.lightBg,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: BrandColors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: BrandColors.white,
  },
  infoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: BrandColors.secondary,
    marginBottom: 8,
  },
  price: {
    fontSize: 26,
    fontWeight: '800',
    color: BrandColors.primary,
    marginBottom: 16,
  },
  descriptionContainer: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.border,
  },
  descriptionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: BrandColors.darkGray,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    color: BrandColors.secondary,
    lineHeight: 20,
  },
  quantityContainer: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.border,
  },
  quantityLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: BrandColors.darkGray,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.lightBg,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: BrandColors.border,
  },
  quantityButton: {
    padding: 8,
    borderRadius: 4,
  },
  quantityDisplay: {
    minWidth: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: '800',
    color: BrandColors.secondary,
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: BrandColors.lightBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BrandColors.border,
  },
  subtotalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: BrandColors.darkGray,
  },
  subtotalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: BrandColors.primary,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: BrandColors.border,
    backgroundColor: BrandColors.white,
  },
  addToCartButton: {
    backgroundColor: BrandColors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartIcon: {
    marginRight: 8,
  },
  addToCartText: {
    fontSize: 14,
    fontWeight: '800',
    color: BrandColors.white,
  },
});