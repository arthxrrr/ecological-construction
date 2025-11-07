import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert } from 'react-native';

import { AuthScreen } from '@/screens/AuthScreen';
import { loginUser, registerUser } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError('');

      const response = await loginUser(email, password);

      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.user) {
        setUser(response.user);
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string, nome: string) => {
    try {
      setLoading(true);
      setError('');

      const response = await registerUser(email, password, nome);

      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.user) {
        setUser(response.user);
        Alert.alert('Sucesso', 'Conta criada! Verifique seu email para confirmar.');
        // Redirecionar após confirmação
        // router.replace('/(tabs)');
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreen
      isLogin={isLogin}
      loading={loading}
      error={error}
      onLogin={handleLogin}
      onRegister={handleRegister}
      onToggleAuthMode={() => {
        setError('');
        setIsLogin(!isLogin);
      }}
    />
  );
}