# ⚡ Mercado Pago - Quick Start

## 🚀 Começar os Testes AGORA

### Passo 1: Instalar dependências (se ainda não tiver)
```bash
npm install
```

### Passo 2: Verificar se compila
```bash
npx tsc --noEmit
# Esperado: Apenas erro de favoriteIds em explore.tsx (não relacionado)
```

### Passo 3: Rodar o app
```bash
npm start
```

### Passo 4: Escolher plataforma
```bash
# Android (mais fácil com emulador)
npm run android

# ou iOS
npm run ios

# ou Web
npm run web
```

---

## 💳 Testar Cartão

### Dados de Teste (Sandbox Mercado Pago)
```
Número:     4111111111111111
Titular:    TESTE USUARIO
Mês:        12
Ano:        25
CVV:        123
Email:      seu@email.com
```

### Fluxo no App
1. ✅ Adicionar produto ao carrinho
2. ✅ Abrir Carrinho
3. ✅ Informar CEP e calcular frete
4. ✅ Clicar "Confirmar Pedido"
5. ✅ Preencher formulário com dados acima
6. ✅ Clicar "Confirmar Pagamento"
7. ✅ Esperar resposta (approved)

**Esperado:** Alert verde dizendo "Pagamento Aprovado ✅"

---

## 🟦 PIX - FUTURO (Quando Ativar)

### Passo 1: Descomente as funções
Arquivo: `services/mercadopagoService.ts`
- Remova `//` das linhas 248-307 (createPixPayment e checkPixStatus)

### Passo 2: Crie o componente PIX
```bash
# Crie arquivo: components/PixCheckout.tsx
# (Código completo fornecido em outro documento)
```

### Passo 3: Modifique CustomCheckout
Adicione seletor entre Cartão e PIX no inicio do componente

### Passo 4: Deploy Edge Function
```bash
supabase link --project-ref ftrufcrsfrldmesomwew
supabase functions deploy mercadopago-webhook
```

### Passo 5: Configure Webhook
- Acesse: https://www.mercadopago.com.br/admin/webhooks
- URL: `https://ftrufcrsfrldmesomwew.supabase.co/functions/v1/mercadopago-webhook`
- Eventos: payment.created, payment.updated, payment.approved

---

## 📋 Verificar Variáveis de Ambiente

### .env deve ter:
```env
EXPO_PUBLIC_MERCADOPAGO_ACCESS_TOKEN=APP_USR-8809545973808234-110317-51715ff1c275ea77d7ff0f6285c6f585-2964966928
EXPO_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-2988f50c-c1ea-4a34-a85b-e9c91032c4fd
EXPO_PUBLIC_MERCADOPAGO_WEBHOOK_SIGNATURE=bd4773eb5e4b881d2c8f4e49496dd8768a481a041463b36dd82537c2023d14ab
EXPO_PUBLIC_WEBHOOK_URL=https://ftrufcrsfrldmesomwew.supabase.co/functions/v1/mercadopago-webhook
```

---

## 🧪 Teste Manual da API (sem app)

### Testar Token de Cartão
```bash
curl -X POST https://api.mercadopago.com/v1/card_tokens \
  -H "Authorization: Bearer APP_USR-8809545973808234-110317-51715ff1c275ea77d7ff0f6285c6f585-2964966928" \
  -H "Content-Type: application/json" \
  -d '{
    "number": "4111111111111111",
    "holder_name": "TEST USER",
    "expiration_month": 12,
    "expiration_year": 25,
    "security_code": "123"
  }'
```

### Testar Pagamento com Token
```bash
# Primeiro, substitua TOKEN_AQUI com o token da resposta anterior
curl -X POST https://api.mercadopago.com/v1/payments \
  -H "Authorization: Bearer APP_USR-8809545973808234-110317-51715ff1c275ea77d7ff0f6285c6f585-2964966928" \
  -H "Content-Type: application/json" \
  -d '{
    "token": "TOKEN_AQUI",
    "transaction_amount": 150.00,
    "installments": 1,
    "payment_method_id": "credit_card",
    "payer": {
      "email": "test@email.com"
    },
    "external_reference": "order-123",
    "description": "Compra de teste"
  }'
```

---

## 🔍 Troubleshooting

### "Erro: Cannot find module"
```bash
npm install
npm start
```

### "Erro: Invalid token"
Verifique `.env`:
```bash
cat .env | grep MERCADOPAGO_ACCESS_TOKEN
# Deve estar preenchido, não vazio
```

### "Erro: CORS/Network"
- Emulador Android pode não acessar API
- Teste em Web: `npm run web`
- Ou use seu IP local

### "Erro: Card validation failed"
- Verifique dados do cartão no formulário
- Número: exatamente 16 dígitos
- CVV: 3 ou 4 dígitos
- Data: formato MM/YY válido

---

## 📊 Verificar Pagamentos

### No Dashboard Mercado Pago
Acesse: https://www.mercadopago.com.br/admin/transactions

Você verá todos os pagamentos de teste lá! 📈

### No App
Após pagamento bem-sucedido:
- Carrinho fica vazio ✅
- Alert mostra sucesso ✅
- App volta à home ✅

---

## 🎯 Status Atual

| Item | Status |
|------|--------|
| Cartão | ✅ Pronto |
| PIX | 🟦 Comentado |
| Webhook | ❌ Não existe |
| App | ✅ Compilando |
| Testes | 🧪 Podendo fazer |

---

## 📞 Próximas Ações

### Imediato
- [ ] Rodar app com `npm start`
- [ ] Testar fluxo de cartão
- [ ] Verificar se pagamento é aprovado

### Quando Precisar PIX
- [ ] Descomente funções de PIX
- [ ] Crie PixCheckout.tsx
- [ ] Deploy Edge Function
- [ ] Configure webhook

### Produção
- [ ] Troque para tokens de produção
- [ ] Implemente backend seguro
- [ ] Configure validação de webhook

---

## 💡 Dicas Rápidas

✅ **Usar sempre números de teste do MP**
❌ Nunca testar com números reais

✅ **Verificar console do app**
```bash
# Terminal onde rodou npm start mostrará logs
```

✅ **Verificar .env existe**
```bash
ls .env
# Deve retornar o arquivo
```

✅ **Limpar cache se tiver problemas**
```bash
npm run reset-project
npm start
```

---

## 🚀 Resumo Final

**Você pode fazer AGORA:**
1. `npm start` 
2. Testar pagamento com cartão
3. Verificar fluxo completo

**Depois:**
1. Ativar PIX
2. Configure webhook
3. Deploy em produção

**Bora começar! 🎉**