# 🚀 Deploy Gratuito na Vercel - Guia Completo

## Pré-requisitos
- Conta GitHub (para conectar o repositório)
- Conta Vercel (grátis em https://vercel.com/signup)

---

## 🔴 Opção 1: Deploy via Vercel Dashboard (Mais Fácil - Recomendado)

### 1️⃣ Fazer Push para GitHub

```powershell
cd C:\workspace\AgroMan

# Inicializar Git (se não tiver)
git init
git add .
git commit -m "Initial commit: AgroMan Marketplace ready for Vercel"

# Conectar a repositório remoto (crie um no https://github.com/new)
git remote add origin https://github.com/SEU_USUARIO/agroman.git
git branch -M main
git push -u origin main
```

### 2️⃣ Deploy do Backend (Serverless)

1. Aceda a https://vercel.com/dashboard
2. Clique em **"Add New..." → "Project"**
3. Selecione o repositório `agroman` do GitHub
4. Configure:
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - **Build Command**: deixe em branco (não precisa build)
   - **Output Directory**: deixe em branco
5. Clique **"Deploy"**

Vercel irá criar uma URL como:
- **Backend API**: `https://agroman-backend.vercel.app/api/*`
- **Health Check**: `https://agroman-backend.vercel.app/api/health`

### 3️⃣ Deploy do Frontend (Estático)

1. Na Vercel, clique **"Add New..." → "Project"** novamente
2. Mesmo repositório `agroman`
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Other
   - **Build Command**: deixe em branco
   - **Output Directory**: `public`
4. Clique **"Deploy"**

Vercel irá criar uma URL como:
- **Frontend**: `https://agroman-frontend.vercel.app/`

### 4️⃣ Configurar Variáveis de Ambiente

#### Para Backend (no projeto Vercel do backend):
1. Vá a **Settings → Environment Variables**
2. Adicione:
```
NODE_ENV = production
PORT = 3000
JWT_SECRET = seu-secret-seguro-aqui-32-caracteres
DATABASE_PATH = /tmp/agroman.db
CORS_ORIGIN = https://agroman-frontend.vercel.app
```

#### Para Frontend:
1. Vá a **Settings → Environment Variables** (do projeto frontend)
2. Adicione:
```
REACT_APP_API_URL = https://agroman-backend.vercel.app/api
```

Ou atualize `frontend/public/index.html` para:
```javascript
const API_BASE = 'https://agroman-backend.vercel.app/api';
```

---

## 🟢 Opção 2: Deploy via CLI Vercel (Mais Rápido)

Se preferir deploy direto do terminal:

### Backend
```powershell
cd C:\workspace\AgroMan\backend

# Fazer login
vercel login

# Deploy
vercel --prod

# Responder às perguntas:
# - Use existing project? → Yes (ou No para criar novo)
# - Which project? → Escolher ou criar "agroman-backend"
# - In which directory is your code? → .
# - Want to modify vercel.json? → No
```

### Frontend
```powershell
cd C:\workspace\AgroMan\frontend

vercel --prod

# Responder:
# - Use existing project? → Yes
# - Which project? → "agroman-frontend"
# - In which directory is your code? → .
# - Want to override settings? → Yes
#   - Build Command: deixe em branco
#   - Output Directory: public
```

---

## 📝 Ficheiros de Configuração Necessários

### backend/vercel.json (já criado)
```json
{
  "version": 2,
  "builds": [
    { "src": "api/**/*.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/$1" }
  ]
}
```

### frontend/vercel.json (criar se não existir)
```json
{
  "version": 2,
  "public": "public",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=3600" }
      ]
    }
  ]
}
```

---

## ✅ Checklist Pré-Deploy

- [ ] `git init` e push para GitHub
- [ ] Verificar que `backend/src/app.js` existe e exporta Express app
- [ ] Verificar que `backend/api/[...slug].js` existe (wrap serverless)
- [ ] Verificar que `frontend/public/index.html` existe
- [ ] `.gitignore` contém `node_modules/`, `*.db`, `.env`
- [ ] Sem erros em `npm run dev` localmente

---

## 🌐 URLs Finais de Acesso

Após deploy:
- **Frontend**: https://agroman-frontend.vercel.app/
- **Backend API**: https://agroman-backend.vercel.app/api/
- **Catálogo**: https://agroman-frontend.vercel.app/catalog.html
- **Dashboard**: https://agroman-frontend.vercel.app/dashboard.html
- **Health Check**: https://agroman-backend.vercel.app/api/health

Qualquer pessoa no mundo pode aceder apenas com a URL!

---

## ⚠️ Notas Importantes

1. **SQLite em Vercel**: Ephemeral storage (não persiste entre deploys)
   - Para produção real, use PostgreSQL/MySQL (Supabase, PlanetScale grátis)
   
2. **Limites Grátis Vercel**:
   - 100 deploys/mês
   - 100GB bandwidth/mês
   - Funções serverless até 10 segundos
   - Suficiente para MVP/demo

3. **Domínio Personalizado**: Vercel oferece grátis com `vercel.app`
   - Se quiser seu próprio domínio, custa $12/ano em registradores baratos

4. **Atualizações Automáticas**: 
   - Cada `git push` para `main` fará deploy automático!
   - Pode desactivar em Vercel Dashboard → Settings → Git

---

## 🔧 Troubleshooting

**Erro: "Cannot find module"**
- Execute `npm install` na pasta do projeto antes de fazer push

**Erro: "Port is already in use"**
- Vercel atribui porta automaticamente, não precisa configurar

**CORS errors**
- Actualize `CORS_ORIGIN` em backend `.env` com URL exata do frontend

**Database locked (SQLite)**
- Cada deploy cria nova instância, isso é esperado
- Use DB gerenciada para produção

---

## 📚 Recursos

- Docs Vercel: https://vercel.com/docs
- Supabase grátis (PostgreSQL): https://supabase.com
- PlanetScale grátis (MySQL): https://planetscale.com
- GitHub Pages (alternativa para frontend): https://pages.github.com
