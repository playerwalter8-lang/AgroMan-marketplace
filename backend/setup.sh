#!/bin/bash

# AgroMan Quick Start Script
# This script sets up and runs the entire AgroMan platform

echo "🌾 AgroMan Quick Start"
echo "===================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed. Please install Node.js 14.0+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# Navigate to backend
cd backend

# Install dependencies
echo -e "\n${BLUE}→ Installing dependencies...${NC}"
npm install

# Setup .env file
if [ ! -f .env ]; then
    echo -e "${BLUE}→ Creating .env file...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created. Review and update if needed.${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

# Create data directory
mkdir -p data

# Seed database
echo -e "\n${BLUE}→ Initializing database...${NC}"
npm run seed

echo ""
echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""
echo -e "${BLUE}To start the server:${NC}"
echo "  npm run dev    # Development mode (with auto-reload)"
echo "  npm start      # Production mode"
echo ""
echo -e "${BLUE}Frontend:${NC}"
echo "  Open: http://localhost:5000/index.html"
echo ""
echo -e "${BLUE}Test Credentials:${NC}"
echo "  Producer: producer@agroman.com / password123"
echo "  Vendor:   vendor@agroman.com / password123"
echo "  Consumer: consumer@agroman.com / password123"
echo ""
