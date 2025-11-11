# 🧪 Teste do Mercado Pago - GUIA PRÁTICO

## 🎯 O que você pode testar AGORA

Seu app **já tem tudo pronto** para testar pagamento com cartão! Vamos fazer um teste completo.

---

## ✅ PRÉ-REQUISITOS

### 1. Verificar Variáveis de Ambiente
Abra `.env` e confirme:
```env
✅ EXPO_PUBLIC_MERCADOPAGO_ACCESS_TOKEN=APP_USR-8809545973808234-110317-51715ff1c275ea77d7ff0f6285c6f585-2964966928
✅ EXPO_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-2988f50c-c1ea-4a34-a85b-e9c91032c4fd
```

### 2. Confirmar Dependências
```bash
# Todos os packages estão instalados? Verifique:
npm list axios
npm list expo-clipboard
npm list zustand
```

### 3. App Rodando
```bash
# Terminal 1: Inicie o app
npm start

# Terminal 2: Abra no Android Studio
npm run android

# Ou no iOS
npm run ios
```

---

## 🔴 TESTE 1: Fluxo Completo do Carrinho

### Passo 1: Adicionar Produtos ao Carrinho
1. Abra o app
2. Navegue até **Explore** ou **Home**
3. Adicione alguns produtos ao carrinho
4. Clique em **Carrinho**

### Passo 2: Preparar Checkout
1. Você deve ver a tela **CartScreen**
2. Veja o subtotal, frete, e total
3. Clique em **"Continuar com o Pedido"** ou botão similar

### Passo 3: Selecionar Frete
1. Escolha um CEP (pode ser válido ou teste)
2. O sistema vai calcular o frete
3. Clique em **"Confirmar Pedido"** ou equivalente

### Passo 4: Abrir Checkout
- A tela do **CustomCheckout** deve abrir
- Você deve ver:
  - ✅ Resumo do Pedido (subtotal + frete)
  - ✅ Formulário de Cartão com campos
  - ✅ Botão "Confirmar Pagamento"

---

## 💳 TESTE 2: Preencher Cartão de Teste

Use os dados de **teste sandbox** do Mercado Pago:

| Campo | Valor |
|-------|-------|
| **Número do Cartão** | `4111111111111111` |
| **Titular** | `TESTE USUARIO` |
| **Mês de Expiração** | `12` |
| **Ano de Expiração** | `25` |
| **CVV** | `123` |
| **Email** | `seu@email.com` |
| **Parcelamento** | `1x` (primeira vez) |

### Preencher no App:
1. Campo **Número do Cartão**: `4111 1111 1111 1111` (app formata automaticamente)
2. Campo **Nome do Titular**: `TESTE USUARIO`
3. Campo **Mês**: `12`
4. Campo **Ano**: `25`
5. Campo **CVV**: `123`
6. Campo **Email**: seu email real
7. Parcelamento: deixe em **1x**

---

## ✨ TESTE 3: Processar Pagamento

### Executar:
1. Clique em **"Confirmar Pagamento"**
2. App entra em loading (spinner aparece)

### O Que Deve Acontecer:

**✅ SUCESSO (Esperado):**
```
1. App conecta à API do Mercado Pago
2. Cria token do cartão
3. Processa o pagamento
4. Recebe resposta: status = "approved"
5. Alert aparece: "Pagamento Aprovado ✅"
6. Carrinho é limpo
7. Volta à tela anterior
```

**❌ SE DER ERRO:**
- Alert mostra mensagem de erro
- Verifique o console (`npx tsc --noEmit`)
- Procure por mensagens do Mercado Pago

---

## 🔍 TESTE 4: Verificar Logs

### No Console do App
```bash
# Terminal rodando o app deve mostrar:
✅ "Erro ao criar token do cartão:" (se tiver erros)
✅ "Erro ao processar pagamento:" (se tiver erros)
```

### Verificar Respostas da API
Abra **DevTools** do Mercado Pago:
```
https://www.mercadopago.com.br/admin/simulador
```

Você verá seus pagamentos de teste lá! 🎉

