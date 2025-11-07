import { createClient } from '@supabase/supabase-js';

// Suas credenciais do Supabase - USE VARIÁVEIS DE AMBIENTE!
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Credenciais do Supabase não configuradas. Verifique .env');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Função para testar conexão
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    console.log('Supabase conectado:', !error);
    return !error;
  } catch (error) {
    console.error('Erro ao conectar Supabase:', error);
    return false;
  }
};