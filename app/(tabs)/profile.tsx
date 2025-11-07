import { useRouter } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';

import { ProfileScreen } from '@/screens/ProfileScreen';
import { logoutUser, updateUserProfile } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';
import { User } from '@/types';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, setUser } = useAuthStore();

  const handleLogout = async () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
      {
        text: 'Sair',
        onPress: async () => {
          await logoutUser();
          logout();
          router.replace('/(auth)');
        },
        style: 'destructive',
      },
    ]);
  };

  const handleUpdateProfile = async (updates: Partial<User>) => {
    if (!user) return;

    try {
      const response = await updateUserProfile(user.id, updates);

      if (response.error) {
        Alert.alert('Erro', response.error);
        return;
      }

      // Atualizar o usuário no store
      if (response.user) {
        setUser(response.user);
      }

      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao atualizar perfil');
    }
  };

  return (
    <ProfileScreen
      user={user}
      onLogout={handleLogout}
      onUpdateProfile={handleUpdateProfile}
      onViewOrders={() => Alert.alert('Pedidos', 'Funcionalidade em desenvolvimento')}
      onViewFavorites={() => router.push('/favorites')}
      onSupport={() => Alert.alert('Suporte', 'Funcionalidade em desenvolvimento')}
    />
  );
}