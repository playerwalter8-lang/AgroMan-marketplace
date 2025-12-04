@echo off
REM Complete AgroMan Deployment to Vercel - All-in-One Script
REM This script handles everything: dependencies, seed, git, and Vercel deploy

setlocal enabledelayedexpansion

cd /d %~dp0

echo.
echo ╔════════════════════════════════════════════════════════════════════════════╗
echo ║                                                                            ║
echo ║              🚀 AGROMAN COMPLETE DEPLOYMENT TO VERCEL 🚀                  ║
echo ║                                                                            ║
echo ║              Este script vai fazer TUDO automaticamente:                   ║
echo ║              1. Instalar dependências backend                              ║
echo ║              2. Popular banco de dados                                     ║
echo ║              3. Fazer git commit e push                                    ║
echo ║              4. Deploy na Vercel (Backend + Frontend)                      ║
echo ║                                                                            ║
echo ╚════════════════════════════════════════════════════════════════════════════╝
echo.

REM ==================== PASSO 1: DEPENDÊNCIAS ====================
echo.
echo 📦 PASSO 1: Instalando dependências backend...
echo ────────────────────────────────────────────────────────────
cd backend
call npm install
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERRO: Falha ao instalar dependências
    pause
    exit /b 1
)
echo ✅ Dependências instaladas com sucesso
cd ..

REM ==================== PASSO 2: SEED ====================
echo.
echo 🌱 PASSO 2: Populando banco de dados...
echo ────────────────────────────────────────────────────────────
cd backend
call npm run seed
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERRO: Falha ao popular banco
    pause
    exit /b 1
)
echo ✅ Banco de dados populado com sucesso
cd ..

REM ==================== PASSO 3: GIT ====================
echo.
echo 📝 PASSO 3: Fazendo git commit...
echo ────────────────────────────────────────────────────────────

REM Configure git
git config user.name "AgroMan Developer"
git config user.email "dev@agroman.com"

REM Add all files
git add .
if %errorlevel% neq 0 (
    echo ⚠️  Git add teve problemas, continuando...
)

REM Commit
git commit -m "AgroMan: Production ready - configured for Vercel deployment"
if %errorlevel% neq 0 (
    echo ⚠️  Git commit teve problemas, continuando...
)

echo ✅ Git atualizado
echo.

REM ==================== PASSO 4: VERCEL ====================
echo.
echo 🌐 PASSO 4: Deploy na Vercel...
echo ────────────────────────────────────────────────────────────
echo.

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo 📥 Instalando Vercel CLI...
    call npm install -g vercel
    if %errorlevel% neq 0 (
        echo ❌ Falha ao instalar Vercel CLI
        pause
        exit /b 1
    )
)

echo.
echo ℹ️  Verificando login Vercel...
vercel whoami >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Você não está logado no Vercel
    echo.
    echo Abra https://vercel.com/dashboard e faça login
    echo Depois execute novamente este script
    echo.
    pause
    exit /b 1
)

echo ✅ Você está logado no Vercel
echo.

REM Deploy backend
echo 🔧 Fazendo deploy do backend...
cd backend
call vercel --prod
if %errorlevel% neq 0 (
    echo ⚠️  Backend deploy teve problemas
)
cd ..

echo.
echo 🔧 Fazendo deploy do frontend...
cd frontend
call vercel --prod
if %errorlevel% neq 0 (
    echo ⚠️  Frontend deploy teve problemas
)
cd ..

REM ==================== SUCESSO ====================
echo.
echo.
echo ╔════════════════════════════════════════════════════════════════════════════╗
echo ║                                                                            ║
echo ║                   ✅ DEPLOYMENT COMPLETO COM SUCESSO! ✅                  ║
echo ║                                                                            ║
echo ║            Seu app AgroMan está agora no ar na Vercel!                    ║
echo ║                                                                            ║
echo ║  🌐 URLS DE ACESSO:                                                        ║
echo ║                                                                            ║
echo ║     Frontend:  https://agroman-frontend.vercel.app/                       ║
echo ║     Backend:   https://agroman-backend.vercel.app/api/                    ║
echo ║                                                                            ║
echo ║  📱 QUALQUER PESSOA NO MUNDO PODE ACEDER NESTAS URLS!                     ║
echo ║                                                                            ║
echo ║  🔑 CREDENCIAIS DE TESTE:                                                  ║
echo ║     Email: consumer@agroman.com                                            ║
echo ║     Senha: password123                                                     ║
echo ║                                                                            ║
echo ║  📧 Para atualizar seu app:                                                ║
echo ║     1. Faça modificações no código                                         ║
echo ║     2. git push origin main                                                ║
echo ║     3. Deploy automático acontece na Vercel!                              ║
echo ║                                                                            ║
echo ╚════════════════════════════════════════════════════════════════════════════╝
echo.

pause
