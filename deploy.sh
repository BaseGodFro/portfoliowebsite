#!/bin/bash

# Script to automatically stage, commit, and push changes to GitHub

echo "🚀 Deploying changes to GitHub..."

# Stage all changes (except files in .gitignore)
git add .

# Check if there are any changes to commit
if git diff --staged --quiet; then
    echo "✅ No changes to commit. Everything is up to date!"
    exit 0
fi

# Get a commit message (use provided message or default)
COMMIT_MSG="${1:-Update portfolio website}"

# Commit changes
git commit -m "$COMMIT_MSG"

# Push to GitHub
git push origin main

echo "✅ Successfully pushed to GitHub!"

