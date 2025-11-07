import { supabase } from '@/config/supabase';
import { AuthResponse, User } from '@/types';

/**
 * Registrar novo usuário
 */
export const registerUser = async (
  email: string,
  password: string,
  nome: string,
  userData?: Partial<User>,
): Promise<AuthResponse> => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return { user: null, session: null, error: authError.message };
    }

    // Criar perfil do usuário via Supabase Function (bypassa RLS)
    if (authData.user) {
      const { error: funcError } = await supabase.rpc('register_user_profile', {
        user_id: authData.user.id,
        user_email: email,
        user_nome: nome,
        user_cpf: userData?.cpf || null,
        user_cep: userData?.cep || null,
        user_endereco: userData?.endereco || null,
        user_numero: userData?.numero || null,
        user_complemento: userData?.complemento || null,
        user_cidade: userData?.cidade || null,
        user_estado: userData?.estado || null,
        user_telefone: userData?.telefone || null,
      });

      if (funcError) {
        return { user: null, session: null, error: funcError.message };
      }
    }

    return {
      user: {
        id: authData.user?.id || '',
        email,
        nome,
        ...userData,
      },
      session: authData.session,
      error: undefined,
    };
  } catch (error: any) {
    return { user: null, session: null, error: error.message };
  }
};

/**
 * Fazer login
 */
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { user: null, session: null, error: error.message };
    }

    // Buscar dados do usuário
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (userError) {
      return { user: null, session: null, error: userError.message };
    }

    return {
      user: userData,
      session: data.session,
      error: undefined,
    };
  } catch (error: any) {
    return { user: null, session: null, error: error.message };
  }
};

/**
 * Fazer logout
 */
export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    return !error;
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return false;
  }
};

/**
 * Obter usuário atual
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    console.log('[getCurrentUser] Buscando sessão...');
    const { data, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.log('[getCurrentUser] Erro ao buscar sessão:', sessionError);
      return null;
    }
    
    if (!data.session) {
      console.log('[getCurrentUser] Sem sessão ativa');
      return null;
    }

    console.log('[getCurrentUser] Sessão encontrada para usuário:', data.session.user.id);
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.session.user.id)
      .single();

    if (userError) {
      console.log('[getCurrentUser] Erro ao buscar dados do usuário:', userError);
      return null;
    }

    console.log('[getCurrentUser] Usuário encontrado:', userData?.id);
    return userData || null;
  } catch (error) {
    console.error('[getCurrentUser] Erro inesperado:', error);
    return null;
  }
};

/**
 * Atualizar perfil do usuário
 */
export const updateUserProfile = async (userId: string, updates: Partial<User>): Promise<{ user: User | null; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return { user: null, error: error.message };
    }

    return { user: data, error: undefined };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

/**
 * Enviar email de confirmação
 */
export const resendConfirmationEmail = async (email: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * Atualizar endereço completo do usuário
 */
export const updateUserAddress = async (
  userId: string,
  address: {
    cpf?: string;
    cep?: string;
    endereco?: string;
    numero?: string;
    complemento?: string;
    cidade?: string;
    estado?: string;
    telefone?: string;
  },
): Promise<{ user: User | null; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(address)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return { user: null, error: error.message };
    }

    return { user: data, error: undefined };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

/**
 * Validar CPF (simples)
 */
export const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, '');
  return cleanCPF.length === 11 && /^\d+$/.test(cleanCPF);
};

/**
 * Validar CEP
 */
export const validateCEP = (cep: string): boolean => {
  const cleanCEP = cep.replace(/\D/g, '');
  return cleanCEP.length === 8 && /^\d+$/.test(cleanCEP);
};