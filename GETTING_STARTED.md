# 🌾 AgroMan - Guia de Início Rápido

## Bem-vindo ao AgroMan!

Plataforma digital que conecta produtores agrícolas e vendedores ao consumidor final.

---

## ✅ Pré-requisitos

- **Node.js** 14.0 ou superior ([Download](https://nodejs.org))
- **npm** (incluído com Node.js)
- Um navegador web moderno (Chrome, Firefox, Edge, Safari)

## 🚀 Instalação em 5 Minutos

### 1. Abrir Terminal/Prompt de Comando

Na pasta do projeto `AgroMan/backend`, execute:

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Ambiente (Opcional)

Se quiser customizar a porta ou senha JWT:

```bash
cp .env.example .env
# Edite .env conforme necessário
```

### 4. Inicializar Banco de Dados

```bash
npm run seed
```

Isso criará a base de dados com alguns produtos e usuários de teste.

### 5. Iniciar o Servidor

**Modo desenvolvimento** (recomendado durante desenvolvimento):
```bash
npm run dev
```

**Modo produção**:
```bash
npm start
```

Você verá:
```
✓ AgroMan API running on http://localhost:5000
✓ Environment: development
```

### 6. Abrir no Navegador

Visite: **http://localhost:5000/index.html**

---

## 👥 Usuários de Teste

Use estas credenciais para testar diferentes funcionalidades:

### Produtor Agrícola
```
Email:    producer@agroman.com
Senha:    password123
Tipo:     Produtor
```

### Vendedor
```
Email:    vendor@agroman.com
Senha:    password123
Tipo:     Vendedor
```

### Consumidor
```
Email:    consumer@agroman.com
Senha:    password123
Tipo:     Consumidor
```

---

## 📄 Páginas Principais

### 1. **Início** (`index.html`)
- Apresentação da plataforma
- Registro e login
- Produtos populares

### 2. **Catálogo** (`catalog.html`)
- Listar todos os produtos
- Filtrar por categoria
- Buscar por nome
- Adicionar ao carrinho
- Ver detalhes do produto

### 3. **Consultas** (`consultas.html`)
- Fazer perguntas sobre agricultura
- Respostas inteligentes (baseadas em conhecimento)
- Histórico de consultas

### 4. **Dashboard** (`dashboard.html`)
- Métricas gerais da plataforma
- Histórico de vendas (para vendedores)
- Meus produtos (para vendedores)
- Meus pedidos (para compradores)
- Configurações de perfil

---

## 🛠️ Estrutura de Pastas

```
AgroMan/
├── backend/
│   ├── src/
│   │   ├── index.js              ← Servidor principal
│   │   ├── db/                   ← Banco de dados (SQLite)
│   │   │   ├── init.js           ← Inicialização
│   │   │   └── seed.js           ← Dados de teste
│   │   ├── modules/              ← Módulos da API
│   │   │   ├── auth/             ← Autenticação
│   │   │   ├── products/         ← Produtos
│   │   │   ├── sales/            ← Vendas e pedidos
│   │   │   ├── consultas/        ← Consultas IA
│   │   │   └── dashboard/        ← Dashboard
│   │   ├── integrations/         ← Stubs futuros
│   │   │   ├── ussd.js           ← USSD (telefone)
│   │   │   ├── mpesa.js          ← Pagamentos
│   │   │   └── logistics.js      ← Logística
│   │   └── middleware/           ← Middleware
│   ├── package.json
│   ├── .env.example
│   ├── setup.sh                  ← Script de setup (Linux/Mac)
│   └── setup.bat                 ← Script de setup (Windows)
│
├── frontend/
│   ├── public/
│   │   ├── index.html            ← Página inicial
│   │   ├── catalog.html          ← Catálogo
│   │   ├── consultas.html        ← Consultas
│   │   └── dashboard.html        ← Dashboard
│   └── src/
│       ├── css/global.css        ← Estilos globais
│       └── js/utils.js           ← Funções utilitárias
│
├── README.md                     ← Documentação principal
├── API_SPEC.md                   ← Especificação da API
└── GETTING_STARTED.md            ← Este arquivo
```

---

## 📡 API REST

A API está disponível em `http://localhost:5000/api`

### Exemplos de Requisições

**Registrar novo usuário:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "novo@example.com",
    "password": "senha123",
    "name": "Novo Usuário",
    "user_type": "consumer"
  }'
```

**Listar produtos:**
```bash
curl http://localhost:5000/api/products
```

**Listar produtos de uma categoria:**
```bash
curl "http://localhost:5000/api/products?category=Vegetais"
```

Para mais detalhes, veja `API_SPEC.md`.

---

## 🎨 Estilo e Design

- **Frontend Framework**: HTML5 + Tailwind CSS (via CDN)
- **Design**: Mobile-first, responsivo
- **Componentes**: Cards, Formulários, Tabelas, Modals

---

## 🔌 Integrações Futuras

Stubs já criados para:

### USSD (Telefone)
- Arquivo: `backend/src/integrations/ussd.js`
- Permite acesso via código USSD (*123#)

### M-Pesa (Pagamentos)
- Arquivo: `backend/src/integrations/mpesa.js`
- Integração com pagamentos móveis

### Logística (Entregas)
- Arquivo: `backend/src/integrations/logistics.js`
- Rastreamento de envios

---

## 🧪 Testar a Plataforma

### Fluxo Completo de Usuário

1. **Registrar-se** como Consumidor
2. **Navegar** para Catálogo
3. **Buscar e Filtrar** produtos
4. **Adicionar ao Carrinho**
5. **Finalizar Compra** (criar pedido)
6. **Ver Pedidos** no Dashboard

### Fluxo de Vendedor

1. **Registrar-se** como Vendedor
2. **Ir para Dashboard**
3. **Adicionar Novo Produto**
4. **Ver Histórico de Vendas**
5. **Atualizar Status de Pedidos**

### Testar Consultas

1. Ir para **Consultas**
2. Escrever pergunta sobre agricultura
3. Receber resposta inteligente
4. Ver histórico de perguntas

---

## 🐛 Troubleshooting

### Erro: "Port 5000 is already in use"
Mude a porta no arquivo `.env`:
```
PORT=5001
```

### Erro: "Cannot find module"
Reinstale as dependências:
```bash
rm -rf node_modules
npm install
```

### Banco de dados vazio
Repopule com:
```bash
npm run seed
```

### Problemas de CORS
Certifique-se de que está acessando `http://localhost:5000` e não `127.0.0.1:5000`

---

## 📊 Banco de Dados

Usa **SQLite3** - arquivo: `data/agroman.db`

Tabelas principais:
- `users` - Usuários
- `products` - Produtos
- `carts` - Carrinhos
- `orders` - Pedidos
- `order_items` - Itens de pedido
- `consultations` - Histórico de consultas

---

## 💡 Próximas Funcionalidades

- [ ] Upload de imagens de produtos
- [ ] Sistema de avaliações e comentários
- [ ] Notificações em tempo real
- [ ] Integração de pagamento real (M-Pesa)
- [ ] Integração de logística
- [ ] Suporte mobile app
- [ ] Sistema de mensagens entre usuários

---

## 📚 Documentação

- **README.md** - Visão geral e instruções
- **API_SPEC.md** - Especificação completa da API
- **GETTING_STARTED.md** - Este guia (passo a passo)

---

## 🤝 Contribuindo

Este é um projeto em desenvolvimento. Sugestões e melhorias são bem-vindas!

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs do servidor
2. Consulte a documentação
3. Abra uma issue no repositório

---

## 🎓 Estrutura de Aprendizado

Se você é novo em web development:

1. **HTML/CSS** - Entenda a estrutura (`index.html`, `catalog.html`)
2. **JavaScript** - Veja como funções de `utils.js` funcionam
3. **Node.js/Express** - Analise `backend/src/index.js`
4. **API REST** - Entenda os endpoints em `API_SPEC.md`
5. **Banco de Dados** - Veja `backend/src/db/init.js`

---

## ✨ Dicas Úteis

- Use a ferramenta de Desenvolvedor do navegador (F12) para debugar
- Veja os logs do servidor no terminal
- Limpe o cache do navegador se tiver problemas (`Ctrl+Shift+Delete`)
- Faça requisições à API via cURL ou Postman para entender melhor

---

**Versão**: 0.1.0  
**Última atualização**: 2025-11-30  
**Status**: Em desenvolvimento ativo

Bom desenvolvimento! 🚀
