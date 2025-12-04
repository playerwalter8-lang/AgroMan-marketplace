# 🌍 Deploy AgroMan na Internet - Acesso Gratuito Em Qualquer Lugar

Seu app estará disponível em qualquer dispositivo, em qualquer canto do mundo!

## ⚡ Quick Start (3 minutos)

### 1. Crie uma conta Vercel (grátis)
- Aceda a https://vercel.com/signup
- Faça login com GitHub (recomendado)

### 2. Execute o script de deploy

**Windows:**
```cmd
.\deploy-vercel.bat
```

**Linux/Mac:**
```bash
chmod +x deploy-vercel.sh
./deploy-vercel.sh
```

### 3. Abra seu app

Após deploy:
- **Frontend**: https://agroman-frontend.vercel.app/
- **Backend API**: https://agroman-backend.vercel.app/api/

**Pronto! 🎉 Qualquer pessoa no mundo pode aceder!**

---

## 📱 Como Aceder (Qualquer Dispositivo)

1. **No Computador**: Abra `https://agroman-frontend.vercel.app/` no navegador
2. **No Telemóvel**: Abra a mesma URL no navegador (Chrome, Safari, etc.)
3. **Partilhe o link**: Qualquer pessoa pode aceder com o link!

---

## 🔑 Credenciais de Teste

```
PRODUTOR:
Email: producer@agroman.com
Senha: password123

VENDEDOR:
Email: vendor@agroman.com
Senha: password123

CONSUMIDOR:
Email: consumer@agroman.com
Senha: password123
```

---

## 📊 Como Funciona

```
Seu Dispositivo (Windows/Mac/Linux)
        ↓
   Vercel CLI
        ↓
   GitHub (repositório)
        ↓
   Servidores Vercel
        ↓
   Internet Pública
        ↓
   Qualquer Dispositivo (Computador, Telemóvel, Tablet)
```

---

## ✅ Checklist Pré-Deploy

- [ ] Tem conta GitHub? (crie em https://github.com/signup se não tiver)
- [ ] Repositório foi criado? (`git init` e `git push`)
- [ ] Tem conta Vercel? (crie em https://vercel.com/signup)
- [ ] Instalou Vercel CLI? (o script o faz automaticamente)
- [ ] Backend funciona localmente? (`npm run dev`)
- [ ] Frontend carrega? (`http://localhost:5000/index.html`)

---

## 🚀 Deploy Manual (Se Preferir)

### Via Dashboard Vercel (Mais Fácil)

1. Aceda a https://vercel.com/dashboard
2. Clique em "Add New Project"
3. Selecione repositório `agroman` no GitHub
4. Configure:
   - **Root Directory**: `backend`
   - **Framework**: Other
   - **Build Command**: (deixe vazio)
5. Clique "Deploy"
6. Repita passos 2-5 para o `frontend` (Root: `frontend`)

### Via Terminal (Mais Rápido)

```powershell
# Backend
cd C:\workspace\AgroMan\backend
vercel login
vercel --prod

# Frontend
cd C:\workspace\AgroMan\frontend
vercel --prod
```

---

## 🔧 Variáveis de Ambiente (Configurar em Vercel)

**Backend Project → Settings → Environment Variables:**
```
NODE_ENV = production
JWT_SECRET = seu-valor-aleatorio-secreto-aqui
DATABASE_PATH = /tmp/agroman.db
CORS_ORIGIN = https://agroman-frontend.vercel.app
```

---

## 📈 Após Deploy - Próximos Passos

1. **Teste tudo**: Crie conta, adicione produtos, faça pedido
2. **Convide amigos**: Partilhe a URL com qualquer pessoa
3. **Monitore**: Aceda a Vercel Dashboard para ver logs e erros
4. **Atualize**: Cada `git push` faz deploy automático!

---

## ⚠️ Notas Importantes

- **SQLite em Vercel**: Não persiste entre deploys
  - Para produção real, use PostgreSQL grátis (Supabase.com)
  - Dados de teste desaparecem após deploy, mas app funciona!

- **Límites Grátis**:
  - Vercel: 100 deploys/mês (mais que suficiente)
  - Banda: 100GB/mês (cobre muitos acessos)
  - Tempo de função: 10 segundos (suficiente para API)

- **Domínio Personalizado**: 
  - Vercel oferece subdomínio grátis `.vercel.app`
  - Se quiser seu próprio domínio (ex: `meuapp.com`), custa ~$12/ano

- **Atualizações Automáticas**:
  - Cada `git push` faz deploy automático
  - Pode desactivar em Vercel Dashboard

---

## 💬 Compartilhar Com Amigos/Colegas

Copie e envie este texto:

> 🌾 **AgroMan Marketplace** — Plataforma agrícola online
> 
> 🔗 **Acesso**: https://agroman-frontend.vercel.app/
> 
> 📱 Funciona em telemóvel, computador, tablet
> 
> 👤 **Teste agora:**
> - Email: consumer@agroman.com
> - Senha: password123
> 
> ✨ Desenvolvido com Node.js + Express + SQLite + Tailwind CSS

---

## 🆘 Troubleshooting

| Problema | Solução |
|----------|---------|
| "Vercel CLI not found" | Execute: `npm install -g vercel` |
| "Not logged in" | Execute: `vercel login` |
| "Cannot find module" | Execute: `npm install` na pasta do projeto |
| "CORS error" | Actualizar `CORS_ORIGIN` no Vercel env var |
| "Port already in use" | Vercel atribui porto automaticamente, não é problema |

---

## 📚 Recursos Úteis

- **Vercel Docs**: https://vercel.com/docs
- **GitHub**: https://github.com
- **Supabase (PostgreSQL grátis)**: https://supabase.com
- **PlanetScale (MySQL grátis)**: https://planetscale.com

---

**🎉 Pronto! Seu app está no ar! Compartilhe a URL com quem quiser!**
