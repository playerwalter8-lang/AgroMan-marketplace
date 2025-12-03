@echo off
REM AgroMan Quick Start Script for Windows
REM This script sets up and runs the entire AgroMan platform

echo 🌾 AgroMan Quick Start
echo ====================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ✗ Node.js is not installed. Please install Node.js 14.0+
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✓ Node.js %NODE_VERSION%

REM Navigate to backend
cd backend

REM Install dependencies
echo.
echo → Installing dependencies...
call npm install

REM Setup .env file
if not exist .env (
    echo → Creating .env file...
    copy .env.example .env
    echo ✓ .env file created. Review and update if needed.
) else (
    echo ✓ .env file already exists
)

REM Create data directory
if not exist data mkdir data

REM Seed database
echo.
echo → Initializing database...
call npm run seed

echo.
echo ✓ Setup complete!
echo.
echo To start the server:
echo   npm run dev    # Development mode (with auto-reload)
echo   npm start      # Production mode
echo.
echo Frontend:
echo   Open: http://localhost:5000/index.html
echo.
echo Test Credentials:
echo   Producer: producer@agroman.com / password123
echo   Vendor:   vendor@agroman.com / password123
echo   Consumer: consumer@agroman.com / password123
echo.
pause
