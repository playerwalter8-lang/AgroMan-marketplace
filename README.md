# AgroMan - Marketplace Agrícola

Uma plataforma digital leve e rápida que conecta produtores agrícolas e vendedores ao consumidor final, com sistema inteligente de consultas e funcionalidade básica de marketplace.

## 📋 Requisitos

- Node.js 14.0 ou superior
- npm ou yarn
- SQLite3 (incluído no projeto)

## 🚀 Instalação Rápida

### 1. Clonar/Abrir o Projeto

```bash
cd /workspace/AgroMan
```

### 2. Instalar Dependências Backend

```bash
cd backend
npm install
```

### 3. Configurar Variáveis de Ambiente

```bash
cp .env.example .env
# Editar .env conforme necessário
```

### 4. Inicializar Banco de Dados

```bash
npm run seed
```

### 5. Iniciar o Servidor

```bash
# Desenvolvimento (com reload automático)
npm run dev

# Ou produção
npm start
```

O servidor estará disponível em: `http://localhost:5000`

### 6. Abrir Frontend

Abra o navegador em: `http://localhost:5000/index.html`

## 📁 Estrutura do Projeto

```
AgroMan/
├── backend/
│   ├── src/
│   │   ├── index.js                 # Entry point do servidor
│   │   ├── db/
│   │   │   ├── init.js             # Inicialização do banco
│   │   │   └── seed.js             # Dados de teste
│   │   ├── modules/
│   │   │   ├── auth/               # Autenticação e registros
│   │   │   ├── products/           # Catálogo de produtos
│   │   │   ├── sales/              # Carrinho e pedidos
│   │   │   ├── consultas/          # Consultas inteligentes
│   │   │   └── dashboard/          # Métricas e análises
│   │   ├── integrations/           # Stubs para integrações
│   │   │   ├── ussd.js
│   │   │   ├── mpesa.js
│   │   │   └── logistics.js
│   │   └── middleware/             # Middleware Express
│   ├── package.json
│   └── .env.example
└── frontend/
    └── public/
        ├── index.html              # Página inicial
        ├── catalog.html            # Catálogo de produtos
        ├── consultas.html          # Consultas inteligentes
        └── dashboard.html          # Dashboard
```

## 🔌 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/profile/:userId` - Perfil do usuário

### Produtos
- `GET /api/products` - Listar produtos (com filtros)
- `GET /api/products/:id` - Detalhes do produto
- `POST /api/products` - Adicionar novo produto (vendedor)
- `PUT /api/products/:id` - Atualizar produto
- `GET /api/products/categories/list` - Listar categorias

### Vendas e Pedidos
- `GET /api/sales/cart/:userId` - Ver carrinho
- `POST /api/sales/cart/add` - Adicionar ao carrinho
- `DELETE /api/sales/cart/item/:cartItemId` - Remover do carrinho
- `POST /api/sales/order/create` - Criar pedido
- `GET /api/sales/orders/:userId` - Histórico de pedidos
- `PUT /api/sales/order/:id/status` - Atualizar status do pedido

### Consultas Inteligentes
- `POST /api/consultas/query` - Enviar pergunta
- `GET /api/consultas/history/:userId` - Histórico de consultas
- `GET /api/consultas/topics/common` - Tópicos populares

### Dashboard
- `GET /api/dashboard/metrics` - Métricas gerais
- `GET /api/dashboard/vendor/:vendorId/sales` - Vendas do vendedor
- `GET /api/dashboard/vendor/:vendorId/stats` - Estatísticas do vendedor
- `GET /api/dashboard/categories/sales` - Vendas por categoria

## 👥 Tipos de Usuário

1. **Produtor Agrícola** - Cultiva e publica produtos
2. **Vendedor** - Revende produtos na plataforma
3. **Consumidor** - Compra produtos

## 🎯 Funcionalidades Principais

✅ Interface web responsiva (mobile first)  
✅ Registro e login com JWT  
✅ Catálogo de produtos com filtros  
✅ Carrinho de compras  
✅ Sistema de pedidos básico  
✅ Área do vendedor com histórico de vendas  
✅ Sistema de consultas inteligentes (IA placeholder)  
✅ Dashboard com métricas  
✅ Stubs para USSD, M-Pesa, Logística  

## 🔮 Integrações Futuras

### USSD
- Arquivo: `src/integrations/ussd.js`
- Para implementar: Africa's Talking, Nexmo, ou provedor local
- Permitirá acesso via *123# em qualquer telefone

### M-Pesa
- Arquivo: `src/integrations/mpesa.js`
- Para implementar: API Vodacom M-Pesa
- Integração de pagamentos móveis

### Logística
- Arquivo: `src/integrations/logistics.js`
- Para implementar: Parceria com couriers
- Rastreamento de entregas

## 🗄️ Banco de Dados

SQLite com as seguintes tabelas:

- **users** - Usuários do sistema
- **products** - Catálogo de produtos
- **carts** - Itens no carrinho
- **orders** - Pedidos realizados
- **order_items** - Itens de cada pedido
- **consultations** - Histórico de consultas

## 🧪 Dados de Teste

Após executar `npm run seed`, os seguintes usuários estarão disponíveis:

```
Email: producer@agroman.com
Senha: password123
Tipo: Produtor

Email: vendor@agroman.com
Senha: password123
Tipo: Vendedor

Email: consumer@agroman.com
Senha: password123
Tipo: Consumidor
```

## 🛠️ Desenvolvimento

### Estrutura de Componentes Frontend

- **Header** - Navbar com navegação e carrinho
- **Footer** - Links e informações
- **Cards** - Exibição de produtos
- **Forms** - Formulários de registro/login
- **Modals** - Diálogos reutilizáveis
- **Tables** - Dashboard com dados

### Styling

Usa **TailwindCSS** via CDN (sem build necessário).

## 📱 Responsividade

- Mobile first design
- Grid responsiva (md: breakpoint)
- Sidebar colapsável
- Cards adaptáveis

## 🔐 Segurança

- Autenticação JWT
- Hash de senhas com bcrypt
- CORS habilitado
- Validação de entrada

## 📊 Próximos Passos

1. Completar autenticação frontend
2. Conectar formulários ao backend
3. Implementar upload de imagens
4. Integrar pagamentos reais
5. Adicionar notificações em tempo real
6. Testes automatizados
7. Deploy em produção

## 📝 Licença

ISC

## 👨‍💻 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Versão**: 0.1.0  
**Última atualização**: 2025-11-30
