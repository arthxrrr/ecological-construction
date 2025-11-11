# 🎯 Fluxo Visual da Integração Mercado Pago

## 1️⃣ FLUXO ATUAL - PAGAMENTO COM CARTÃO ✅

```
┌─────────────────────────────────────────────────────────────────┐
│                         APLICATIVO MOBILE                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────────────┐
                    │  CartScreen.tsx │
                    │                 │
                    │ - Mostrar itens │
                    │ - Calcular frete│
                    └────────┬────────┘
                             ↓
                 ┌────────────────────────┐
                 │ CustomCheckout.tsx     │
                 │                        │
                 │ - Formulário cartão    │
                 │ - Parcelamento 1-12x   │
                 │ - Validar dados        │
                 └────────┬───────────────┘
                          ↓
            ┌─────────────────────────────┐
            │ mercadopagoService.ts       │
            │                             │
            │ 1. createCardToken()        │
            │    └→ Tokeniza cartão       │
            │                             │
            │ 2. processCardPayment()     │
            │    └→ Processa pagamento    │
            └────────┬────────────────────┘
                     ↓
      ┌──────────────────────────────────┐
      │    MERCADO PAGO API              │
      │  https://api.mercadopago.com     │
      │                                  │
      │  POST /v1/card_tokens            │
      │  POST /v1/payments               │
      └────────┬───────────────────────┘
               ↓
       ┌───────────────────┐
       │  Resposta MP:     │
       │  - paymentId      │
       │  - status         │
       │  - statusDetail   │
       └───────┬───────────┘
               ↓
      ┌────────────────────────┐
      │ CustomCheckout.tsx     │
      │                        │
      │ - Mostra alert         │
      │ - approved ✅          │
      │ - pending ⏳           │
      │ - rejected ❌          │
      └────────┬───────────────┘
               ↓
      ┌────────────────────────┐
      │ carts.tsx             │
      │                        │
      │ - clearCart()         │
      │ - fechar modal        │
      │ - volta à home        │
      └────────────────────────┘
```

**Status:** ✅ 100% PRONTO PARA TESTAR AGORA

---

## 2️⃣ FLUXO FUTURO - PAGAMENTO COM PIX 🟦

