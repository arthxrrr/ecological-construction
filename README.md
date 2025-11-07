# 🌱 Ecological Construction

**Aplicativo Mobile de E-commerce de Materiais de Construção e Produtos Renováveis**

> Desenvolvido como projeto integrador para curso técnico em desenvolvimento de software.

![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue?logo=react)
![Expo](https://img.shields.io/badge/Expo-54.0-black?logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-2.38-green?logo=supabase)
![MercadoPago](https://img.shields.io/badge/MercadoPago-API-blue)

## ✨ Features

### 🔐 Autenticação
- ✅ Cadastro com email e confirmação
- ✅ Login seguro com Supabase
- ✅ Recuperação de senha
- ✅ Sessão persistente

### 🛍️ Catálogo
- ✅ 15 produtos pré-carregados
- ✅ 7 categorias (incluindo Produtos Renováveis)
- ✅ Busca por nome/descrição
- ✅ Filtro por categoria
- ✅ Ordenação por preço

### 🛒 Carrinho
- ✅ Adicionar/remover produtos
- ✅ Atualizar quantidade
- ✅ Cálculo de subtotal
- ✅ Persistência local

### 📦 Frete
- ✅ Tabela fixa por CEP (cobertura nacional)
- ✅ Validação de CEP
- ✅ Cálculo automático
- ✅ 27 estados + DF

### 💳 Pagamento
- ✅ Integração MercadoPago
- ✅ Modo teste (sem cartão real)
- ✅ Webhook para confirmação
- ✅ Status de pedido

### 👤 Perfil
- ✅ Edição de dados pessoais
- ✅ Endereço completo
- ✅ CPF e telefone
- ✅ Sincronização Supabase

### ❤️ Favoritos
- ✅ Adicionar/remover favoritos
- ✅ Sincronização com banco
- ✅ Visualizar lista

### 📞 Suporte
- ✅ Tela de suporte
- ✅ Integração com email (a implementar)

## 🚀 Começar Rápido

### 1. Instalação de Dependências

```bash
npm install
```

### 2. Configuração Supabase

- Crie conta em [supabase.com](https://supabase.com)
- Copie URL e chave
- Atualize `config/supabase.ts`
- Execute scripts SQL de `SETUP.md`

### 3. Configuração MercadoPago

- Crie conta em [mercadopago.com](https://mercadopago.com)
- Obtenha credenciais de teste
- Atualize `config/mercadopago.ts`

### 4. Executar

```bash
# Android (recomendado)
npm run android

# Expo Go (mais rápido)
npm start

# iOS
npm run ios
```

## 📁 Estrutura do Projeto

```
projeto-integradornovo/
├── app/                    # Rotas Expo Router
├── screens/                # Telas principais
├── components/             # Componentes reutilizáveis
├── services/               # Lógica de negócio
├── store/                  # Gerenciamento estado (Zustand)
├── config/                 # Configurações
├── data/                   # Dados estáticos (produtos.json)
├── types/                  # Tipos TypeScript
├── SETUP.md                # Guia completo de instalação
├── PROJECT_STRUCTURE.md    # Arquitetura detalhada
├── NEXT_STEPS.md           # Próximas etapas
└── IMPLEMENTATION_SUMMARY.md # O que foi criado
```

## 🎨 Design

- **Cores**: Verde ecológico (#10b981) como primária
- **Componentes**: 6 componentes reutilizáveis
- **Tipografia**: Hierarchy clara com 3 níveis
- **Responsividade**: Full mobile-first

## 🔧 Stack Tecnológico

| Layer | Tecnologia |
|-------|-----------|
| **Mobile** | React Native 0.81.5 |
| **Runtime** | Expo 54.0 |
| **Linguagem** | TypeScript 5.9 |
| **Router** | Expo Router 6.0 |
| **Estado** | Zustand 4.4 |
| **Backend** | Supabase 2.38 |
| **Pagamento** | MercadoPago API |
| **HTTP** | Axios 1.6 |

## 📚 Documentação

- **[SETUP.md](./SETUP.md)** - Guia completo de instalação
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Arquitetura detalhada
- **[NEXT_STEPS.md](./NEXT_STEPS.md)** - Próximas etapas
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - O que foi criado

## 🧪 Testes

### Credenciais de Teste

```
Email: test@example.com
Senha: Test123456
CPF: 123.456.789-00
CEP: 01310-100 (São Paulo)
```

### Cartões de Teste MercadoPago

- ✅ Sucesso: `4111 1111 1111 1111`
- ❌ Recusa: `4000 0000 0000 0002`

## 📊 Produtos

15 produtos pré-carregados em 7 categorias:

- **Alvenaria**: Tijolos, areia, cal, telhas
- **Cimentos e Argamassas**: Cimento, cal
- **Tintas**: Tinta acrílica
- **Ferramentas**: Marreta, rebaixador, furadeira
- **Hidráulica**: Torneira, tubulação
- **Esquadrias**: Vidro temperado
- **Produtos Renováveis**: Painéis solares, LED

## 🔒 Segurança

- ✅ JWT com Supabase Auth
- ✅ Row Level Security (RLS)
- ✅ Validação de entrada
- ✅ Senhas hasheadas
- ✅ MercadoPago em modo teste

## 📈 Próximas Melhorias

- [ ] Histórico de pedidos completo
- [ ] Avaliações e comentários
- [ ] Notificações push
- [ ] Modo escuro
- [ ] Múltiplos idiomas
- [ ] Programa de fidelidade

## 🐛 Troubleshooting

Consulte [SETUP.md](./SETUP.md) para soluções de problemas comuns.

## 📝 Scripts

```bash
# Desenvolvimento
npm start           # Iniciar Expo
npm run android     # Android emulator
npm run ios         # iOS simulator
npm run web         # Web

# Build
npm run lint        # Verificar código

# Utilidade
npm run reset-project  # Reset estrutura
```

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os arquivos de documentação
2. Consulte console para erros
3. Revise as credenciais de Supabase/MercadoPago

## 👨‍💻 Desenvolvido Por

Projeto desenvolvido como trabalho integrador do curso técnico de desenvolvimento de software.

## 📄 Licença

Projeto educacional - livre para uso e modificação.

---

**Pronto para começar? Siga os passos em [NEXT_STEPS.md](./NEXT_STEPS.md)!** 🚀

**Desenvolvido com ❤️ usando React Native e Expo**
