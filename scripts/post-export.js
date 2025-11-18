#!/usr/bin/env node

/**
 * Post-export script for Capacitor integration
 * This script runs after Next.js static export to prepare the build for Capacitor
 */

const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(process.cwd(), 'out');
const REDIRECT_HTML = path.join(process.cwd(), 'public', 'redirect.html');
const INDEX_HTML = path.join(OUT_DIR, 'index.html');
const AR_INDEX_HTML = path.join(OUT_DIR, 'ar', 'index.html');

console.log('🔧 Running post-export script for Capacitor...');

// Check if out directory exists
if (!fs.existsSync(OUT_DIR)) {
  console.error('❌ Error: out directory does not exist. Please run "npm run build" first.');
  process.exit(1);
}

// Copy ar/index.html to root index.html for Capacitor
// This ensures the app loads the Arabic version directly
try {
  if (fs.existsSync(AR_INDEX_HTML)) {
    fs.copyFileSync(AR_INDEX_HTML, INDEX_HTML);
    console.log('✅ Created index.html from ar/index.html (default locale)');
  } else if (fs.existsSync(REDIRECT_HTML)) {
    // Fallback to redirect.html if ar/index.html doesn't exist
    fs.copyFileSync(REDIRECT_HTML, INDEX_HTML);
    console.log('✅ Created index.html with locale redirect');
  } else {
    console.warn('⚠️  Warning: Neither ar/index.html nor redirect.html found');
  }
} catch (error) {
  console.error('❌ Error creating index.html:', error.message);
  process.exit(1);
}

// Create a .nojekyll file to prevent GitHub Pages from ignoring files starting with _
const noJekyllPath = path.join(OUT_DIR, '.nojekyll');
try {
  fs.writeFileSync(noJekyllPath, '');
  console.log('✅ Created .nojekyll file');
} catch (error) {
  console.warn('⚠️  Warning: Could not create .nojekyll file:', error.message);
}

console.log('✨ Post-export script completed successfully!');