```
┌─────────────────────────────────────────────────────────────────┐
│                         APLICATIVO MOBILE                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────────────┐
                    │  CartScreen.tsx │
                    │                 │
                    │ - Mostrar itens │
                    │ - Calcular frete│
                    └────────┬────────┘
                             ↓
                 ┌────────────────────────┐
                 │ CustomCheckout.tsx     │
                 │                        │
                 │ 🆕 Seletor:           │
                 │    💳 Cartão          │
                 │    🟦 PIX             │
                 └────────┬───────────────┘
                          ↓
        ┌──────────────────────────────────┐
        │   if (paymentMethod === 'pix')  │
        └────────┬─────────────────────────┘
                 ↓
       ┌──────────────────────────┐
       │ PixCheckout.tsx 🆕       │
       │                          │
       │ - QR Code (img)         │
       │ - Código PIX (texto)    │
       │ - Timer (10 min)        │
       │ - Botão copiar          │
       └────────┬─────────────────┘
                ↓
    ┌────────────────────────────────────┐
    │ mercadopagoService.ts              │
    │                                    │
    │ 1. createPixPayment()        🆕    │
    │    └→ Gera QR + código            │
    │                                    │
    │ 2. checkPixStatus()          🆕    │
    │    └→ Poll a cada 3 segundos      │
    └────────┬─────────────────────────┘
             ↓
  ┌──────────────────────────────┐
  │   MERCADO PAGO API           │
  │ https://api.mercadopago.com  │
  │                              │
  │ POST /v1/payments            │
  │ (payment_method_id: 'pix')   │
  │                              │
  │ GET /v1/payments/{id}        │
  │ (verificar status)           │
  └────────┬────────────────────┘
           ↓
  ┌───────────────────────────────┐
  │  Resposta MP:                 │
  │  - paymentId                  │
  │  - qr_code                    │
  │  - qr_code_url                │
  │  - expiration_date            │
  │  - status (pending/approved)  │
  └───────┬───────────────────────┘
          ↓
  ┌──────────────────────────────┐
  │ Usuário Escaneia QR Code     │
  │                              │
  │ 📱 Abre app do banco         │
  │ 💸 Faz transferência PIX     │
  │ ✅ PIX é instantâneo         │
  └────────┬─────────────────────┘
           ↓
  ┌──────────────────────────────┐
  │ MERCADO PAGO RECEBE PIX      │
  │                              │
  │ 🟦 PIX confirmado!           │
  │                              │
  │ Status muda para:            │
  │ "approved"                   │
  └────────┬─────────────────────┘
           ↓
  ┌──────────────────────────────┐
  │ WEBHOOK ⚡                    │
  │                              │
  │ MP envia POST para:          │
  │ Supabase Edge Function 🆕    │
  │                              │
  │ Edge Function atualiza       │
  │ tabela 'orders' com status   │
  └────────┬─────────────────────┘
           ↓
  ┌──────────────────────────────┐
  │ PixCheckout.tsx Detecta      │
  │ checkPixStatus() == approved  │
  │                              │
  │ Mostra:                      │
  │ "PIX Confirmado! ✅"         │
  └────────┬─────────────────────┘
           ↓
  ┌──────────────────────────────┐
  │ Callback onSuccess()         │
  │                              │
  │ - clearCart()               │
  │ - fechar modal              │
  │ - volta à home              │
  └──────────────────────────────┘
```

**Status:** 🟦 PRONTO PARA IMPLEMENTAR (funções comentadas)

---

## 3️⃣ ARQUITETURA DE COMPONENTES

### ✅ Já Existe

```
🎯 CustomCheckout.tsx
├── Props: total, frete, onPaymentSuccess, etc
├── Estado: cardNumber, email, installments
├── Renders: Formulário de cartão
└── Integra: processCardPayment()

📱 carts.tsx
├── Mostra: CartScreen
├── Props: items, frete
├── Handles: handleProcessPayment()
└── Chama: createCardToken + processCardPayment

🔌 mercadopagoService.ts
├── createCardToken() ✅
├── processCardPayment() ✅
├── getPaymentStatus() ✅
├── createPixPayment() 🔵 (comentado)
└── checkPixStatus() 🔵 (comentado)

⚙️ config/mercadopago.ts
├── ACCESS_TOKEN (do .env)
├── PUBLIC_KEY (do .env)
├── WEBHOOK_URL (do .env)
└── API_BASE_URL = https://api.mercadopago.com
```

### 🔵 Precisa Criar (PIX)

```
🟦 PixCheckout.tsx (NOVO)
├── Props: order, userEmail, onSuccess, onError
├── Estado: paymentId, qrCode, timeRemaining, isPaid
├── Effects:
│   ├── createPixPayment() ao montar
│   ├── checkPixStatus() a cada 3s
│   └── Timer decrescente
├── Renders:
│   ├── QR Code (imagem)
│   ├── Código PIX (copiável)
│   ├── Timer
│   └── Status (aguardando/confirmado)
└── Callbacks: onSuccess, onError, onCancel

⚡ Supabase Edge Function (NOVO)
├── supabase/functions/mercadopago-webhook/index.ts
├── Recebe: POST do Mercado Pago
├── Valida: Assinatura do webhook
├── Atualiza: orders table no Supabase
└── Retorna: { success: true }
```

---

## 4️⃣ FLUXO DE DADOS - CARTÃO (ATUAL)

