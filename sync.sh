#!/bin/bash

# Create public directory if it doesn't exist
mkdir -p public

# Build CSS from TailwindCSS
npm run build-css-once

# Copy src/index.html to public/index.html
cp src/index.html public/index.html

# Copy JavaScript file to public directory
cp src/tipCalculator.js public/tipCalculator.js

# Copy favicon.svg to public directory
cp src/favicon.svg public/favicon.svg
cp src/apple-touch-icon.png public/apple-touch-icon.png

# Convert src/about.md to public/about/index.html using pandoc
mkdir -p public/about
pandoc src/about.md -o public/about/index.html

# Sync to cloud deployment
efmrl sync -D
