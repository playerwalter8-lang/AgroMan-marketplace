# Configurar Repositório Git

## 1. Inicializar repositório Git (primeira vez)

```powershell
cd c:\workspace\AgroMan
git init
git config user.name "Seu Nome"
git config user.email "seu.email@example.com"
```

## 2. Criar `.gitignore`

```powershell
# Na raiz do projeto, criar arquivo .gitignore
```

Conteúdo do `.gitignore`:
```
# Dependencies
node_modules/
*.npm
.pnpm-lock.yaml

# Environment
.env
.env.local
.env.*.local

# Build / Output
dist/
build/
.next/
out/

# Database
*.db
*.sqlite
data/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*

# OS
.DS_Store
Thumbs.db
```

## 3. Adicionar ficheiros e fazer commit

```powershell
cd c:\workspace\AgroMan

# Adicionar todos os ficheiros
git add .

# Ver status (opcional)
git status

# Fazer commit inicial
git commit -m "Initial commit: AgroMan marketplace project

- Backend: Express API com SQLite
- Frontend: HTML/CSS/JS com Tailwind CSS
- Features: Catálogo, carrinho, autenticação, dashboard
- Deploy: Configurado para Vercel (serverless)"
```

## 4. Conectar a repositório remoto (GitHub, GitLab, etc.)

### Para GitHub:
```powershell
# Criar repositório em https://github.com/new

# Adicionar remote (substitua USER e REPO)
git remote add origin https://github.com/USER/REPO.git

# Enviar código
git branch -M main
git push -u origin main
```

### Para GitLab:
```powershell
# Criar repositório em https://gitlab.com/projects/new

# Adicionar remote (substitua USER e REPO)
git remote add origin https://gitlab.com/USER/REPO.git

# Enviar código
git branch -M main
git push -u origin main
```

## 5. Comandos úteis para desenvolvimento

```powershell
# Ver histórico de commits
git log --oneline

# Ver estado dos ficheiros
git status

# Ver diferenças
git diff

# Criar branch para nova feature
git checkout -b feature/nome-da-feature

# Mudar de branch
git checkout main

# Fazer merge de branch
git checkout main
git merge feature/nome-da-feature

# Apagar branch local
git branch -d feature/nome-da-feature

# Atualizar código do remoto
git pull origin main

# Enviar commits para remoto
git push origin main
```

## 6. Workflow recomendado para desenvolvimento

```powershell
# 1. Criar branch para feature
git checkout -b feature/adicionar-busca

# 2. Fazer alterações e commits
git add .
git commit -m "feat: adicionar buscador de produtos"

# 3. Enviar para remoto
git push origin feature/adicionar-busca

# 4. Abrir Pull Request no GitHub/GitLab

# 5. Após merge, atualizar local
git checkout main
git pull origin main

# 6. Apagar branch
git branch -d feature/adicionar-busca
```

## Notas
- Certifique-se de que `.gitignore` está criado ANTES de fazer `git add .`
- Use nomes descritivos nos commits (ex.: `feat:`, `fix:`, `docs:`)
- Para colaboração, use branches por feature
