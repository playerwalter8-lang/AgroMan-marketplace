@echo off
REM Deploy AgroMan to Vercel - Windows Batch Script
REM This script automates the Vercel deployment process

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║        🚀 AgroMan Vercel Deploy Script                       ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI not found. Installing...
    call npm install -g vercel
    if %errorlevel% neq 0 (
        echo ❌ Failed to install Vercel CLI
        pause
        exit /b 1
    )
)

echo ✅ Vercel CLI found
echo.

REM Check if logged in to Vercel
vercel whoami >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Not logged in to Vercel. Please login...
    call vercel login
    if %errorlevel% neq 0 (
        echo ❌ Login failed
        pause
        exit /b 1
    )
)

echo ✅ Already logged in to Vercel
echo.

REM Push to Git (optional)
echo 📝 Step 1: Push to GitHub (optional)
echo Do you want to push changes to GitHub first? (y/n)
set /p gitpush=
if /i "%gitpush%"=="y" (
    echo.
    echo 📤 Pushing to GitHub...
    cd %~dp0
    git add .
    git commit -m "Deploy to Vercel"
    git push origin main
    if %errorlevel% neq 0 (
        echo ⚠️  Git push had issues, continuing anyway...
    )
    cd ..
)

echo.
echo 🔧 Step 2: Deploy Backend
echo Deploying backend to Vercel...
cd %~dp0backend
vercel --prod
if %errorlevel% neq 0 (
    echo ❌ Backend deployment failed
    pause
    exit /b 1
)

echo ✅ Backend deployed successfully!
echo.

echo 🔧 Step 3: Deploy Frontend
echo Deploying frontend to Vercel...
cd %~dp0..\frontend
vercel --prod
if %errorlevel% neq 0 (
    echo ❌ Frontend deployment failed
    pause
    exit /b 1
)

echo ✅ Frontend deployed successfully!
echo.

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║        ✅ Deployment Complete!                               ║
echo ║                                                               ║
echo ║  Your app is now live on Vercel!                            ║
echo ║                                                               ║
echo ║  Frontend:  https://agroman-frontend.vercel.app/            ║
echo ║  Backend:   https://agroman-backend.vercel.app/api/         ║
echo ║                                                               ║
echo ║  ℹ️  Share these URLs with anyone to access your app         ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
pause
