import { FreteResponse } from '@/types';

// Tabela de frete fixa por região (baseada em primeiros 5 dígitos do CEP)
const FRETE_TABLE: Record<string, { valor: number; dias_uteis: number; transportadora: string }> = {
  // São Paulo
  '01': { valor: 15.00, dias_uteis: 3, transportadora: 'Sedex' },
  '02': { valor: 15.00, dias_uteis: 3, transportadora: 'Sedex' },
  '03': { valor: 15.00, dias_uteis: 3, transportadora: 'Sedex' },
  '04': { valor: 15.00, dias_uteis: 3, transportadora: 'Sedex' },
  '05': { valor: 15.00, dias_uteis: 3, transportadora: 'Sedex' },
  '06': { valor: 15.00, dias_uteis: 3, transportadora: 'Sedex' },
  '07': { valor: 15.00, dias_uteis: 3, transportadora: 'Sedex' },
  '08': { valor: 15.00, dias_uteis: 3, transportadora: 'Sedex' },
  '09': { valor: 15.00, dias_uteis: 3, transportadora: 'Sedex' },

  // Rio de Janeiro
  '20': { valor: 18.00, dias_uteis: 4, transportadora: 'PAC' },
  '21': { valor: 18.00, dias_uteis: 4, transportadora: 'PAC' },
  '22': { valor: 18.00, dias_uteis: 4, transportadora: 'PAC' },
  '23': { valor: 18.00, dias_uteis: 4, transportadora: 'PAC' },
  '24': { valor: 18.00, dias_uteis: 4, transportadora: 'PAC' },
  '25': { valor: 18.00, dias_uteis: 4, transportadora: 'PAC' },
  '26': { valor: 18.00, dias_uteis: 4, transportadora: 'PAC' },
  '27': { valor: 18.00, dias_uteis: 4, transportadora: 'PAC' },
  '28': { valor: 18.00, dias_uteis: 4, transportadora: 'PAC' },

  // Minas Gerais
  '30': { valor: 20.00, dias_uteis: 5, transportadora: 'PAC' },
  '31': { valor: 20.00, dias_uteis: 5, transportadora: 'PAC' },
  '32': { valor: 20.00, dias_uteis: 5, transportadora: 'PAC' },
  '33': { valor: 20.00, dias_uteis: 5, transportadora: 'PAC' },
  '34': { valor: 20.00, dias_uteis: 5, transportadora: 'PAC' },
  '35': { valor: 20.00, dias_uteis: 5, transportadora: 'PAC' },
  '36': { valor: 20.00, dias_uteis: 5, transportadora: 'PAC' },
  '37': { valor: 20.00, dias_uteis: 5, transportadora: 'PAC' },
  '38': { valor: 20.00, dias_uteis: 5, transportadora: 'PAC' },
  '39': { valor: 20.00, dias_uteis: 5, transportadora: 'PAC' },

  // Bahia
  '40': { valor: 25.00, dias_uteis: 6, transportadora: 'PAC' },
  '41': { valor: 25.00, dias_uteis: 6, transportadora: 'PAC' },
  '42': { valor: 25.00, dias_uteis: 6, transportadora: 'PAC' },
  '44': { valor: 25.00, dias_uteis: 6, transportadora: 'PAC' },
  '45': { valor: 25.00, dias_uteis: 6, transportadora: 'PAC' },
  '46': { valor: 25.00, dias_uteis: 6, transportadora: 'PAC' },
  '47': { valor: 25.00, dias_uteis: 6, transportadora: 'PAC' },
  '48': { valor: 25.00, dias_uteis: 6, transportadora: 'PAC' },
  '49': { valor: 25.00, dias_uteis: 6, transportadora: 'PAC' },

  // Ceará
  '60': { valor: 28.00, dias_uteis: 7, transportadora: 'PAC' },
  '61': { valor: 28.00, dias_uteis: 7, transportadora: 'PAC' },
  '62': { valor: 28.00, dias_uteis: 7, transportadora: 'PAC' },
  '63': { valor: 28.00, dias_uteis: 7, transportadora: 'PAC' },
  '64': { valor: 28.00, dias_uteis: 7, transportadora: 'PAC' },
  '65': { valor: 28.00, dias_uteis: 7, transportadora: 'PAC' },
  '66': { valor: 28.00, dias_uteis: 7, transportadora: 'PAC' },
  '67': { valor: 28.00, dias_uteis: 7, transportadora: 'PAC' },
  '68': { valor: 28.00, dias_uteis: 7, transportadora: 'PAC' },
  '69': { valor: 28.00, dias_uteis: 7, transportadora: 'PAC' },

  // Pernambuco
  '50': { valor: 26.00, dias_uteis: 6, transportadora: 'PAC' },
  '51': { valor: 26.00, dias_uteis: 6, transportadora: 'PAC' },
  '52': { valor: 26.00, dias_uteis: 6, transportadora: 'PAC' },
  '53': { valor: 26.00, dias_uteis: 6, transportadora: 'PAC' },
  '54': { valor: 26.00, dias_uteis: 6, transportadora: 'PAC' },
  '55': { valor: 26.00, dias_uteis: 6, transportadora: 'PAC' },
  '56': { valor: 26.00, dias_uteis: 6, transportadora: 'PAC' },

  // Distrito Federal
  '70': { valor: 22.00, dias_uteis: 5, transportadora: 'Sedex' },
  '71': { valor: 22.00, dias_uteis: 5, transportadora: 'Sedex' },
  '72': { valor: 22.00, dias_uteis: 5, transportadora: 'Sedex' },

  // Goiás
  '73': { valor: 23.00, dias_uteis: 5, transportadora: 'PAC' },
  '74': { valor: 23.00, dias_uteis: 5, transportadora: 'PAC' },
  '75': { valor: 23.00, dias_uteis: 5, transportadora: 'PAC' },
  '76': { valor: 23.00, dias_uteis: 5, transportadora: 'PAC' },

  // Mato Grosso do Sul
  '79': { valor: 24.00, dias_uteis: 6, transportadora: 'PAC' },

  // Santa Catarina
  '88': { valor: 19.00, dias_uteis: 4, transportadora: 'PAC' },
  '89': { valor: 19.00, dias_uteis: 4, transportadora: 'PAC' },

  // Paraná
  '80': { valor: 17.00, dias_uteis: 3, transportadora: 'Sedex' },
  '81': { valor: 17.00, dias_uteis: 3, transportadora: 'Sedex' },
  '82': { valor: 17.00, dias_uteis: 3, transportadora: 'Sedex' },
  '83': { valor: 17.00, dias_uteis: 3, transportadora: 'Sedex' },
  '84': { valor: 17.00, dias_uteis: 3, transportadora: 'Sedex' },
  '85': { valor: 17.00, dias_uteis: 3, transportadora: 'Sedex' },
  '86': { valor: 17.00, dias_uteis: 3, transportadora: 'Sedex' },
  '87': { valor: 17.00, dias_uteis: 3, transportadora: 'Sedex' },

  // Rio Grande do Sul
  '90': { valor: 21.00, dias_uteis: 4, transportadora: 'PAC' },
  '91': { valor: 21.00, dias_uteis: 4, transportadora: 'PAC' },
  '92': { valor: 21.00, dias_uteis: 4, transportadora: 'PAC' },
  '93': { valor: 21.00, dias_uteis: 4, transportadora: 'PAC' },
  '94': { valor: 21.00, dias_uteis: 4, transportadora: 'PAC' },
  '95': { valor: 21.00, dias_uteis: 4, transportadora: 'PAC' },
  '96': { valor: 21.00, dias_uteis: 4, transportadora: 'PAC' },
  '97': { valor: 21.00, dias_uteis: 4, transportadora: 'PAC' },
  '98': { valor: 21.00, dias_uteis: 4, transportadora: 'PAC' },
  '99': { valor: 21.00, dias_uteis: 4, transportadora: 'PAC' },
};

