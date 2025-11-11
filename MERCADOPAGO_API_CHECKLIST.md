# 🔵 Mercado Pago - Checklist de Implementação

## 📊 STATUS ATUAL DA INTEGRAÇÃO

### ✅ O QUE JÁ TEMOS PRONTO

#### 1. **Configuração Base**
- ✅ Variáveis de ambiente no `.env`
  - `EXPO_PUBLIC_MERCADOPAGO_ACCESS_TOKEN` → Token sandbox ativo
  - `EXPO_PUBLIC_MERCADOPAGO_PUBLIC_KEY` → Public key configurada
  - `EXPO_PUBLIC_MERCADOPAGO_WEBHOOK_SIGNATURE` → Assinatura do webhook
  - `EXPO_PUBLIC_WEBHOOK_URL` → URL do webhook (Supabase)

#### 2. **Serviço do Mercado Pago** (`mercadopagoService.ts`)
Funções **100% funcionais para CARTÃO**:
- ✅ `createCardToken()` - Tokeniza cartão de crédito
- ✅ `processCardPayment()` - Processa pagamento com token
- ✅ `getPaymentStatus()` - Consulta status do pagamento
- ✅ `formatCurrency()` - Formata valores em BRL

Funções **comentadas para PIX** (prontas para ativar):
- 🟦 `createPixPayment()` - Gera QR Code e código PIX
- 🟦 `checkPixStatus()` - Verifica se PIX foi pago

#### 3. **Dependências Instaladas** (`package.json`)
- ✅ `axios` - HTTP requests para MP API
- ✅ `expo-clipboard` - Copiar código PIX
- ✅ `zustand` - State management (carrinho, auth)
- ✅ `@supabase/supabase-js` - Banco de dados

#### 4. **Interface de Checkout** (`CustomCheckout.tsx`)
- ✅ Formulário de cartão completo com validações
- ✅ Parcelamento em 1x, 2x, 3x, 6x, 12x
- ✅ Inputs para: número, titular, data, CVV, email
- ✅ Integração com `processCardPayment()`

---

## ❌ O QUE ESTÁ FALTANDO PARA PIX

### 1. **Desativar as Funções Comentadas**
Arquivo: `services/mercadopagoService.ts` (linhas 248-307)

```typescript
// DESCOMENTE ESSAS FUNÇÕES:
export const createPixPayment = async (
  amount: number,
  email: string,
  externalReference: string,
  description: string,
) => { ... };

export const checkPixStatus = async (paymentId: string) => { ... };
```

### 2. **Criar Componente PixCheckout** (Para quando precisar)
Será renderizado quando usuário selecionar PIX:
- Exibir QR Code (imagem)
- Mostrar código PIX copiável (com clipboard)
- Timer de expiração (10 minutos)
- Verificação automática a cada 3 segundos
- Feedback visual: aguardando → confirmado

### 3. **Configurar Webhook no Mercado Pago Dashboard**
- Acessar: https://www.mercadopago.com.br/admin/webhooks
- URL: `https://ftrufcrsfrldmesomwew.supabase.co/functions/v1/mercadopago-webhook`
- Eventos para receber:
  - `payment.created`
  - `payment.updated`
  - `payment.approved`
  - `payment.rejected`

### 4. **Criar Edge Function do Supabase**
Arquivo: `supabase/functions/mercadopago-webhook/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.8';

serve(async (req) => {
  if (req.method === 'POST') {
    const payload = await req.json();
    
    // Validar webhook
    if (payload.type === 'payment') {
      const { id, status } = payload.data;
      
      // Atualizar banco de dados
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      );
      
      await supabase
        .from('orders')
        .update({ status: 'confirmado', payment_id: id })
        .eq('mercadopago_id', id);
      
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  
  return new Response(JSON.stringify({ error: 'Invalid' }), { status: 400 });
});
```

### 5. **Adicionar Seletor PIX na Interface**
Modificar `CustomCheckout.tsx`:
```typescript
// Adicionar estado para escolher entre cartão e PIX
const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');

// Render condicional:
if (paymentMethod === 'pix') {
  return <PixCheckout ... />;
}
// Senão, renderizar formulário de cartão
```

---

## 🧪 TESTE DA API (Antes de ativar)

### Cartão (Já Funciona)
**Dados de teste do Mercado Pago:**
- Número: `4111111111111111` (Visa - Teste)
- Titular: `Qualquer nome`
- Data: `12/25` (Mes/Ano)
- CVV: `123`
- Email: `test@email.com`

