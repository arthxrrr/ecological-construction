import { Button } from '@/components/Button';
import { ThemedText } from '@/components/themed-text';
import { BrandColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface AuthScreenProps {
  onLogin?: (email: string, password: string) => void;
  onRegister?: (email: string, password: string, nome: string) => void;
  onToggleAuthMode?: () => void;
  isLogin?: boolean;
  loading?: boolean;
  error?: string;
}

export const AuthScreen = ({
  onLogin,
  onRegister,
  onToggleAuthMode,
  isLogin = true,
  loading = false,
  error = '',
}: AuthScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nome, setNome] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {
    if (isLogin) {
      onLogin?.(email, password);
    } else {
      if (password !== confirmPassword) {
        alert('As senhas não coincidem');
        return;
      }
      onRegister?.(email, password, nome);
    }
  };

  const isFormValid =
    email.length > 0 && password.length >= 6 && (isLogin || (nome.length > 0 && confirmPassword === password));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Ionicons name="leaf" size={60} color={BrandColors.white} />
          </View>
          <ThemedText style={styles.appName}>Ecological Construction</ThemedText>
          <ThemedText style={styles.tagline}>Construção Sustentável</ThemedText>
        </View>

        {/* Card de Autenticação */}
        <View style={styles.card}>
          <ThemedText style={styles.title}>
            {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
          </ThemedText>

          {error && (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={16} color="#ef4444" />
              <ThemedText style={styles.errorText}>{error}</ThemedText>
            </View>
          )}

          {/* Formulário */}
          {!isLogin && (
            <View style={styles.formGroup}>
              <ThemedText style={styles.label}>Nome Completo</ThemedText>
              <View style={styles.inputContainer}>
                <Ionicons name="person" size={18} color="#9ca3af" />
                <TextInput
                  style={styles.input}
                  placeholder="Seu nome"
                  placeholderTextColor="#d1d5db"
                  value={nome}
                  onChangeText={setNome}
                  editable={!loading}
                />
              </View>
            </View>
          )}

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <View style={styles.inputContainer}>
              <Ionicons name="mail" size={18} color="#9ca3af" />
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                placeholderTextColor="#d1d5db"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Senha</ThemedText>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed" size={18} color="#9ca3af" />
              <TextInput
                style={styles.input}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor="#d1d5db"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={!loading}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={18}
                  color="#9ca3af"
                />
              </TouchableOpacity>
            </View>
          </View>

          {!isLogin && (
            <View style={styles.formGroup}>
              <ThemedText style={styles.label}>Confirmar Senha</ThemedText>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed" size={18} color="#9ca3af" />
                <TextInput
                  style={styles.input}
                  placeholder="Confirme sua senha"
                  placeholderTextColor="#d1d5db"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  editable={!loading}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons
                    name={showConfirmPassword ? 'eye' : 'eye-off'}
                    size={18}
                    color="#9ca3af"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Botão Submit */}
          <Button
            title={isLogin ? 'Entrar' : 'Criar Conta'}
            onPress={handleSubmit}
            variant="primary"
            size="large"
            loading={loading}
            disabled={!isFormValid}
            style={styles.submitButton}
          />

          {/* Divider */}
          <View style={styles.divider} />

          {/* Toggle Auth Mode */}
          <View style={styles.toggleContainer}>
            <ThemedText style={styles.toggleText}>
              {isLogin ? 'Não tem conta? ' : 'Já tem conta? '}
            </ThemedText>
            <TouchableOpacity onPress={onToggleAuthMode}>
              <ThemedText style={styles.toggleLink}>
                {isLogin ? 'Cadastre-se aqui' : 'Faça login'}
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Aviso sobre Email */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={16} color="#0ea5e9" />
            <ThemedText style={styles.infoText}>
              Você receberá um email de confirmação. Verifique sua caixa de entrada.
            </ThemedText>
          </View>
        </View>

        {/* Termos */}
        <View style={styles.termsContainer}>
          <ThemedText style={styles.termsText}>
            Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.white,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  logoIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: BrandColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: '800',
    color: BrandColors.primary,
    marginTop: 20,
  },
  tagline: {
    fontSize: 14,
    color: BrandColors.darkGray,
    marginTop: 6,
  },
  card: {
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: BrandColors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BrandColors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: BrandColors.secondary,
    marginBottom: 20,
  },
  errorBox: {
    flexDirection: 'row',
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    gap: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#991b1b',
    flex: 1,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: BrandColors.darkGray,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.lightBg,
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: BrandColors.border,
    height: 48,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: BrandColors.secondary,
  },
  submitButton: {
    marginTop: 20,
  },
  divider: {
    height: 1,
    backgroundColor: BrandColors.border,
    marginVertical: 24,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleText: {
    fontSize: 14,
    color: BrandColors.darkGray,
  },
  toggleLink: {
    fontSize: 14,
    fontWeight: '700',
    color: BrandColors.primary,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#FFEEDC',
    borderRadius: 10,
    padding: 12,
    gap: 10,
    borderLeftWidth: 4,
    borderLeftColor: BrandColors.primary,
  },
  infoText: {
    fontSize: 12,
    color: '#6B4423',
    flex: 1,
  },
  termsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  termsText: {
    fontSize: 11,
    color: BrandColors.darkGray,
    textAlign: 'center',
    lineHeight: 18,
  },
});