/**
 * Calcular frete baseado no CEP
 * @param cep - CEP no formato XXXXX-XXX
 * @returns Informações de frete
 */
export const calculateFreight = (cep: string): FreteResponse => {
  // Remover formatação do CEP
  const cleanCep = cep.replace(/\D/g, '');

  if (cleanCep.length !== 8) {
    throw new Error('CEP inválido');
  }

  // Pegar os 2 primeiros dígitos para determinar a região
  const region = cleanCep.substring(0, 2);

  // Buscar na tabela
  const freteInfo = FRETE_TABLE[region];

  if (!freteInfo) {
    // Valor padrão para regiões não mapeadas
    return {
      cep: cleanCep,
      valor: 35.00,
      dias_uteis: 10,
      transportadora: 'PAC (Região Especial)',
    };
  }

  return {
    cep: cleanCep,
    ...freteInfo,
  };
};

/**
 * Validar CEP
 */
export const validateCEP = (cep: string): boolean => {
  const cleanCep = cep.replace(/\D/g, '');
  return cleanCep.length === 8;
};

/**
 * Formatar CEP para o padrão XXXXX-XXX
 */
export const formatCEP = (cep: string): string => {
  const cleanCep = cep.replace(/\D/g, '');
  if (cleanCep.length !== 8) return cep;
  return `${cleanCep.substring(0, 5)}-${cleanCep.substring(5)}`;
};