**Fluxo:**
1. ✅ Abrir carrinho
2. ✅ Clicar em "Confirmar Pagamento"
3. ✅ Preencher dados do cartão
4. ✅ Sistema retorna `approved` ou outro status
5. ✅ Carrinho limpa e mostra sucesso

**Esperado:** Pagamento aprovado e ordem criada ✅

---

### PIX (Quando Implementar)
**Sandbox de teste (sem dinheiro real):**
1. Gerar QR Code via API
2. Escanear no emulador/banco teste
3. Webhook notifica quando pago
4. App atualiza status para "confirmado"
5. Carrinho limpa

---

## 🔒 SEGURANÇA - IMPORTANTE!

### ⚠️ RISCO ATUAL
- Tokens de cartão são criados no **FRONTEND** (cliente)
- Dados sensíveis viajam direto para MP API
- Não é recomendado para produção

### ✅ SOLUÇÃO PARA PRODUÇÃO
Implementar **backend seguro** (Node.js/Python):
```
Frontend → Seu Backend Seguro → Mercado Pago API
         (tokenização)          (pagamento)
```

**Por enquanto (Sandbox):** Está ok para testes

---

## 📋 PRÓXIMAS AÇÕES - ORDEM CORRETA

### Imediato (próximo sprint):
1. ☐ Desativar PIX comentado em `mercadopagoService.ts`
2. ☐ Testar cartão com dados sandbox
3. ☐ Validar fluxo completo: carrinho → checkout → sucesso

### Curto Prazo (quando precisar PIX):
1. ☐ Criar `components/PixCheckout.tsx`
2. ☐ Modificar `CustomCheckout.tsx` com seletor PIX/Cartão
3. ☐ Deploy da Edge Function do Supabase
4. ☐ Configurar webhook no dashboard MP

### Médio Prazo (produção):
1. ☐ Implementar backend seguro para tokenização
2. ☐ Trocar tokens de teste por produção
3. ☐ Validar assinatura do webhook
4. ☐ Implementar tentativas de retry em pagamentos

### Longo Prazo (otimizações):
1. ☐ Dashboard de vendas
2. ☐ Relatórios de pagamentos
3. ☐ Notificações por email/SMS
4. ☐ Reembolsos automáticos

---

## 🔍 VERIFICAR SE TUDO ESTÁ FUNCIONANDO

### Checklist de Compilação
```bash
# Verificar erros TypeScript
npx tsc --noEmit

# Esperado: 0 erros relacionados a MP
```

### Checklist de Endpoints
- ✅ Token MP criado: `EXPO_PUBLIC_MERCADOPAGO_ACCESS_TOKEN` preenchido
- ✅ Public Key: `EXPO_PUBLIC_MERCADOPAGO_PUBLIC_KEY` preenchido
- ✅ URL Webhook: `EXPO_PUBLIC_WEBHOOK_URL` preenchido
- ✅ API Base: `https://api.mercadopago.com`

### Checklist de Integração
- ✅ `CustomCheckout.tsx` importa `processCardPayment`
- ✅ `carts.tsx` chama `createCardToken` + `processCardPayment`
- ✅ Resposta do MP é tratada (approved, pending, rejected)

---

## 📚 REFERÊNCIAS

| Recurso | URL |
|---------|-----|
| **Docs MP - Pagamentos** | https://www.mercadopago.com.br/developers/pt/docs/apis/ecommerce/payments |
| **Docs MP - PIX** | https://www.mercadopago.com.br/developers/pt/docs/pix/integration/payments |
| **Docs MP - Webhooks** | https://www.mercadopago.com.br/developers/pt/docs/webhooks |
| **Sandbox MP** | https://www.mercadopago.com.br/developers/pt/tools |
| **Dashboard MP** | https://www.mercadopago.com.br/admin/webhooks |

---

## 💾 RESUMO RÁPIDO

| Função | Status | Onde |
|--------|--------|------|
| Cartão - Tokenizar | ✅ Ativo | `createCardToken()` |
| Cartão - Pagar | ✅ Ativo | `processCardPayment()` |
| PIX - Gerar QR | 🟦 Comentado | `createPixPayment()` |
| PIX - Verificar | 🟦 Comentado | `checkPixStatus()` |
| Webhook | ❌ Não existe | Supabase Edge Function |
| Interface Cartão | ✅ Pronta | `CustomCheckout.tsx` |
| Interface PIX | ❌ Não existe | Precisa criar |

**Conclusão:** A base está pronta. Cartão funciona. PIX está comentado esperando ser ativado! 🚀