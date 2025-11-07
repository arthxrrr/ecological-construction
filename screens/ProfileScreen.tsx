import { Button } from '@/components/Button';
import { ThemedText } from '@/components/themed-text';
import { User } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface ProfileScreenProps {
  user: User | null;
  onUpdateProfile?: (updates: Partial<User>) => void;
  onLogout?: () => void;
  onViewOrders?: () => void;
  onViewFavorites?: () => void;
  onSupport?: () => void;
}

export const ProfileScreen = ({
  user,
  onUpdateProfile,
  onLogout,
  onViewOrders,
  onViewFavorites,
  onSupport,
}: ProfileScreenProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleSave = () => {
    onUpdateProfile?.(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setFormData(user);
    }
    setIsEditing(false);
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Ionicons name="person-circle" size={64} color="#d1d5db" />
          <ThemedText style={styles.emptyText}>Não autenticado</ThemedText>
          <ThemedText style={styles.emptySubText}>
            Faça login para acessar seu perfil
          </ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileHeader}>
            <Ionicons name="person-circle" size={80} color="#10b981" />
            <View style={styles.userInfo}>
              <ThemedText style={styles.userName}>{user.nome || 'Usuário'}</ThemedText>
              <ThemedText style={styles.userEmail}>{user.email}</ThemedText>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setIsEditing(!isEditing)}
            style={styles.editButton}
          >
            <Ionicons
              name={isEditing ? 'close' : 'pencil'}
              size={20}
              color="#10b981"
            />
          </TouchableOpacity>
        </View>

        {/* Dados Pessoais */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Informações Pessoais</ThemedText>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Nome</ThemedText>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={formData.nome || ''}
              onChangeText={(text) => setFormData({ ...formData, nome: text })}
              editable={isEditing}
              placeholder="Seu nome"
              placeholderTextColor="#d1d5db"
            />
          </View>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>CPF</ThemedText>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={formData.cpf || ''}
              onChangeText={(text) => setFormData({ ...formData, cpf: text })}
              editable={isEditing}
              placeholder="123.456.789-00"
              placeholderTextColor="#d1d5db"
              maxLength={14}
            />
          </View>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Telefone</ThemedText>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={formData.telefone || ''}
              onChangeText={(text) => setFormData({ ...formData, telefone: text })}
              editable={isEditing}
              placeholder="(11) 99999-9999"
              placeholderTextColor="#d1d5db"
              maxLength={15}
            />
          </View>
        </View>

        {/* Endereço */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Endereço</ThemedText>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>CEP</ThemedText>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={formData.cep || ''}
              onChangeText={(text) => setFormData({ ...formData, cep: text })}
              editable={isEditing}
              placeholder="12345-678"
              placeholderTextColor="#d1d5db"
              maxLength={9}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, styles.flex]}>
              <ThemedText style={styles.label}>Rua</ThemedText>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={formData.endereco || ''}
                onChangeText={(text) => setFormData({ ...formData, endereco: text })}
                editable={isEditing}
                placeholder="Rua..."
                placeholderTextColor="#d1d5db"
              />
            </View>

            <View style={[styles.formGroup, { flex: 0.3 }]}>
              <ThemedText style={styles.label}>Número</ThemedText>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={formData.numero || ''}
                onChangeText={(text) => setFormData({ ...formData, numero: text })}
                editable={isEditing}
                placeholder="123"
                placeholderTextColor="#d1d5db"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Complemento</ThemedText>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={formData.complemento || ''}
              onChangeText={(text) => setFormData({ ...formData, complemento: text })}
              editable={isEditing}
              placeholder="Apto 123"
              placeholderTextColor="#d1d5db"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, styles.flex]}>
              <ThemedText style={styles.label}>Cidade</ThemedText>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={formData.cidade || ''}
                onChangeText={(text) => setFormData({ ...formData, cidade: text })}
                editable={isEditing}
                placeholder="São Paulo"
                placeholderTextColor="#d1d5db"
              />
            </View>

            <View style={[styles.formGroup, { flex: 0.2 }]}>
              <ThemedText style={styles.label}>Estado</ThemedText>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={formData.estado || ''}
                onChangeText={(text) => setFormData({ ...formData, estado: text })}
                editable={isEditing}
                placeholder="SP"
                placeholderTextColor="#d1d5db"
                maxLength={2}
              />
            </View>
          </View>
        </View>

        {/* Ações Rápidas */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Minha Conta</ThemedText>

          <TouchableOpacity style={styles.menuItem} onPress={onViewOrders}>
            <Ionicons name="receipt" size={20} color="#10b981" />
            <ThemedText style={styles.menuText}>Meus Pedidos</ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={onViewFavorites}>
            <Ionicons name="heart" size={20} color="#10b981" />
            <ThemedText style={styles.menuText}>Favoritos</ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={onSupport}>
            <Ionicons name="help-circle" size={20} color="#10b981" />
            <ThemedText style={styles.menuText}>Suporte</ThemedText>
            <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
          </TouchableOpacity>
        </View>

        {/* Botões */}
        {isEditing ? (
          <View style={styles.buttonGroup}>
            <Button
              title="Salvar Alterações"
              onPress={handleSave}
              variant="primary"
              size="large"
              style={styles.button}
            />
            <Button
              title="Cancelar"
              onPress={handleCancel}
              variant="outline"
              size="large"
              style={styles.button}
            />
          </View>
        ) : (
          <View style={styles.buttonGroup}>
            <Button
              title="Sair da Conta"
              onPress={onLogout || (() => {})}
              variant="danger"
              size="large"
              icon="log-out"
              style={styles.button}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  userEmail: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  editButton: {
    padding: 8,
  },
  section: {
    backgroundColor: '#ffffff',
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },
  formGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  inputDisabled: {
    backgroundColor: '#f9fafb',
    color: '#6b7280',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginHorizontal: 12,
  },
  buttonGroup: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
  button: {
    width: '100%',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
  },
});