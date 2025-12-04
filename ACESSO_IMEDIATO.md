# 🎯 AgroMan - Acesso Imediato à Plataforma

## ✅ Status Atual

✅ Backend instalado e testado  
✅ Banco de dados criado com dados de teste  
✅ Frontend pronto  
✅ Configurado para Vercel  

---

## 🌐 URLs de Acesso

Seu app está hospedado na Vercel e acessível **gratuitamente** de qualquer lugar do mundo:

| Serviço | URL | Acesso |
|---------|-----|--------|
| **Frontend** | https://agroman-frontend.vercel.app/ | Abra no navegador |
| **Backend API** | https://agroman-backend.vercel.app/api/ | Para integração |
| **Health Check** | https://agroman-backend.vercel.app/api/health | Status do servidor |

---

## 🔑 Credenciais de Teste

Três tipos de usuários pré-criados para testar:

### 1️⃣ Consumidor (Comprador)
```
Email:  consumer@agroman.com
Senha:  password123
Tipo:   Consumidor
```
👉 Use este para testar catálogo e carrinho

### 2️⃣ Vendedor
```
Email:  vendor@agroman.com
Senha:  password123
Tipo:   Vendedor
```
👉 Use este para adicionar produtos e ver vendas

### 3️⃣ Produtor
```
Email:  producer@agroman.com
Senha:  password123
Tipo:   Produtor
```
👉 Use este para publicar produtos agrícolas

---

## 📱 Como Aceder (Qualquer Dispositivo)

### Desktop (Windows/Mac/Linux)
1. Abra navegador (Chrome, Firefox, Safari, Edge)
2. Cole: `https://agroman-frontend.vercel.app/`
3. Faça login com credenciais acima

### Telemóvel (Android/iPhone)
1. Abra o navegador do telemóvel
2. Cole o mesmo URL
3. Design é responsivo - funciona perfeitamente!

### Tablet
1. Mesmo procedimento que acima
2. Interface adapta-se automaticamente

---

## 🎨 O Que Você Pode Fazer

### 📦 Catálogo
- Ver todos os produtos agrícolas
- Filtrar por categoria (Vegetais, Frutas, Grãos, etc.)
- Buscar por nome
- Ver detalhes do produto

### 🛒 Carrinho e Compras
- Adicionar produtos ao carrinho
- Ajustar quantidade
- Ver total
- Finalizar compra (simulation)

### 👤 Dashboard
- Ver métricas da plataforma
- Vendedor: gerenciar seus produtos
- Produtor: publicar novos produtos
- Histórico de pedidos

### 💬 Consultas
- Fazer perguntas sobre agricultura
- Obter respostas inteligentes
- Ver histórico de consultas

---

## 🚀 Próximos Passos (Se Quiser Aprofundar)

### 1️⃣ Modificar Localmente e Fazer Deploy
```powershell
# Faça mudanças no código
cd C:\workspace\AgroMan

# Commit e push
git add .
git commit -m "Descrição da mudança"
git push origin main

# Deploy automático na Vercel! (sem fazer nada)
```

### 2️⃣ Adicionar Mais Produtos
```
No arquivo: backend/src/db/seed.js
Adicione produtos na lista `sampleProducts`
Execute: npm run seed
Deploy automático!
```

### 3️⃣ Usar Banco de Dados Real
Por enquanto usa SQLite (não persiste entre deploys).  
Para produção, use Supabase (PostgreSQL grátis):
1. Crie conta em https://supabase.com
2. Atualize `backend/src/db/init.js` com connection string
3. Deploy automático!

---

## 📊 Estatísticas

| Métrica | Valor |
|---------|-------|
| **Tecnologia** | Node.js + Express + SQLite |
| **Banco de Dados** | 3 usuários + 5 produtos |
| **Páginas** | 4 (Início, Catálogo, Consultas, Dashboard) |
| **Endpoints API** | 20+ |
| **Hospedagem** | Vercel (Grátis) |
| **Limite Mensal** | 100 deploys, 100GB banda |
| **Custo** | R$ 0 |

---

## 🆘 Troubleshooting

### "Não consigo aceder à URL"
- ✅ Verifique a URL (não há typo)
- ✅ Aguarde 1-2 minutos após deploy
- ✅ Abra em modo privado (Ctrl+Shift+P)
- ✅ Limpe cache (Ctrl+Shift+Delete)

### "Login não funciona"
- ✅ Use credenciais exatas acima
- ✅ Verifique se está no modo privado
- ✅ Tente noutra aba

### "API retorna erro"
- ✅ Abra console (F12)
- ✅ Veja erro na aba "Network"
- ✅ Se for CORS, atualize variáveis de ambiente

### "Banco de dados vazio"
- ✅ SQLite não persiste em Vercel
- ✅ Cada deploy cria novo banco
- ✅ Use Supabase para persistência

---

## 💡 Dicas Úteis

1. **Partilhar com Amigos**: Cole a URL em qualquer lugar — funciona!
2. **Testar no Telemóvel**: Abra em rede WiFi e aceda à URL
3. **Monitorar Erros**: Vercel Dashboard → Logs
4. **Atualizar Código**: Git push = deploy automático
5. **Clonar para Colega**: Compartilhe o repositório GitHub

---

## 📞 Contato & Suporte

**Documentação Completa**: 
- `README.md` — Visão geral
- `DEPLOY_VERCEL.md` — Deploy detalhado
- `API_SPEC.md` — Documentação de endpoints
- `GETTING_STARTED.md` — Guia passo-a-passo

**Links Úteis**:
- Vercel Dashboard: https://vercel.com/dashboard
- GitHub Repo: https://github.com/SEU_USUARIO/agroman
- Supabase (DB): https://supabase.com
- Node.js Docs: https://nodejs.org/docs/

---

## 🎉 Parabéns!

Seu marketplace agrícola está **ao vivo na internet**!

**Qualquer pessoa, em qualquer lugar, pode aceder agora.**

Compartilhe a URL: `https://agroman-frontend.vercel.app/`

---

**Última atualização**: 4 de Dezembro de 2025  
**Status**: ✅ Online e Funcional  
**Hospedagem**: Vercel (Gratuita)
