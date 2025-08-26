#!/bin/bash

# Create public directory if it doesn't exist
mkdir -p public

# Copy content/index.html to public/index.html
cp content/index.html public/index.html

# Sync to cloud deployment
efmrl sync -D