#!/bin/bash

# Git Configuration Setup for PrakashKrishnamoorthi
echo "Setting up Git configuration..."

# Set your name and email (replace with your actual email)
git config --global user.name "PrakashKrishnamoorthi"
git config --global user.email "your-email@example.com"

# Optional: Set up other useful git configurations
git config --global init.defaultBranch main
git config --global core.editor "code --wait"
git config --global core.autocrlf input
git config --global push.default simple
git config --global pull.rebase false

# Set up commit template
git config --global commit.template .gitmessage

echo "✅ Git configuration completed!"
echo ""
echo "Current git user configuration:"
git config --global user.name
git config --global user.email
echo ""
echo "🔧 To change your email, run:"
echo "git config --global user.email 'your-actual-email@example.com'"
echo ""
echo "📝 Future commits will be attributed to: PrakashKrishnamoorthi"