```json
{
  "user_input": {
    "cardNumber": "4111111111111111",
    "cardholderName": "TESTE",
    "expirationMonth": "12",
    "expirationYear": "25",
    "securityCode": "123",
    "email": "test@email.com",
    "installments": 1
  },
  "↓ createCardToken()",
  "mercado_pago_response_1": {
    "id": "token_abc123...",
    "status": "active"
  },
  "↓ processCardPayment(token, amount, installments)",
  "mercado_pago_response_2": {
    "id": 123456789,
    "status": "approved",
    "status_detail": "accredited",
    "transaction_amount": 150.00,
    "external_reference": "order-123456"
  },
  "↓ Alert + clearCart()",
  "user_sees": "Pagamento Aprovado ✅"
}
```

---

## 5️⃣ FLUXO DE DADOS - PIX (FUTURO)

```json
{
  "user_input": {
    "amount": 150.00,
    "email": "test@email.com",
    "externalReference": "order-123456"
  },
  "↓ createPixPayment()",
  "mercado_pago_response_1": {
    "id": 987654321,
    "status": "pending",
    "point_of_interaction": {
      "qr_code": "00020126360014...",
      "qr_code_url": "https://..../qr-code.png",
      "transaction_data": {
        "expiration_date": "2025-01-15T10:30:00"
      }
    }
  },
  "↓ PixCheckout renders QR Code",
  "user_action": {
    "scans": "QR Code no banco",
    "transfers": "150.00 via PIX"
  },
  "↓ Mercado Pago recebe PIX",
  "↓ Envia Webhook POST",
  "webhook_payload": {
    "type": "payment",
    "action": "payment.approved",
    "data": {
      "id": 987654321,
      "status": "approved",
      "external_reference": "order-123456"
    }
  },
  "↓ Edge Function atualiza orders",
  "supabase_update": {
    "orders": {
      "where": { "mercadopago_id": 987654321 },
      "set": { "status": "confirmado" }
    }
  },
  "↓ checkPixStatus() retorna isPaid=true",
  "↓ PixCheckout mostra sucesso",
  "user_sees": "PIX Confirmado! ✅"
}
```

---

## 6️⃣ CHECKLIST DE IMPLEMENTAÇÃO

### Fase 1: ✅ CARTÃO (JÁ PRONTO)
- ✅ Arquivo de config criado
- ✅ Serviço com funções de cartão
- ✅ Interface do usuário
- ✅ Integração com tela de carrinho
- ✅ Validações de dados
- ✅ Tratamento de erros

### Fase 2: 🟦 PIX (QUANDO PRECISAR)
- ☐ Descomente createPixPayment()
- ☐ Descomente checkPixStatus()
- ☐ Crie PixCheckout.tsx
- ☐ Modifique CustomCheckout.tsx com seletor
- ☐ Deploy Edge Function no Supabase
- ☐ Configure webhook no MP Dashboard

### Fase 3: 🔒 SEGURANÇA (PRODUÇÃO)
- ☐ Implemente backend seguro
- ☐ Mude para tokens de produção
- ☐ Valide assinatura de webhook
- ☐ Implemente rate limiting
- ☐ Monitore fraudes

---

## 7️⃣ STATUS VISUAL

```
┌─────────────────────────────────────────┐
│         MERCADO PAGO - STATUS           │
├─────────────────────────────────────────┤
│                                         │
│  Cartão de Crédito:    ✅ 100% Ready   │
│  PIX:                  🟦 80% Ready    │
│  Webhook:              ❌ Not Started  │
│  Validação de Sig:     ❌ Not Started  │
│  Backend Seguro:       ❌ Not Started  │
│  Produção:             ❌ Not Started  │
│                                         │
└─────────────────────────────────────────┘
```

---

## 💾 PRÓXIMO PASSO

**AGORA:** Teste o fluxo de cartão!
```bash
npm start
npm run android  # ou ios
```

**DEPOIS:** Quando precisar ativar PIX, siga o guia `MERCADOPAGO_API_CHECKLIST.md`

🚀 **Bora começar os testes!**