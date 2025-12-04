#!/bin/bash

# Deploy AgroMan to Vercel - Linux/Mac Shell Script
# This script automates the Vercel deployment process

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║        🚀 AgroMan Vercel Deploy Script                       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Vercel CLI"
        exit 1
    fi
fi

echo "✅ Vercel CLI found"
echo ""

# Check if logged in to Vercel
vercel whoami > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Not logged in to Vercel. Please login..."
    vercel login
    if [ $? -ne 0 ]; then
        echo "❌ Login failed"
        exit 1
    fi
fi

echo "✅ Already logged in to Vercel"
echo ""

# Push to Git (optional)
read -p "📝 Do you want to push changes to GitHub first? (y/n) " -n 1 -r gitpush
echo ""

if [[ $gitpush =~ ^[Yy]$ ]]; then
    echo ""
    echo "📤 Pushing to GitHub..."
    git add .
    git commit -m "Deploy to Vercel"
    git push origin main
    if [ $? -ne 0 ]; then
        echo "⚠️  Git push had issues, continuing anyway..."
    fi
fi

echo ""
echo "🔧 Step 2: Deploy Backend"
echo "Deploying backend to Vercel..."
cd "$(dirname "$0")/backend"
vercel --prod
if [ $? -ne 0 ]; then
    echo "❌ Backend deployment failed"
    exit 1
fi

echo "✅ Backend deployed successfully!"
echo ""

echo "🔧 Step 3: Deploy Frontend"
echo "Deploying frontend to Vercel..."
cd "$(dirname "$0")/frontend"
vercel --prod
if [ $? -ne 0 ]; then
    echo "❌ Frontend deployment failed"
    exit 1
fi

echo "✅ Frontend deployed successfully!"
echo ""

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║        ✅ Deployment Complete!                               ║"
echo "║                                                               ║"
echo "║  Your app is now live on Vercel!                            ║"
echo "║                                                               ║"
echo "║  Frontend:  https://agroman-frontend.vercel.app/            ║"
echo "║  Backend:   https://agroman-backend.vercel.app/api/         ║"
echo "║                                                               ║"
echo "║  ℹ️  Share these URLs with anyone to access your app         ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
