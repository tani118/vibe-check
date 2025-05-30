#!/bin/bash

# Vibe Checker App - Deployment Zip Creator
# This script creates a clean zip file ready for deployment

echo "🎵 Creating deployment zip for Vibe Checker App..."

# Get current directory name
PROJECT_NAME="vibe-check-quiz"
ZIP_NAME="${PROJECT_NAME}-deployment-$(date +%Y%m%d-%H%M%S).zip"

echo "📦 Creating zip file: $ZIP_NAME"

# Create zip excluding unnecessary files
zip -r "$ZIP_NAME" . \
  -x "node_modules/*" \
  -x "dist/*" \
  -x ".git/*" \
  -x "*.log" \
  -x ".env*" \
  -x "*.local" \
  -x ".DS_Store" \
  -x "*.tmp" \
  -x "*.temp" \
  -x "coverage/*" \
  -x ".nyc_output/*" \
  -x ".vscode/*" \
  -x ".idea/*" \
  -x "*.suo" \
  -x "*.ntvs*" \
  -x "*.njsproj" \
  -x "*.sln" \
  -x "*.sw?" \
  -x "Thumbs.db"

if [ $? -eq 0 ]; then
    echo "✅ Zip file created successfully!"
    echo "📁 File: $ZIP_NAME"
    echo "📊 Size: $(du -sh "$ZIP_NAME" | cut -f1)"
    echo ""
    echo "📋 What's included in the zip:"
    echo "✅ Source code (src/)"
    echo "✅ Public assets (public/)"
    echo "✅ Configuration files (package.json, vite.config.js, etc.)"
    echo "✅ Documentation files"
    echo "✅ Deployment configs (vercel.json)"
    echo ""
    echo "📋 What's excluded:"
    echo "❌ node_modules/ (163M - will be installed on server)"
    echo "❌ dist/ (544K - will be built on server)" 
    echo "❌ .git/ (1.3M - version control not needed)"
    echo "❌ .env files (sensitive credentials)"
    echo "❌ Log files and temporary files"
    echo ""
    echo "🚀 This zip is ready for deployment!"
else
    echo "❌ Error creating zip file"
    exit 1
fi