---

## 🎮 TESTE 5: Testar Diferentes Cenários

### Cenário 1: Cartão Expirado
Use ano `20` em vez de `25`:
```
Número: 4111111111111111
Ano: 20
```
**Esperado:** Erro "Cartão expirado" ❌

### Cenário 2: CVV Inválido
Use `000` em vez de `123`:
```
CVV: 000
```
**Esperado:** Erro "CVV inválido" ❌

### Cenário 3: Parcelamento
Tente 1x, 2x, 3x, 6x, 12x:
```
Parcelamento: 3x → Clique em Confirmar
```
**Esperado:** Pagamento aprovado em 3 parcelas ✅

### Cenário 4: Email Inválido
Use um email sem @:
```
Email: testeeeee
```
**Esperado:** Alert "Email inválido" ❌

---

## 📊 O Que Está Sendo Testado

| Componente | O que testa | Esperado |
|------------|-----------|----------|
| `createCardToken()` | Tokenizar cartão | Token válido retornado |
| `processCardPayment()` | Processar pagamento | Status: approved, pending, rejected |
| `CustomCheckout.tsx` | Interface do usuário | Formulário renderiza corretamente |
| Validações | Dados do cartão | Rejeita dados inválidos |
| Tratamento de erros | Quando falha | Alert com mensagem clara |

---

## 🚀 PRÓXIMO PASSO: PIX

Quando quiser ativar PIX, segue o fluxo:

```
1. Descomente createPixPayment() em mercadopagoService.ts
2. Crie componente PixCheckout.tsx
3. Modifique CustomCheckout.tsx com seletor PIX/Cartão
4. Deploy Edge Function no Supabase
5. Configure webhook no Mercado Pago Dashboard
```

Mas por enquanto, **teste o cartão primeiro!** 💳

---

## 💡 DICAS IMPORTANTES

### ⚠️ TOKENS SÃO SANDBOX
- Esses tokens são de teste
- Nenhum dinheiro real é cobrado
- Em produção, será diferente

### 📱 TESTAR EM EMULADOR
```bash
# Melhor em Android Studio Emulator
npm run android

# Ou físico com expo go
npm start
```

### 🔧 SE NÃO FUNCIONAR

**Passo 1:** Verifique erros TypeScript
```bash
npx tsc --noEmit
# Se houver erro, o app não executa
```

**Passo 2:** Verifique o console
```bash
# Look para mensagens de erro
console.error('Erro ao criar token do cartão:', error);
```

**Passo 3:** Verifique as credenciais
```env
# .env deve ter ambos:
EXPO_PUBLIC_MERCADOPAGO_ACCESS_TOKEN=seu_token_aqui
EXPO_PUBLIC_MERCADOPAGO_PUBLIC_KEY=sua_public_key_aqui
```

**Passo 4:** Teste o endpoint diretamente
```bash
# No seu computador, test a API (curl):
curl -X POST https://api.mercadopago.com/v1/card_tokens \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "number": "4111111111111111",
    "holder_name": "TEST USER",
    "expiration_month": 12,
    "expiration_year": 25,
    "security_code": "123"
  }'
```

---

## ✅ CHECKLIST DE TESTE

- [ ] App inicia sem erros
- [ ] Adicionar produtos ao carrinho funciona
- [ ] Abrir CartScreen funciona
- [ ] Calcular frete funciona
- [ ] Abrir CustomCheckout funciona
- [ ] Preencher formulário de cartão funciona
- [ ] Clicker "Confirmar Pagamento" funciona
- [ ] App conecta à API do MP
- [ ] Recebe resposta do MP
- [ ] Alert mostra resultado (approved/rejected/pending)
- [ ] Carrinho limpa após sucesso
- [ ] Validações de email/CVV/data funcionam

---

## 📞 SUPORTE

Se algo não funcionar:
1. Verifique `.env` está preenchido
2. Rode `npm install` novamente
3. Limpe cache: `npm run reset-project`
4. Reinicie o app: `npm start`
5. Verifique console para mensagens de erro

**Agora bora testar! 🚀**